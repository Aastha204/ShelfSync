const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { addBook, getBooks, updateBook, deleteBook } = require('../Controllers/bookController');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Routes
router.post('/add', upload.single('image'), addBook); // Upload image
router.get('/', getBooks);
router.put('/update/:id', upload.single('image'), updateBook); // Upload image
router.delete('/delete/:id', deleteBook);

module.exports = router;
