import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios.get("http://localhost:3001/books")
      .then(result => setBooks(result.data))
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/books/delete/${id}`)
      .then(() => fetchBooks())
      .catch(err => console.log(err));
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setUpdatedData({ ...book });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:3001/books/update/${editingBook._id}`, updatedData)
      .then(() => {
        setEditingBook(null);
        fetchBooks();
      })
      .catch(err => console.log(err));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({
      ...updatedData,
      [name]: value
    });
  };

  return (
    <div className="w-full p-6 bg-brown-100 text-brown-800 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Book List</h1>

      {books.length === 0 ? (
        <p className="text-center text-lg">No books available</p>
      ) : (
        <ul>
          {books.map(book => (
            <li key={book._id} className="border border-brown-300 p-4 mb-4 flex flex-col md:flex-row items-center bg-brown-200 rounded-lg shadow-lg">
              {editingBook && editingBook._id === book._id ? (
                <div className="w-full">
                  <input
                    className="border border-brown-400 p-3 mb-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                    type="text"
                    name="name"
                    value={updatedData.name}
                    onChange={handleInputChange}
                    placeholder="Book Name"
                  />
                  <input
                    className="border border-brown-400 p-3 mb-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                    type="text"
                    name="author"
                    value={updatedData.author}
                    onChange={handleInputChange}
                    placeholder="Author Name"
                  />
                  <input
                    className="border border-brown-400 p-3 mb-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                    type="number"
                    name="ratePerMonth"
                    value={updatedData.ratePerMonth}
                    onChange={handleInputChange}
                    placeholder="Rate Per Month"
                  />
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      className="bg-brown-500 text-white p-3 rounded-lg hover:bg-brown-600"
                      onClick={handleUpdate}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600"
                      onClick={() => setEditingBook(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row items-center w-full">
                  {book.image && (
                    <img
                      src={`http://localhost:3001/${book.image}`}
                      alt={book.name}
                      className="w-24 h-24 object-cover mb-4 md:mb-0 md:mr-6 rounded-lg shadow-md"
                    />
                  )}
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold mb-2">{book.name}</h2>
                    <p className="mb-1">Author: {book.author}</p>
                    <p className="mb-1">Rate Per Month: ${book.ratePerMonth}</p>
                    <p className="mb-1">Available: {book.available ? 'Yes' : 'No'}</p>
                  </div>
                  <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
                    <button
                      className="bg-brown-600 text-white p-3 rounded-lg hover:bg-brown-700"
                      onClick={() => handleEdit(book)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600"
                      onClick={() => handleDelete(book._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;


