const mongoose = require('mongoose');

const returnSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
    ref: 'users', // Reference to the user schema
  },
  bookTitle: {
    type: String,
    required: true,
    ref: 'Book', // Reference to the book schema
  },
  bookAuthor: {
    type: String,
    required: true,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
    required: true,
    default: Date.now, // Automatically set the current date if not provided
  },
  fineAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Returned', 'Late'], // Can be 'Pending', 'Returned', or 'Late'
    default: 'Pending', // Default status is Pending until it's returned or late
  }
});

module.exports = mongoose.model('Return', returnSchema);
