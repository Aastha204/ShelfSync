import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Import the search icon from react-icons
import debounce from "lodash.debounce"; // Import debounce from lodash
import "../styles/AddBook.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const BookManager = () => {
  const formRef = useRef(null);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [bookData, setBookData] = useState({
    name: "",
    author: "",
    description:"",
    available: "",
    ratePerMonth: "",
    bookCoverImageUrl: "",
    genre: "",
    Language: "English", // Default language choice
    star: "",
  });
  const [editing, setEditing] = useState(null);
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (bookName || authorName) {
      debouncedSearchBooks(bookName, authorName);
    } else {
      setFilteredBooks(books); // Reset to all books if no search query
    }
  }, [bookName, authorName, books]);

  const debouncedSearchBooks = debounce(async (name, author) => {
    if (!name.trim() && !author.trim()) {
      setFilteredBooks(books); // Show all books if no search criteria
      return;
    }

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
  }, 300);

  const handleBookNameChange = (e) => {
    const value = e.target.value;
    setBookName(value);
  };

  const handleAuthorNameChange = (e) => {
    const value = e.target.value;
    setAuthorName(value);
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/books");
      setBooks(response.data);
      setFilteredBooks(response.data); // Initialize filteredBooks
    } catch (error) {
      toast.error("Error fetching books");
    }
  };

  const validateAuthorName = (name) => /^[A-Za-z\s]+$/.test(name);
  const validateStarRating = (rating) => rating >= 0 && rating <= 5;

  const handleAddOrUpdate = async () => {
    if (bookData.ratePerMonth < 0) {
      toast.error("Rate per month cannot be negative");
      return;
    }

    if (bookData.available <= 0) {
      toast.error("Number of books available cannot be negative or zero");
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
      if (error.response?.data.message === "Book already exists") {
        toast.error("Book already exists");
      } else {
        toast.error("Error adding/updating book");
      }
    }
  };

  const resetForm = () => {
    setBookData({
      name: "",
      author: "",
      description:"",
      available: "",
      ratePerMonth: "",
      bookCoverImageUrl: "",
      genre: "",
      Language: "English",
      star: "",
    });
    formRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this book?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await axios.delete(`http://localhost:3001/api/books/delete/${id}`);
              toast.success("Book deleted successfully");
              setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
            } catch (error) {
              toast.error("Error deleting book");
            }
          },
        },
        {
          label: "No",
          onClick: () => {}, // No action
        },
      ],
    });
  };
  const handleEdit = (book) => {
    setEditing(book._id);
    setBookData({
      name: book.name,
      author: book.author,
      description:book.description,
      available: book.available,
      ratePerMonth: book.ratePerMonth,
      bookCoverImageUrl: book.bookCoverImageUrl,
      genre: book.genre,
      Language: book.Language || "English", // Default to English if Language is undefined
      star: book.star,
    });
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="book-manager-container">
      <button onClick={() => navigate("/admin")} className="back-button">
        ←
      </button>
      <h1 className="book-manager-heading">Book Manager</h1>

      <div ref={formRef} className="book-form-container">
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
            type="text"
            placeholder="description"
            value={bookData.description}
            onChange={(e) =>
              setBookData({ ...bookData, description: e.target.value })
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
            onWheel={(e) => e.target.blur()}
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
            onWheel={(e) => e.target.blur()}
          />
          <input
            type="number"
            placeholder="Number of Book Available"
            value={bookData.available}
            onChange={(e) =>
              setBookData({ ...bookData, available: e.target.value })
            }
            className="input-field"
            onWheel={(e) => e.target.blur()}
          />
          <button
            onClick={handleAddOrUpdate}
            className={`button ${editing ? "update-button" : "add-button"}`}
          >
            {editing ? "Update Book" : "Add Book"}
          </button>
        </div>
      </div>

      <div className="search-bar mb-7 flex items-center text-1xl font-bold mb-6 text-[brown] border-b-4 border-[brown] pb-2">
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
        <button className="search-button">
          <FaSearch
            className="text-[white] transform -translate-y-1"
            size={32}
          />
        </button>
      </div>

      <div className="book-list-container">
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
              <h3 className="custom-book-title">{book.name}</h3>
              <p className="custom-book-author">{book.author}</p>
              <p className="custom-book-genre-addbook">
                <b>{book.genre}</b>
              </p>
              <div className="custom-card-footer">
                <span className="custom-book-price">₹{book.ratePerMonth}</span>
                <span className="custom-book-rating">
                  {Array.from({ length: book.star }, (_, index) => (
                    <span key={index}>⭐</span>
                  ))}
                </span>
              </div>
            </div>
            <div className="custom-button-group">
              <button
                onClick={() => handleEdit(book)}
                className="bg-blue-500 text-white py-2 px-8 rounded hover:bg-blue-600"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(book._id)}
                className="bg-red-800 text-white py-2 px-8 rounded hover:bg-red-900"
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
