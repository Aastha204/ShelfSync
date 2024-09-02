import React from 'react';
import '../styles/newRelease.css';

const BookCard = ({ title, author, price, rating, imageUrl, highlight }) => {
  return (
    <div className={`book-card ${highlight ? 'highlight' : ''}`}>
      <div className="image-container">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{author}</p>
        <div className="card-footer">
          <span className="price">₹{price}</span>
          <span className="rating">⭐{rating}</span>
        </div>
        <button className="add-btn">Issue</button>
      </div>
    </div>
  );
};

export default BookCard;
