const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  description: { type: String, required: true }, // Added description field
  done: { type: Boolean, default: false },      // For marking tasks as complete
});

module.exports = mongoose.model('Todo', TodoSchema);
