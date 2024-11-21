import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { debounce } from "lodash";
import { FaSearch } from "react-icons/fa"; // Import the search icon from react-icons
import "react-toastify/dist/ReactToastify.css";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/books");
      console.log(response.data); // Debug to check the response structure
      setBooks(response.data);
      setSearchResults(response.data); // Initialize search results with all books
    } catch (error) {
      toast.error("Error fetching books");
    }
  };

  const debouncedSearch = debounce(async (name, author) => {
    if (!name.trim() && !author.trim()) {
      setSearchResults(books); // Show all books if no search criteria
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
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error.message);
    }
  }, 300);

  const handleBookNameChange = (e) => {
    const value = e.target.value;
    setBookName(value);
    debouncedSearch(value, authorName);
  };

  const handleAuthorNameChange = (e) => {
    const value = e.target.value;
    setAuthorName(value);
    debouncedSearch(bookName, value);
  };

  const handleIssue = async (bookId) => {
    try {
      const userEmail = localStorage.getItem("loggedInUserEmail"); // Assuming email is saved in local storage
      if (!userEmail) {
        toast.error("User not logged in");
        return; // Exit if userEmail is not available
      }

      const payload = {
        userEmail,
        bookID: bookId,
      };
      console.log("Issuing Book with Payload:", payload); // Log the payload

      const response = await axios.post(
        "http://localhost:3001/api/issue/add",
        payload
      );
      console.log(response.data); // This will help you debug

      toast.success("Book issued successfully");
      fetchBooks(); // Refresh the list of books after issuing
    } catch (error) {
      toast.error("Error issuing book");
      console.error(
        "Error issuing book:",
        error.response ? error.response.data : error
      ); // More detailed error output
    }
  };

  return (
    <div className="bg-[#2b1700] min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6 text-[#fafafa] border-b-4 border-[#fafafa] pb-2">
        All Books 📚
      </h1>

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
          onClick={() => debouncedSearch(bookName, authorName)}
          className="search-icon"
        >
          <FaSearch
            className="text-[white] transform -translate-y-1"
            size={32}
          />
        </button>
      </div>

      {message && <p className="message text-[#ff0000]">{message}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {searchResults.length > 0
          ? searchResults.map((book) => (
              <div
                key={book._id}
                className="border-4 border-[#D8CBC4] bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
              >
                <h2 className="text-xl text-[#4B2E2C] font-semibold">
                  <strong>Book Name: </strong>
                  {book.name}
                </h2>
                <p className="text-gray-700">
                  <strong>Author:</strong> {book.author}
                </p>
                <p className="text-gray-700">
                  <strong>Available:</strong> {book.available}
                </p>
                <p className="text-gray-700">
                  <strong>Rate Per Month:</strong> ₹{book.ratePerMonth}
                </p>
              </div>
            ))
          : !message && <p>No results found</p>}
      </div>

      <ToastContainer />
    </div>
  );
};

export default BookList;
