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
        title: 'War and Peace',
        author: 'Leo Tolstoy',
        price: 400,
        rating: 4.3,
        imageUrl: '/images/WarandPeace.jpg',
      },
      {
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        price: 500,
        rating: 4.6,
        imageUrl: '/images/LordOfRings.jpg',
      },
      {
        title: 'WutheringHeights',
        author: 'Emily Bronte',
        price: 200,
        rating: 4.4,
        imageUrl: '/images/WutheringHeights.jpg',
      },
    ];
  
    return (
      <div className="new-releases-container">
        <h2 className="new-releases-heading">Best Author Books</h2>
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
