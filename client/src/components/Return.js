import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Return = () => {
  const [userReturn, setUserReturn] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("loggedInUserId");
    if (userId && userId.length === 24) {
      const fetchUserReturn = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/api/return/returned/${userId}`
          );
          console.log(response.data);
          setUserReturn(response.data);
        } catch (error) {
          toast.error("Error fetching returned books");
        }
      };
      fetchUserReturn();
    } else {
      toast.error("Invalid user ID");
    }
  }, []);


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

  return (
    <div
      className="min-h-screen bg-cover bg-center p-8"
      style={{ backgroundImage: "url('./images/issuebg.jpg')" }}
    >
      {/* Back to Profile Button */}
      <button
        onClick={() => navigate("/userProfile")}
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
              <th className="p-4 text-left">ReIssue</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {userReturn.map((book, index) => (
              <tr
                key={book._id}
                className={`bg-brown-600 ${
                  index % 2 === 0 ? "bg-brown-500" : "bg-brown-600"
                } hover:bg-brown-700`}
              >
                <td className="p-4 text-left">{index + 1}</td>
                <td className="p-4 text-left">{book.bookID.name}</td>
                <td className="p-4 text-left">{book.bookID.author}</td>
                <td className="p-4 text-left">{book.bookID.genre}</td>
                <td className="p-4 text-left">
                  {new Date(book.returnDate).toLocaleDateString()}
                </td>
                <td className="p-4 text-left">
                  <button
                    onClick={() => handleIssueBook(book.bookID._id)}
                    className="px-7 py-3 rounded text-white bg-green-600 hover:bg-green-500"
                  >
                    Issue
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

export default Return;
