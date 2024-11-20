import React, { useState } from "react";
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

  const cards = [
    { 
      id: 'totalIssued', 
      image: '/images/book6.jpeg', 
      title: 'Total Issued Books', 
      description: 'Total Books Issued by you till now',
      bookNumber: '56' 
    },
    { 
      id: 'totalReturn', 
      image: '/images/book1.jpeg', 
      title: 'Total Return Book', 
      description: 'Total Return Books by you',
      bookNumber: '50'
    },
    { 
      id: 'currentIssued', 
      image: '/images/book4.jpeg', 
      title: 'Current Issued Book', 
      description: 'Currently Issued Books by you',
      bookNumber: '6'
    },
    { 
      id: 'dueBooks', 
      image: '/images/book9.jpeg', 
      title: 'Due Books', 
      description: 'Currently Due Books',
      bookNumber: '2'
    },
  ];

  const tableData = {
    totalIssued: [
      { sNo: 1, bookName: 'The Great Gatsby', authorName: 'F. Scott Fitzgerald', issueDate: '2024-08-01' },
      { sNo: 2, bookName: 'Harry Potter', authorName: 'J.K. Rowling', issueDate: '2024-07-10' },
    ],
    totalReturn: [
      { sNo: 1, bookName: 'The Great Gatsby', authorName: 'F. Scott Fitzgerald', returnDate: '2024-08-15' },
      { sNo: 2, bookName: 'Harry Potter', authorName: 'J.K. Rowling', returnDate: '2024-07-24' },
    ],
    currentIssued: [
      { sNo: 1, bookName: 'The Great Gatsby', authorName: 'F. Scott Fitzgerald', issueDate: '2024-08-01', returnDate: '2024-08-15' },
    ],
    dueBooks: [
      { sNo: 1, bookName: 'The Great Gatsby', authorName: 'F. Scott Fitzgerald', dueDate: '2024-08-15', fine: '10' },
    ],
  };

  const renderTable = () => {
    if (!selectedCard) return null;

    const columns = {
      totalIssued: ['S.No', 'Book Name', 'Author Name', 'Issue Date'],
      totalReturn: ['S.No', 'Book Name', 'Author Name', 'Return Date'],
      currentIssued: ['S.No', 'Book Name', 'Author Name', 'Issue Date', 'Return Date'],
      dueBooks: ['S.No', 'Book Name', 'Author Name', 'Due Date', 'Fine'],
    };

    const rows = tableData[selectedCard];

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
              <td>{row.sNo}</td>
              <td>{row.bookName}</td>
              <td>{row.authorName}</td>
              {row.issueDate && <td>{row.issueDate}</td>}
              {row.returnDate && <td>{row.returnDate}</td>}
              {row.dueDate && <td>{row.dueDate}</td>}
              {row.fine && <td>{row.fine}</td>}
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
      {renderTable()}
    </div>
  );
};

export default BookTracker;
