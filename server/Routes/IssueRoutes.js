const express = require('express');
const router = express.Router();
const issueController = require('../Controllers/issueController');

// Issue a book
router.post('/add',issueController.addIssuedBook);

router.get('/getBook/:userId',issueController.getBookToUser);

router.get('/getBooks',issueController.getBookToAdmin);

router.put('/return/:issueId', issueController.returnBook);

router.get('/bestsellers', issueController.getBestSellers);


module.exports = router;
