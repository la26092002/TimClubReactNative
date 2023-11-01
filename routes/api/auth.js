const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const auth = require('../../middleware/auth')
const jwt = require("jsonwebtoken");
require('dotenv').config();
//const config = require("config");

const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

//@route    POST api/auth
//@desc     Test route
//@access   Public
router.post(
    "/",
    [
        check("email", "Please include a valid email").isEmail(),
        check("password", "Password is required").exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });

            if (!user) {
                return res
                    .status(402)
                    .json({ errors: [{ msg: "Invalid Credentials 1" }] });
            }

           const isMatch = await bcrypt.compare(password,user.password)
           if(!isMatch){
            return res.status(403).json({errors: [{msg: 'Invalid Credentials 2'}]})
           }

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
            res.status(500).send("Server error");
        }

    }
);



//@route    Get api/auth
//@desc     Test route
//@access   Public
router.get('/', auth, async (req, res) =>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});



router.get('/m', auth, async (req, res) =>{
    try {
        
        res.json("hello world")
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});


module.exports = router;