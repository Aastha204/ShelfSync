import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UserIssues = () => {
  const [userIssues, setUserIssues] = useState([]);
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

  const calculateFine = (dueDate) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = today - due;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays * 5 : 0;
  };


  const handleReturnBook = async (issueId) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/issues/return/${issueId}`
      );

      if (
        response.status === 200 &&
        response.data.message === "Book returned successfully"
      ) {
        toast.success("Book returned successfully");
        setUserIssues((prevIssues) =>
          prevIssues.filter((issue) => issue._id !== issueId)
        );
      } else {
        toast.error("Error: Unexpected response from server");
      }
    } catch (error) {
      console.error("Error returning book:", error);
      toast.error("Error returning book");
    }
  };

  const handlePayment = async (IssueID) => {
    const userEmail = localStorage.getItem("loggedInUserEmail");
    const userId = localStorage.getItem("loggedInUserId");
    if (!userId) {
      toast.error("Please log in to issue a book");
      return;
    }
  
    const issue = userIssues.find(issue => issue._id === IssueID);
    const fine = calculateFine(issue.dueDate); // Ensure this returns the correct fine
  
    try {
      // Create a Razorpay order
      toast.success("Payment Initiated....");
      const { data } = await axios.post(
        "http://localhost:3001/api/payment/payfine",
        { IssueId: IssueID, fine: fine } // Make sure fine is sent
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
            const verifyUrl = "http://localhost:3001/api/payment/verifyfine";
            const { data: verifyResponse } = await axios.post(verifyUrl, {
              ...response,
              IssueId: IssueID,
            });
            toast.success(verifyResponse.message);
            handleReturnBook(IssueID); // Call the return book logic after payment success
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
  

  const handleViewReceipt = (issueId) => {
    const issue = userIssues.find((issue) => issue._id === issueId);
    if (issue && issue.receiptNo) {
      navigate(`/invoice/${issue.receiptNo}`);
    } else {
      toast.error("Receipt not found for this issue");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-8"
      style={{ backgroundImage: "url('./images/issuebg.jpg')" }}
    >
      <button
        onClick={() => navigate("/userProfile")}
        className="fixed top-4 left-4 bg-brown-600 hover:bg-brown-800 text-white px-4 py-2 rounded shadow-md z-50"
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
              <th className="p-4 text-left">Fine</th>
              <th className="p-4 text-left">Action</th>
              <th className="p-4 text-left">Receipt</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {userIssues.map((issue, index) => {
              const fine = calculateFine(issue.dueDate);
              return (
                <tr
                  key={issue._id}
                  className={`${
                    index % 2 === 0 ? "bg-brown-500" : "bg-brown-600"
                  } hover:bg-brown-700`}
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{issue.bookID?.name || "N/A"}</td>
                  <td className="p-4">{issue.bookID?.author || "N/A"}</td>
                  <td className="p-4">{issue.bookID?.genre || "N/A"}</td>
                  <td className="p-4">
                    {new Date(issue.issueDate).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    {new Date(issue.dueDate).toLocaleDateString()}
                  </td>
                  <td className="p-4">{fine > 0 ? `₹${fine}` : "No fine"}</td>
                  <td className="p-4">
                    {fine > 0 && !issue.finePaid ? (
                      <button
                        onClick={() => handlePayment(issue._id)}
                        className="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-700"
                      >
                        Pay Fine
                      </button>
                    ) : (
                      <button
                        onClick={() => handleReturnBook(issue._id)}
                        disabled={fine > 0 && !issue.finePaid}
                        className={`px-4 py-2 rounded text-white ${
                          fine > 0 && !issue.finePaid
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-700"
                        }`}
                      >
                        Return
                      </button>
                    )}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleViewReceipt(issue._id)}
                      className="px-4 py-2 rounded text-black bg-yellow-400 hover:bg-yellow-200"
                    >
                      View Receipt
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserIssues;
