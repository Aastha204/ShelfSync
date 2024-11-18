const Book = require('../Models/Book'); // Assuming Book is the schema for books
const Issue = require('../Models/Issue'); // Assuming Issue is the schema for issued books
const Return = require('../Models/Return');

const getDashboardData = async (req, res) => {
    try {
      // Fetch total books
      const books = await Book.find();
    const totalBooks = books.reduce((sum, book) => sum + (book.available || 0), 0);
    console.log(totalBooks);
  
      // Fetch books issued
      const booksIssued = await Issue.countDocuments();
  
      // Calculate books left
      const booksLeft = totalBooks - booksIssued;
  
      // You can also fetch books returned if applicable
      const booksReturned = await Return.countDocuments(); // Assuming "returned" field exists
  
      // Send the aggregated data to the frontend
      res.json({
        totalBooks,
        booksIssued,
        booksReturned,
        booksLeft,
      });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching dashboard data', error: err });
    }
  };
  
  module.exports = {
    getDashboardData,
  };