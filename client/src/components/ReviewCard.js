import React, { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "../styles/ReviewCard.css"; // Custom CSS file

function ReviewCard() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const handleRatingClick = (rate) => setRating(rate);
  const handleHover = (rate) => setHover(rate);
  const handleHoverLeave = () => setHover(0);

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
      <button className="submit-button">Submit</button>
    </div>
  );
}

export default ReviewCard;
