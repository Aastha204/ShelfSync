import React, { useState } from 'react';
import '../styles/booktype.css';
import axios from 'axios';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';

function BookType() {
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const debouncedSearch = debounce(async (name, author) => {
    if (!name.trim() && !author.trim()) {
      setSearchResults([]);
      setMessage('Please enter a book name or author to search.');
      return;
    }

    setMessage('');
    try {
      const response = await axios.get('http://localhost:3001/api/books/search', {
        params: { name, author },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error.message);
    }
  }, 300);

  const handleBookNameChange = (e) => {
    const value = e.target.value;
    setBookName(value);
    debouncedSearch(value, authorName);
  };

  const handleAuthorNameChange = (e) => {
    const value = e.target.value;
    setAuthorName(value);
    debouncedSearch(bookName, value);
  };

  const handleIconClick = () => {
    const userEmail = localStorage.getItem('loggedInUserEmail');
    if (userEmail) {
      navigate('/books');
    } else {
      navigate('/custom');
    }
  };

  return (
    <div className="booktype">
      <div className="book-types">
        <h1>Book Types</h1>
        <div className="icons">
          {['Children', 'History', 'Fiction', 'Thriller', 'Romance', 'Comics'].map((type) => (
            <div className="icon-container" key={type} onClick={handleIconClick}>
              <div className={`icon ${type.toLowerCase()}`}></div>
              <span>{type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookType;
