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
        title: 'Never Lie',
        author: 'Frieda McFadden',
        price: 330,
        rating: 4.3,
        imageUrl: '/images/NeverLie.jpg',
      },
      {
        title: 'The Silent Patient',
        author: 'Alex Michaelides',
        price: 250,
        rating: 4.5,
        imageUrl: '/images/TheSilentPatient.jpg',
      },
      {
        title: 'Too Late',
        author: 'Colleen Hoover',
        price: 330,
        rating: 4.3,
        imageUrl: '/images/TooLate.jpg',
      },
    ];
  
    return (
      <div className="new-releases-container">
        <h2 className="new-releases-heading">Thriller</h2>
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
