import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/bestfictionalbooks.css'; // For styling
import { MdSentimentDissatisfied } from 'react-icons/md';
import {FaArrowLeft} from 'react-icons/fa';
import { FaSearch, FaHome, FaInfoCircle } from "react-icons/fa";

const bestFictionalBooks = [
  { name: "1984", author: "George Orwell" },
  { name: "To Kill a Mockingbird", author: "Harper Lee" },
  { name: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { name: "Pride and Prejudice", author: "Jane Austen" },
  { name: "Moby Dick", author: "Herman Melville" },
  { name: "War and Peace", author: "Leo Tolstoy" },
  { name: "The Catcher in the Rye", author: "J.D. Salinger" },
  { name: "The Hobbit", author: "J.R.R. Tolkien" },
  { name: "The Lord of the Rings", author: "J.R.R. Tolkien" },
  { name: "Crime and Punishment", author: "Fyodor Dostoevsky" },
  { name: "The Alchemist", author: "Paulo Coelho" },
  { name: "Brave New World", author: "Aldous Huxley" },
  { name: "Animal Farm", author: "George Orwell" },
  { name: "Jane Eyre", author: "Charlotte Bronte" },
  { name: "Wuthering Heights", author: "Emily Bronte" },
  { name: "Don Quixote", author: "Miguel de Cervantes" },
  { name: "Frankenstein", author: "Mary Shelley" },
  { name: "Dracula", author: "Bram Stoker" },
  { name: "The Odyssey", author: "Homer" },
  { name: "Les Misérables", author: "Victor Hugo" },
];

const BestFictionalBooks = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [priceRange, setPriceRange] = useState(1000);
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [
    selectedLanguage,
    priceRange,
    selectedRating,
    selectedAvailability,
    books,
  ]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/books");
      const matchedBooks = response.data.filter((book) =>
        bestFictionalBooks.some(
          (bestBook) =>
            bestBook.name.toLowerCase() === book.name.toLowerCase() &&
            bestBook.author.toLowerCase() === book.author.toLowerCase()
        )
      );
      setBooks(matchedBooks);
      setFilteredBooks(matchedBooks); // Initialize filtered books
    } catch (error) {
      console.error("Error fetching books:", error);
      toast.error("Failed to fetch books. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let updatedBooks = books;

    if (selectedLanguage) {
      updatedBooks = updatedBooks.filter(
        (book) => book.Language === selectedLanguage
      );
    }

    if (selectedRating) {
      updatedBooks = updatedBooks.filter((book) => book.star === selectedRating);
    }

    if (priceRange === 0) {
      // Prevent all books or show an empty list
      // Example:
      setFilteredBooks([]);
      return;
    }

    if (priceRange) {
      updatedBooks = updatedBooks.filter(
        (book) => book.ratePerMonth <= priceRange
      );
    }

    if (selectedAvailability) {
      updatedBooks = updatedBooks.filter((book) =>
        selectedAvailability === "available"
          ? book.available > 0
          : book.available === 0
      );
    }

    setFilteredBooks(updatedBooks);
  };

  const handleIssueBook = async (bookID) => {
    const userEmail = localStorage.getItem("loggedInUserEmail");
    if (!userEmail) {
      toast.error("Please log in to issue a book");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/issues/add",
        {
          userEmail,
          bookID,
        }
      );

      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.error === 'Book already issued by you and not yet returned') {
        toast.info('Book already issued by you and not yet returned');
      } else {
        toast.error('Failed to issue book');
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading books...</p>
      </div>
    );
  }
  const resetFilters = () => {
    setSelectedLanguage('');
    setPriceRange(1000);
    setSelectedRating('');
    setSelectedAvailability('');
    setFilteredBooks(books); // Reset the filtered books to all books
  };
  
    return (

      <div className="parent-container">
        <div className="container">
          {/* Sidebar Filter */}
          
          <div className="sidebar-filter" style={{ marginRight: '0px', height: '100vh' }}>
  <h2>Filter</h2>
  <div className="arrow-icon">
                    <a href="/books"><FaArrowLeft /></a>
                </div>
            <div className="filter-section">
              <h3>Language</h3>
              <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
                <option value="">All</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
              </select>
            </div>
    
            <div className="filter-section">
  <h3>Price</h3>
  <div className="price-container">
    {/* Price Slider */}
    <input
      type="range"
      min="0"
      max="1000"
      value={priceRange}
      onChange={(e) => {
        const value = parseInt(e.target.value, 10); // Ensure it's a number
        setPriceRange(value); // Update price range from slider
        applyFilters(); // Apply filters based on the new price
      }}
    />
    <span>₹{priceRange}</span>
  </div>

  {/* Price Input Box */}
  <div className="price-input">
    <label htmlFor="priceInput" className="sr-only">Price</label>
    <input
      id="priceInput"
      type="text" // Allow string input (e.g., with commas)
      value={priceRange === 0 ? "" : priceRange.toString()} // Convert price to string for display
      onChange={(e) => {
        let value = e.target.value;

        // Remove non-numeric characters (including commas)
        value = value.replace(/[^0-9]/g, "");

        // Update price range based on cleaned string input
        setPriceRange(value ? parseInt(value, 10) : 0); // Default to 0 if empty
        applyFilters(); // Apply filters based on new value
      }}
      onBlur={() => {
        // Optional: Apply any behavior when focus is lost (e.g., validate or format the number)
        applyFilters(); // Apply filters after focus out
      }}
      placeholder="Enter Price"
      className="price-textbox"
    />
  </div>
</div>

    
            <div className="filter-section">
              <h3>Rating</h3>
              <select value={selectedRating || ''} onChange={(e) => setSelectedRating(Number(e.target.value))}>
                <option value="">All Ratings</option>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>
    
            <div className="filter-section">
              <h3>Availability</h3>
              <select value={selectedAvailability} onChange={(e) => setSelectedAvailability(e.target.value)}>
                <option value="">All</option>
                <option value="available">Available</option>
                <option value="not-available">Not Available</option>
              </select>

            </div>
            <button onClick={resetFilters} className="reset-filters-btn">
  Reset Filters
</button>
          </div>
    
          {/* Best Fictional Books */}
          
          <div className="best-books-container">
          <h2 className="section-heading">Best Fictional Books</h2>
          <div className="best-main-books-container">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <div key={book._id} className="book-card-wide">
                  <div className="book-image-container">
                    <img
                      src={book.bookCoverImageUrl || "placeholder.jpg"}
                      alt={`${book.name} cover`}
                      className="book-cover-image-wide"
                    />
                  </div>
                  <div className="book-card-content-wide">
                    <h3 className="book-title-wide"><span>{book.name}</span>
                <FaInfoCircle
                  className="info-icon"
                  size={20}
                  title="Click for more info"
                  onClick={() => alert(`More info about ${book.name}`)}
                /></h3>
                    <p className="book-author-wide">{book.author}</p>
                    <p className="book-genre-wide">
                      <b>{book.genre}</b>
                    </p>
                    <div className="book-card-footer-wide">
                      <span className="book-price-wide">
                        ₹{book.ratePerMonth}
                      </span>
                      <span className="book-rating-wide">
                        {Array(book.star)
                          .fill("⭐")
                          .map((star, index) => (
                            <span key={index}>{star}</span>
                          ))}
                      </span>
                    </div>
                    <button
                      className="add-btn-wide"
                      disabled={book.available === 0}
                      onClick={() => handleIssueBook(book._id)}
                    >
                      {book.available > 0 ? "Issue" : "Not Available"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-books-container">
    <MdSentimentDissatisfied size={50} color="white" />
    <p className="no-books-message">Uh-Oh! No matching books found.</p>
  </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BestFictionalBooks;
