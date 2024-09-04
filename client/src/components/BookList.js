import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/books');
      console.log(response.data); // Debug to check the response structure
      setBooks(response.data);
    } catch (error) {
      toast.error('Error fetching books');
    }
  };

  const handleIssue = (bookId) => {
    console.log(`Issued book with ID: ${bookId}`);
    toast.success('Book issued successfully');
  };

  return (
    <div className="bg-[#2b1700] min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6 text-[#fafafa] border-b-4 border-[#fafafa] pb-2">Available Books 📚</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <div 
            key={book._id} 
            className="border-4 border-[#D8CBC4] bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
          >
            <h2 className="text-xl text-[#4B2E2C] font-semibold"><strong>Book Name: </strong>{book.name}</h2>
            <p className="text-gray-700"><strong>Author:</strong> {book.author}</p>
            <p className="text-gray-700"><strong>Available:</strong> {book.available ? 'Yes' : 'No'}</p>
            <p className="text-gray-700"><strong>Rate Per Month:</strong> ₹{book.ratePerMonth}</p>
            <button 
              className={`mt-4 px-4 py-2 rounded text-white transition duration-300 ${book.available ? 'bg-[#4c3228] hover:shadow-[0_0_10px_rgba(255,165,0,0.8)]' : 'bg-gray-400'} hover:bg-[#A0522D]`}
              onClick={() => handleIssue(book._id)}
              disabled={!book.available}
            >
              {book.available ? 'Issue' : 'Not Available'}
            </button>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default BookList;
