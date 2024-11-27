const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const receiptSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userEmail:{type:String,required:true},
  bookName: { type: String, required: true },
  authorName: { type: String, required: true },
  price:{type: Number,required:true},
  receiptNo: { 
    type: Number, 
    unique: true 
  },
  issueDate: { type: Date, required: true },
  returnDate: { type: Date },
});

// Apply the auto-increment plugin to the receiptSchema
receiptSchema.plugin(autoIncrement, {
  inc_field: 'receiptNo',   // Field name to be auto-incremented
  start_seq: 1              // Start sequence from 1
});

module.exports = mongoose.model('Receipt', receiptSchema);
