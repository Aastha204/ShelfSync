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
        title: 'Harry Potter',
        author: 'J.K Rowling',
        price: 250,
        rating: 4.2,
        imageUrl: '/images/HarryPotter.png',
      },
      {
        title: 'End of the Point',
        author: 'Elizabeth Grave',
        price: 300,
        rating: 4.5,
        imageUrl: '/images/EndOfPoint.png',
      },
      {
        title: 'Korean CookBook',
        author: 'Jiu Chung',
        price: 200,
        rating: 4.0,
        imageUrl: '/images/KoreanCookbook.png',
      },
    ];
  
    return (
      <div className="new-releases-container">
        <h2 className="new-releases-heading">New Releases</h2>
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
