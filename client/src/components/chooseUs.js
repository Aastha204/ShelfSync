import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "../styles/chooseUs.css";

const ChooseUs = () => {
  return (
    <div className="ChooseUs Parent">
      <h1>Why Choose Us?</h1>
      <div className="ChooseUscontent">
        <div className="lottie-container">
          <DotLottieReact
            src="https://lottie.host/0775c8ba-fe54-47c1-b0ca-0536ea14ba39/wHndh7IvsZ.json"
            loop
            autoplay
          />
        </div>
        <div className="bullet-points">
          <ul>
            <li>📚 Diverse Selection: <span>Handpicked bestsellers from all genres.</span></li>
            <li>⭐ Top Rated: <span>Loved by thousands of readers.</span></li>
            <li>💡 Affordable Options: <span>Stories that fit your budget.</span></li>
            <li>🚚 Hassle-Free Borrowing: <span>Get the books you love, when you want them.</span></li>
          </ul>
        </div>
      </div>
      <p class="signup-text"><a href="/custom">Sign up</a> today and begin your exciting journey with us!</p>

    </div>
  );
};

export default ChooseUs;

