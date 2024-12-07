const express = require("express");
const { addReview,getAllReviews } = require("../Controllers/ReviewController");

const router = express.Router();

// Route to add a review
router.post("/add", addReview);
router.get("/all",getAllReviews);

module.exports = router;
