// routes/statistics.js
const express = require('express');
const { getStatistics } = require('../Controllers/statisticsController');
const { updateStatistics } = require('../Controllers/statisticsController');
const router = express.Router();

// Route to get statistics
router.get('/', getStatistics);

// Route to update statistics (e.g., on a scheduled basis)
router.get('/update', async (req, res) => {
  try {
    await updateStatistics();
    res.json({ message: 'Statistics updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating statistics', error: err });
  }
});

module.exports = router;
