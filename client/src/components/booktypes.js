import React from 'react';
import '../styles/booktype.css';

function BookType() {
  return (
    <div className="booktype">
      <div className="search-bar">
        <input type="text" placeholder="Book Name" className="input-box" />
        <input type="text" placeholder="Author name" className="input-box" />
        <button className="search-button">Search</button>
      </div>
      <div className="book-types">
        <h1>Book Types</h1>
        <div className="icons">
          <div className="icon-container">
            <a href="#children">
              <div className="icon children"></div>
              <span>Children</span>
            </a>
          </div>
          <div className="icon-container">
            <a href="#history">
              <div className="icon history"></div>
              <span>History</span>
            </a>
          </div>
          <div className="icon-container">
            <a href="#fiction">
              <div className="icon fiction"></div>
              <span>Fiction</span>
            </a>
          </div>
          <div className="icon-container">
            <a href="#thriller">
              <div className="icon thriller"></div>
              <span>Thriller</span>
            </a>
          </div>
          <div className="icon-container">
            <a href="#romance">
              <div className="icon romance"></div>
              <span>Romance</span>
            </a>
          </div>
          <div className="icon-container">
            <a href="#comics">
              <div className="icon comics"></div>
              <span>Comics</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookType;
