const Review = require("../Models/Review"); // Import the review schema

// Controller to handle adding a review
const addReview = async (req, res) => {
  try {
    const { sender_name, sender_email, comment, rating } = req.body;

    if (!sender_email || !sender_name) {
      return res.status(400).json({ message: "User details missing" });
    }

    if (!rating) {
      return res.status(400).json({ message: "Rating is required" });
    }

    const newReview = new Review({
      sender_name,
      sender_email,
      comment,
      rating,
    });

    await newReview.save();

    res.status(201).json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    res.status(500).json({ message: "Error adding review", error: error.message });
  }
};

const getAllReviews = async (req, res) => {
    try {
      const reviews = await Review.find().sort({ created_at: -1 }); // Sort by newest first
      res.status(200).json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Error fetching reviews", error: error.message });
    }
  };

module.exports = {
  addReview,getAllReviews
};
