const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
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
    comment: {
        type: String,
        default:' ',
        trim: true
    },
    rating: {
        type: Number,
        required:true,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Review= mongoose.model('Review', reviewSchema);

module.exports = Review;
