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
  const [filter, setFilter] = useState("all"); // State for filter (all, available, not available)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBookId, setCurrentBookId] = useState(null);
  const [availableBooks, setAvailableBooks] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/books");
      setBooks(response.data);
      setSearchResults(response.data); // Initialize search results with all books
    } catch (error) {
      toast.error("Error fetching books");
    }
  };

  const handleRestockClick = (id) => {
    setCurrentBookId(id);
    setIsModalOpen(true);
  };

  const handleRestockUpdate = async () => {
    const count = parseInt(availableBooks, 10);

    if (isNaN(count) || count <= 0) {
      toast.error("Please enter a valid number");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3001/api/books/restock/${currentBookId}`, { available: count });
      toast.success("Books restocked successfully");
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === currentBookId ? { ...book, available: response.data.available } : book
        )
      );
      setIsModalOpen(false);
      setAvailableBooks("");
    } catch (error) {
      console.error("Error restocking books:", error.message);
      toast.error("Error restocking books");
    }
  };

  const debouncedSearch = debounce(async (name, author) => {
    if (!name.trim() && !author.trim()) {
      setSearchResults(applyFilter(books)); // Show filtered books if no search criteria
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
      setSearchResults(applyFilter(response.data)); // Apply filter on search results
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

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setSearchResults(applyFilter(books, newFilter)); // Apply filter on the current list of books
  };

  const applyFilter = (booksList, filterCriteria = filter) => {
    if (filterCriteria === "available") {
      return booksList.filter((book) => book.available > 0);
    } else if (filterCriteria === "notAvailable") {
      return booksList.filter((book) => book.available === 0);
    }
    return booksList; // If filter is "all", return the complete list
  };

  return (
    <div className="bg-[#2b1700] min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6 text-[#fafafa] border-b-4 border-[#fafafa] pb-2">
        All Books 📚
      </h1>

      <div className="filter-bar mb-4 flex items-center">
        <button
          className={`px-4 py-2 mr-2 rounded ${
            filter === "all" ? "bg-[#D8CBC4]" : "bg-[#4B2E2C] text-[#fafafa]"
          }`}
          onClick={() => handleFilterChange("all")}
        >
          All
        </button>
        <button
          className={`px-4 py-2 mr-2 rounded ${
            filter === "available" ? "bg-[#D8CBC4]" : "bg-[#4B2E2C] text-[#fafafa]"
          }`}
          onClick={() => handleFilterChange("available")}
        >
          Available
        </button>
        <button
          className={`px-4 py-2 rounded ${
            filter === "notAvailable"
              ? "bg-[#D8CBC4]"
              : "bg-[#4B2E2C] text-[#fafafa]"
          }`}
          onClick={() => handleFilterChange("notAvailable")}
        >
          Not Available
        </button>
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
                <div className="custom-button-group">
                  {book.available === 0 && (
                    <button
                      onClick={() => handleRestockClick(book._id)}
                      className="bg-green-600 text-white py-2 px-8 rounded hover:bg-green-700"
                      style={{ position: "absolute", bottom: "10px", right: "10px" }}
                    >
                      Restock
                    </button>
                  )}
                </div>
              </div>
            ))
          : !message && <p>No results found</p>}
      </div>

      {isModalOpen && (
        <div className="fixed p-60 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl text-black font-semibold mb-4">Update Available Books</h2>
            <input
              type="text"
              value={availableBooks}
              onChange={(e) => setAvailableBooks(e.target.value)}
              placeholder="Enter number of books"
              className="border p-2 rounded w-full mb-4"
            />
            <button
              onClick={handleRestockUpdate}
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 mr-2"
            >
              Update
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default BookList;
