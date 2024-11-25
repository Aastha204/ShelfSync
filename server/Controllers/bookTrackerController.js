const express=require('express');
const router=express.Router();
const Issue=require('../Models/Issue');
const Return=require('../Models/Return');

exports.getTotalIssued = async (req, res) => {
    try {
      const { userId } = req.params;
      const userIssues = await Issue.find({ userID: userId })
        .populate('bookID', 'name author genre available').lean(); // Populate book details
  
      res.json(userIssues);
    } catch (error) {
      console.error('Error fetching total issued books:', error);
      res.status(500).json({ error: 'Failed to fetch total issued books' });
    }
  };
  
  // Fetch total returned books
  exports.getTotalReturn = async (req, res) => {
    try {
      const { userId } = req.params;
      const userReturn = await Return.find({ userID: userId })
        .populate('bookID', 'name author genre available')
        .lean(); // Populate book details
  
      res.json(userReturn);
    } catch (error) {
      console.error('Error fetching returned books:', error);
      res.status(500).json({ error: 'Failed to fetch returned books' });
    }
  };
  
  // Fetch current issued books
  exports.getCurrentIssued = async (req, res) => {
    try {
      const { userId } = req.params;
      // Ensuring that the returned field is explicitly false
      const userIssues = await Issue.find({ 
        userID: userId, 
        returned: false  // This should correctly filter books that are not returned
      })
        .populate('bookID', 'name author genre available').lean();  // Populate book details
  
      res.json(userIssues);
    } catch (error) {
      console.error('Error fetching current issued books:', error);
      res.status(500).json({ error: 'Failed to fetch current issued books' });
    }
  };

  // Controller to fetch due books
  exports.getDueBooks = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const currentDate = new Date();
  
      const dueBooks = await Issue.find({
        userID: userId,
        dueDate: { $lt: currentDate },
        returned: false,
      }).populate('bookID', 'name author genre available');
    
  
      // Prepare the response data
      const result = dueBooks.map((issue) => ({
        bookID: issue.bookID?._id || "N/A",
        name: issue.bookID?.name || "N/A",  // Keep 'name' as 'name'
        author: issue.bookID?.author || "N/A", // Keep 'author' as 'author'
        dueDate: issue.dueDate,        // Due date
        overdueDays: Math.ceil((currentDate - new Date(issue.dueDate)) / (1000 * 60 * 60 * 24)),
        fine: Math.ceil((currentDate - new Date(issue.dueDate)) / (1000 * 60 * 60 * 24)) * 5, // Fine calculation
      }));
      console.log(result);
  
      res.json(result);
    } catch (error) {
      console.error('Error fetching due books:', error);
      res.status(500).json({ error: 'Failed to fetch due books' });
    }
  };
  