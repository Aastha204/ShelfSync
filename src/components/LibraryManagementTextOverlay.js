import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import About from './About';
import AboutusCards from './aboutusCards';
import Footer from './Footer';
import BookType from './booktypes';

const LibraryManagementTextOverlay = () => {
  const texts = [
    "Empowering Knowledge: Seamless Library Management",
    "Streamline Your Library: Efficiently Manage Books and Resources",
    "Unlock the Future of Library Management",
    "Your Digital Library, Organized and Accessible"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false); // For hamburger menu toggle

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setVisible(true);
      }, 2000); // 2-second break
    }, 7000); // 5-second display + 2-second break

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <>
      <div className="relative w-full h-screen flex items-center justify-center bg-black">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src="./videos/library.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Navbar */}
      <nav className="absolute top-0 right-0 p-4 z-20">
        <div className="flex items-center justify-between">
          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="block sm:hidden text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>

          {/* Desktop Menu */}
          <div className="hidden sm:flex space-x-8 text-white items-center">
            <a href="#" className="hover:text-brown-400 hover:underline text-lg">Home</a>
            <a href="#about" className="hover:text-brown-400 hover:underline text-lg">About</a>
            <a href="#" className="hover:text-brown-400 hover:underline text-lg">MyBooks</a>
            <a href="#browse" className="hover:text-brown-400 hover:underline text-lg">Browse</a>
            <a href="#" className="hover:text-brown-400 hover:underline text-lg">Contact</a>
            <Link
              to="/userProfile"
              className="block mt-2 px-4 py-1 bg-red-800 hover:bg-red-900 text-white rounded-lg font-semibold transform transition-transform hover:scale-105 text-lg"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } sm:hidden mt-2 space-y-2 text-white bg-gray-800 p-4 rounded`}
        >
          <a href="#" className="block hover:text-brown-400">Home</a>
          <a href="#about" className="block hover:text-brown-400">About</a>
          <a href="#" className="block hover:text-brown-400">MyBooks</a>
          <a href="#browse" className="block hover:text-brown-400">Browse</a>
          <a href="#" className="block hover:text-brown-400">Contact</a>
          <a 
            href="#" 
            className="block mt-2 px-4 py-1 bg-red-800 hover:bg-red-900 text-white rounded-lg font-semibold transform transition-transform hover:scale-105 text-lg"
          >
            Login
          </a>
        </div>
      </nav>

      {/* Text Display */}
      {visible && (
        <p className="relative z-10 text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center px-4 animate-fade-in">
          {texts[currentIndex]}
        </p>
      )}

      {/* Optional: Dark Overlay to Improve Text Readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0"></div>
      
    </div>
    <div id='about'>
      <About/>
    </div>

    <div>
      <AboutusCards/>
    </div>

    <div id="browse">
      <BookType/>
    </div>
    
    <div id="footer">
      <Footer/>
    </div>
    </>
  );
};

export default LibraryManagementTextOverlay;
