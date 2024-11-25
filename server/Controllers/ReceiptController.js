const express=require('express');
const Receipt = require('../Models/Receipt');

// Fetch all receipts for a user
const getUserReceipts = async (req, res) => {
  const { userEmail } = req.params;

  try {
    const receipts = await Receipt.find({ userEmail: userEmail }).populate('receiptNo');
    res.status(200).json(receipts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch receipts' });
  }
};

module.exports = { getUserReceipts };
