const express = require('express');
const { getUserReceipts } = require('../Controllers/ReceiptController');

const router = express.Router();

// Get receipts for a user
router.get('/:userEmail', getUserReceipts);

module.exports = router;
