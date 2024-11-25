import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/book.css";
import { FaSearch, FaHome, FaInfoCircle } from "react-icons/fa";
import BookCards from "./cards";

const Filter = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [editing, setEditing] = useState(null);

  // Search states
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [message, setMessage] = useState("");

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("");
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
    selectedCategory,
    selectedLanguage,
    priceRange,
    selectedRating,
    selectedAvailability,
  ]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/books");
      setBooks(response.data);
      setFilteredBooks(response.data); // Initialize filteredBooks with all books
    } catch (error) {
      toast.error("Error fetching books");
    }
  };

  const debouncedSearch = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  };

  const searchBooks = async (name, author) => {
    if (!name.trim() && !author.trim()) {
      setFilteredBooks(books); // Show all books if no search criteria
      return;
    }

    setMessage("");
    try {
      const response = await axios.get(
        "http://localhost:3001/api/books/search",
        {
          params: { name, author },
        }
      );
      setFilteredBooks(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error.message);
    }
  };

  const debouncedSearchBooks = debouncedSearch(searchBooks, 300);

  const handleBookNameChange = (e) => {
    const value = e.target.value;
    setBookName(value);
    debouncedSearchBooks(value, authorName);
  };

  const handleAuthorNameChange = (e) => {
    const value = e.target.value;
    setAuthorName(value);
    debouncedSearchBooks(bookName, value);
  };

  const applyFilters = () => {
    let updatedBooks = books;

    if (selectedCategory) {
      updatedBooks = updatedBooks.filter(
        (book) => book.genre === selectedCategory
      );
    }

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

    if (selectedAvailability !== "") {
      updatedBooks = updatedBooks.filter((book) => {
        return selectedAvailability === "available"
          ? book.available > 0
          : book.available === 0;
      });
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

      // First toast: Success notification for book issuance
      toast.success(response.data.message);
      localStorage.setItem('currentReceipt', JSON.stringify(response.data.receipt));
    } catch (error) {
      console.error(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.error ===
          "Book already issued by you and not yet returned"
      ) {
        toast.info("Book already issued by you and not yet returned");
      } else {
        toast.error("Failed to issue book");
      }
    }
  };

  const resetFilters = () => {
    setSelectedCategory("");
    setSelectedLanguage("");
    setPriceRange(1000);
    setSelectedRating(null);
    setSelectedAvailability("");
    setFilteredBooks(books); // Reset the filtered books to all books
  };

  return (
    <div className="filter-page-container">
      {/* Sidebar Filter */}
      <div className="sidebar-filter">
        <h2>Filter</h2>
        <div className="home-icon">
          <a href="/">
            <FaHome />
          </a>
        </div>
        <div className="filter-section">
          <h3>By Category</h3>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {[
              "Fiction",
              "Romance",
              "Children",
              "Thriller",
              "History",
              "Comics",
            ].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-section">
          <h3>Language</h3>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
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






        {/* Rating Filter */}
        <div className="filter-section">
          <h3>Rating</h3>
          <select
            value={selectedRating || ""}
            onChange={(e) => setSelectedRating(Number(e.target.value))}
          >
            <option value="">All Ratings</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>

        {/* Availability Filter */}
        <div className="filter-section">
          <h3>Availability</h3>
          <select
            value={selectedAvailability}
            onChange={(e) => setSelectedAvailability(e.target.value)}
          >
            <option value="">All</option>
            <option value="available">Available</option>
            <option value="not-available">Not Available</option>
          </select>
        </div>
        <button onClick={resetFilters} className="reset-filters-btn">
          Reset Filters
        </button>
      </div>

      {/* Book List */}
      <div className="book-list-container">
        <div>
          <BookCards />
        </div>

        <div className="search-bar mb-6 flex items-center">
          <input
            type="text"
            placeholder="Book Name"
            value={bookName}
            onChange={handleBookNameChange}
            className="input-box mb-2 mr-2"
          />
          <input
            type="text"
            placeholder="Author Name"
            value={authorName}
            onChange={handleAuthorNameChange}
            className="input-box mb-2 mr-2"
          />
          <button
            onClick={() => debouncedSearchBooks(bookName, authorName)}
            className="search-icon"
          >
            <FaSearch
              className="text-[white] transform -translate-y-1"
              size={32}
            />
          </button>
        </div>

        {message && <p className="message text-[#ff0000]">{message}</p>}

        {filteredBooks.map((book) => (
          <div
            key={book._id}
            className={`custom-book-card ${
              book._id === editing ? "custom-highlighted" : ""
            }`}
          >
            <div className="custom-image-container">
              <img
                src={book.bookCoverImageUrl || "placeholder.jpg"}
                alt={`${book.name} cover`}
                className="custom-book-cover-image"
              />
            </div>
            <div className="custom-card-content">
              <h3 className="custom-book-title">
                <span>{book.name}</span>
                <FaInfoCircle
                  className="info-icon"
                  size={24}
                  title="Click for more info"
                  onClick={() => alert(`More info about ${book.name}`)}
                />
              </h3>

              <p className="custom-book-author">{book.author}</p>
              <p className="custom-book-genre">
                <b>{book.genre}</b>
              </p>
              <div className="custom-card-footer">
                <span className="custom-book-price">₹{book.ratePerMonth}</span>
                <span className="custom-book-rating">
                  {Array(book.star)
                    .fill("⭐")
                    .map((star, index) => (
                      <span key={index}>{star}</span>
                    ))}
                </span>
              </div>
              <button
                className="add-btn"
                disabled={book.available === 0}
                onClick={() => handleIssueBook(book._id)}
              >
                {book.available > 0 ? "Issue" : "Not Available"}
              </button>
            </div>
          </div>
        ))}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Filter;
