// Routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const Contact = require('../Models/Contact');

// Endpoint to post new contact messages
router.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newContact = new Contact({
            sender_name: name,
            sender_email: email,
            message,
        });
        await newContact.save();
        res.status(201).json({ message: 'Contact saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save contact message' });
    }
});

// Endpoint to retrieve all contact messages, sorted by the latest first
router.get('/contact/messages', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve contact messages' });
    }
});
// Add this route to update status in contactRoutes.js
router.put('/contact/messages/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await Contact.findByIdAndUpdate(id, { status });
      res.status(200).send('Status updated');
    } catch (error) {
      res.status(500).json({ error: 'Error updating status' });
    }
  });
  

module.exports = router;
