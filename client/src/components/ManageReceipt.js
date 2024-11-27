import React, { useState, useEffect } from 'react';
import { FaDownload, FaEye, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import '../styles/ManageReceipt.css';
import '../styles/receipt.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const ManageReceipt = () => {
  const [receipts, setReceipts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem('loggedInUserEmail');
    if (userEmail) {
      axios
        .get(`http://localhost:3001/api/receipts/${userEmail}`)
        .then((response) => {
          setReceipts(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const downloadReceipt = (receipt) => {
    const receiptHTML = `
      <div style="
        font-family: 'Roboto', Arial, sans-serif;
        max-width: 520px;
        margin: 50px auto;
        padding: 25px 30px;
        border-radius: 16px;
        background-color: #f5f5dc; /* Beige background */
        color: #3e2723; /* Dark brown text for contrast */
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
      ">
        <!-- Header Section -->
        <div style="
          text-align: center;
          padding: 20px 0;
          border-bottom: 2px solid #8b5e3c;
          margin-bottom: 20px;
        ">
          <h2 style="
            font-size: 28px;
            color: #8b5e3c; /* Brown for the header */
            font-weight: bold;
            letter-spacing: 1px;
          ">📜 Library Receipt</h2>
          <p style="
            font-size: 14px;
            color: #6d4c41;
          ">Your trusted library partner</p>
        </div>
  
        <!-- Issued Information -->
        <div style="
          background: #faf3e0; /* Light beige for sections */
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 20px;
          border: 1px solid #8b5e3c;
        ">
          <p style="margin: 5px 0;">
            <strong>Issued By:</strong> ShelfSync Library
          </p>
          <p style="margin: 5px 0;">
            <strong>Borrower's Name:</strong> ${receipt.userName}
          </p>
          <p style="margin: 5px 0;">
            <strong>Receipt No:</strong> ${receipt.receiptNo}
          </p>
        </div>
  
        <!-- Book Details -->
        <div style="
          background: #fdf8f0; /* Subtle beige contrast */
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 20px;
          border: 1px solid #8b5e3c;
          box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
        ">
          <p style="margin: 8px 0;">
            📚 <strong>Book Name:</strong> ${receipt.bookName}
          </p>
          <p style="margin: 8px 0;">
            ✍️ <strong>Author:</strong> ${receipt.authorName || 'Unknown Author'}
          </p>
          <p style="margin: 8px 0;">
            🗓️ <strong>Issue Date:</strong> ${new Date(receipt.issueDate).toLocaleDateString()}
          </p>
          <p style="margin: 8px 0;">
            🗓️ <strong>Return Date:</strong> ${receipt.returnDate ? new Date(receipt.returnDate).toLocaleDateString() : 'Not Returned'}
          </p>
          <p style="margin: 8px 0;">
            💰 <strong>Price:</strong> ₹${receipt.price ? parseFloat(receipt.price).toFixed(2) : 'N/A'}
          </p>
        </div>
  
        <!-- Footer Section -->
        <div style="
          text-align: center; 
          border-top: 2px solid #8b5e3c; 
          padding-top: 15px;
        ">
          <p style="margin: 5px 0; font-size: 16px; color: #8b5e3c; font-weight: bold;">
            📍 Contact Us
          </p>
          <p style="margin: 5px 0; font-size: 14px;">Email: <strong>ShelfSync@gmail.com</strong> | Phone: <strong>+91 1234567890</strong></p>
          <p style="margin: 5px 0; font-size: 14px;">Chitkara University, Rajpura, Punjab</p>
        </div>
      </div>
    `;
  
    const options = {
      filename: `receipt_${receipt.receiptNo}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
    };
  
    html2pdf().set(options).from(receiptHTML).save();
  };
  
  
  
  
  const navigateHome = () => {
    navigate('/userprofile');
};  

  return (
    <div className="manage-receipt-container">
    <div
  style={{
    display: 'flex', // Use flexbox
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
    
  }}
>
    <div
  style={{
   
    backgroundColor: 'rgba(245, 245, 220, 0.4)', // Orange color with 70% opacity
    padding: '16px', // Equivalent to `p-4`
    borderRadius: '6px', // Equivalent to `rounded-lg`
    width:'80rem',
    justifyContent:'center',
    
  }}
> 
<button className="home-button" onClick={navigateHome}><FontAwesomeIcon icon={faUser} /> Profile</button>
  <h1
    className="text-5xl text-brown-800 text-center"
  >
    Manage receipt
    <p
          style={{
            fontSize: '1.25rem', // Font size for the paragraph
            color: '#7c2d12', // Muted brown for text
            lineHeight: '1.6', // Improve readability
          }}
        >
          Organize, track, and access all your receipts with ease. Review the
          details and maintain an organized record for your financial management.
        </p>
  </h1>
  
</div>
</div>
      {receipts.length > 0 ? (
        <div className="receipt-grid">
          {receipts.map((receipt) => (
            <div className="receipt-card" key={receipt.receiptNo}>
              <h3>Receipt #{receipt.receiptNo}</h3>
              <p><strong>Book Name:</strong> <span> {receipt.bookName}</span></p>
              <p><strong>Issued By:</strong> <span>{receipt.userName}</span></p>
              <p><strong>Issue Date:</strong> <span>{new Date(receipt.issueDate).toLocaleDateString()}</span></p>
              <p><strong>Return Date:</strong> <span>{receipt.returnDate ? new Date(receipt.returnDate).toLocaleDateString() : 'Not Returned'}</span></p>

              <div className="receipt-actions">
                <button
                  onClick={() => navigate(`/receipt/${receipt.receiptNo}`, { state: { receipt } })}
                  className="view-button"
                >
                  <FaEye size={20} /> View
                </button>
                
                <button onClick={() => downloadReceipt(receipt)} className="download-button">
                  <FaDownload size={20} /> Download
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No receipts found.</p>
      )}
    </div>
  );
};

export default ManageReceipt;
