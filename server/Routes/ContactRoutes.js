// Routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const Contact = require('../Models/Contact');

router.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newContact = new Contact({
            sender_name: name,
            sender_email: email,
            message,
        });
        await newContact.save();
        res.status(201).json({ message: 'Message received successfully!' });
    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).json({ error: 'Failed to save the message. Please try again later.' });
    }
});

module.exports = router;
