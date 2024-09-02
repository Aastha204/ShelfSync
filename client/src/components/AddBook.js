import React, { useState } from 'react';
import axios from 'axios';

const AddBook = ({ onBookAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    author: '',
    ratePerMonth: '',
    available: true
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/books/add", formData)
      .then((res) => {
        setFormData({
          name: '',
          author: '',
          ratePerMonth: '',
          available: true
        });
        onBookAdded(res.data); // Notify the parent (BookList) to refresh the list
      })
      .catch(err => setError('Failed to add book'));
  };

  return (
    <div className=" p-4 bg-brown-100 text-brown-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center md:text-3xl">Add a New Book</h1>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
        <input
          className="border border-brown-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
          type="text"
          name="name"
          placeholder="Book Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          className="border border-brown-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
          type="text"
          name="author"
          placeholder="Author Name"
          value={formData.author}
          onChange={handleChange}
          required
        />
        <input
          className="border border-brown-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
          type="number"
          name="ratePerMonth"
          placeholder="Rate Per Month"
          value={formData.ratePerMonth}
          onChange={handleChange}
          required
        />
        <label className="flex items-center">
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
            className="mr-2"
          />
          Available
        </label>
        <button type="submit" className="bg-brown-500 text-white p-2 rounded-md hover:bg-brown-600 w-full">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
