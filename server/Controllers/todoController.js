const TodoModel = require("../models/Todo");

// Get all todos
const getTodos = (req, res) => {
  TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
};

// Add a new todo
const addTodo = (req, res) => {
  const { task } = req.body;
  TodoModel.create({ task })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
};

// Update a todo
const updateTodo = (req, res) => {
  const { id } = req.params;
  TodoModel.findOneAndUpdate({ _id: id }, { done: true }, { new: true })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
};

// Delete a todo
const deleteTodo = (req, res) => {
  const { id } = req.params;
  TodoModel.findOneAndDelete({ _id: id })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
};

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};
