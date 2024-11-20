const express=require('express');
const router=express.Router();
const Issue=require('../Models/Issue');
const Return=require('../Models/Return');

exports.getTotalIssued = async (req, res) => {
    try {
      const { userId } = req.params;
      const userIssues = await Issue.find({ userID: userId })
        .populate('bookID', 'name author genre available'); // Populate book details
  
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
      const userIssues = await Issue.find({ userID: userId, returned: false })
        .populate('bookID', 'name author genre available'); // Populate book details
  
      res.json(userIssues);
    } catch (error) {
      console.error('Error fetching current issued books:', error);
      res.status(500).json({ error: 'Failed to fetch current issued books' });
    }
  };