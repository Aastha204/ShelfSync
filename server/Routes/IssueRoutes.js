const express = require('express');
const router = express.Router();
const Issue = require('../Models/Issue');
const Book = require('../Models/Book');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

// POST route to issue a book
router.post('/issue', async (req, res) => {
  const { userEmail, bookID } = req.body;

  try {
    // Find the user's ObjectId by their email
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the book is already issued by this user
    const existingIssue = await Issue.findOne({ userID: user._id, bookID });
    if (existingIssue) {
      return res.status(400).json({ error: 'Book already issued by you' });
    }

    // Decrease the available count by 1 if the book is available
    const book = await Book.findById(bookID);
    if (!book || book.available <= 0) {
      return res.status(400).json({ error: 'Book is not available for issue' });
    }

    book.available -= 1; // Reduce available count
    await book.save(); // Save the updated book

    // Create the issue if no previous record exists
    const newIssue = new Issue({
      userID: user._id,
      bookID,
    });

    await newIssue.save();
    res.json({ message: 'Book issued successfully' });
  } catch (error) {
    console.error('Error issuing book:', error);
    res.status(500).json({ error: 'Failed to issue book' });
  }
});

module.exports = router;
