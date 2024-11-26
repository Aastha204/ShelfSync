const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const issueSchema = new mongoose.Schema({
  issueId: {
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
  receiptNo: { type: mongoose.Schema.Types.ObjectId, ref: "Receipt" },
  issueDate: {
    type: Date,
    required: true,
    default: Date.now // Automatically set to the current date if not provided
  },
  dueDate: {
    type: Date,
    required: true,
    default: function() {
      const issueDate = this.issueDate || Date.now();
      return new Date(issueDate.getTime() + 30 * 24 * 60 * 60 * 1000); // Add 30 days in milliseconds
    }
  },
  returned: {
    type: Boolean,
    default: false, // Default to false when the book is issued
  },
});

// Apply the auto-incrementing plugin to the issue schema
issueSchema.plugin(AutoIncrement, { inc_field: 'issueId' });

module.exports = mongoose.model('Issue', issueSchema);
