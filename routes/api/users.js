const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();
//const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const nodemailer = require("nodemailer");

//@route    POST api/users
//@desc     Register user
//@access   Public
router.post(
    "/",
    [
        check("name", "Name is required").not().isEmpty(), //To be there and not empty   
        check("email", "Please include a valid email").isEmail(),
        check("university", "university is required").not().isEmpty(),
        check("password", "Please enter a password with 6 or more char").isLength({
            min: 6,
        }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password, university, code, confirmeNumber } = req.body;
        try {
            let user = await User.findOne({ email });

            if (user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "User already exists" }] });
            }
            console.log("code : ", code)
            console.log("confirmeNumber : ", confirmeNumber)
            const DecodeconfirmeNumber = jwt.verify(code, process.env.jwtSecret);
            if (DecodeconfirmeNumber.code.result !== confirmeNumber) {
                return res.status(403).json({
                    errors: [{
                        msg: 'incorrect confirmation code',
                        d:DecodeconfirmeNumber.code.result,
                        code:code
                        
                    }]
                })
            }

            user = new User({
                name,
                email,
                password,
                university,
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            user.save();

            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                process.env.jwtSecret,
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ error: err.message });
        }

    }
);




//@route    POST api/users
//@desc     Exist user
//@access   Public
router.post(
    "/exist",
    [
        check("email", "Please include a valid email").isEmail(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let { email } = req.body;
        email = email.toLowerCase();
        try {
            let user = await User.findOne({ email });

            if (user) {
                return res
                    .status(200)
                    .json({ status: 1 });
            } else {
                return res
                    .status(200)
                    .json({ status: 2 });
            }
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ error: err.message });
        }

    }
);

//@route    POST api/users
//@desc     Exist user
//@access   Public
router.post(
    "/emailConfirme",
    [
        check("email", "Please include a valid email").isEmail(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let { email } = req.body;
        email = email.toLowerCase();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "larbibenyakhou.info@gmail.com",
                pass:  process.env.passmail
            }
        });

        let result = '';
        for (let i = 0; i < 6; i++) {
            const digit = Math.floor(Math.random() * 10); // Generate a random digit (0-9)
            result += digit;
        }
        const mailOptions = {
            from: "larbibenyakhou.info@gmail.com",
            to: email,
            subject: "Nodemailer Test",
            html: `your code is ${result}`
        }

        try {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error)
                    res.status(500).json(error);
                } else {
                    const payload = {
                        code: {
                            result: result,
                        },
                    };

                    jwt.sign(
                        payload,
                        process.env.jwtSecret,
                        (err, code) => {
                            if (err) throw err;
                            res.json({ code });
                        }
                    );
                }
            })
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ error: err.message });
        }

    }
);

module.exports = router;
