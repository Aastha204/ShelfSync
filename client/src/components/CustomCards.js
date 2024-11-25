import React from 'react';
import '../styles/CustomCards.css'; // Import the unique CSS file
import { faHome , faQuestionCircle} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CustomCard = ({ href, coverImage, characterImage, titleText }) => {
  return (
    <div className="custom-card-container">
    
      <a href={href} alt={titleText} rel="noopener noreferrer">
        <div className="custom-card">
          <div className="custom-wrapper">
            <img src={coverImage} className="custom-cover-image" alt="Cover" />
          </div>
          <div className="custom-title-text">{titleText}</div>
          <img src={characterImage} className="custom-character" alt="Character" />
        </div>
      </a>
    </div>
  );
};

const CustomCardApp = () => {
  return (
    <div className="custom-app">
     {/* Home Icon */}
     <Link to="/" className="home-icon-custom">
        <FontAwesomeIcon icon={faHome} />
      </Link>
      <div className="heading-container">
  <div className="heading-top">Welcome to ShelfSync!</div>
  <div className="heading-line"></div>
  <div className="heading-bottom">Your journey to better organization starts here. Login to Continue. </div>
</div>

      {/* Adding multiple CustomCard components */}
      
      <CustomCard
        href="/adminlogin"
        coverImage="https://clipart-library.com/images/8i6oer5KT.png"
        characterImage="https://clipart-library.com/images/8i6oer5KT.png"
        titleText="Login as Admin"
      />
      <CustomCard
        href="/login"
        coverImage="images/userlogin.png"
        characterImage="images/userlogin.png"
        titleText="Login as User"
        
      />
      <div className="query-section">
        <span>Got a question? Don't worry, reach out to us anytime! </span>
        <Link to="/contact">
          <FontAwesomeIcon icon={faQuestionCircle} className="query-icon" />
         
        </Link>
      </div>
      
    </div>
  );
};

export default CustomCardApp;
