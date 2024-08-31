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
        title: 'Dopamine Detox',
        author: 'Thibaut Meurisse',
        price: 200,
        rating: 4.4,
        imageUrl: '/images/DopamineDetox.jpg',
      },
      {
        title: 'The Psychology Of Money',
        author: 'Morgan Housel',
        price: 275,
        rating: 4.6,
        imageUrl: '/images/ThePsychologyOfMoney.jpg',
      },
      {
        title: 'The Mountain Is You',
        author: 'Brianna Wiest',
        price: 200,
        rating: 4.3,
        imageUrl: '/images/TheMountainIsYou.jpg',
      },
    ];
  
    return (
      <div className="new-releases-container">
        <h2 className="new-releases-heading">Amazon Bestsellers Books</h2>
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
