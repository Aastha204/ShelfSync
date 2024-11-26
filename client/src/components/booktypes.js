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
    <p>"Discover a world of bestselling books across genres like thrillers, romance, fantasy, and more—stories that captivate, inspire, and entertain!"</p>
   
    <h4 className="wordCarousel">
    <h1>SELECT YOUR GENRE</h1>
  <div>
    <ul className="flip5">
      <li>Comics ✨</li>
      <li>Thriller 👻</li>
      <li>History 📖</li>
      <li>Children 🧑🏻‍🤝‍🧑🏾</li>
      <li>Romance ❤️</li>
      <li>Fiction 💡</li>
    </ul>
  </div>
</h4>
    {/* <p>And Start <a href="/books"  class="underline text-brown-500 hover:text-brown-700">Reading</a></p> */}
      <div className="book-types">
        <div className="icons">
          <div className="icon-container">
            <a href="/books">
              <div className="icon children"></div>
              <span>Children</span>
            </a>
          </div>
          <div className="icon-container">
            <a href="/books">
              <div className="icon history"></div>
              <span>History</span>
            </a>
          </div>
          <div className="icon-container">
            <a href="/books">
              <div className="icon fiction"></div>
              <span>Fiction</span>
            </a>
          </div>
          <div className="icon-container">
            <a href="/books">
              <div className="icon thriller"></div>
              <span>Thriller</span>
            </a>
          </div>
          <div className="icon-container">
            <a href="/books">
              <div className="icon romance"></div>
              <span>Romance</span>
            </a>
          </div>
          <div className="icon-container">
            <a href="/books">
              <div className="icon comics"></div>
              <span>Comics</span>
            </a>
          </div>
        </div>
      </div>
        <br></br>
        <br></br>
        
        <p>"Explore top books in every genre—your next favorite read awaits!"</p>
      
    </div>
  );
}

export default BookType;
