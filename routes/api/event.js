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


//@route    POST api/event/
//@desc     Add subscribe to Event
//@access   Private
router.get('/Subscribe/:id_event',
    [
        auth
    ], async (req, res) => {

        try {
            const event = await Event.findById(req.params.id_event);

            if (!event) {
                return res.status(404).json({ msg: 'event not found' });
            }
            //req.user.id
            const user = req.user.id;

            console.log(event.subscribe.length)
            for (let i = 0; i < event.subscribe.length; i++) {
                console.log(event.subscribe[i]._id)
                if (event.subscribe[i]._id == user) {
                    return res.status(200).json({
                        msg: 'the user is joined',
                        status: true
                    });
                }
            }
            //unshift() the same like push


            res.json({
                msg: 'the user is not joined',
                status: false
            });
        } catch (err) {
            console.error(err.message)
            res.status(500).send('server Error');
        }
    });


//@route    POST api/event/
//@desc     Add subscribe to Event
//@access   Private
router.post('/AddSubscribe/:id_event',
    [
        auth
    ], async (req, res) => {

        try {
            const event = await Event.findById(req.params.id_event);

            if (!event) {
                return res.status(404).json({ msg: 'event not found' });
            }
            //req.user.id
            const user = req.user.id;

            console.log(event.subscribe.length)
            for (let i = 0; i < event.subscribe.length; i++) {
                console.log(event.subscribe[i]._id)
                if (event.subscribe[i]._id == user) {
                    return res.status(200).json({ msg: 'the user is joined' });
                }
            }
            //unshift() the same like push
            event.subscribe.unshift(user);
            await event.save();

            res.json(event);
        } catch (err) {
            console.error(err.message)
            res.status(500).send('server Error');
        }
    });




//@route    POST api/event/
//@desc     Add subscribe to Event
//@access   Private
router.delete('/RemoveSubscribe/:id_event',
    [
        auth
    ], async (req, res) => {
        try {
            const event = await Event.findById(req.params.id_event);
            if (!event) {
                return res.status(404).json({ msg: 'event not found' });
            }
            //req.user.id
            const user = req.user.id;
            console.log(event.subscribe.length)
            
            let j=0;
            for (let i = 0; i < event.subscribe.length; i++) {
                console.log(event.subscribe[i]._id)
                if (event.subscribe[i].id === user) {
                    j++;
                }
            }

            if(j===0){
                return res.status(200).json({ msg: 'the user is not joined' });
            }
            const removeIndex = event.subscribe
                .map((item) => item.id)
                .indexOf(user);
            console.log(removeIndex)

            event.subscribe.splice(removeIndex, 1);

            await event.save();

            res.status(200).json(event);
        } catch (err) {
            console.error(err.message)
            res.status(500).send('server Error');
        }
    });

    

module.exports = router;
