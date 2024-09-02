import React from "react";
import "../styles/UserProfile.css";

const MemberProfile = () => {
  return (
    <div className="userprofile-profile-page">
      <aside className="userprofile-sidebar">
        <img src="/images/logo1.png" alt="Logo" className="userprofile-logo" />
        <ul>
          <a href="/">Home</a>
          <a>Edit Profile</a>
          <a href="/issue">Issued Books</a>
          <a href="/return">Returned Books</a>
          <a>Log out</a>
        </ul>
      </aside>
      <main className="userprofile-profile-main">
        <div className="userprofile-profile-card">
          <div className="userprofile-profile-info">
            {/* <img src="https://via.placeholder.com/100" alt="Profile" /> */}
            <div>
              <h3>Name</h3>
              <p>email</p>
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
    </div>
  );
};

export default MemberProfile;
