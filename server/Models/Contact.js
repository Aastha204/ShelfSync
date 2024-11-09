const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    sender_name: {
        type: String,
        required: true,
        trim: true
    },
    sender_email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        default: "Respond",
        trim: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
