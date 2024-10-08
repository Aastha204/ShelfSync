import React, { useState } from 'react';
import '../styles/receipt.css';

const ManageReceipt = () => {
  const [showMore, setShowMore] = useState(false);
  
  // State to manage cards in different sections
  const [cards, setCards] = useState({
    latest: Array.from({ length: 5 }, (_, index) => `https://img.freepik.com/free-vector/modern-flat-payment-receipt_23-2147911082.jpg`),
    lastMonth: Array.from({ length: 4 }, (_, index) => `https://i.pinimg.com/736x/67/17/c6/6717c6a62cf3ff946827facba3387f80.jpg`),
    threeMonth: Array.from({ length: 4 }, (_, index) => `/images/lastMonth.jpg`),
    sixMonth: Array.from({ length: 4 }, (_, index) => `/images/sixmonth.jpg`),
    lastYear: Array.from({ length: 4 }, (_, index) => `/images/lastyear.jpg`),
  });

  const handleViewMore = () => {
    setShowMore(!showMore); // Toggle between showing more and less
  };

  const handleDelete = (section, index) => {
    setCards((prevCards) => ({
      ...prevCards,
      [section]: prevCards[section].filter((_, i) => i !== index), // Remove the card
    }));
  };

  // Generate the cards dynamically
  const generateCards = (section, count, imageSrc) => (
    cards[section].slice(0, count).map((imgSrc, index) => (
      <div className="card-latest" key={index}>
        <img src={imgSrc} alt={`Card ${index + 1}`} />
        <div className="card-content">
          <div className="button-container">
            <button className="card-button view-button"><a href='/invoice'>View</a></button>
            <button
              className="card-button delete-button"
              onClick={() => handleDelete(section, index)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    ))
  );

  return (
    <div className="manage-receipt-container">
      <h1 className="main-heading-latest">Manage Receipt</h1>
      
      <div className="subheading-container">
        <h2 className="subheading">Latest</h2>
        <div className="card-row">
          {generateCards('latest', 5)} {/* Latest section images */}
        </div>
      </div>
      
      <div className="subheading-container">
        <h2 className="subheading">Last Month</h2>
        <div className="card-row">
          {generateCards('lastMonth', showMore ? 11 : 5)} {/* Show more or less */}
        </div>
        <button className="view-more-button" onClick={handleViewMore}>
          {showMore ? 'View Less' : 'View More'}
        </button>
      </div>

      <div className="subheading-container">
        <h2 className="subheading">Last Three Month</h2>
        <div className="card-row">
          {generateCards('threeMonth', showMore ? 11 : 5)} {/* Show more or less */}
        </div>
        <button className="view-more-button" onClick={handleViewMore}>
          {showMore ? 'View Less' : 'View More'}
        </button>
      </div>

      <div className="subheading-container">
        <h2 className="subheading">Last Six Month</h2>
        <div className="card-row">
          {generateCards('sixMonth', showMore ? 11 : 5)} {/* Show more or less */}
        </div>
        <button className="view-more-button" onClick={handleViewMore}>
          {showMore ? 'View Less' : 'View More'}
        </button>
      </div>

      <div className="subheading-container">
        <h2 className="subheading">Last Year</h2>
        <div className="card-row">
          {generateCards('lastYear', showMore ? 11 : 5)} {/* Show more or less */}
        </div>
        <button className="view-more-button" onClick={handleViewMore}>
          {showMore ? 'View Less' : 'View More'}
        </button>
      </div>
    </div>
  );
};

export default ManageReceipt;
