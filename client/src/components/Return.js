import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Return = () => {
  const [userReturn, setUserReturn] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('loggedInUserId');
    if (userId && userId.length === 24) {
      const fetchUserReturn = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/return/returned/${userId}`);
          console.log(response.data);
          setUserReturn(response.data);
        } catch (error) {
          toast.error('Error fetching returned books');
        }
      };
      fetchUserReturn();
    } else {
      toast.error('Invalid user ID');
    }
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center p-8"
      style={{ backgroundImage: "url('./images/issuebg.jpg')" }}
    >
      {/* Back to Profile Button */}
      <button
        onClick={() => navigate('/userProfile')}
        className="fixed top-4 left-4 z-50 bg-brown-600 hover:bg-brown-800 text-white px-4 py-2 rounded shadow-md"
      >
        Back to Profile
      </button>

      <div className="container mx-auto px-4 py-8 bg-brown-100 bg-opacity-20 rounded-lg flex flex-col">
        <h1 className="text-6xl font-bold text-brown-800 text-center mb-8 w-full">
          Returned Books
        </h1>
        <table className="min-w-full border-collapse bg-brown-700 rounded-lg overflow-hidden">
          <thead className="bg-brown-800 text-white">
            <tr>
              <th className="p-4 text-left">S.No.</th>
              <th className="p-4 text-left">Book Name</th>
              <th className="p-4 text-left">Author Name</th>
              <th className="p-4 text-left">Book Type</th>
              <th className="p-4 text-left">Return Date</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {userReturn.map((book, index) => (
              <tr
                key={book._id}
                className={`bg-brown-600 ${
                  index % 2 === 0 ? 'bg-brown-500' : 'bg-brown-600'
                } hover:bg-brown-700`}
              >
                <td className="p-4 text-left">{index + 1}</td>
                <td className="p-4 text-left">{book.bookID.name}</td>
                <td className="p-4 text-left">{book.bookID.author}</td>
                <td className="p-4 text-left">{book.bookID.genre}</td>
                <td className="p-4 text-left">{new Date(book.returnDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Return;
