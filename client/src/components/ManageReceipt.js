import React, { useState, useEffect } from "react";
import { FaDownload, FaEye, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import "../styles/ManageReceipt.css";
import "../styles/receipt.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const ManageReceipt = () => {
  const [receipts, setReceipts] = useState([]);
  const [filteredReceipts, setFilteredReceipts] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("loggedInUserEmail");
    if (userEmail) {
      axios
        .get(`http://localhost:3001/api/receipts/${userEmail}`)
        .then((response) => {
          setReceipts(response.data);
          setFilteredReceipts(response.data); // Set the filtered receipts initially to all receipts
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  useEffect(() => {
    let filtered = receipts;
    if (selectedMonth) {
      filtered = filtered.filter((receipt) => new Date(receipt.issueDate).getMonth() + 1 === parseInt(selectedMonth));
    }
    if (selectedYear) {
      filtered = filtered.filter((receipt) => new Date(receipt.issueDate).getFullYear() === parseInt(selectedYear));
    }
    setFilteredReceipts(filtered);
  }, [selectedMonth, selectedYear, receipts]);

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

  const navigateHome = () => {
    navigate("/userprofile");
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear; i >= 2000; i--) {
    years.push(i);
  }

  return (
    <div className="manage-receipt-container">
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ backgroundColor: "rgba(245, 245, 220, 0.4)", padding: "16px", borderRadius: "6px", width: "80rem", justifyContent: "center" }}>
          <button className="home-button" onClick={navigateHome}>
            <FontAwesomeIcon icon={faUser} /> Profile
          </button>
          <h1 className="text-5xl text-brown-800 text-center">
            Manage receipt
            <p style={{ fontSize: "1.25rem", color: "#7c2d12", lineHeight: "1.6" }}>
              Organize, track, and access all your receipts with ease. Review the details and maintain an organized record for your financial management.
            </p>
          </h1>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
        <select 
          value={selectedMonth} 
          onChange={(e) => setSelectedMonth(e.target.value)} 
          style={{ padding: '8px', borderRadius: '4px', width: '200px', fontWeight: 'bold' }}
        >
          <option value="">Select Month</option>
          {months.map((month, index) => (
            <option key={index} value={index + 1}>{month}</option>
          ))}
        </select>

        <select 
          value={selectedYear} 
          onChange={(e) => setSelectedYear(e.target.value)} 
          style={{ padding: '8px', borderRadius: '4px', width: '200px', fontWeight: 'bold' }}
        >
          <option value="">Select Year</option>
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <button
          onClick={() => {
            setSelectedMonth('');
            setSelectedYear('');
          }}
          style={{
            padding: '8px 16px', 
            borderRadius: '4px', 
            backgroundColor: '#8b5e3c', 
            color: 'white', 
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Reset Filter
        </button>
      </div>

      {filteredReceipts.length > 0 ? (
        <div className="receipt-grid">
          {filteredReceipts.map((receipt) => (
            <div className="receipt-card" key={receipt.receiptNo}>
              <h3>Receipt #{receipt.receiptNo}</h3>
              <p><strong>Book Name:</strong> <span> {receipt.bookName}</span></p>
              <p><strong>Issued By:</strong> <span>{receipt.userName}</span></p>
              <p><strong>Issue Date:</strong> <span>{new Date(receipt.issueDate).toLocaleDateString()}</span></p>
              <p><strong>Return Date:</strong> <span>{receipt.returnDate ? new Date(receipt.returnDate).toLocaleDateString() : "Not Returned"}</span></p>

              <div className="receipt-actions">
                <button
                  onClick={() =>
                    navigate(`/receipt/${receipt.receiptNo}`, {
                      state: { receipt },
                    })
                  }
                  className="view-button"
                >
                  <FaEye size={20} /> View
                </button>

                <button
                  onClick={() => downloadReceipt(receipt)}
                  className="download-button"
                >
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
