import React from "react";
import "../styles/bookTrack.css";

const ImageCard = ({ image, title, description, bookNumber }) => {
  return (
    <div className="card-booktrack">
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
  const cards = [
    { 
      image: '/images/book6.jpeg', 
      title: 'Total Issued Books', 
      description: 'Total Books Issued by you till now',
      bookNumber: '56' 
    },
    { 
      image: '/images/book1.jpeg', 
      title: 'Total Return Book', 
      description: 'Total Return Books by you',
      bookNumber: '50'
    },
    { 
      image: '/images/book4.jpeg', 
      title: 'Current Issued Book', 
      description: 'Currently Issued Books by you',
      bookNumber: '6'
    },
    { 
      image: '/images/book9.jpeg', 
      title: 'Due Books', 
      description: 'Currently Due Books',
      bookNumber: '2'
    },
  ];

  const tableData = [
    { 
      sNo: 1, 
      bookName: 'The Great Gatsby', 
      authorName: 'F. Scott Fitzgerald', 
      type: 'Fiction', 
      issueDate: '2024-08-01', 
      dueDate: '2024-08-15', 
      fine: '0'
    },
    { 
      sNo: 2, 
      bookName: 'Harry Potter', 
      authorName: 'J.K Rowling', 
      type: 'Fiction', 
      issueDate: '2024-07-10', 
      dueDate: '2024-07-24', 
      fine: '2'
    },
    // Add more rows as needed
  ];

  return (
    <div className="full-page-background">
      <div className="image-card-container">
        {cards.map((card, index) => (
          <ImageCard 
            key={index} 
            image={card.image} 
            title={card.title} 
            description={card.description} 
            bookNumber={card.bookNumber} 
          />
        ))}
      </div>

      <table className="book-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Book Name</th>
            <th>Author Name</th>
            <th>Type</th>
            <th>Issue Date</th>
            <th>Due Date</th>
            <th>Fine</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.sNo}</td>
              <td>{row.bookName}</td>
              <td>{row.authorName}</td>
              <td>{row.type}</td>
              <td>{row.issueDate}</td>
              <td>{row.dueDate}</td>
              <td>{row.fine}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTracker;
