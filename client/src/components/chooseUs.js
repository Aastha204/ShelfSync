import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "../styles/chooseUs.css";
import { useNavigate } from "react-router-dom";


const ChooseUs = () => {
  const navigate = useNavigate();
  const handleIssue = () => {
    navigate("/books");
  };
  return (
    
    <div className="ChooseUs Parent">

     <p>Click here to discover our full collection and add your Favourites!</p>
     <div> <button className="issue-button" onClick={handleIssue}>View Our Collection and issue your books</button></div> <br></br><br></br>
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
      <p class="signup-text"><a href="/signup">Sign up</a> today and begin your exciting journey with us!</p>

    </div>
  );
};

export default ChooseUs;

