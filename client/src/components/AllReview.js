import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AllReview.css"; // CSS for styling the review cards

function ReviewList() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/reviews/all");
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="review-list">
      <h2>Reviews</h2>
      <div className="review-cards">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="review-card">
              <h3 className="review-name">{review.sender_name}</h3>
              <div className="review-rating">
                {"★".repeat(review.rating)}{" "}
                {"☆".repeat(5 - review.rating)} {/* Show empty stars */}
              </div>
              <p className="review-comment">{review.comment}</p>
              <small className="review-date">
                {new Date(review.created_at).toLocaleDateString()}
              </small>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </div>
  );
}

export default ReviewList;
