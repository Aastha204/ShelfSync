const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const bookSchema = new mongoose.Schema({
  bookId: {
    type: Number,
    unique: true
  },
  name: { 
    type: String, 
    required: true, 
    unique: true 
  },
  author: { 
    type: String, 
    required: true 
  },
  available: { 
    type: Number, 
    required: true 
  },
  ratePerMonth: { 
    type: Number, 
    required: true 
  },
  bookCoverImageUrl: { 
    type: String 
  }, // URL for the book cover image
  genre: { 
    type: String 
  }, // Genre of the book
  Language: { 
    type: String 
  }, // Genre of the book
  star: { 
    type: Number, 
    min: 0, 
    max: 5 
  } // Star rating from 0 to 5
});

// Apply the auto-incrementing plugin to the book schema
bookSchema.plugin(AutoIncrement, { inc_field: 'bookId' });

module.exports = mongoose.model('Book', bookSchema);
