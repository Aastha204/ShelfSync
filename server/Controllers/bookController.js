// controllers/bookController.js
const Book = require('../Models/Book');

// Add Book
exports.addBook = async (req, res) => {
  try {
    const { name, author,description, available, ratePerMonth, bookCoverImageUrl, genre,Language, star } = req.body;
    const existingBook = await Book.findOne({ name });
    if (existingBook) {
      return res.status(400).json({ message: 'Book already exists' });
    }

    const book = new Book({ name, author,description, available, ratePerMonth, bookCoverImageUrl, genre,Language, star });
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
    const { name, author,description, available, ratePerMonth, bookCoverImageUrl, genre,Language, star } = req.body;
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { name, author,description, available, ratePerMonth, bookCoverImageUrl, genre,Language, star },
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

// Get Book By ID
exports.getBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ message: 'Error fetching book' });
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

exports.bookrestock = async (req, res) => {
  const { id } = req.params;
  const { available } = req.body;

  console.log("Restock request received:", { id, available });

  if (!available || available <= 0) {
    return res.status(400).json({ message: "Invalid restock count" });
  }

  try {
    const book = await Book.findByIdAndUpdate(
      id,
      { $inc: { available } },
      { new: true }
    );
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json({ available: book.available });
  } catch (error) {
    console.error("Error during restocking:", error);
    res.status(500).json({ message: "Error updating book availability" });
  }
};


// Search Books
exports.searchBooks = async (req, res) => {
  try {
    const { name, author } = req.query; // Extract query parameters
    const criteria = {};

    if (name) criteria.name = new RegExp(`^${name}`, 'i'); // Match strings starting with 'name'
    if (author) criteria.author = new RegExp(`^${author}`, 'i'); // Match strings starting with 'author'

    const books = await Book.find(criteria);
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ message: 'Error fetching search results', error });
  }
};
