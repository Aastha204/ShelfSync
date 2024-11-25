// import React, { useState } from 'react';
// import '../styles/receipt.css';

// const ManageReceipt = () => {
//   const [showMore, setShowMore] = useState(false);
  
//   // State to manage cards in different sections
//   const [cards, setCards] = useState({
//     latest: Array.from({ length: 5 }, (_, index) => `https://img.freepik.com/free-vector/modern-flat-payment-receipt_23-2147911082.jpg`),
//     lastMonth: Array.from({ length: 4 }, (_, index) => `https://i.pinimg.com/736x/67/17/c6/6717c6a62cf3ff946827facba3387f80.jpg`),
//     threeMonth: Array.from({ length: 4 }, (_, index) => `/images/lastMonth.jpg`),
//     sixMonth: Array.from({ length: 4 }, (_, index) => `/images/sixmonth.jpg`),
//     lastYear: Array.from({ length: 4 }, (_, index) => `/images/lastyear.jpg`),
//   });

//   const handleViewMore = () => {
//     setShowMore(!showMore); // Toggle between showing more and less
//   };

//   const handleDelete = (section, index) => {
//     setCards((prevCards) => ({
//       ...prevCards,
//       [section]: prevCards[section].filter((_, i) => i !== index), // Remove the card
//     }));
//   };

//   // Generate the cards dynamically
//   const generateCards = (section, count, imageSrc) => (
//     cards[section].slice(0, count).map((imgSrc, index) => (
//       <div className="card-latest" key={index}>
//         <img src={imgSrc} alt={`Card ${index + 1}`} />
//         <div className="card-content">
//           <div className="button-container">
//             <button className="card-button view-button"><a href='/invoice'>View</a></button>
//             <button
//               className="card-button delete-button"
//               onClick={() => handleDelete(section, index)}
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       </div>
//     ))
//   );

//   return (
//     <div className="manage-receipt-container">
//       <h1 className="main-heading-latest">Manage Receipt</h1>
      
//       <div className="subheading-container">
//         <h2 className="subheading">Latest</h2>
//         <div className="card-row">
//           {generateCards('latest', 5)} {/* Latest section images */}
//         </div>
//       </div>
      
//       <div className="subheading-container">
//         <h2 className="subheading">Last Month</h2>
//         <div className="card-row">
//           {generateCards('lastMonth', showMore ? 11 : 5)} {/* Show more or less */}
//         </div>
//         <button className="view-more-button" onClick={handleViewMore}>
//           {showMore ? 'View Less' : 'View More'}
//         </button>
//       </div>

//       <div className="subheading-container">
//         <h2 className="subheading">Last Three Month</h2>
//         <div className="card-row">
//           {generateCards('threeMonth', showMore ? 11 : 5)} {/* Show more or less */}
//         </div>
//         <button className="view-more-button" onClick={handleViewMore}>
//           {showMore ? 'View Less' : 'View More'}
//         </button>
//       </div>

//       <div className="subheading-container">
//         <h2 className="subheading">Last Six Month</h2>
//         <div className="card-row">
//           {generateCards('sixMonth', showMore ? 11 : 5)} {/* Show more or less */}
//         </div>
//         <button className="view-more-button" onClick={handleViewMore}>
//           {showMore ? 'View Less' : 'View More'}
//         </button>
//       </div>

//       <div className="subheading-container">
//         <h2 className="subheading">Last Year</h2>
//         <div className="card-row">
//           {generateCards('lastYear', showMore ? 11 : 5)} {/* Show more or less */}
//         </div>
//         <button className="view-more-button" onClick={handleViewMore}>
//           {showMore ? 'View Less' : 'View More'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ManageReceipt;


import React, { useState, useEffect } from 'react';
import { FaDownload, FaEye } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import '../styles/ManageReceipt.css';
import '../styles/receipt.css';

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
    // HTML content for the receipt (same as ReceiptView)
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

    // Generate PDF
    const options = {
      filename: `receipt_${receipt.receiptNo}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
    };

    html2pdf()
      .set(options)
      .from(receiptHTML)
      .save();
  };

  return (
    <div className="manage-receipt-container">
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
