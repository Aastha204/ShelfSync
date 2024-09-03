// components/BookManager.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {ToastContainer, toast } from 'react-toastify';


const BookManager = () => {
  const [books, setBooks] = useState([]);
  const [bookData, setBookData] = useState({ name: '', author: '', available: true, ratePerMonth: 0 });
  const [editing, setEditing] = useState(null);

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

  const handleAdd = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/books/add', bookData);
      toast.success('Book added successfully');
      setBooks([...books, response.data.book]);
      setBookData({ name: '', author: '', available: true, ratePerMonth: 0 });
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
      await axios.delete(`http://localhost:/api/books/delete/${id}`);
      toast.success('Book deleted successfully');
      setBooks(books.filter(book => book._id !== id));
    } catch (error) {
      toast.error('Error deleting book');
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/api/books/update/${editing}`, bookData);
      toast.success('Book updated successfully');
      setBooks(books.map(book => book._id === editing ? response.data.book : book));
      setEditing(null);
      setBookData({ name: '', author: '', available: true, ratePerMonth: 0 });
    } catch (error) {
      toast.error('Error updating book');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Book Manager</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Book Name"
          value={bookData.name}
          onChange={e => setBookData({ ...bookData, name: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Author"
          value={bookData.author}
          onChange={e => setBookData({ ...bookData, author: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Rate Per Month"
          value={bookData.ratePerMonth}
          onChange={e => setBookData({ ...bookData, ratePerMonth: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <div className="mb-2">
          <label className="mr-2">
            <input
              type="checkbox"
              checked={bookData.available}
              onChange={e => setBookData({ ...bookData, available: e.target.checked })}
              className="mr-2"
            />
            Available
          </label>
        </div>
        {editing ? (
          <button onClick={handleUpdate} className="bg-blue-500 text-white p-2 rounded">Update Book</button>
        ) : (
          <button onClick={handleAdd} className="bg-green-500 text-white p-2 rounded">Add Book</button>
        )}
      </div>
      <div>
        {books.map(book => (
          <div key={book._id} className="border p-4 mb-4">
            <h2 className="text-xl">{book.name}</h2>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Available:</strong> {book.available ? 'Yes' : 'No'}</p>
            <p><strong>Rate Per Month:</strong> ${book.ratePerMonth}</p>
            <button onClick={() => setEditing(book._id)} className="bg-yellow-500 text-white p-2 rounded mr-2">Edit</button>
            <button onClick={() => handleDelete(book._id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
          </div>
        ))}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default BookManager;
