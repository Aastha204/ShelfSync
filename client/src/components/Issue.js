import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UserIssues = () => {
  const [userIssues, setUserIssues] = useState([]);
  const [returnedBooks, setReturnedBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("loggedInUserId");
    if (userId && userId.length === 24) {
      const fetchUserIssues = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/api/issues/getBook/${userId}`
          );
          setUserIssues(response.data);
        } catch (error) {
          toast.error("Error fetching user issues");
        }
      };
      fetchUserIssues();
    } else {
      toast.error("Invalid user ID");
    }
  }, []);

  const handleReturnBook = async (issueId) => {
    try {
      // Make the PUT request to return the book
      const response = await axios.put(
        `http://localhost:3001/api/issues/return/${issueId}`
      );
      console.log("in try");

      // Check if the response contains the success message
      if (
        response.status === 200 &&
        response.data.message === "Book returned successfully"
      ) {
        toast.success("Book returned successfully"); // Display success message

        // Find the returned book from the userIssues array
        const returnedBook = userIssues.find((issue) => issue._id === issueId);

        // Update the returnedBooks state to add the returned book
        setReturnedBooks((prevBooks) => [...prevBooks, returnedBook]);

        // Update userIssues state to remove the returned book
        setUserIssues((prevIssues) =>
          prevIssues.filter((issue) => issue._id !== issueId)
        );
      } else {
        // Handle unexpected response (if the API doesn't return the expected success message)
        toast.error("Error: Unexpected response from server");
      }
    } catch (error) {
      // Log the actual error for debugging purposes
      console.error("Error returning book:", error);

      // Check if error response is available and show the message
      if (error.response) {
        toast.error(error.response?.data || "Error returning book");
      } else {
        // If there's no response from the server, show a network error
        toast.error("Network error: Please try again later");
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-8"
      style={{ backgroundImage: "url('./images/issuebg.jpg')" }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate("/userProfile")}
        className="fixed top-4 left-4 bg-brown-600 hover:bg-brown-800 text-white px-4 py-2 rounded shadow-md z-50"
        style={{ zIndex: 50 }}
      >
        Back to Profile
      </button>

      <div className="container mx-auto px-4 py-8 bg-brown-100 bg-opacity-20 rounded-lg flex flex-col">
        <h1 className="text-6xl font-bold text-brown-800 text-center mb-8 w-full">
          Issued Books
        </h1>
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
              <tr
                key={issue._id}
                className={`bg-brown-600 ${
                  index % 2 === 0 ? "bg-brown-500" : "bg-brown-600"
                } hover:bg-brown-700`}
              >
                <td className="p-4 text-left">{index + 1}</td>
                <td className="p-4 text-left">
                  {issue.bookID ? issue.bookID.name : "N/A"}
                </td>
                <td className="p-4 text-left">
                  {issue.bookID ? issue.bookID.author : "N/A"}
                </td>
                <td className="p-4 text-left">
                  {issue.bookID ? issue.bookID.genre : "N/A"}
                </td>

                <td className="p-4 text-left">
                  {new Date(issue.issueDate).toLocaleDateString()}
                </td>
                <td className="p-4 text-left">
                  {new Date(issue.dueDate).toLocaleDateString()}
                </td>
                <td className="p-4 text-left">
                  <button
                    onClick={() => handleReturnBook(issue._id)}
                    className="px-4 py-2 rounded text-white bg-red-500 hover:bg-red-700"
                  >
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
