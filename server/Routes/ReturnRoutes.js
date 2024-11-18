const express = require('express');
const router = express.Router();
const { getBookToUser } = require('../Controllers/ReturnController');

// Route to fetch all returned books
router.get('/returned/:userId', getBookToUser);

module.exports = router;