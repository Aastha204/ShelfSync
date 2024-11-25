// models/Statistics.js
const mongoose = require('mongoose');

const statisticsSchema = new mongoose.Schema({
  totalUsers: { type: Number, default: 0 },
  totalBooks: { type: Number, default: 0 },
  totalIssuedBooks: { type: Number, default: 0 },
  totalReturnedBooks: { type: Number, default: 0 },
  booksIssuedByMonth: { type: Map, of: Number },
  booksReturnedByMonth:{type:Map,of:Number},
  lastUpdated: { type: Date, default: Date.now },
});

const Statistics = mongoose.model('Statistics', statisticsSchema);
module.exports = Statistics;
