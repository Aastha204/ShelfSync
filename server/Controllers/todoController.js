const TodoModel = require("../models/Todo");

// Get all todos
const getTodos = (req, res) => {
  TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
};

// Add a new todo
const addTodo = (req, res) => {
  const { task, description } = req.body; // Get description from the request body
  if (!task || !description) {
    return res.status(400).json({ error: "Task and description are required." });
  }
  TodoModel.create({ task, description })
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
// Temporarily store deleted tasks for undo
let recentlyDeletedTask = null;

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the task before deleting it
    const taskToDelete = await Todo.findById(id);
    if (!taskToDelete) {
      return res.status(404).send({ message: "Task not found" });
    }

    // Temporarily save the deleted task for undo
    recentlyDeletedTask = taskToDelete;

    // Perform deletion
    await Todo.findByIdAndDelete(id);

    res.status(200).send({ message: "Task deleted successfully", task: taskToDelete });
  } catch (error) {
    res.status(500).send({ message: "Error deleting task", error });
  }
};



module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
 
};
