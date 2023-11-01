const express = require('express');
const router = express.Router();

const { check, validationResult } = require("express-validator");
const Event = require("../../models/Event");
require('dotenv').config();



//@route    POST api/event
//@desc     Create a event
//@access   Private
router.post('/', [[
        check("title", "text is required").not().isEmpty(),
        check("description", "text is required").not().isEmpty(),
        check("image", "text is required").not().isEmpty(),
    ]
], async (req, res) => {
    const errors = validationResult(req);//if there is error for checking it will store errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    try {

        const newEvent = new Event({
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            categorie: req.body.categorie
        })
        const event = await newEvent.save();
        res.json(event);
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server Error');
    }

});

//@route    GET api/event/cat
//@desc     Get all events
//@access   Public
router.get('/cat/:categorie',async (req, res) => {
    
    try {
        const {categorie} = req.params;
        if(!categorie){
            return res.status(400).send('categorie not found');
        }
        let events;
        if(categorie === "All"){
            events = await Event.find().sort({ date: -1 });
        }else{
        events = await Event.find({ categorie: categorie }).sort({ date: -1 });
        }
        return res.status(200).json(events);
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server Error');
    }
});


//@route    GET api/event/
//@desc     Get event
//@access   Public
router.get('/:id_event',async (req, res) => {
    
    try {
        const event = await Event.findById(req.params.id_event);

        if (!event) {
            return res.status(404).json({ msg: 'event not found' });
        }
        res.json(event);
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server Error');
    }
});


    

module.exports = router;