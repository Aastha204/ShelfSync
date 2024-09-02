const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  name: String,
  author: String,
  ratePerMonth: Number,
  available: {
    type: Boolean,
    default: true
  }
});

const BookModel = mongoose.model("Book", BookSchema);

module.exports = BookModel;
