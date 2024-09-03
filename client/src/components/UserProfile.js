import React, { useState } from "react";
import "../styles/UserProfile.css";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { handleSuccess } from "./utils";
import { ToastContainer } from "react-toastify";

const MemberProfile = () => {

  

  const [loggedInUserName,setLoggedInUserName]=useState('');
  const [loggedInUserEmail,setLoggedInUserEmail]=useState('');
  const navigate=useNavigate();
  useEffect(() => {
    const userName = localStorage.getItem('loggedInUserName');
    const userEmail = localStorage.getItem('loggedInUserEmail');
    console.log('Fetched from localStorage:', { userName, userEmail });
    setLoggedInUserName(userName);
    setLoggedInUserEmail(userEmail);
  }, []);
  
  const handleLogout=(e)=>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUserName');
    localStorage.removeItem('loggedIn UserEmail');
    handleSuccess('User Logged Out');
    setTimeout(()=>{
          navigate("/");
    },1000);
  }
  return (
    <div className="userprofile-profile-page">
      <aside className="userprofile-sidebar">
        <img src="/images/logo1.png" alt="Logo" className="userprofile-logo" />
        <ul>
          <a href="/">Home</a>
          <a>Edit Profile</a>
          <a href="/issue">Issued Books</a>
          <a href="/return">Returned Books</a>
          <button onClick={handleLogout}>Log out</button>
          
        </ul>
      </aside>
      <main className="userprofile-profile-main">
        <div className="userprofile-profile-card">
          <div className="userprofile-profile-info">
            {/* <img src="https://via.placeholder.com/100" alt="Profile" /> */}
            <div>
              <h3>{loggedInUserName}</h3>
              <p>{loggedInUserEmail}</p>

              <p>phone no</p>
            </div>
          </div>
          <div className="userprofile-profile-details">
            <div>
              <p>Age</p>
              <p>50</p>
            </div>
            <div>
              <p>Gender</p>
              <p>Male</p>
            </div>
            <div>
              <p>DOB</p>
              <p>05/22/2002</p>
            </div>
            <div>
              <p>Address</p>
              <p>-</p>
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
      <ToastContainer/>
    </div>
  );
};

export default MemberProfile;
