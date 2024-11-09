import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import '../styles/AddBook.css';

const BookManager = () => {
  const [books, setBooks] = useState([]);
  const [bookData, setBookData] = useState({ 
    name: '', 
    author: '', 
    available: '', 
    ratePerMonth: '', 
    bookCoverImageUrl: '', 
    genre: '', 
    Language: 'English', // Default language choice
    star: '' 
  });
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/books');
      setBooks(response.data);
    } catch (error) {
      toast.error('Error fetching books');
    }
  };

  const validateAuthorName = (name) => /^[A-Za-z\s]+$/.test(name);
  const validateStarRating = (rating) => rating >= 0 && rating <= 5;

  const handleAddOrUpdate = async () => {
    // Validate if rate per month is a non-negative value
    if (bookData.ratePerMonth < 0) {
      toast.error('Rate per month cannot be negative');
      return;
    }

    // Validate if availability is a non-negative value
    if (bookData.available < 0) {
      toast.error('Number of books available cannot be negative');
      return;
    }

    // Validate if star rating is between 0 and 5
    if (!validateStarRating(bookData.star)) {
      toast.error('Star rating must be between 0 and 5');
      return;
    }

    // Validate author name
    if (!validateAuthorName(bookData.author)) {
      toast.error('Author name should contain only letters and spaces');
      return;
    }

    try {
      if (editing) {
        const response = await axios.put(`http://localhost:3001/api/books/update/${editing}`, bookData);
        toast.success('Book updated successfully');
        setBooks(books.map(book => book._id === editing ? response.data.book : book));
        setEditing(null);
      } else {
        const response = await axios.post('http://localhost:3001/api/books/add', bookData);
        toast.success('Book added successfully');
        setBooks([...books, response.data.book]);
      }
      setBookData({
        name: '',
        author: '',
        available: '',
        ratePerMonth: '',
        bookCoverImageUrl: '',
        genre: '',
        Language: 'English',
        star: ''
      });
    } catch (error) {
      if (error.response?.data.message === 'Book already exists') {
        toast.error('Book already exists');
      } else {
        toast.error('Error adding/updating book');
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/books/delete/${id}`);
      toast.success('Book deleted successfully');
      setBooks(books.filter(book => book._id !== id));
    } catch (error) {
      toast.error('Error deleting book');
    }
  };

  return (
    <div className="book-manager-container">
      <button onClick={() => navigate('/admin')} className="back-button">←</button>
      <h1 className="book-manager-heading">Book Manager</h1>

      <div className="book-form-container">
        <div className="book-form-image">
          <img src="https://c1.wallpaperflare.com/preview/563/337/199/book-library-shelf-stack.jpg" alt="Book illustration" />
        </div>

        <div className="book-form">
          <h2 className="form-heading"><b>{editing ? 'Edit Book' : 'Add a New Book 🕮'}</b></h2> 
          <input
            type="text"
            placeholder="Book Name"
            value={bookData.name}
            onChange={e => setBookData({ ...bookData, name: e.target.value })}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Author"
            value={bookData.author}
            onChange={e => setBookData({ ...bookData, author: e.target.value })}
            className="input-field"
          />
          <input
            type="number"
            placeholder="Rate Per Month"
            value={bookData.ratePerMonth}
            onChange={e => setBookData({ ...bookData, ratePerMonth: e.target.value })}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Book Cover Image URL"
            value={bookData.bookCoverImageUrl}
            onChange={e => setBookData({ ...bookData, bookCoverImageUrl: e.target.value })}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Genre"
            value={bookData.genre}
            onChange={e => setBookData({ ...bookData, genre: e.target.value })}
            className="input-field"
          />

          {/* Language Dropdown */}
          <select
            value={bookData.Language}
            onChange={e => setBookData({ ...bookData, Language: e.target.value })}
            className="input-field"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </select>

          <input
            type="number"
            placeholder="Star Rating (0-5)"
            value={bookData.star}
            onChange={e => setBookData({ ...bookData, star: e.target.value })}
            className="input-field"
          />
          <input
            type="number"
            placeholder="Number of Book Available"
            value={bookData.available}
            onChange={e => setBookData({ ...bookData, available: e.target.value })}
            className="input-field"
          />
          <button onClick={handleAddOrUpdate} className={`button ${editing ? 'update-button' : 'add-button'}`}>
            {editing ? 'Update Book' : 'Add Book'}
          </button>
        </div>
      </div>

      <div className="book-list-container">
        {books.map((book) => (
          <div key={book._id} className={`custom-book-card ${book._id === editing ? 'custom-highlighted' : ''}`}>
            <div className="custom-image-container">
              <img src={book.bookCoverImageUrl || 'placeholder.jpg'} alt={`${book.name} cover`} className="custom-book-cover-image" />
            </div>
            <div className="custom-card-content">
              <h3 className="custom-book-title">{book.name}</h3>
              <p className="custom-book-author">{book.author}</p>
              <div className="custom-card-footer">
                <span className="custom-book-price">₹{book.ratePerMonth}</span>
                <span className="custom-book-rating">
                  {Array(book.star).fill('⭐').map((star, index) => (
                    <span key={index}>{star}</span>
                  ))}
                </span>
              </div>
              <div className="custom-button-group">
                <button onClick={() => setEditing(book._id)} className="custom-add-btn">Edit</button>
                <button onClick={() => handleDelete(book._id)} className="custom-delete-btn">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
};

export default BookManager;
