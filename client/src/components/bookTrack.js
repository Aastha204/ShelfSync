import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEye } from "react-icons/fa";
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
          <div className="preview-icon-container">
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
  const [sortOrder, setSortOrder] = useState("asc");
  const [cards, setCards] = useState([
    {
      id: "totalIssued",
      image: "/images/book6.jpeg",
      title: "Total Issued Books",
      description: "Total Books Issued by you till now",
      bookNumber: 0,
    },
    {
      id: "totalReturn",
      image: "/images/book1.jpeg",
      title: "Total Returned Books",
      description: "Total Returned Books by you",
      bookNumber: 0,
    },
    {
      id: "currentIssued",
      image: "/images/book4.jpeg",
      title: "Currently Issued Books",
      description: "Currently Issued Books by you",
      bookNumber: 0,
    },
    {
      id: "duebooks",
      image: "/images/book4.jpeg",
      title: "Currently Due Books",
      description: "Currently Due Books by you",
      bookNumber: 0,
    },
  ]);

  const fetchBookCounts = async () => {
    const userId = localStorage.getItem("loggedInUserId");
    try {
      const endpoints = ["totalIssued", "totalReturn", "currentIssued", "duebooks"];
      const promises = endpoints.map((endpoint) =>
        axios.get(`http://localhost:3001/api/bookTracker/${endpoint}/${userId}`)
      );

      const results = await Promise.all(promises);

      const updatedCards = cards.map((card, index) => ({
        ...card,
        bookNumber: results[index].data.length,
      }));

      setCards(updatedCards);
    } catch (error) {
      console.error("Error fetching book counts:", error);
    }
  };

  const fetchBooks = async (endpoint) => {
    setLoading(true);
    const userId = localStorage.getItem("loggedInUserId");
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/bookTracker/${endpoint}/${userId}`
      );
      setTableData(data);
    } catch (error) {
      console.error(`Error fetching data for ${endpoint}:`, error);
      setTableData([]);
    } finally {
      setLoading(false);
    }
  };

  const sortData = (data, key) => {
    const sortedData = [...data].sort((a, b) => {
      const dateA = new Date(a[key]);
      const dateB = new Date(b[key]);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
    setTableData(sortedData);
  };

  useEffect(() => {
    fetchBookCounts();
    setSelectedCard("totalIssued"); // Initialize the default card
  }, []);

  useEffect(() => {
    if (selectedCard) {
      fetchBooks(selectedCard);
    }
  }, [selectedCard]);

  useEffect(() => {
    if (tableData.length > 0) {
      const dateFieldMap = {
        totalIssued: "issueDate",
        totalReturn: "returnDate",
        currentIssued: "issueDate",
        duebooks: "dueDate",
      };

      const sortKey = dateFieldMap[selectedCard];
      if (sortKey) {
        sortData(tableData, sortKey);
      }
    }
  }, [sortOrder]);

  const columns = {
    totalIssued: ["S.No", "Book Name", "Author Name", "Issue Date"],
    totalReturn: ["S.No", "Book Name", "Author Name", "Return Date"],
    currentIssued: ["S.No", "Book Name", "Author Name", "Issue Date", "Due Date"],
    duebooks: [
      "S.No",
      "Book Name",
      "Author Name",
      "Due Date",
      "Overdue Days",
      "Fine",
    ],
  };

  const renderTable = () => {
    if (!selectedCard) return null;

    const tableHeading = {
      totalIssued: "Total Issued Books Till Now",
      totalReturn: "Total Returned Books",
      currentIssued: "Currently Issued Books",
      duebooks: "Currently Due Books",
    }[selectedCard];

    return (
      <div className="table-container-booktrack">
        <h2 className="table-heading-booktrack">{tableHeading}</h2>

        <div className="sort-filter">
          <label htmlFor="sortOrder">Sort By Date:</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <table className="book-table">
          <thead>
            <tr>
              {columns[selectedCard].map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{row.name || row.bookID?.name || "N/A"}</td>
                  <td>{row.author || row.bookID?.author || "N/A"}</td>

                  {selectedCard === "currentIssued" && (
                    <>
                      <td>
                        {row.issueDate
                          ? new Date(row.issueDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td>
                        {row.dueDate
                          ? new Date(row.dueDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                    </>
                  )}

                  {selectedCard === "duebooks" && (
                    <>
                      <td>
                        {row.dueDate
                          ? new Date(row.dueDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td>{row.overdueDays || "N/A"}</td>
                      <td>{row.fine ? `₹${row.fine}` : "₹0"}</td>
                    </>
                  )}

                  {selectedCard !== "duebooks" &&
                    selectedCard !== "currentIssued" &&
                    row.issueDate && (
                      <td>
                        {row.issueDate
                          ? new Date(row.issueDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                    )}

                  {selectedCard === "totalReturn" && row.returnDate && (
                    <td>
                      {row.returnDate
                        ? new Date(row.returnDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns[selectedCard].length}>
                  No data available
                </td>
              </tr>
            )}
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
            onClick={() => setSelectedCard(card.id)}
          />
        ))}
      </div>
      {loading ? <p style={{ color: "white" }}>Loading...</p> : renderTable()}
    </div>
  );
};

export default BookTracker;
