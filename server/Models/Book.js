// models/bookModel.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  available: { type: Boolean, required: true },
  ratePerMonth: { type: Number, required: true },
});

module.exports = mongoose.model('Book', bookSchema);
