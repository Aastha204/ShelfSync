// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const bookController = require('../Controllers/bookController');

// Add Book
router.post('/add', bookController.addBook);

// Delete Book
router.delete('/delete/:id', bookController.deleteBook);

// Update Book
router.put('/update/:id', bookController.updateBook);

// Get All Books
router.get('/', bookController.getBooks);

router.get('/search', bookController.searchBooks);

router.put('/restock/:id', bookController.bookrestock);

  

module.exports = router;
