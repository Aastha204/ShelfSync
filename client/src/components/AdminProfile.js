import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { useNavigate } from "react-router-dom";
import "../styles/AdminProfile.css";
import { ToastContainer } from "react-toastify";
import { handleSuccess } from "./utils";
import Create from './Create';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';
import '../styles/create.css'; 
import Dashboard from './Dashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";

const AdminProfilePage = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [contactMessages, setContactMessages] = useState([]);
  const [books, setBooks] = useState([]);
  const [bookForm, setBookForm] = useState({
    name: "",
    author: "",
    genre: "",
    isbn: "",
    yearPublished: "",
    image: null,
  });
  const [showAddBookForm, setShowAddBookForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [issueReturnData, setIssueReturnData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [recentlyDeleted, setRecentlyDeleted] = useState(null);

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({
    totalBooks: 0,
    booksIssued: 0,
    booksReturned: 0,
    booksLeft: 0,
  });

  const [todos, setTodos] = useState([]);
  // const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/todos/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (id) => {
    axios
      .put(`http://localhost:3001/todos/update/${id}`)
      .then((response) => {
        setTodos(todos.map((t) => (t._id === id ? { ...t, done: true } : t)));
      })
      .catch((err) => console.error("Update error:", err));
  };

  const handleDeletetask = (id) => {
    setTaskToDelete(id); // Set the task to be deleted
    setShowDeleteConfirm(true); // Show the delete confirmation modal
  };
  const confirmDeletetask = () => {
    axios
      .delete(`http://localhost:3001/todos/delete/${taskToDelete}`)
      .then((result) => {
        // Update the todo list after successful deletion
        setTodos(todos.filter((todo) => todo._id !== taskToDelete));
        setShowDeleteConfirm(false);
        setTaskToDelete(null);
        // Show the success toast without render
        toast.success("Task deleted!", {
          autoClose: 5000, // Optional: controls how long the toast is visible
        });
      })
      .catch((err) => console.log(err));
  };

  const undoDeletetask = () => {
    axios
      .post("http://localhost:3001/todos/undo")
      .then((result) => {
        setTodos([...todos, result.data.task]); // Add restored task back to list
        toast.success("Task restored successfully!");
      })
      .catch((err) => console.log(err));
  };
  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  useEffect(() => {
    // Fetch the dashboard data when the component mounts
    axios
      .get("http://localhost:3001/api/dashboard") // Replace with your server base URL if needed
      .then((response) => {
        setDashboardData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, []);

  const [loggedInAdminName, setLoggedInAdminName] = useState("");
  const [loggedInAdminEmail, setLoggedInAdminEmail] = useState("");

  useEffect(() => {
    const adminName = localStorage.getItem("loggedInAdminName");
    const adminEmail = localStorage.getItem("loggedInAdminEmail");
    setLoggedInAdminName(adminName || "");
    setLoggedInAdminEmail(adminEmail || "");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInAdminName");
    localStorage.removeItem("loggedInAdminEmail");
    handleSuccess("Admin Logged Out");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setBookForm((prevForm) => ({
      ...prevForm,
      image: e.target.files[0],
    }));
  };

  const handleRespond = (message) => {
    // Open default email client with the recipient's email
    window.location.href = `mailto:${message.sender_email}`;

    // Update the status to 'Responded' after email is sent
    axios
      .put(`http://localhost:3001/api/contact/messages/${message._id}`, {
        status: "Responded",
      })
      .then(() => {
        setContactMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg._id === message._id ? { ...msg, status: "Responded" } : msg
          )
        );
      })
      .catch((error) => console.error("Error updating message status:", error));
  };
  const [filterStatus, setFilterStatus] = useState("All");

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  const filteredContactMessages = contactMessages.filter((message) => {
    if (filterStatus === "All") return true;
    return filterStatus === "Responded"
      ? message.status === "Responded"
      : message.status !== "Responded";
  });

  const handleAddBook = () => {
    if (
      !bookForm.name ||
      !bookForm.author ||
      !bookForm.genre ||
      !bookForm.isbn ||
      !bookForm.yearPublished ||
      !bookForm.image
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const newBooks =
      editingIndex !== null
        ? books.map((book, index) => (index === editingIndex ? bookForm : book))
        : [...books, bookForm];

    setBooks(newBooks);
    setBookForm({
      name: "",
      author: "",
      genre: "",
      isbn: "",
      yearPublished: "",
      image: null,
    });
    setShowAddBookForm(false);
    setEditingIndex(null);
  };

  const handleEditBook = (index) => {
    setEditingIndex(index);
    setBookForm(books[index]);
    setShowAddBookForm(true);
  };

  const handleDeleteBook = (index) => {
    setShowDeleteConfirm(true);
    setBookToDelete(index);
  };

  const confirmDelete = () => {
    const deletedBook = books[bookToDelete];
    const newBooks = books.filter((_, i) => i !== bookToDelete);
    setBooks(newBooks);
    setRecentlyDeleted(deletedBook);
    setShowDeleteConfirm(false);
    setBookToDelete(null);

    setTimeout(() => {
      setRecentlyDeleted(null);
    }, 5000);
  };

  const undoDelete = () => {
    if (recentlyDeleted) {
      setBooks([...books, recentlyDeleted]);
      setRecentlyDeleted(null);
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // useEffect(() => {
  //   if (activeSection === "dashboard") {
  //     const ctx = document.getElementById("dashboardChart").getContext("2d");
  //     new Chart(ctx, {
  //       type: "bar",
  //       data: {
  //         labels: [
  //           "Total Books",
  //           "Books Issued",
  //           "Books Returned",
  //           "Books Left",
  //         ],
  //         datasets: [
  //           {
  //             label: "Library Analytics",
  //             data: [
  //               dashboardData.totalBooks,
  //               dashboardData.booksIssued,
  //               dashboardData.booksReturned,
  //               dashboardData.booksLeft,
  //             ],
  //             backgroundColor: ["#8d6e63", "#a1887f", "#bcaaa4", "#d7ccc8"],
  //             borderColor: "#4a3f35",
  //             borderWidth: 2,
  //           },
  //         ],
  //       },
  //       options: {
  //         responsive: true,
  //         plugins: {
  //           legend: {
  //             position: "top",
  //           },
  //         },
  //       },
  //     });
  //   }
  // }, [activeSection]);

  const handleAddBookClick = () => {
    setShowAddBookForm(true);
  };

  useEffect(() => {
    if (activeSection === "UserQueries") {
      axios
        .get("http://localhost:3001/api/contact/messages")
        .then((response) => setContactMessages(response.data))
        .catch((error) =>
          console.error("Error fetching contact messages:", error)
        );
    }
  }, [activeSection]);


  const [issueFilterStatus,setIssueFilterStatus]=useState('issued');
  
  const fetchBooks = (status) => {
    let url = "";
    if (activeSection === "issueReturn") {
      // Depending on the status, adjust the URL accordingly
      url = `http://localhost:3001/api/issues/getBooks?status=${status}`;
    }
    // Add more conditions if you have other sections for fetching data

    // Fetch data only if URL is set
    if (url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => setIssueReturnData(data))
        .catch((error) => console.error("Error fetching books:", error));
    }
  };

  // UseEffect to fetch books data based on activeSection
  useEffect(() => {
    if (activeSection === "issueReturn") {
      fetchBooks(issueFilterStatus); // Initial fetch to get all books
    }
    // Add other conditions for fetching data for different activeSections if necessary
  }, [activeSection, issueFilterStatus]);

  return (
    <div className="admin-container">
      <div className="sidebar1">
        <ul className="nav-list">
          <img
            src="/images/logo1.png"
            alt="Logo"
            className="userprofile-logo"
          />
          <li>
          <a href="/">Home</a>
          </li>
          <li
            onClick={() => handleSectionClick("profile")}
            className={activeSection === "profile" ? "active" : ""}
          >
            Admin Profile
          </li>
          <li
            onClick={() => handleSectionClick("dashboard")}
            className={activeSection === "dashboard" ? "active" : ""}
          >
            Dashboard
          </li>
          {/* <li onClick={() => handleSectionClick('bookManagement')} className={activeSection === 'bookManagement' ? 'active' : ''}>
            Book Management
          </li> */}
          <li>
            <a href="/add">Book Management</a>
          </li>
          <li>
            <a href="/booklist">BookList</a>
          </li>
          <li
            onClick={() => handleSectionClick("issueReturn")}
            className={activeSection === "issueReturn" ? "active" : ""}
          >
            Issue & Return
          </li>
          <li
            onClick={() => handleSectionClick("UserQueries")}
            className={activeSection === "UserQueries" ? "active" : ""}
          >
            User Queries
          </li>
          <li>
      <button onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
      </button>
    </li>
        </ul>
      </div>

      <div className="content">
        {activeSection === "profile" && (
          <div className="profile-section">
            <h2 className="section-title">Admin Profile</h2>
            <div className="profile-content">
              <div className="profile-img-box">
                <img
                  src="https://t3.ftcdn.net/jpg/05/22/57/00/360_F_522570005_1Awl2mMScnQUJ99ZJuaof9Psr2Qp33w7.jpg"
                  alt="Admin Profile"
                  className="profile-img"
                />
              </div>
              <div className="profile-details">
                <h3>Name: {loggedInAdminName}</h3>
                <p>Email: {loggedInAdminEmail}</p>
                {/* <p>Age: 20</p>
                <p>Contact: +1234567890</p>
                <p>Address: 123 Library Lane, City, Country</p>
                <h4>Date of Birth: 01/01/1989</h4> */}
              </div>
            </div>

            {/* To-Do List Section */}
            <div className="home1">
              <p className="text-white text-4xl font-bold typewriter">
                Forgot a task? Write it down before it slips away!
              </p>
              <Create onTaskAdded={addTodo} />
              {todos.map((todo) => (
                <div className="todo-card" key={todo._id}>
                  <h3 className={todo.done ? "line-through" : ""}>
                    {todo.task}
                  </h3>
                  <p>{todo.description || "No Description Provided"}</p>
                  <div className="actions">
                    <BsFillCheckCircleFill
                      className={`icon1 check ${todo.done ? "completed" : ""}`}
                      onClick={() => handleEdit(todo._id)}
                    />
                    {/* Uncomment if edit functionality is needed */}
                    {/* <BsPencilSquare
                className="icon1 edit"
                onClick={() => handleEdit(todo)}
              /> */}
                    <BsFillTrashFill
                      className="icon1 delete"
                      onClick={() => handleDeletetask(todo._id)}
                    />
                  </div>
                </div>
              ))}

              <div>
                {/* Delete Confirmation Modal */}
                {showDeleteConfirm && (
                  <div className="delete-modal">
                    <div className="modal-content">
                      <p>Are you sure you want to delete this task?</p>
                      <div className="modal-buttons">
                        <button className="btn-yes" onClick={confirmDeletetask}>
                          Yes
                        </button>
                        <button
                          className="btn-no"
                          onClick={() => setShowDeleteConfirm(false)}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeSection === "dashboard" && (
          <div className="dashboard-section">
            <Dashboard/>
            
          </div>
        )}

        {activeSection === "bookManagement" && (
          <div className="book-management-section">
            <div className="book-management-header">
              <h2 className="section-title">Manage Books</h2>
              <button onClick={handleAddBookClick}>Add Book</button>
            </div>
            {showAddBookForm && (
              <div className="book-form">
                <input
                  name="name"
                  placeholder="Name"
                  value={bookForm.name}
                  onChange={handleInputChange}
                />
                <input
                  name="author"
                  placeholder="Author"
                  value={bookForm.author}
                  onChange={handleInputChange}
                />
                <input
                  name="genre"
                  placeholder="Genre"
                  value={bookForm.genre}
                  onChange={handleInputChange}
                />
                <input
                  name="isbn"
                  placeholder="ISBN"
                  value={bookForm.isbn}
                  onChange={handleInputChange}
                />
                <input
                  name="yearPublished"
                  placeholder="Year Published"
                  value={bookForm.yearPublished}
                  onChange={handleInputChange}
                />
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleAddBook}>
                  {editingIndex !== null ? "Update Book" : "Add Book"}
                </button>
              </div>
            )}
            <input
              type="text"
              placeholder="Search Books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul>
              {filteredBooks.map((book, index) => (
                <li key={index}>
                  <img src={URL.createObjectURL(book.image)} alt={book.name} />
                  <h3>{book.name}</h3>
                  <p>{book.author}</p>
                  <p>{book.genre}</p>
                  <button onClick={() => handleEditBook(index)}>Edit</button>
                  <button onClick={() => handleDeleteBook(index)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            {showDeleteConfirm && (
              <div className="delete-confirm">
                <p>Are you sure you want to delete this book?</p>
                <button onClick={confirmDelete}>Yes</button>
                <button onClick={() => setShowDeleteConfirm(false)}>No</button>
              </div>
            )}
            {recentlyDeleted && (
              <div className="undo-delete">
                <p>Book deleted.</p>
                <button onClick={undoDelete}>Undo</button>
              </div>
            )}
          </div>
        )}

        {activeSection === "issueReturn" && (
          <div>
            <h2 className="section-title-issuereturn">
              Issue & Return Management
            </h2>

            {/* Filter buttons */}
            <div className="filter-buttons">
              <button
                onClick={() => {
                  setIssueFilterStatus("issued"); // Set filter status to 'issued'
                }}
                className={issueFilterStatus === "issued" ? "active" : ""}
              >
                Issued Books
              </button>
              <button
                onClick={() => {
                  setIssueFilterStatus("returned"); // Set filter status to 'issued'
                }}
                className={issueFilterStatus === "returned" ? "active" : ""}
              >
                Returned Books
              </button>
            </div>

            <table className="queries-table">
              <thead className="">
                <tr>
                  <th className="p-4 text-left">S.No.</th>
                  <th className="p-4 text-left">User Name</th>
                  <th className="p-4 text-left">User Email</th>
                  <th className="p-4 text-left">Book Name</th>
                  <th className="p-4 text-left">Author</th>
                  <th className="p-4 text-left">
                    {issueFilterStatus === "issued"
                      ? "Issue Date"
                      : "Return Date"}
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {issueReturnData.map((issue, index) => (
                  <tr key={issue._id}>
                    <td className="p-4 text-left">{index + 1}</td>
                    <td className="p-4 text-left">
                      {issue.userID ? issue.userID.name : "N/A"}
                    </td>
                    <td className="p-4 text-left">
                      {issue.userID ? issue.userID.email : "N/A"}
                    </td>
                    <td className="p-4 text-left">
                      {issue.bookID ? issue.bookID.name : "N/A"}
                    </td>
                    <td className="p-4 text-left">
                      {issue.bookID ? issue.bookID.author : "N/A"}
                    </td>
                    <td className="p-4 text-left">
                      {issueFilterStatus === "issued"
                        ? new Date(issue.issueDate).toLocaleDateString()
                        : issue.returnDate
                        ? new Date(issue.returnDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeSection === "UserQueries" && (
          <div className="user-queries-section">
            <h2 className="section-title-userquery">User Queries</h2>

            {/* Filter buttons */}
            <div className="filter-buttons">
              <button
                onClick={() => handleFilterChange("All")}
                className={filterStatus === "All" ? "active" : ""}
              >
                All
              </button>
              <button
                onClick={() => handleFilterChange("Responded")}
                className={filterStatus === "Responded" ? "active" : ""}
              >
                Responded
              </button>
              <button
                onClick={() => handleFilterChange("Unresponded")}
                className={filterStatus === "Unresponded" ? "active" : ""}
              >
                Unresponded
              </button>
            </div>

            <table className="queries-table">
              <thead>
                <tr>
                  <th>Sender Name</th>
                  <th>Sender Email</th>
                  <th>Message</th>
                  <th>Date Received</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredContactMessages.map((message, index) => (
                  <tr key={index}>
                    <td>{message.sender_name}</td>
                    <td>{message.sender_email}</td>
                    <td>{message.message}</td>
                    <td>{new Date(message.created_at).toLocaleDateString()}</td>
                    <td>
                      {message.status === "Responded" ? (
                        "Responded"
                      ) : (
                        <button onClick={() => handleRespond(message)}>
                          Respond
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default AdminProfilePage;
