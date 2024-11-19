import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const UserIssues = () => {
  const [userIssues, setUserIssues] = useState([]);
  const [returnedBooks, setReturnedBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('loggedInUserId');
    if (userId && userId.length === 24) {
      const fetchUserIssues = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/issues/getBook/${userId}`);
          setUserIssues(response.data);
        } catch (error) {
          toast.error('Error fetching user issues');
        }
      };
      fetchUserIssues();
    } else {
      toast.error('Invalid user ID');
    }
  }, []);

  const handleReturnBook = async (issueId) => {
    try {
      const response = await axios.put(`http://localhost:3001/api/issues/return/${issueId}`);
      toast.success(response.data.message);

      const returnedBook = userIssues.find((issue) => issue._id === issueId);
      setReturnedBooks((prevBooks) => [...prevBooks, returnedBook]);
      setUserIssues((prevIssues) => prevIssues.filter((issue) => issue._id !== issueId));
    } catch (error) {
      console.error('Error returning book:', error.response?.data || error.message);
      toast.error('Error returning book');
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center p-8" style={{ backgroundImage: "url('./images/issuebg.jpg')" }}>
      {/* Back Button */}
      <button
  onClick={() => navigate('/userProfile')}
  className="fixed top-4 left-4 bg-brown-600 hover:bg-brown-800 text-white px-4 py-2 rounded shadow-md z-50"
  style={{ zIndex: 50 }}
>
  Back to Profile
</button>

      <div className="container mx-auto px-4 py-8 bg-brown-100 bg-opacity-20 rounded-lg flex flex-col">
  <h1 className="text-6xl font-bold text-brown-800 text-center mb-8 w-full">Issued Books</h1>
  <table className="min-w-full border-collapse bg-brown-700 rounded-lg overflow-hidden">
    <thead className="bg-brown-800 text-white">
      <tr>
        <th className="p-4 text-left">S.No.</th>
        <th className="p-4 text-left">Book Name</th>
        <th className="p-4 text-left">Author Name</th>
        <th className="p-4 text-left">Book Type</th>
        <th className="p-4 text-left">Issue Date</th>
        <th className="p-4 text-left">Return Date</th>
        <th className="p-4 text-left">Action</th>
      </tr>
    </thead>
    <tbody className="text-white">
      {userIssues.map((issue, index) => (
        <tr key={issue._id} className={`bg-brown-600 ${index % 2 === 0 ? 'bg-brown-500' : 'bg-brown-600'} hover:bg-brown-700`}>
          <td className="p-4 text-left">{index + 1}</td>
          <td className="p-4 text-left">{issue.bookID.name}</td>
          <td className="p-4 text-left">{issue.bookID.author}</td>
          <td className="p-4 text-left">{issue.bookID.genre}</td>
          <td className="p-4 text-left">{new Date(issue.issueDate).toLocaleDateString()}</td>
          <td className="p-4 text-left">{new Date(issue.dueDate).toLocaleDateString()}</td>
          <td className="p-4 text-left">
            <button onClick={() => handleReturnBook(issue._id)} className="px-4 py-2 rounded text-white bg-red-500 hover:bg-red-700">
              Return
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      <ToastContainer />
    </div>
  );
};

export default UserIssues;
