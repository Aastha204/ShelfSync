import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/book.css';
import BookCards from './cards';

const Filter = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [editing, setEditing] = useState(null);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [priceRange, setPriceRange] = useState(10000);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedAvailability, setSelectedAvailability] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedCategory, selectedLanguage, priceRange, selectedRating, selectedAvailability]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/books');
      setBooks(response.data);
      setFilteredBooks(response.data); // Initialize filteredBooks with all books
    } catch (error) {
      toast.error('Error fetching books');
    }
  };

  const applyFilters = () => {
    let updatedBooks = books;

    if (selectedCategory) {
      updatedBooks = updatedBooks.filter((book) => book.genre === selectedCategory);
    } else {
      updatedBooks = books; // Show all books when "All Categories" is selected
    }

    if (selectedLanguage) {
      updatedBooks = updatedBooks.filter((book) => book.Language === selectedLanguage);
    }

    if (selectedRating !== undefined && selectedRating !== null) {
      updatedBooks = updatedBooks.filter((book) => book.star >= selectedRating);
    }

    if (priceRange) {
      updatedBooks = updatedBooks.filter((book) => book.ratePerMonth <= priceRange);
    }

    if (selectedAvailability !== '') {
      updatedBooks = updatedBooks.filter((book) => {
        return selectedAvailability === 'available' ? book.available > 0 : book.available === 0;
      });
    }

    setFilteredBooks(updatedBooks);
  };

  const handleIssueBook = async (bookID) => {
    const userEmail = localStorage.getItem('loggedInUserEmail');
    if (!userEmail) {
      toast.error('Please log in to issue a book');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3001/api/issues/issue', {
        userEmail,
        bookID,
      });
  
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.error === 'Book already issued by you') {
        toast.info('Book already issued by you');
      } else {
        toast.error('Failed to issue book');
      }
    }
  };
  
  return (
    <div className="filter-page-container">
      {/* Sidebar Filter */}
      <div className="sidebar-filter">
        <h2>Filter</h2>

        <div className="filter-section">
          <h3>By Category</h3>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">All Categories</option>
            {['Fiction', 'Romance', 'Children', 'Thriller', 'History', 'Comics'].map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="filter-section">
          <h3>Language</h3>
          <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
            <option value="">All</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>

        <div className="filter-section">
          <h3>Price</h3>
          <input
            type="range"
            min="10"
            max="10000"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          />
          <span>Up to ₹{priceRange}</span>
        </div>

        {/* Rating Filter */}
        <div className="filter-section">
          <h3>Rating</h3>
          <select value={selectedRating || ''} onChange={(e) => setSelectedRating(Number(e.target.value))}>
            <option value="">All Ratings</option>
            <option value="1">1 Star & above</option>
            <option value="2">2 Stars & above</option>
            <option value="3">3 Stars & above</option>
            <option value="4">4 Stars & above</option>
            <option value="5">5 Stars</option>
          </select>
        </div>

        {/* Availability Filter */}
        <div className="filter-section">
          <h3>Availability</h3>
          <select value={selectedAvailability} onChange={(e) => setSelectedAvailability(e.target.value)}>
            <option value="">All</option>
            <option value="available">Available</option>
            <option value="not-available">Not Available</option>
          </select>
        </div>
      </div>

      {/* Book List */}
      <div className="book-list-container">
        <div>
          <BookCards />
        </div>

        {filteredBooks.map((book) => (
          <div key={book._id} className={`custom-book-card ${book._id === editing ? 'custom-highlighted' : ''}`}>
            <div className="custom-image-container">
              <img src={book.bookCoverImageUrl || 'placeholder.jpg'} alt={`${book.name} cover`} className="custom-book-cover-image" />
            </div>
            <div className="custom-card-content">
              <h3 className="custom-book-title">{book.name}</h3>
              <p className="custom-book-author">{book.author}</p>
              <p className="custom-book-genre"><b>{book.genre}</b></p>
              <div className="custom-card-footer">
                <span className="custom-book-price">₹{book.ratePerMonth}</span>
                <span className="custom-book-rating">
                  {Array(book.star).fill('⭐').map((star, index) => (
                    <span key={index}>{star}</span>
                  ))}
                </span>
              </div>
              <button
                className="add-btn"
                disabled={book.available === 0}
                onClick={() => handleIssueBook(book._id)}
              >
                {book.available > 0 ? 'Issue' : 'Not Available'}
              </button>
            </div>
          </div>
        ))}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Filter;
