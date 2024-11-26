const express = require('express');
const { getUserReceipts,getReceipt } = require('../Controllers/ReceiptController');

const router = express.Router();

// Get receipts for a user
router.get('/:userEmail', getUserReceipts);
router.get('/receipt/:receiptNo', getReceipt);

module.exports = router;
