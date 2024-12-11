import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/bestfictionalbooks.css';
import { MdSentimentDissatisfied } from 'react-icons/md';
import { FaArrowLeft } from 'react-icons/fa';
import { FaInfoCircle } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const BestSellerBooks = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [priceRange, setPriceRange] = useState(1000);
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');

  // New state for modal visibility and content
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/issues/bestsellers');
        if (response.data && Array.isArray(response.data)) {
          setBooks(response.data);
          setFilteredBooks(response.data);  // Set initial filtered books as all fetched books
        } else {
          toast.error('Invalid response format');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bestsellers:', error);
        toast.error('Failed to load bestsellers');
        setLoading(false);
      }
    };

    fetchBestSellers();
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

  // useEffect(() => {
  //   const applyFilters = () => {
  //     let updatedBooks = books;

  //     if (selectedCategory) {
  //       updatedBooks = updatedBooks.filter((book) => book.genre === selectedCategory);
  //     }

  //     if (selectedLanguage) {
  //       updatedBooks = updatedBooks.filter((book) => book.Language === selectedLanguage);
  //     }

  //     if (selectedRating) {
  //       updatedBooks = updatedBooks.filter((book) => book.star === selectedRating);
  //     }

  //     if (priceRange) {
  //       updatedBooks = updatedBooks.filter((book) => book.ratePerMonth <= priceRange);
  //     }

  //     if (selectedAvailability) {
  //       updatedBooks = updatedBooks.filter((book) =>
  //         selectedAvailability === 'available' ? book.available > 0 : book.available === 0
  //       );
  //     }

  //     setFilteredBooks(updatedBooks);
  //   };

  //   applyFilters();
  // }, [books, selectedCategory, selectedLanguage, priceRange, selectedRating, selectedAvailability]);

  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedLanguage('');
    setPriceRange(1000);
    setSelectedRating('');
    setSelectedAvailability('');
    setFilteredBooks(books);
  };

  const handleNewIssueBook = async (bookID) => {
    const userEmail = localStorage.getItem("loggedInUserEmail");
    const userId = localStorage.getItem("loggedInUserId");
    if (!userId) {
      toast.error("Please log in to issue a book");
      return;
    }

    try {
      // Create a Razorpay order
      const { data } = await axios.post(
        "http://localhost:3001/api/payment/orders",
        { bookId: bookID, userId }
      );

      const options = {
        key: process.env.KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: data.book.name,
        description: "Book Issue Fee",
        image: data.book.bookCoverImageUrl,
        order_id: data.order.id,
        handler: async (response) => {
          try {
            const verifyUrl = "http://localhost:3001/api/payment/verify";
            const { data: verifyResponse } = await axios.post(verifyUrl, {
              ...response,
              bookId: bookID,
              userId,
            });
            toast.success(verifyResponse.message);

            try {
              const response = await axios.post(
                "http://localhost:3001/api/issues/add",
                {
                  userEmail,
                  bookID, // Ensure this is the correct ID of the book
                }
              );

              toast.success(response.data.message);
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
          } catch (error) {
            console.error(error);
            toast.error("Failed to verify payment");
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);
      toast.error("Failed to initiate payment");
    }
  };

  const handleIssueBook = async (bookID) => {
    const userEmail = localStorage.getItem('loggedInUserEmail');
    if (!userEmail) {
      toast.error('Please log in to issue a book');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/issues/alreadyIssued', {
        userEmail,
        bookID, // Ensure this is the correct ID of the book
      });

      toast.success(response.data.message);
      handleNewIssueBook(bookID);

    } catch (error) {
      console.error(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.error === 'Book already issued by you and not yet returned'
      ) {
        toast.info('Book already issued by you and not yet returned');
      } else {
        toast.error('Failed to issue book');
      }
    }
  };

  // Function to open the modal with book info
  const openModal = (book) => {
    setModalContent(book);
    setModalVisible(true);
  };

  // Close the modal
  const closeModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  if (loading) {
    return <p>Loading books...</p>;
  }

  return (
    <div className="parent-container">
      <ToastContainer />
      <div className="container">
        {/* Sidebar Filter */}
        <div className="sidebar-filter">
          <h2>Filter</h2>
          <div className="arrow-icon">
            <a href="/books"><FaArrowLeft /></a>
          </div>
          <div className="filter-section">
            <h3>By Category</h3>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">All Categories</option>
              {['Fiction', 'Romance', 'Children', 'Thriller', 'History', 'Comics'].map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
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
          <button onClick={resetFilters} className="reset-filters-btn">Reset Filters</button>
        </div>

        {/* Book Cards */}
        <div className="best-books-container">
          <h2 className="section-heading">Best Seller Books</h2>
          <div className="best-main-books-container">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <div key={book._id} className="book-card-wide">
                  <div className="book-image-container">
                    <img
                      src={book.bookCoverImageUrl || 'placeholder.jpg'}
                      alt={`${book.name} cover`}
                      className="book-cover-image-wide"
                    />
                  </div>
                  <div className="book-card-content-wide">
                    <h3 className="book-title-wide">
                      <span>{book.name}</span>
                      <FaInfoCircle
                        className="info-icon"
                        size={20}
                        title="Click for more info"
                        onClick={() => openModal(book)} // Open modal with book details
                      />
                    </h3>
                    <p className="book-author-wide">{book.author}</p>
                    <p className="book-genre-wide"><b>{book.genre}</b></p>
                    <div className="book-card-footer-wide">
                      <span className="book-price-wide">₹{book.ratePerMonth}</span>
                      <span className="book-rating-wide">
                        {Array(book.star).fill('⭐').map((star, index) => (
                          <span key={index}>{star}</span>
                        ))}
                      </span>
                    </div>
                    <button
                      className="add-btn-wide"
                      disabled={book.available === 0}
                      onClick={() => handleIssueBook(book._id)}
                    >
                      {book.available > 0 ? 'Issue' : 'Not Available'}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-books-found">
                <MdSentimentDissatisfied />
                <p>No books found for this category!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Book Info */}
      {modalVisible && (
        <div className="modal">
          
            <div className="modal-left">
              <img
                src={modalContent.bookCoverImageUrl || 'placeholder.jpg'}
                alt={modalContent.name}
                className="modal-book-image"
              />
            </div>
            <div className="modal-right">
              <h1>{modalContent.name}</h1>
              <h3>{modalContent.author}</h3>
              <h5>{modalContent.genre}</h5>
              <p>{modalContent.description}</p>
              <p>₹{modalContent.ratePerMonth}</p>
              <p> {Array(modalContent.star).fill('⭐').map((star, index) => (
                <span key={index}>{star}</span>
              ))}</p>
              <button onClick={() => handleIssueBook(modalContent._id)} className="issue-btn">
                Issue Book
              </button>
            </div>
            <button onClick={closeModal} className="close-modal-btn">
            <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        
      )}
    </div>
  );
};

export default BestSellerBooks;
