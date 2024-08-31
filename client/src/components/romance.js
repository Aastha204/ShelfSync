import React from "react";
import "../styles/newRelease.css";

const BookCard = ({ title, author, price, rating, imageUrl }) => {
    return (
      <div className="book-card">
        <div className="image-container">
          <img src={imageUrl} alt={title} />
          {/* <button className="favorite-btn">❤</button> */}
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
  
  const NewReleases = () => {
    const books = [
      {
        title: 'Enemies With Benefits',
        author: 'Roxie Noir',
        price: 700,
        rating: 4.2,
        imageUrl: '/images/EnemiesWithBenefits.jpg',
      },
      {
        title: 'Twisted Love',
        author: 'Ana Huang',
        price: 400,
        rating: 4.2,
        imageUrl: '/images/TwistedLove.jpg',
      },
      {
        title: 'The Off Limits Rule',
        author: 'Sarah Adams',
        price: 200,
        rating: 4.3,
        imageUrl: '/images/TheOffLimitsRule.jpg',
      },
      
    ];
  
    return (
      <div className="new-releases-container">
        <h2 className="new-releases-heading">Romance</h2>
        <div className="book-list">
          {books.map((book, index) => (
            <BookCard key={index} {...book} />
          ))}
        </div>
        <a href="/more" className="view-more">
          View More
        </a>
      </div>
    );
  };
  
  export default NewReleases;
