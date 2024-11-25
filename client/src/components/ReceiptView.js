import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/receipt.css';

const ReceiptView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const receipt = location.state?.receipt; // Receipt data passed via navigation

  if (!receipt) {
    return <p className="text-center mt-10 text-red-600">Receipt not found.</p>;
  }

  return (
    <div className="min-h-screen bg-brown-500 flex justify-center items-center py-10">
      <div className="bg-white w-full max-w-4xl md:max-w-2xl sm:max-w-md border-4 border-brown-600 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-start sm:items-center flex-col sm:flex-row px-6 py-4 border-b-2 border-brown-600">
          <div>
            <h2 className="text-2xl font-bold text-brown-700">Receipt</h2>
            <p className="text-sm text-gray-500">From</p>
            <p className="text-sm text-gray-700">ShelfSync Library</p>
          </div>
          <div className="text-right mt-4 sm:mt-0">
            <p className="text-sm text-gray-500">Receipt No.</p>
            <p className="text-sm text-gray-700">{receipt.receiptNo}</p>
            <p className="text-sm text-gray-500 mt-2">Borrower's Name</p>
            <p className="text-sm text-gray-700">{receipt.userName}</p>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          <div className="mb-4">
            <label className="block text-sm text-gray-500">Book Name</label>
            <p className="border-b border-brown-400 w-full mt-2">{receipt.bookName}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-500">Book Author Name</label>
            <p className="border-b border-brown-400 w-full mt-2">{receipt.authorName || 'Unknown Author'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-500">Issue Date</label>
              <p className="border-b border-brown-400 w-full mt-2">
                {new Date(receipt.issueDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <label className="block text-sm text-gray-500">Return Date</label>
              <p className="border-b border-brown-400 w-full mt-2">
                {receipt.returnDate ? new Date(receipt.returnDate).toLocaleDateString() : 'Not Returned'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t-2 border-brown-600 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="text-sm text-gray-600">
            <p>ShelfSync@gmail.com</p>
            <p>+91 1234567890</p>
            <p>Chitkara University, Rajpura, Punjab</p>
          </div>
          <div className="text-right mt-4 sm:mt-0">
            <p className="font-semibold text-gray-700">Librarian Signature</p>
            <p className="border-b border-brown-400 w-40 mt-2"></p>
          </div>
        </div>
      </div>

      {/* Close Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ReceiptView;
