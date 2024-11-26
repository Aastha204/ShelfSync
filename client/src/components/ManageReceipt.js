import React, { useState, useEffect } from 'react';
import { FaDownload, FaEye, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import '../styles/ManageReceipt.css';

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
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 2px solid #a0522d; border-radius: 8px;">
        <h2 style="text-align: center; color: #a0522d;">Receipt</h2>
        <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
          <div>
            <p><strong>From:</strong> ShelfSync Library</p>
            <p><strong>Receipt No:</strong> ${receipt.receiptNo}</p>
          </div>
          <div>
            <p><strong>Borrower's Name:</strong> ${receipt.userName}</p>
          </div>
        </div>
        <div style="margin-bottom: 20px;">
          <p><strong>Book Name:</strong> ${receipt.bookName}</p>
          <p><strong>Book Author:</strong> ${receipt.authorName || 'Unknown Author'}</p>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <div>
            <p><strong>Issue Date:</strong> ${new Date(receipt.issueDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p><strong>Return Date:</strong> ${
              receipt.returnDate ? new Date(receipt.returnDate).toLocaleDateString() : 'Not Returned'
            }</p>
          </div>
        </div>
        <hr style="margin: 20px 0; border-top: 2px solid #a0522d;" />
        <div style="text-align: center;">
          <p>ShelfSync@gmail.com</p>
          <p>+91 1234567890</p>
          <p>Chitkara University, Rajpura, Punjab</p>
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

  const deleteReceipt = (receiptNo) => {
    axios
      .delete(`http://localhost:3001/api/receipts/${receiptNo}`)
      .then(() => {
        setReceipts(receipts.filter((receipt) => receipt.receiptNo !== receiptNo));
      })
      .catch((error) => {
        console.error('Error deleting receipt:', error);
      });
  };

  return (
    <div className="manage-receipt-container">
      <h1>Manage Receipt</h1>
      {receipts.length > 0 ? (
        <div className="receipt-grid">
          {receipts.map((receipt) => (
            <div className="receipt-card" key={receipt.receiptNo}>
              <h3>Receipt #{receipt.receiptNo}</h3>
              <p><strong>Book Name:</strong> {receipt.bookName}</p>
              <p><strong>Issued By:</strong> {receipt.userName}</p>
              <p><strong>Issue Date:</strong> {new Date(receipt.issueDate).toLocaleDateString()}</p>
              <p><strong>Return Date:</strong> {receipt.returnDate ? new Date(receipt.returnDate).toLocaleDateString() : 'Not Returned'}</p>

              <div className="receipt-actions">
                <button
                  onClick={() => navigate(`/receipt/${receipt.receiptNo}`, { state: { receipt } })}
                  className="view-button"
                >
                  <FaEye size={20} /> View
                </button>
                <button onClick={() => deleteReceipt(receipt.receiptNo)} className="delete-button">
                  <FaTrashAlt size={20} /> Delete
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
