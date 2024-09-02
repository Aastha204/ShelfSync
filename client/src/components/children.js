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
        title: 'The Great Train Journey',
        author: 'Ruskin Bond',
        price: 130,
        rating: 4.4,
        imageUrl: '/images/TheGreatTrainJourney.jpg',
      },
      {
        title: 'The Famous Five',
        author: 'Enid Blyton',
        price: 150,
        rating: 4.6,
        imageUrl: '/images/TheFamousFive.jpg',
      },
      {
        title: 'Matilda',
        author: 'Roald Dahl',
        price: 280,
        rating: 4.6,
        imageUrl: '/images/Matilda.jpg',
      },
    ];
  
    return (
      <div className="new-releases-container">
        <h2 className="new-releases-heading">Children</h2>
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
