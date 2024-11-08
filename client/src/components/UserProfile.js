import React, { useState, useEffect } from "react";
import "../styles/UserProfile.css";
import { Link, useNavigate } from "react-router-dom";
import { handleSuccess } from "./utils";
import { ToastContainer } from "react-toastify";

const MemberProfile = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phoneNo: '',
    age: '',
    gender: '',
    dob: '',
    address: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem('loggedInUserEmail');
    console.log('Fetched email from localStorage:', userEmail);
  
    if (userEmail) {
      fetch(`http://localhost:3001/api/userProfile?email=${userEmail}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
        .then(response => {
          console.log("Raw response:", response); // Log entire response
  
          if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
          }
  
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            return response.json();
          } else {
            throw new Error("Response is not JSON");
          }
        })
        .then(data => {
          console.log("Fetched user data from API:", data); // Log API response
          setUserDetails(data);
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
          alert("Failed to load user data. Please try again later.");
        });
    } else {
      console.warn("No email found in localStorage.");
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUserName');
    localStorage.removeItem('loggedInUserEmail');
    handleSuccess('User Logged Out');
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handleAll = () => {
    navigate("/booklist");
  };

  return (
    <div className="userprofile-profile-page">
      <aside className="userprofile-sidebar">
        <img src="/images/logo1.png" alt="Logo" className="userprofile-logo" />
        <ul>
          <a href="/">Home</a>
          <a href="/changeUserProfile">Edit Profile</a>
          <a ><button onClick={handleAll}>All Books</button></a>
          <a href="/issue">Issued Books</a>
          <a href="/return">Returned Books</a>
          <a><button onClick={handleLogout}>Log out</button></a>
        </ul>
      </aside>
      <main className="userprofile-profile-main">
        <div className="userprofile-profile-card">
          <div className="userprofile-profile-info">
            <div>
              <h3>{userDetails.name || 'Guest'}</h3>
              <p>{userDetails.email}</p>
              <p>{userDetails.phoneNo || 'Phone not provided'}</p>
            </div>
          </div>
          <div className="userprofile-profile-details">
            <div>
              <p>Age</p>
              <p>{userDetails.age || '-'}</p>
            </div>
            <div>
              <p>Gender</p>
              <p>{userDetails.gender || '-'}</p>
            </div>
            <div>
              <p>DOB</p>
              <p>{userDetails.dob ? new Date(userDetails.dob).toLocaleDateString() : '-'}</p>
            </div>
            <div>
              <p>Address</p>
              <p>{userDetails.address || 'Address not provided'}</p>
            </div>
          </div>
        </div>

        <div className="userprofile-card-container">
          <div className="userprofile-clickable-card">
            <img src="/images/1.png" alt="Card 1" />
            <div className="userprofile-overlay-text">
              <a href="/receipt">Manage Your Receipt</a>
            </div>
          </div>
          <div className="userprofile-clickable-card">
            <img src="/images/2.png" alt="Card 2" />
            <div className="userprofile-overlay-text">
              <a href="/booktrack">Track Your Books</a>
            </div>
          </div>
        </div>
        <a href="/contact" className="userprofile-contact-link">
          Have any query? Contact us
        </a>
      </main>
      <ToastContainer />
    </div>
  );
};

export default MemberProfile;
