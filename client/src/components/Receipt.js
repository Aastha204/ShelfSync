import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/receipt.css';
import { FaDownload, FaEye, FaTrashAlt } from "react-icons/fa";
import html2pdf from "html2pdf.js";

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
  const downloadReceipt = (receipt) => {
    const receiptHTML = `
      <div style="font-family: 'Roboto', Arial, sans-serif; max-width: 520px; margin: 50px auto; padding: 25px 30px; border-radius: 16px; background-color: #f5f5dc; color: #3e2723; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);">
        <!-- Header Section -->
        <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #8b5e3c; margin-bottom: 20px;">
          <h2 style="font-size: 28px; color: #8b5e3c; font-weight: bold; letter-spacing: 1px;">📜 Library Receipt</h2>
          <p style="font-size: 14px; color: #6d4c41;">Your trusted library partner</p>
        </div>

        <!-- Issued Information -->
        <div style="background: #faf3e0; border-radius: 12px; padding: 15px; margin-bottom: 20px; border: 1px solid #8b5e3c;">
          <p style="margin: 5px 0;"><strong>Issued By:</strong> ShelfSync Library</p>
          <p style="margin: 5px 0;"><strong>Borrower's Name:</strong> ${receipt.userName}</p>
          <p style="margin: 5px 0;"><strong>Receipt No:</strong> ${receipt.receiptNo}</p>
        </div>

        <!-- Book Details -->
        <div style="background: #fdf8f0; border-radius: 12px; padding: 15px; margin-bottom: 20px; border: 1px solid #8b5e3c; box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);">
          <p style="margin: 8px 0;">📚 <strong>Book Name:</strong> ${receipt.bookName}</p>
          <p style="margin: 8px 0;">✍️ <strong>Author:</strong> ${receipt.authorName || "Unknown Author"}</p>
          <p style="margin: 8px 0;">🗓️ <strong>Issue Date:</strong> ${new Date(receipt.issueDate).toLocaleDateString()}</p>
          <p style="margin: 8px 0;">🗓️ <strong>Return Date:</strong> ${receipt.returnDate ? new Date(receipt.returnDate).toLocaleDateString() : "Not Returned"}</p>
          <p style="margin: 8px 0;">💰 <strong>Price:</strong> ₹${receipt.price ? parseFloat(receipt.price).toFixed(2) : "N/A"}</p>
        </div>

        <!-- Footer Section -->
        <div style="text-align: center; border-top: 2px solid #8b5e3c; padding-top: 15px;">
          <p style="margin: 5px 0; font-size: 16px; color: #8b5e3c; font-weight: bold;">📍 Contact Us</p>
          <p style="margin: 5px 0; font-size: 14px;">Email: <strong>ShelfSync@gmail.com</strong> | Phone: <strong>+91 1234567890</strong></p>
          <p style="margin: 5px 0; font-size: 14px;">Chitkara University, Rajpura, Punjab</p>
        </div>
      </div>
    `;

    const options = {
      filename: `receipt_${receipt.receiptNo}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(receiptHTML).save();
  };


  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-5 bg-custom">
      {/* Receipt Box */}
      <div className="absolute top-4 right-4 flex gap-4 justify-end w-full">
        {/* Download Button */}
        <button
          onClick={() => downloadReceipt(receipt)}
          className="px-8 py-3 bg-brown-800 text-white rounded-lg shadow-md text-lg hover:bg-green-700 flex items-center gap-2"
        >
          <span>Download</span>
          <FaDownload size={20} />
        </button>

        {/* Close Button */}
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
