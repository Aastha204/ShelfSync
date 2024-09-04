
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import '../styles/AddBook.css'; // Link the updated CSS file

const BookManager = () => {
  const [books, setBooks] = useState([]);
  const [bookData, setBookData] = useState({ name: '', author: '', available: true, ratePerMonth: '' });
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

  const handleAdd = async () => {
    if (bookData.ratePerMonth < 0) {
      toast.error('Rate per month cannot be negative');
      return;
    }
    if (!validateAuthorName(bookData.author)) {
      toast.error('Author name should contain only letters and spaces');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/books/add', bookData);
      toast.success('Book added successfully');
      setBooks([...books, response.data.book]);
      setBookData({ name: '', author: '', available: true, ratePerMonth: '' });
    } catch (error) {
      if (error.response && error.response.data.message === 'Book already exists') {
        toast.error('Book already exists');
      } else {
        toast.error('Error adding book');
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

  const handleUpdate = async () => {
    if (bookData.ratePerMonth < 0) {
      toast.error('Rate per month cannot be negative');
      return;
    }
    if (!validateAuthorName(bookData.author)) {
      toast.error('Author name should contain only letters and spaces');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3001/api/books/update/${editing}`, bookData);
      toast.success('Book updated successfully');
      setBooks(books.map(book => book._id === editing ? response.data.book : book));
      setEditing(null);
      setBookData({ name: '', author: '', available: true, ratePerMonth: '' });
    } catch (error) {
      toast.error('Error updating book');
    }
  };

  return (
    <div className="book-manager-container">
      <button onClick={() => navigate('/admin')} className="back-button">←</button>
      <h1 className="book-manager-heading">Book Manager</h1>
      
      <div className="book-form-container">
        <div className="book-form-image">
          {/* Replace with actual image or illustration */}
          <img src="https://c1.wallpaperflare.com/preview/563/337/199/book-library-shelf-stack.jpg" alt="Book illustration" />
        </div>
        
        <div className="book-form">
        <h2 class="form-heading"><b>Add a New Book 🕮</b></h2> 
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
          <div className="checkbox-container">
            <label>
              <input
                type="checkbox"
                checked={bookData.available}
                onChange={e => setBookData({ ...bookData, available: e.target.checked })}
                className="checkbox"
              />
              Available
            </label>
          </div>
          {editing ? (
            <button onClick={handleUpdate} className="button update-button">Update Book</button>
          ) : (
            <button onClick={handleAdd} className="button add-button">Add Book</button>
          )}
        </div>
      </div>
      
      <div className="book-list-container">
      
        {books.map(book => (
          <div key={book._id} className={`book-list-item ${book._id === editing ? 'highlighted' : ''}`}>
          
            <h2 className="book-title"><strong>Book Name: </strong>{book.name}</h2>
            <p className="book-author"><strong>Author:</strong> {book.author}</p>
            <p className="book-available"><strong>Available:</strong> {book.available ? 'Yes' : 'No'}</p>
            <p className="book-rate"><strong>Rate Per Month:</strong> ₹{book.ratePerMonth}</p>
            <div className="book-buttons">
              <button onClick={() => setEditing(book._id)} className="button edit-button">Edit</button>
              <button onClick={() => handleDelete(book._id)} className="button delete-button">Delete</button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default BookManager;
