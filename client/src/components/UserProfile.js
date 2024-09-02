import React from "react";
import "../styles/UserProfile.css";

const MemberProfile = () => {
  return (
    <div className="profile-page">
      <aside className="sidebar">
        <h2>ShelfSync</h2>
        <ul>
          <a href="/">Home</a>
          <a>Edit Profile</a>
          <a>Issued Books</a>
          <a>Returned Books</a>
          <a>Log out</a>
        </ul>
      </aside>
      <main className="profile-main">
        <div className="profile-card">
          <div className="profile-info">
            {/* <img src="https://via.placeholder.com/100" alt="Profile" /> */}
            <div>
              <h3>Name</h3>
              <p>username</p>
              <p>email</p>
              <p>phone no</p>
            </div>
          </div>
          <div className="profile-details">
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

        
        <div className="card-container">
          <div className="clickable-card">
            <img src="/images/1.png" alt="Card 1" />
            <div className="overlay-text">
            <a href="/receipt">Manage Your Receipt</a>
            </div>
          </div>
          <div className="clickable-card">
            <img src="/images/2.png" alt="Card 2" />
            <div className="overlay-text">
            <a href="/booktrack">Track Your Books</a>
            </div>
          </div>
        </div>
        <a href="/contact" class="contact-link">
          Have any query? Contact us
        </a>
      </main>
    </div>
  );
};

export default MemberProfile;
