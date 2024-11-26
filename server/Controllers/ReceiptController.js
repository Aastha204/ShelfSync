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

const getReceipt = async (req, res) => {
  const { receiptNo } = req.params;
  console.log('Fetching receipt for receiptNo:', receiptNo);
  try {
    const receipt = await Receipt.findById(receiptNo );
   
    if (!receipt) {
      return res.status(404).json({ error: 'Receipt not found' });
    }
    res.status(200).json(receipt);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch receipt' });
  }
};

module.exports = { getUserReceipts,getReceipt };


