const express = require('express');
const router = express.Router();
const Issue = require('../Models/Issue');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

// Middleware to authenticate the token (optional)
// const authenticate = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) {
//     return res.status(401).json({ error: 'No token provided' });
//   }
//   try {
//     const decoded = jwt.verify(token, 'secret-123'); // Use your secret key here
//     req.email = decoded.email; // Assuming the decoded token contains email
//     next();
//   } catch (error) {
//     return res.status(403).json({ error: 'Invalid token' });
//   }
// };

// POST route to issue a book
router.post('/issue', async (req, res) => {
  const { userEmail, bookID } = req.body;

  try {
    // Find the user's ObjectId by their email
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create the issue with the user's ObjectId
    const newIssue = new Issue({
      userID: user._id, // Updated to use userId instead of userEmail
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
