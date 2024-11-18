import React from 'react';
import '../styles/booktype.css';
import axios from 'axios';
import { useState } from 'react';
import {debounce} from 'lodash';

function BookType() {
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState('');

  // const handleSearch = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:3001/api/books/search?name=${bookName}&author=${authorName}`
  //     );
  
  //     if (!response.ok) {
  //       throw new Error(`HTTP Error: ${response.status}`); // Log HTTP errors
  //     }
  
  //     const data = await response.json(); // Parse JSON response
  //     setSearchResults(data);
  //   } catch (error) {
  //     console.error('Error fetching search results:', error.message);
  //   }
  // };

  const debouncedSearch = debounce(async (name, author) => {
    if (!name.trim() && !author.trim()) {
      setSearchResults([]);
      setMessage('Please enter a book name or author to search.');
      return;
    }

    // Clear any previous message
    setMessage('');
    try {
      const response = await axios.get('http://localhost:3001/api/books/search', {
        params: { name, author },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error.message);
    }
  }, 300); // 300ms debounce delay

  const handleBookNameChange = (e) => {
    const value = e.target.value;
    setBookName(value);
    debouncedSearch(value, authorName); // Trigger search with updated name
  };

  const handleAuthorNameChange = (e) => {
    const value = e.target.value;
    setAuthorName(value);
    debouncedSearch(bookName, value); // Trigger search with updated author
  };

  
  return (
    <div className="booktype">
      <div className="search-bar">
        {/* Book Name Input */}
        <input
          type="text"
          placeholder="Book Name"
          value={bookName}
          onChange={handleBookNameChange}
          className="input-box"
        />

        {/* Author Name Input */}
        <input
          type="text"
          placeholder="Author Name"
          value={authorName}
          onChange={handleAuthorNameChange}
          className="input-box"
        />

        {/* Search Button */}
        {/* <button className="search-button" onClick={handleSearch}>
          Search
        </button> */}
      </div>
       {/* Display message if applicable */}
       {message && <p className="message">{message}</p>}

<div className="search-results">
  {searchResults.length > 0 ? (
    searchResults.map((book) => (
      <div key={book._id} className="book-card">
        <h3>{book.name}</h3>
        <p>Author: {book.author}</p>
        <p>Genre: {book.genre}</p>
        <p>Language: {book.Language}</p>
        <p>Rating: {book.star}</p>
      </div>
    ))
  ) : (
    !message && <p>No results found</p>
  )}
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
