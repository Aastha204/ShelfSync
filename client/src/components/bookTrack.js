import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEye } from 'react-icons/fa';
import "../styles/bookTrack.css";

const ImageCard = ({ image, title, description, bookNumber, onClick }) => {
  return (
    <div className="card-booktrack" onClick={onClick}>
      <img src={image} alt={title} className="card-booktrack-image" />
      <div className="card-booktrack-number">{bookNumber}</div>
      <div className="card-booktrack-overlay">
        <div className="card-booktrack-text">
          <h3 className="card-booktrack-title">{title}</h3>
          <p className="card-booktrack-description">{description}</p>
          {/* Use the Preview (Eye) Icon */}
          <div className="preview-icon-container" onClick={onClick}>
            <FaEye className="preview-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

const BookTracker = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Initialize cards with initial values from a backend call
  const [cards, setCards] = useState([
    { 
      id: 'totalIssued', 
      image: '/images/book6.jpeg', 
      title: 'Total Issued Books', 
      description: 'Total Books Issued by you till now',
      bookNumber: 0 // Placeholder value to be updated on data fetch
    },
    { 
      id: 'totalReturn', 
      image: '/images/book1.jpeg', 
      title: 'Total Return Book', 
      description: 'Total Return Books by you',
      bookNumber: 0 // Placeholder value to be updated on data fetch
    },
    { 
      id: 'currentIssued', 
      image: '/images/book4.jpeg', 
      title: 'Currently Issued Book', 
      description: 'Currently Issued Books by you',
      bookNumber: 0 // Placeholder value to be updated on data fetch
    },
    { 
      id: 'duebooks', 
      image: '/images/book4.jpeg', 
      title: 'Currently Due Book', 
      description: 'Currently Due Books by you',
      bookNumber: 0 // Placeholder value to be updated on data fetch
    },
  ]);

  const fetchBooks = async (endpoint) => {
    setLoading(true);
    const userId = localStorage.getItem('loggedInUserId');
    try {
      const { data } = await axios.get(`http://localhost:3001/api/bookTracker/${endpoint}/${userId}`);
      setTableData(data);

      // Update the card's book number based on fetched data for only the selected card
      setCards(prevCards =>
        prevCards.map(card =>
          card.id === endpoint
            ? { ...card, bookNumber: data.length } // Set the number of books for the selected section
            : card // Leave other cards unchanged
        )
      );
    } catch (error) {
      console.error('Error fetching books:', error);
      setTableData([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch books for all sections when the component mounts
  useEffect(() => {
    fetchBooks('totalIssued');
    fetchBooks('totalReturn');
    fetchBooks('currentIssued');
    fetchBooks('duebooks')
  }, []);

  const columns = {
    totalIssued: ['S.No', 'Book Name', 'Author Name', 'Issue Date'],
    totalReturn: ['S.No', 'Book Name', 'Author Name', 'Return Date'],
    currentIssued: ['S.No', 'Book Name', 'Author Name', 'Issue Date'],
    duebooks: ['S.No','Book Name', 'Author Name','Due Date','Overdue Days','Fine']
  };

  const renderTable = () => {
    if (!selectedCard) return null;

    // Render the heading dynamically based on the selected card
    const tableHeading = selectedCard === 'totalIssued'
      ? 'Total Issued Books Till Now'
      : selectedCard === 'totalReturn'
      ? 'Total Returned Books'
      : selectedCard==='duebooks'
      ? 'Total Due Books'
      : 'Currently Issued Books';

  
    console.log("Table Data for:", selectedCard, tableData); // Debugging
  
    return (
      <div className="table-container-booktrack">
         <h2 className="table-heading-booktrack">{tableHeading}</h2>
      {/* //   <table className="book-table">
      //     <thead>
      //       <tr>
      //         {columns[selectedCard].map((col, index) => (
      //           <th key={index}>{col}</th>
      //         ))}
      //       </tr>
      //     </thead>
      //     <tbody>
      //       {tableData.map((row, index) => (
      //         <tr key={index}>
      //           <td>{index + 1}</td>
      //           <td>{row.bookID.name}</td>
      //           <td>{row.bookID.author}</td>
      //           {row.issueDate && <td>{new Date(row.issueDate).toLocaleDateString()}</td>}
      //           {row.returnDate && <td>{new Date(row.returnDate).toLocaleDateString()}</td>}
      //         </tr>
      //       ))}
      //     </tbody>
      //   </table>
      // </div> */}
      <table className="book-table">
        <thead>
          <tr>
            {columns[selectedCard].map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.name || row.bookID.name || "N/A"}</td>
              <td>{row.author || row.bookID.author || "N/A"}</td>
              {selectedCard === 'duebooks' && row.dueDate && (
                <>
                  <td>{new Date(row.dueDate).toLocaleDateString()}</td>
                  <td>{row.overdueDays || "N/A"}</td>
                  <td>{row.fine ? `₹${row.fine}` : "₹0"}</td>
                </>
              )}
              {selectedCard !== 'duebooks' && row.issueDate && (
                <td>{new Date(row.issueDate).toLocaleDateString()}</td>
              )}
              {selectedCard === 'totalReturn' && row.returnDate && (
                <td>{new Date(row.returnDate).toLocaleDateString()}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    );
  };
  

  return (
    <div className="full-page-background">
      <div className="image-card-container">
        {cards.map((card) => (
          <ImageCard 
            key={card.id} 
            image={card.image} 
            title={card.title} 
            description={card.description} 
            bookNumber={card.bookNumber} 
            onClick={() => {
              setSelectedCard(card.id); // Set selected card
              fetchBooks(card.id); // Fetch books for the selected card
            }} 
          />
        ))}
      </div>
      {loading ? <p style={{color:"white"}}>Loading...</p> : renderTable()}
    </div>
  );
};

export default BookTracker;