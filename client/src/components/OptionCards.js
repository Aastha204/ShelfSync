import React, { useState } from 'react';
import '../styles/OptionCards.css'; // Ensure this CSS file exists and contains the required styles
import { Link } from 'react-router-dom';

const OptionCards = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleMouseEnter = (card) => {
    setHoveredCard(card);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div className="option-cards-container">
      {/* Admin Card */}
      <div
        className={`option-card ${hoveredCard === 'admin' ? 'hovered' : ''}`} // Fixed className syntax
        onMouseEnter={() => handleMouseEnter('admin')}
        onMouseLeave={handleMouseLeave}
      >
        <div className="card-content">
          {/* Background Image in the card */}
          <img
            src="https://static.vecteezy.com/system/resources/previews/009/636/683/original/admin-3d-illustration-icon-png.png"
            alt="Admin"
            className="card-background-image"
          />
          {/* Hover image that pops out */}
          {hoveredCard === 'admin' && (
            <img
              src="https://static.vecteezy.com/system/resources/previews/009/636/683/original/admin-3d-illustration-icon-png.png"
              alt="Admin Hover"
              className="hover-image"
            />
          )}
          {/* Glow Button on hover */}
          {hoveredCard === 'admin' && (
            <Link to="/adminlogin" className="glow-button">Login as Admin</Link>
          )}
        </div>
      </div>

      {/* User Card */}
      <div
        className={`option-card ${hoveredCard === 'user' ? 'hovered' : ''}`} // Fixed className syntax
        onMouseEnter={() => handleMouseEnter('user')}
        onMouseLeave={handleMouseLeave}
      >
        <div className="card-content">
          {/* Background Image in the card */}
          <img
            src="/images/user.png" // Ensure this image exists in the public folder
            alt="User"
            className="card-background-image"
          />
          {/* Hover image that pops out */}
          {hoveredCard === 'user' && (
            <img
              src="/images/user.png"
              alt="User Hover"
              className="hover-image"
            />
          )}
          {/* Glow Button on hover */}
          {hoveredCard === 'user' && (
            <Link to="/login" className="glow-button">Login as User</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default OptionCards;
