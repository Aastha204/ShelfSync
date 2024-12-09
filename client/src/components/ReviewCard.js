import React, { useState } from "react";
import "../styles/ReviewCard.css";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ReviewCard() {
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const userEmail = localStorage.getItem("loggedInUserEmail");
  const userName = localStorage.getItem("loggedInUserName");

  const handleNextStep = () => {
    if (rating > 0) setStep(2); // Proceed to Step 2 if rating is selected
  };

  const handleBackStep = () => setStep(1); // Go back to Step 1

  const handleSubmit = async () => {
    if (!userEmail || !userName) {
      toast.error("User not logged in");
      return;
    }

    const reviewData = {
      sender_name: userName,
      sender_email: userEmail,
      comment,
      rating,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/api/reviews/add",
        reviewData
      );
      console.log("Review added successfully", response.data);
      setShowConfetti(true); // Show confetti animation
      toast.success("Review submitted successfully!");
      setTimeout(() => setShowConfetti(false), 4000);

      // Reset fields
      setRating(0);
      setHover(0);
      setComment("");
      setStep(1);
    } catch (error) {
      console.error("Error submitting review", error);
      toast.error("Error submitting review");
    }
  };
  const handleBackClick = () => {
    navigate("/userProfile"); // Navigate to /userProfile
  };
 

  return (
    <div className="review-page-review">
      {/* Confetti Animation */}
      {showConfetti && <Confetti />}

      {/* Toast Container */}
      <ToastContainer />
      <button className="back-button" onClick={handleBackClick}>
        &#8592; Back
      </button>

      <h1 className="main-heading">Give feedback and let us know your experience</h1>
      <h3 className="sub-heading">Because your review matters</h3>

      {/* Progress Indicator */}
      <div className="progress-indicator">
        <span className={step === 1 ? "active" : ""}>Step 1: Review Us</span>
        <span className={step === 2 ? "active" : ""}>Step 2: Submit Feedback</span>
      </div>

      <div className="review-card-main">
        {step === 1 && (
          <>
            <h4>How was your experience? Rate us below:</h4>
            <div className="star-rating">
              {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                  <span
                    key={starValue}
                    className={`star ${starValue <= (hover || rating) ? "filled" : ""}`}
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(0)}
                  >
                    ★
                  </span>
                );
              })}
            </div>
            <button
              className={`next-button ${rating > 0 ? "" : "disabled"}`}
              onClick={handleNextStep}
              disabled={rating === 0}
            >
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h4>
              <button className="back-button-review" onClick={handleBackStep}>
                <FaArrowLeft />
              </button>
                We'd love to hear your thoughts!
            </h4>
            <textarea
              className="comment-box"
              placeholder="Write your review here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button className="submit-button" onClick={handleSubmit}>
              Submit Feedback
            </button>
          </>
        )}
        <a href='/allreview' className="seeallReview">See All Reviews</a>
      </div>
      {/* <a href='/allreview' className="seeallReview">see all review</a> */}

      
      {/* Footer */}
      <footer className="review-footer">
        <a href="/contact" className="footer-link">
          FAQs
        </a>
        <a href="/contact" className="footer-link">
          Contact Librarian
        </a>
      </footer>
    </div>
  );
}

export default ReviewCard;
