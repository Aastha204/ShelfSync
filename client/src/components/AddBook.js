import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams for dynamic routing
import { FaSearch } from "react-icons/fa"; 
import debounce from "lodash.debounce"; 
import "../styles/AddBook.css";

const BookManager = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [bookData, setBookData] = useState({
    name: "",
    author: "",
    available: "",
    ratePerMonth: "",
    bookCoverImageUrl: "",
    genre: "",
    Language: "English",
    star: "",
  });
  const [editing, setEditing] = useState(null);  // Keep track of the book being edited
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();  // Use useParams to get the book ID from the URL

  // Fetch all books and the book to edit (if in edit mode)
  useEffect(() => {
    if (id) {  // Check if we are editing a book
      fetchBookData(id);  // Fetch the book data based on ID
    }
    fetchBooks();  // Fetch all books
  }, [id]);

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/books");
      setBooks(response.data);
      setFilteredBooks(response.data); 
    } catch (error) {
      toast.error("Error fetching books");
    }
  };

  // Fetch specific book data by ID for editing
  const fetchBookData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/books/${id}`);
      setBookData(response.data);  // Populate the form with the book's existing data
      setEditing(id);  // Set the book as being edited
    } catch (error) {
      toast.error("Error fetching book data");
    }
  };

  // Handle book data (add or update)
  const handleAddOrUpdate = async () => {
    if (bookData.ratePerMonth < 0) {
      toast.error("Rate per month cannot be negative");
      return;
    }

    if (bookData.available < 0) {
      toast.error("Number of books available cannot be negative");
      return;
    }

    if (!validateStarRating(bookData.star)) {
      toast.error("Star rating must be between 0 and 5");
      return;
    }

    if (!validateAuthorName(bookData.author)) {
      toast.error("Author name should contain only letters and spaces");
      return;
    }

    try {
      if (editing) {
        const response = await axios.put(
          `http://localhost:3001/api/books/update/${editing}`,
          bookData
        );
        toast.success("Book updated successfully");
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book._id === editing ? response.data.book : book
          )
        );
        setEditing(null);
      } else {
        const response = await axios.post(
          "http://localhost:3001/api/books/add",
          bookData
        );
        toast.success("Book added successfully");
        setBooks([...books, response.data.book]);
      }
      resetForm();
    } catch (error) {
      toast.error("Error adding/updating book");
    }
  };

  // Reset form fields
  const resetForm = () => {
    setBookData({
      name: "",
      author: "",
      available: "",
      ratePerMonth: "",
      bookCoverImageUrl: "",
      genre: "",
      Language: "English",
      star: "",
    });
  };

  // Validation for star rating (must be between 0 and 5)
  const validateStarRating = (rating) => {
    return rating >= 0 && rating <= 5;
  };

  // Validate author name (only letters and spaces)
  const validateAuthorName = (name) => {
    return /^[a-zA-Z\s]+$/.test(name);
  };

  // Handle searching through books by name and author
  const handleSearch = debounce((e) => {
    const value = e.target.value.toLowerCase();
    setBookName(value);
    const filtered = books.filter(
      (book) =>
        book.name.toLowerCase().includes(value) ||
        book.author.toLowerCase().includes(value)
    );
    setFilteredBooks(filtered);
  }, 500);

  return (
    <div className="book-manager-container">
      <button onClick={() => navigate("/admin")} className="back-button">
        ←
      </button>
      <h1 className="book-manager-heading">Book Manager</h1>

      {/* Search Box */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name or author"
          value={bookName}
          onChange={handleSearch}
          className="search-box"
        />
        <FaSearch className="search-icon" />
      </div>

      {/* Book Form */}
      <div className="book-form-container">
        <div className="book-form-image">
          <img
            src="https://c1.wallpaperflare.com/preview/563/337/199/book-library-shelf-stack.jpg"
            alt="Book illustration"
          />
        </div>

        <div className="book-form">
          <h2 className="form-heading">
            <b>{editing ? "Edit Book" : "Add a New Book 🕮"}</b>
          </h2>
          <input
            type="text"
            placeholder="Book Name"
            value={bookData.name}
            onChange={(e) => setBookData({ ...bookData, name: e.target.value })}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Author"
            value={bookData.author}
            onChange={(e) =>
              setBookData({ ...bookData, author: e.target.value })
            }
            className="input-field"
          />
          <input
            type="number"
            placeholder="Rate Per Month"
            value={bookData.ratePerMonth}
            onChange={(e) =>
              setBookData({ ...bookData, ratePerMonth: e.target.value })
            }
            className="input-field"
          />
          <input
            type="text"
            placeholder="Book Cover Image URL"
            value={bookData.bookCoverImageUrl}
            onChange={(e) =>
              setBookData({ ...bookData, bookCoverImageUrl: e.target.value })
            }
            className="input-field"
          />
          <select
            value={bookData.genre}
            onChange={(e) =>
              setBookData({ ...bookData, genre: e.target.value })
            }
            className="input-field"
          >
            <option value="">Select Genre</option>
            <option value="Romance">Romance</option>
            <option value="Comics">Comics</option>
            <option value="Thriller">Thriller</option>
            <option value="History">History</option>
            <option value="Children">Children</option>
            <option value="Fiction">Fiction</option>
          </select>

          <select
            value={bookData.Language}
            onChange={(e) =>
              setBookData({ ...bookData, Language: e.target.value })
            }
            className="input-field"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </select>

          <input
            type="number"
            placeholder="Star Rating (0-5)"
            value={bookData.star}
            onChange={(e) => setBookData({ ...bookData, star: e.target.value })}
            className="input-field"
          />
          <input
            type="number"
            placeholder="Number of Book Available"
            value={bookData.available}
            onChange={(e) =>
              setBookData({ ...bookData, available: e.target.value })
            }
            className="input-field"
          />
          <button
            onClick={handleAddOrUpdate}
            className={`button ${editing ? "update-button" : "add-button"}`}
          >
            {editing ? "Update Book" : "Add Book"}
          </button>
        </div>
      </div>

      {/* Display Books */}
      <div className="book-list-container">
        {filteredBooks.map((book) => (
          <div key={book._id} className="book-card">
            <img
              src={book.bookCoverImageUrl}
              alt={book.name}
              className="book-image"
            />
            <div className="book-info">
              <h3>{book.name}</h3>
              <p>Author: {book.author}</p>
              <p>Genre: {book.genre}</p>
              <p>Available: {book.available}</p>
              <button
                onClick={() => navigate(`/edit-book/${book._id}`)}
                className="edit-button"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(book._id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
};

export default BookManager;
