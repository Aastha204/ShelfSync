const express = require('express');
const router = express.Router();
const Issue = require('../Models/Issue');
const Book = require('../Models/Book');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const Return = require('../Models/Return');
const Receipt = require('../Models/Receipt');
const issue=require('../Models/Issue')


// POST route to issue a book
exports.addIssuedBook=async (req, res) => {
    const { userEmail, bookID } = req.body;
  
    try {
      // Find the user's ObjectId by their email
      const user = await User.findOne({ email: userEmail });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if the book is already issued by this user
      const existingIssue = await Issue.findOne({ userID: user._id, bookID, returned: false });
      if (existingIssue) {
      return res.status(400).json({ error: 'Book already issued by you and not yet returned' });
    }
  
      // Decrease the available count by 1 if the book is available
      const book = await Book.findById(bookID);
      if (!book || book.available <= 0) {
        return res.status(400).json({ error: 'Book is not available for issue' });
      }
  
      book.available -= 1; // Reduce available count
  
      book.issuedTo = {
        name: user.name,
        email: user.email,
      };
      await book.save(); // Save the updated book

    //   const receiptData = new Receipt({
    //     receiptNo: issue._id.toString(),
    //     borrowerName: issue.userID.name,
    //     bookName: issue.bookID.name,
    //     authorName: issue.bookID.author,
    //     issueDate: issue.issueDate,
    //     returnDate: new Date(),
      
    // });
    
    // await receiptData.save();
  
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
  }

  exports.getBookToUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const userIssues = await Issue.find({ userID: userId, returned: false }) // Filter by `returned: false`
        .populate('bookID', 'name author genre available'); // Populate book details
  
      res.json(userIssues);
    } catch (error) {
      console.error('Error fetching user issues:', error);
      res.status(500).json({ error: 'Failed to fetch user issues' });
    }
  };


  
  // GET route to fetch all issued books (for admin)

  // exports.getBookToAdmin= async (req, res) => {
  //   try {
  //     const adminIssues = await Issue.find().populate('userID', 'name email') // Populate user details
  //       .populate('bookID', 'name author type available'); // Populate book details
  //     res.json(adminIssues);
  //   } catch (error) {
  //     console.error('Error fetching admin issues:', error);
  //     res.status(500).json({ error: 'Failed to fetch admin issues' });
  //   }
  // }

  exports.getBookToAdmin = async (req, res) => {
    const { status } = req.query; // Get the status query parameter
    try {
        let adminIssues;

        if (status === 'issued') {
            // Fetch only issued books
            adminIssues = await Issue.find({ returned: false })
                .populate('userID', 'name email') // Populate user details
                .populate('bookID', 'name author genre available'); // Populate book details
        } else if (status === 'returned') {
            // Fetch only returned books
            adminIssues = await Return.find()
                .populate('userID', 'name email') // Populate user details
                .populate('bookID', 'name author genre available') // Populate book details
                .select('userID bookID returnDate');
        } 

        res.json(adminIssues);
    } catch (error) {
        console.error('Error fetching admin issues:', error);
        res.status(500).json({ error: 'Failed to fetch admin issues' });
    }
};

  

  exports.returnBook = async (req, res) => {
    try {
      const { issueId } = req.params;
  
      // Find the issued book record by its ID and populate userID and bookID
      const issue = await Issue.findById(issueId).populate('bookID').populate('userID');
      if (!issue) {
        return res.status(404).json({ error: 'Issue record not found' });
      }
      
  
      // Check if the book has already been returned
      if (issue.returned) {
        return res.status(400).json({ error: 'Book is already returned' });
      }
  
      // Create a return record
      const returnedBook = new Return({
        userID: issue.userID._id, // UserID should be a reference to the User model
        bookID: issue.bookID._id, // BookID should be a reference to the Book model
        returnDate: new Date(), // Current date as return date
      });
      issue.returned = true;  
      await Promise.all([issue.save(), returnedBook.save()]);
  
      // Increment the available count in the Book model
      const book = await Book.findById(issue.bookID._id);
      if (book) {
        book.available += 1; // Increment available count
        await book.save(); // Save updated book
      }
      
      res.json({ message: 'Book returned successfully', returnedBook,receiptData });
    } catch (error) {
      console.error('Error returning book:', error);
      res.status(500).json({ error: 'Failed to return book' });
    }
  };
  // Add this to your issueController.js

exports.getBestSellers = async (req, res) => {
  try {
    // Aggregate books based on issue count
    const bestSellers = await Issue.aggregate([
      { $group: { _id: '$bookID', issueCount: { $sum: 1 } } }, // Group by bookID and count issues
      { $match: { issueCount: { $gte: 3 } } }, // Filter books with issue count >= 3
    ]);

    // Populate book details
    const bookIds = bestSellers.map((entry) => entry._id);
    const books = await Book.find({ _id: { $in: bookIds } });

    res.json(books);
  } catch (error) {
    console.error('Error fetching bestsellers:', error);
    res.status(500).json({ error: 'Failed to fetch bestsellers' });
  }
};

  