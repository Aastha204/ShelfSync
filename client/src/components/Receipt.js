import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/receipt.css';

const Receipt = () => {
  const [receipt, setReceipt] = useState(null); // State to store receipt details
  const { receiptNo } = useParams(); // Get receipt number from URL parameters
  const navigate = useNavigate(); // Use navigate hook to navigate to another page

  // Fetch receipt data when component mounts or receiptNo changes
  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/receipts/receipt/${receiptNo}`);
        console.log('Fetched receipt data:', response.data);
        setReceipt(response.data); // Update receipt state with fetched data
      } catch (error) {
        console.error('Error fetching receipt:', error);
      }
    };

    fetchReceipt();
  }, [receiptNo]);

  // Function to navigate to the issue page when close button is clicked
  const handleClose = () => {
    navigate('/issue'); // Navigate to the "issue" page (or replace with your route)
  };

  // Show a loading message until the receipt data is loaded
  if (!receipt) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-700">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brown-50 flex justify-center items-center py-10">
      <div className="bg-white w-full max-w-4xl md:max-w-2xl sm:max-w-md border-4 border-brown-600 rounded-lg shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white bg-brown-600 rounded-full p-2 hover:bg-brown-700 transition-all text-3xl"
        >
          &times;
        </button>

        {/* Header Section */}
        <div className="flex justify-between items-start sm:items-center flex-col sm:flex-row px-6 py-4 border-b-2 border-brown-600">
          <div>
            <h2 className="text-2xl font-bold text-brown-700">Receipt</h2>
            <p className="text-sm text-gray-500">Issued by:</p>
            <p className="text-sm text-gray-700">ShelfSync Library Management System</p>
          </div>
          <div className="text-right mt-4 sm:mt-0">
            <p className="text-sm text-gray-500">Receipt No.</p>
            <p className="text-sm text-gray-700 font-bold">{receipt.receiptNo}</p>
            <p className="text-sm text-gray-500 mt-2">Borrower Name</p>
            <p className="text-sm text-gray-700">{receipt.userName}</p>
          </div>
        </div>

        {/* Receipt Details */}
        <div className="px-6 py-4">
          <div className="mb-4">
            <label className="block text-sm text-gray-500">Book Name</label>
            <p className="border-b border-brown-400 w-full mt-2 text-gray-700">{receipt.bookName}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-500">Author Name</label>
            <p className="border-b border-brown-400 w-full mt-2 text-gray-700">{receipt.authorName}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-500">Issue Date</label>
              <p className="border-b border-brown-400 w-full mt-2 text-gray-700">
                {new Date(receipt.issueDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <label className="block text-sm text-gray-500">Return Date</label>
              <p className="border-b border-brown-400 w-full mt-2 text-gray-700">
                {receipt.returnDate
                  ? new Date(receipt.returnDate).toLocaleDateString()
                  : 'Not Returned'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="px-6 py-4 border-t-2 border-brown-600 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="text-sm text-gray-600">
            <p>Email: <a href="mailto:ShelfSync@gmail.com" className="text-brown-600">ShelfSync@gmail.com</a></p>
            <p>Phone: +91 1234567890</p>
            <p>Address: Chitkara University, Rajpura, Punjab</p>
          </div>
          <div className="text-right mt-4 sm:mt-0">
            <p className="font-semibold text-gray-600">Need Assistance?</p>
            <p className="text-sm text-brown-600">shelfSync.support@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
