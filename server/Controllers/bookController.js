const Book = require('../Models/Book');
const path = require('path');

// Add a new book
const addBook = async (req, res) => {
  try {
    const { name, author, available, ratePerMonth } = req.body;
    const image = req.file ? req.file.filename : ''; // Handle image upload

    const newBook = new Book({ name, author, available, ratePerMonth, image });
    await newBook.save();
    res.status(201).json({ message: 'Book added successfully', success: true });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};

// Get all books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};

// Update a book
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, author, available, ratePerMonth } = req.body;
    const image = req.file ? req.file.filename : ''; // Handle image update

    const updatedBook = await Book.findByIdAndUpdate(id, { name, author, available, ratePerMonth, image }, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found', success: false });
    }

    res.status(200).json({ message: 'Book updated successfully', success: true, book: updatedBook });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found', success: false });
    }

    res.status(200).json({ message: 'Book deleted successfully', success: true });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};

module.exports = {
  addBook,
  getBooks,
  updateBook,
  deleteBook,
};
