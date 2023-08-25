const express = require('express');
const router = express.Router();
const feedbacks = require('../models/feedbackSchema');

// 1
// ***********************************************************************
//API TO GET ALL FEEDBACK RECORD
router.get('/', async (req, res) => {
    try {
        const feedback = await feedbacks.find(); 
        res.send(feedback);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});
// ***********************************************************************

// 2
// ***********************************************************************
//API TO PUSH THE FEEDBACK TO THE DATABASE
router.post('/', (req, res) => {

    const FeedBack = new feedbacks({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    });

    try {
        
        const addFeedback = FeedBack.save();
        res.status(201).json(addFeedback);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})
// ***********************************************************************
  
  

module.exports=router;