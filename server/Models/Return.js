const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const returnSchema = new mongoose.Schema({
  returnId: {
    type: Number,
    unique: true
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Reference to the user schema
  },
  bookID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Book' // Reference to the book schema
  },
  returnDate: {
    type: Date,
    required: true,
    default: Date.now // Automatically set to the current date if not provided
  },
  
});

// Apply the auto-incrementing plugin to the issue schema
returnSchema.plugin(AutoIncrement, { inc_field: 'returnId' });

module.exports = mongoose.model('Return', returnSchema);
