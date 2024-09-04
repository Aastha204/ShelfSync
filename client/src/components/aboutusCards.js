import React, { useEffect, useRef, useState } from 'react';
import '../styles/About.css';

const AboutusCards = () => {
  const cardRefs = useRef([]); // Using refs to access each card
  const [scrollCount, setScrollCount] = useState(0); // State to track the scroll count

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 150; // Adjust this value for the number of pixels for each scroll step
      const currentScroll = window.scrollY || window.pageYOffset;

      setScrollCount((prevCount) => {
        const newCount = Math.floor(currentScroll / scrollThreshold);
        return newCount;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup listener
  }, []);

  useEffect(() => {
    // Reveal cards based on scroll count
    cardRefs.current.forEach((card, index) => {
      if (index < scrollCount) { 
        card.classList.add('animate');
      }
    });
  }, [scrollCount]);

  return (
    <div >
      <h2 className="text-4xl font-bold text-center mb-12 text-white">What Makes Us Unique?</h2>
      <div className="horizontal-scroll-container">
        <div ref={(el) => (cardRefs.current[0] = el)} className="card scroll-card">
          <h3 className="text-xl font-semibold mb-4 text-white"> Automated Invoicing</h3>
          <p className="text-white">Generate invoices automatically for overdue books and other library services, simplifying payments.</p>
        </div>
        <div ref={(el) => (cardRefs.current[1] = el)} className="card scroll-card">
          <h3 className="text-xl font-semibold mb-4 text-white">Secure Data Storage</h3>
          <p className="text-white">Ensure the privacy and security of all user data, including borrowing records and invoices.</p>
        </div>
        <div ref={(el) => (cardRefs.current[2] = el)} className="card scroll-card">
          <h3 className="text-xl font-semibold mb-4 text-white">User-Friendly</h3>
          <p className="text-white">ShelfSync is designed with a user-first approach, offering easy navigation and management tools.</p>
        </div>
        <div ref={(el) => (cardRefs.current[3] = el)} className="card scroll-card">
          <h3 className="text-xl font-semibold mb-4 text-white"> Detailed Borrowing History</h3>
          <p className="text-white">View a comprehensive record of all previously borrowed books, including dates and fees.</p>
        </div>
        <div ref={(el) => (cardRefs.current[4] = el)} className="card scroll-card">
          <h3 className="text-xl font-semibold mb-4 text-white">Dedicated team</h3>
          <p className="text-white">Our dedicated support team ensures that you receive timely assistance and expert guidance.</p>
        </div>
      </div>
      <br></br>
    </div>
  );
};

export default AboutusCards;