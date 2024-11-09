// controllers/bookController.js
const Book = require('../Models/Book');

// Add Book
exports.addBook = async (req, res) => {
  try {
    const { name, author, available, ratePerMonth, bookCoverImageUrl, genre,Language, star } = req.body;
    const existingBook = await Book.findOne({ name });
    if (existingBook) {
      return res.status(400).json({ message: 'Book already exists' });
    }

    const book = new Book({ name, author, available, ratePerMonth, bookCoverImageUrl, genre,Language, star });
    await book.save();
    res.status(201).json({ message: 'Book added successfully', book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding book', error });
  }
};

// Delete Book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error });
  }
};

// Update Book
exports.updateBook = async (req, res) => {
  try {
    const { name, author, available, ratePerMonth, bookCoverImageUrl, genre,Language, star } = req.body;
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { name, author, available, ratePerMonth, bookCoverImageUrl, genre,Language, star },
      { new: true }
    );
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book updated successfully', book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating book', error });
  }
};

// Get All Books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
};
