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
        title: 'The Kid Who Came From Space',
        author: 'Ross Welford',
        price: 240,
        rating: 4.5,
        imageUrl: '/images/TheKidWhoCameFromSpace.jpg',
      },
      {
        title: 'Avengers',
        author: 'Jason Aaron',
        price: 300,
        rating: 4.1,
        imageUrl: '/images/Avengers.jpg',
      },
      {
        title: 'Sonic the Hedgehog',
        author: 'Evan Stanley',
        price: 400,
        rating: 4.7,
        imageUrl: '/images/SonictheHedgehog.jpg',
      },
    ];
  
    return (
      <div className="new-releases-container">
        <h2 className="new-releases-heading">Comics</h2>
        <div className="book-list">
          {books.map((book, index) => (
            <BookCard key={index} {...book} />
          ))}
        </div>
        <a href="/books" className="view-more">
          View More
        </a>
      </div>
    );
  };
  
  export default NewReleases;
