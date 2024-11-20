import React, { useState,useEffect } from "react";
import axios from "axios";
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
        </div>
      </div>
    </div>
  );
};

const BookTracker = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [cards, setCards] = useState([
    { 
      id: 'totalIssued', 
      image: '/images/book6.jpeg', 
      title: 'Total Issued Books', 
      description: 'Total Books Issued by you till now',
      bookNumber: 0 // Initially set to 0
    },
    { 
      id: 'totalReturn', 
      image: '/images/book1.jpeg', 
      title: 'Total Return Book', 
      description: 'Total Return Books by you',
      bookNumber: 0 // Initially set to 0
    },
    { 
      id: 'currentIssued', 
      image: '/images/book4.jpeg', 
      title: 'Current Issued Book', 
      description: 'Currently Issued Books by you',
      bookNumber: 0 // Initially set to 0
    },
  ]);

  const fetchBooks = async (endpoint) => {
    setLoading(true);
    const userId = localStorage.getItem('loggedInUserId');
    try {
      const { data } = await axios.get(`http://localhost:3001/api/bookTracker/${endpoint}/${userId}`);
      setTableData(data);

      setCards(prevCards =>
        prevCards.map(card =>
          card.id === endpoint
            ? { ...card, bookNumber: data.length } // Set the number of books for the selected section
            : card
        )
      );
    } catch (error) {
      console.error('Error fetching books:', error);
      setTableData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCard) {
      fetchBooks(selectedCard);
    }
  }, [selectedCard]);
  const columns = {
    totalIssued: ['S.No', 'Book Name', 'Author Name', 'Issue Date'],
    totalReturn: ['S.No', 'Book Name', 'Author Name', 'Return Date'],
    currentIssued: ['S.No', 'Book Name', 'Author Name', 'Issue Date'],
  // dueBooks: ['S.No', 'Book Name', 'Author Name', 'Due Date', 'Fine'],
};



  const renderTable = () => {
    if (!selectedCard) return null;

    

    return (
      <table className="book-table">
        <thead>
          <tr>
            {columns[selectedCard].map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.bookID.name}</td>
              <td>{row.bookID.author}</td>
              {row.issueDate && <td>{new Date(row.issueDate).toLocaleDateString()}</td>}
              {row.returnDate && <td>{new Date(row.returnDate).toLocaleDateString()}</td>}
            </tr>
          ))}
        </tbody>
      </table>
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
            onClick={() => setSelectedCard(card.id)} 
          />
        ))}
      </div>
      {loading ? <p>Loading...</p> : renderTable()}
    </div>
  );
};

export default BookTracker;