const express = require('express');
const router = express.Router();
const {
  getTotalIssued,
  getTotalReturn,
  getCurrentIssued,
  getDueBooks
} = require('../Controllers/bookTrackerController');

// Route to fetch total issued books
router.get('/totalIssued/:userId', getTotalIssued);

// Route to fetch total returned books
router.get('/totalReturn/:userId', getTotalReturn);

// Route to fetch current issued books
router.get('/currentIssued/:userId', getCurrentIssued);

router.get('/duebooks/:userId', getDueBooks);

module.exports = router;
