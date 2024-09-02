import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import '../styles/AdminProfile.css';

const AdminProfilePage = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [books, setBooks] = useState([]);
  const [bookForm, setBookForm] = useState({
    name: '',
    author: '',
    genre: '',
    isbn: '',
    yearPublished: '',
    image: null,
  });
  const [showAddBookForm, setShowAddBookForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [issueReturnData, setIssueReturnData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [recentlyDeleted, setRecentlyDeleted] = useState(null);

  const totalBooks = 1000;
  const booksIssued = 300;
  const booksReturned = 200;
  const booksLeft = totalBooks - booksIssued;

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookForm({
      ...bookForm,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setBookForm({
      ...bookForm,
      image: e.target.files[0],
    });
  };

  const handleAddBook = () => {
    if (!bookForm.name || !bookForm.author || !bookForm.genre || !bookForm.isbn || !bookForm.yearPublished || !bookForm.image) {
      alert('Please fill in all fields.');
      return;
    }

    const newBooks = editingIndex !== null 
      ? books.map((book, index) => index === editingIndex ? bookForm : book)
      : [...books, bookForm];

    setBooks(newBooks);
    setBookForm({
      name: '',
      author: '',
      genre: '',
      isbn: '',
      yearPublished: '',
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
    }, 5000); // Show the undo option for 5 seconds
  };

  const undoDelete = () => {
    if (recentlyDeleted) {
      setBooks([...books, recentlyDeleted]);
      setRecentlyDeleted(null);
    }
  };

  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (activeSection === 'dashboard') {
      const ctx = document.getElementById('dashboardChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Total Books', 'Books Issued', 'Books Returned', 'Books Left'],
          datasets: [
            {
              label: 'Library Analytics',
              data: [totalBooks, booksIssued, booksReturned, booksLeft],
              backgroundColor: ['#8d6e63', '#a1887f', '#bcaaa4', '#d7ccc8'],
              borderColor: '#4a3f35',
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          },
        },
      });
    }
  }, [activeSection]);

  return (
    <div className="admin-container">
      {/* sidebar1 */}
      <div className="sidebar1">
        {/* <div className="logo">
          <img src="../images/1.png" alt="Logo" className="logo-img" />
        </div> */}
        <ul className="nav-list">
          <li onClick={() => handleSectionClick('profile')} className={activeSection === 'profile' ? 'active' : ''}>
            Admin Profile
          </li>
          <li onClick={() => handleSectionClick('dashboard')} className={activeSection === 'dashboard' ? 'active' : ''}>
            Dashboard
          </li>
          <li onClick={() => handleSectionClick('bookManagement')} className={activeSection === 'bookManagement' ? 'active' : ''}>
            Book Management
          </li>
          <li onClick={() => handleSectionClick('issueReturn')} className={activeSection === 'issueReturn' ? 'active' : ''}>
            Issue & Return
          </li>
          <li>
           <a href="/"> Logout</a> 
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="content">
        {/* Profile Section */}
        {activeSection === 'profile' && (
          <div className="profile-section">
            <h2 className="section-title">Admin Profile</h2>
            <div className="profile-content">
              <div className="profile-img-box">
                <img src="https://t3.ftcdn.net/jpg/05/22/57/00/360_F_522570005_1Awl2mMScnQUJ99ZJuaof9Psr2Qp33w7.jpg" alt="Admin Profile" className="profile-img" />
              </div>
              <div className="profile-details">
                <h3>Name: Aastha </h3>
                <p>Username: admin123</p>
                <p>Age: 20</p>
                <p>Contact: +1234567890</p>
                <p>Email: admin@example.com</p>
                <p>Address: 123 Library Lane, City, Country</p>
                <h4>Date of Birth: 01/01/1989</h4>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Section */}
        {activeSection === 'dashboard' && (
          <div className="dashboard-section">
            <h2 className="section-title">Dashboard</h2>
            <div className="card-container">
              <div className="dashboard-card">Total Books: {totalBooks}</div>
              <div className="dashboard-card">Books Issued: {booksIssued}</div>
              <div className="dashboard-card">Books Returned: {booksReturned}</div>
              <div className="dashboard-card">Books Left: {booksLeft}</div>
            </div>
            <div className="chart-container">
              <canvas id="dashboardChart"></canvas>
            </div>
            <div className="table-container">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Total Books</th>
                    <th>Books Issued</th>
                    <th>Books Returned</th>
                    <th>Books Left</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{totalBooks}</td>
                    <td>{booksIssued}</td>
                    <td>{booksReturned}</td>
                    <td>{booksLeft}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Book Management Section */}
        {activeSection === 'bookManagement' && (
          <div className="book-management-section">
            <div className="book-management-header">
              <h2 className="section-title">Manage Books</h2>
              <button className="add-book-btn" onClick={() => setShowAddBookForm(!showAddBookForm)}>
                {showAddBookForm ? 'Close Form' : 'Add a Book'}
              </button>
            </div>

            {/* Add Book Form */}
            {showAddBookForm && (
              <div className="add-book-form">
                <input
                  type="text"
                  name="name"
                  placeholder="Name of Book"
                  value={bookForm.name}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="author"
                  placeholder="Author Name"
                  value={bookForm.author}
                  onChange={handleInputChange}
                />
                <select name="genre" value={bookForm.genre} onChange={handleInputChange}>
                  <option value="">Select Genre</option>
                  <option value="Romantic">Romantic</option>
                  <option value="Comic">Comic</option>
                  <option value="Thriller">Thriller</option>
                  <option value="Fictional">Fictional</option>
                  <option value="Horror">Horror</option>
                  <option value="Children">Children</option>
                </select>
                <input
                  type="number"
                  name="isbn"
                  placeholder="ISBN Number"
                  value={bookForm.isbn}
                  onChange={handleInputChange}
                  min="0"
                  step="1"
                />
                <input
                  type="number"
                  name="yearPublished"
                  placeholder="Year Published"
                  value={bookForm.yearPublished}
                  onChange={handleInputChange}
                  min="0"
                  step="1"
                />
                <input type="file" name="image" onChange={handleFileChange} />
                <button className="submit-book-btn" onClick={handleAddBook}>
                  {editingIndex !== null ? 'Update Book' : 'Add Book'}
                </button>
              </div>
            )}

            {/* Book Table */}
            <div className="book-table-container">
              <table className="book-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Genre</th>
                    <th>ISBN</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks.map((book, index) => (
                    <tr key={index}>
                      <td>{book.name}</td>
                      <td>{book.author}</td>
                      <td>{book.genre}</td>
                      <td>{book.isbn}</td>
                      <td>
                        <button className="edit-btn" onClick={() => handleEditBook(index)}>Edit</button>
                        <button className="delete-btn" onClick={() => handleDeleteBook(index)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Issue & Return Section */}
        {activeSection === 'issueReturn' && (
          <div className="issue-return-section">
            <h2 className="section-title">Issue & Return</h2>
            <div className="issue-return-cards">
              <div className="issue-return-card">Books Issued: {booksIssued}</div>
              <div className="issue-return-card">Books Returned: {booksReturned}</div>
            </div>
            <div className="search-bar-container">
              <input
                type="text"
                className="search-bar"
                placeholder="Search by Book Name, Author, ISBN"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="issue-return-table-container">
              <table className="issue-return-table">
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>User ID</th>
                    <th>Book Issued Name</th>
                    <th>Return Date</th>
                    <th>Fine</th>
                  </tr>
                </thead>
                <tbody>
                  {issueReturnData.map((data, index) => (
                    <tr key={index}>
                      <td>{data.userName}</td>
                      <td>{data.userId}</td>
                      <td>{data.bookName}</td>
                      <td>{data.returnDate}</td>
                      <td>{data.fine}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="delete-confirm-modal">
          <div className="delete-confirm-content">
            <p>Do you really want to delete this book?</p>
            <button className="confirm-delete-btn" onClick={confirmDelete}>Yes</button>
            <button className="cancel-delete-btn" onClick={() => setShowDeleteConfirm(false)}>No</button>
          </div>
        </div>
      )}

      {/* Undo Delete Notification */}
      {recentlyDeleted && (
        <div className="undo-notification">
          <p>Book deleted. <button className="undo-btn" onClick={undoDelete}>Undo</button></p>
        </div>
      )}
    </div>
  );
};

export default AdminProfilePage;

