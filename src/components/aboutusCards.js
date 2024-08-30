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
          <h3 className="text-xl font-semibold mb-4 text-white">Reliable Service</h3>
          <p className="text-white">We provide a robust and reliable system, making library management effortless and secure.</p>
        </div>
        <div ref={(el) => (cardRefs.current[1] = el)} className="card scroll-card">
          <h3 className="text-xl font-semibold mb-4 text-white">Scalable Solutions</h3>
          <p className="text-white">Our platform scales with your library, whether small or large, ensuring seamless management.</p>
        </div>
        <div ref={(el) => (cardRefs.current[2] = el)} className="card scroll-card">
          <h3 className="text-xl font-semibold mb-4 text-white">User-Friendly</h3>
          <p className="text-white">ShelfSync is designed with a user-first approach, offering easy navigation and management tools.</p>
        </div>
        <div ref={(el) => (cardRefs.current[3] = el)} className="card scroll-card">
          <h3 className="text-xl font-semibold mb-4 text-white">Expert Support</h3>
          <p className="text-white">Our dedicated support team ensures that you receive timely assistance and expert guidance.</p>
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
