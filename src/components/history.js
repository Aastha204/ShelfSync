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
        title: 'The Wright Brothers',
        author: 'David McCullough',
        price: 900,
        rating: 4.5,
        imageUrl: '/images/TheWrightBrothers.jpg',
      },
      {
        title: 'The Splendid and the Vile',
        author: 'Erik Larson',
        price: 450,
        rating: 4.7,
        imageUrl: '/images/TheSplendidandtheVile.jpg',
      },
      {
        title: 'The Guns Of August',
        author: 'Barbara W. Tuchman',
        price: 780,
        rating: 4.6,
        imageUrl: '/images/TheGunsOfAugust.jpg',
      },
    ];
  
    return (
      <div className="new-releases-container">
        <h2 className="new-releases-heading">History</h2>
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
