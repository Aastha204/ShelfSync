import React, { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "../styles/ReviewCard.css"; // Custom CSS file
import axios from "axios"; // Make sure to install axios

function ReviewCard() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const handleRatingClick = (rate) => setRating(rate);
  const handleHover = (rate) => setHover(rate);
  const handleHoverLeave = () => setHover(0);

  const userEmail = localStorage.getItem('loggedInUserEmail');
  const userName = localStorage.getItem('loggedInUserName');
  const handleSubmit = async () => {
    if (!userEmail && !userName) {
      alert("User not logged in");
      return;
    }

    const reviewData = {
      sender_name: userName, // Get name from local storage
      sender_email: userEmail, // Get email from local storage
      comment: comment,
      rating: rating,
    };

    try {
      // Sending review data to the backend via POST request
      const response = await axios.post("http://localhost:3001/api/reviews/add", reviewData);
      console.log("Review added successfully", response.data);
      alert("Review submitted successfully!");

      setRating(0);
    setHover(0);
    setComment("");
    } catch (error) {
      console.error("Error submitting review", error);
      alert("Error submitting review");
    }
  };

  return (
    <div className="review-card">
      <h2>Rate Your Experience</h2>
      <DotLottieReact
        src="https://lottie.host/aabbb570-cbb0-4d4d-870d-36579fb77177/2mZU2P3VUA.lottie"
        loop
        autoplay
        className="lottie-animation"
      />
      <div className="star-rating">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <span
              key={starValue}
              className={`star ${starValue <= (hover || rating) ? "filled" : ""}`}
              onClick={() => handleRatingClick(starValue)}
              onMouseEnter={() => handleHover(starValue)}
              onMouseLeave={handleHoverLeave}
            >
              ★
            </span>
          );
        })}
      </div>
      <textarea
        className="comment-box"
        placeholder="Write your review here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default ReviewCard;
