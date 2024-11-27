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
    <div className="min-h-screen flex flex-col justify-center items-center py-5 bg-custom">
      {/* Receipt Box */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => navigate(-1)}
          className="px-8 py-3 bg-brown-800 text-white rounded-lg shadow-md text-lg hover:bg-red-700"
        >
          Close
        </button>
      </div>
      <div className="bg-white w-full max-w-4xl md:max-w-3xl sm:max-w-lg border-4 border-brown-600 rounded-lg shadow-lg p-3">
        {/* Header */}
        <div className="flex justify-between items-start sm:items-center flex-col sm:flex-row border-b-2 border-brown-600 pb-4">
          
          <div>
            <h2 className="text-3xl font-extrabold text-brown-700">Receipt <br></br> from ShelfSync</h2>
           
          </div>
          <div className="text-right mt-6 sm:mt-0">
            <p className="text-base text-gray-500">Receipt No.</p>
            <p className="text-lg font-semibold text-gray-700">{receipt.receiptNo}</p>
            <p className="text-base text-gray-500 mt-4">Borrower's Name</p>
            <p className="text-lg font-semibold text-gray-700">{receipt.userName}</p>
          </div>
        </div>

        {/* Body */}
        <div className="py-6">
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-600">Book Name</label>
            <p className="text-lg text-gray-800 border-b border-brown-400 w-full mt-2">{receipt.bookName}</p>
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-600">Book Author Name</label>
            <p className="text-lg text-gray-800 border-b border-brown-400 w-full mt-2">{receipt.authorName || 'Unknown Author'}</p>
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-600">Price of Book</label>
            <p className="text-lg text-gray-800 border-b border-brown-400 w-full mt-2">{receipt.price || 'Not Available'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium text-gray-600">Issue Date</label>
              <p className="text-lg text-gray-800 border-b border-brown-400 w-full mt-2">
                {new Date(receipt.issueDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-600">Return Date</label>
              <p className="text-lg text-gray-800 border-b border-brown-400 w-full mt-2">
                {receipt.returnDate ? new Date(receipt.returnDate).toLocaleDateString() : 'Not Returned'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t-2 border-brown-600 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="text-base text-gray-600">
            <p>ShelfSync@gmail.com</p>
            <p>+91 1234567890</p>
            <p>Chitkara University, Rajpura, Punjab</p>
          </div>
          <div className="text-right mt-6 sm:mt-0">
            <p className="font-bold text-lg text-gray-700">Librarian Signature</p>
            <p className="border-b border-brown-400 w-48 mt-4"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;