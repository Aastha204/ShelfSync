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
exports.addIssuedBook = async (req, res) => {
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

    const issueDate = existingIssue ? existingIssue.issueDate : new Date(); // Default to current date if no existing issue

    // Calculate the returnDate (one month after the issueDate)
    const returnDate = new Date(issueDate); // Create a copy of the issueDate
    returnDate.setMonth(issueDate.getMonth() + 1);

    const receipt = new Receipt({
      userName: user.name,  // Assuming userName is same as userEmail for now, you may want to pull it from a user model
      userEmail:user.email,
      bookName: book.name,
      authorName: book.author,
      price: book.ratePerMonth,
      issueDate: issueDate,  // Default to current date if no existing issue
      returnDate: returnDate,  // Default to null if no existing issue
    });

    // Save receipt
    await receipt.save();

    // Create the issue if no previous record exists
    const newIssue = new Issue({
      userID: user._id,
      bookID,
      receiptNo: receipt._id, // Store the receiptNo in the Issue document
      issueDate,
      returnDate,
    });

    await newIssue.save();
    res.json({ message: 'Book issued successfully',receiptNo: receipt.receiptNo  });
  } catch (error) {
    console.error('Error issuing book:', error);
    res.status(500).json({ error: 'Failed to issue book' });
  }
};


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

  exports.getBookToAdmin = async (req, res) => {
    const { status } = req.query; // Get the status query parameter
    try {
      let adminIssues;
  
      if (status === "issued") {
        // Fetch only issued books
        adminIssues = await Issue.find({ returned: false })
          .populate("userID", "name email")
          .populate("bookID", "name author");
      } else if (status === "returned") {
        // Fetch only returned books
        adminIssues = await Issue.find({ returned: true })
          .populate("userID", "name email")
          .populate("bookID", "name author")
          .select("userID bookID returnDate issueDate");
      } else if (status === "due") {
        const today = new Date();
        adminIssues = await Issue.find({
          returned: false,
          dueDate: { $lt: today },
        })
          .populate("userID", "name email")
          .populate("bookID", "name author");
  
        // Add overdue days and fine calculation
        adminIssues = adminIssues.map((issue) => {
          const overdueDays = Math.ceil(
            (today - new Date(issue.dueDate)) / (1000 * 60 * 60 * 24)
          );
          const finePerDay = 5; // Fine amount per overdue day
          const fine = overdueDays * finePerDay;
  
          return {
            ...issue.toObject(),
            overdueDays,
            fine,
          };
        });
      }
  
      res.json(adminIssues || []);
    } catch (error) {
      console.error("Error fetching admin issues:", error);
      res.status(500).json({ error: "Failed to fetch admin issues" });
    }
  };
  
  
  

  // exports.returnBook = async (req, res) => {
  //   try {
  //     const { issueId } = req.params;
  
  //     // Find the issued book record by its ID and populate userID and bookID
  //     const issue = await Issue.findById(issueId).populate('bookID').populate('userID');
  //     if (!issue) {
  //       return res.status(404).json({ error: 'Issue record not found' });
  //     }
      
  
  //     // Check if the book has already been returned
  //     if (issue.returned) {
  //       return res.status(400).json({ error: 'Book is already returned' });
  //     }
  
  //     // Create a return record
  //     const returnedBook = new Return({
  //       userID: issue.userID._id, // UserID should be a reference to the User model
  //       bookID: issue.bookID._id, // BookID should be a reference to the Book model
  //       returnDate: new Date(), // Current date as return date
  //     });
  //     issue.returned = true;  
  //     await Promise.all([issue.save(), returnedBook.save()]);
  
  //     // Increment the available count in the Book model
  //     const book = await Book.findById(issue.bookID._id);
  //     if (book) {
  //       book.available += 1; // Increment available count
  //       await book.save(); // Save updated book
  //     }
      
  //     res.json({ message: 'Book returned successfully', returnedBook });
  //   } catch (error) {
  //     console.error('Error returning book:', error);
  //     res.status(500).json({ error: 'Failed to return book' });

  //   }
  // }

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
      userID: issue.userID._id,
      bookID: issue.bookID._id,
      returnDate: new Date(),
    });
    issue.returned = true;
    await Promise.all([issue.save(), returnedBook.save()]);

    // Increment the available count in the Book model
    const book = await Book.findById(issue.bookID._id);
    if (book) {
      book.available += 1;
      await book.save();
    }

    // Construct optional receipt data
    const receiptData = {
      userName: issue.userID.name || 'Unknown User',
      bookName: issue.bookID.name || 'Unknown Book',
      returnDate: new Date().toLocaleDateString(),
    };

    res.json({ message: 'Book returned successfully', returnedBook, receiptData });
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


exports.getDueBooks = async (req, res) => {
  try {
    const currentDate = new Date();

    // Find all unreturned books with a due date in the past
    const dueBooks = await Issue.find({
      returned: false, // Book is not yet returned
      dueDate: { $lt: currentDate }, // Past due date
    }).populate('userID', 'name email') // Populate user details
      .populate('bookID', 'title author'); // Populate book details

    // Fine calculation logic
    const finePerDay = 5; // Customize the fine amount per day
    const booksWithFine = dueBooks.map((book) => {
      const overdueDays = Math.ceil((currentDate - book.dueDate) / (1000 * 60 * 60 * 24)); // Calculate overdue days
      const fine = overdueDays * finePerDay;

      return {
        issueId: book.issueId,
        user: book.userID,
        book: book.bookID,
        issueDate: book.issueDate,
        dueDate: book.dueDate,
        overdueDays,
        fine,
      };
    });

    res.status(200).json({ success: true, data: booksWithFine });
  } catch (error) {
    console.error('Error fetching due books:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch due books.' });
  }
};

