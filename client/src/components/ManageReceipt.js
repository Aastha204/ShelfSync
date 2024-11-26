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
    // Updated HTML content for the receipt with improved styling
    const receiptHTML = `
      <div style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh; /* Full viewport height */
        background-color: #fff; /* White background for PDF */
      ">
        <div style="
          font-family: 'Roboto', Arial, sans-serif;
          max-width: 600px;
          padding: 30px;
          border: 2px solid #8b4513;
          border-radius: 10px;
          background-color: #fffaf0; /* Light beige background */
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        ">
          <h2 style="
            text-align: center;
            color: #8b4513;
            font-size: 28px;
            margin-bottom: 20px;
          ">
            📜 Receipt
          </h2>
  
          <!-- From and Borrower's Name Section -->
          <div style="
            margin-bottom: 20px;
            font-size: 16px;
            color: #333;
          ">
            <p><strong>From:</strong> ShelfSync Library</p>
            <p><strong>Borrower's Name:</strong> ${receipt.userName}</p>
            <p><strong>Receipt No:</strong> ${receipt.receiptNo}</p>
          </div>
  
          <!-- Book Information Section -->
          <div style="
            margin-bottom: 20px;
            font-size: 16px;
            color: #333;
          ">
            <p><strong>Book Name:</strong> ${receipt.bookName}</p>
            <p><strong>Book Author:</strong> ${receipt.authorName || 'Unknown Author'}</p>
          </div>
  
          <!-- Dates Section -->
          <div style="
            display: flex;
            justify-content: space-between;
            font-size: 16px;
            color: #333;
          ">
            <div>
              <p><strong>Issue Date:</strong> ${new Date(receipt.issueDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p><strong>Return Date:</strong> ${
                receipt.returnDate ? new Date(receipt.returnDate).toLocaleDateString() : 'Not Returned'
              }</p>
            </div>
          </div>
  
          <hr style="
            margin: 20px 0;
            border-top: 2px solid #8b4513;
          " />
  
          <!-- Footer Section with Contact Info -->
          <div style="
            text-align: center;
            font-size: 14px;
            color: #555;
          ">
            <p>ShelfSync@gmail.com</p>
            <p>+91 1234567890</p>
            <p>Chitkara University, Rajpura, Punjab</p>
          </div>
        </div>
      </div>
    `;
  
    // Generate PDF with html2pdf settings
    const options = {
      filename: `receipt_${receipt.receiptNo}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
      margin: [20, 20, 20, 20], // Add margin to the page
    };
  
    html2pdf()
      .set(options)
      .from(receiptHTML)
      .save();
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
