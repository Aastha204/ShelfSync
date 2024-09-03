import React from 'react';
import '../styles/CustomCards.css'; // Import the unique CSS file

const CustomCard = ({ href, coverImage, characterImage, titleText }) => {
  return (
    <div className="custom-card-container">
      <a href={href} alt={titleText} target="_blank" rel="noopener noreferrer">
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
      {/* Adding multiple CustomCard components */}
      
      <CustomCard
        href="/login"
        coverImage="https://clipart-library.com/images/8i6oer5KT.png"
        characterImage="https://clipart-library.com/images/8i6oer5KT.png"
        titleText="Login as Admin"
      />
      <CustomCard
        href="/login"
        coverImage="images/shelfuser1.png"
        characterImage="images/shelfuser1.png"
        titleText="Login as User"
      />
    </div>
  );
};

export default CustomCardApp;
