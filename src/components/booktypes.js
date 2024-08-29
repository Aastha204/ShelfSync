import React from 'react';
import '../styles/booktype.css';

function booktype() {
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
            <div className="icon children"></div>
            <a>Children</a>
          </div>
          <div className="icon-container">
            <div className="icon history"></div>
            <a>History</a>
          </div>
          <div className="icon-container">
            <div className="icon fiction"></div>
            <a>Fiction</a>
          </div>
          <div className="icon-container">
            <div className="icon thriller"></div>
            <a>Thriller</a>
          </div>
          <div className="icon-container">
            <div className="icon romance"></div>
            <a>Romance</a>
          </div>
          <div className="icon-container">
            <div className="icon comics"></div>
            <a>Comics</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default booktype;
