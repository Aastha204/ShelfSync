import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import About from './About';
import AboutusCards from './aboutusCards';
import BookCards from './cards';
import Footer from './Footer';
import NewReleases from './newRelease';
import BestAuthor from './bestauthorbooks';
import BestFictional from './listofbestfictionbooks';
import Amazonseller from './amazonbestsellersbooks';
import Children from './children';
import History from './history';
import Fiction from './fiction';
import Thriller from './thriller';
import Romance from './romance';
import Comics from './comics';
import BookType from './booktypes';
import Preloader from './Preloader';
import TopThreeBook from './top3book';
import CardsAnimate from "./CardsAnimate";
// import { use } from '../../../server/Routes/AuthRouter';
import { FaUserAlt } from 'react-icons/fa';


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
  const [isLoading, setIsLoading] = useState(true); // For preloader
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate=useNavigate();

  useEffect(() => {
    // Check if the user is logged in by checking localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/login');
  };

  useEffect(() => {
    // Text animation
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setVisible(true);
      }, 2000); // 2-second break
    }, 7000); // 5-second display + 2-second break

    return () => clearInterval(interval);
  }, [texts.length]);

  const handlePreloaderEnd = () => {
    setIsLoading(false); // Hide preloader and show the main content
  };

  if (isLoading) {
    return <Preloader onTransitionEnd={handlePreloaderEnd} />;
  }

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
        <nav className="absolute top-0 left-0 right-0 p-4 z-20 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img
              src="./images/logo1.png" // Path to your logo image
              alt="Library Logo"
              className="h-16 w-auto" // Adjust the logo size as needed
            />
          </a>

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
            <a href="/" className="hover:text-white-400 hover:underline text-lg">Home</a>
            <a href="#about" className="hover:text-white-400 hover:underline text-lg">About</a>
            {/* <a href="/issue" className="hover:text-white-400 hover:underline text-lg">MyBooks</a> */}
            <a href="#browse" className="hover:text-white-400 hover:underline text-lg">Browse</a>
            <a href="/contact" className="hover:text-white-400 hover:underline text-lg">Contact</a>
            {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/userprofile"
                    className="block text-white text-lg hover:underline"
                  >
                    <FaUserAlt />
                  </Link>
                  
                </div>
              ) : (
                <Link
                  to="/custom"
                  className="block px-4 py-1 bg-red-800 hover:bg-red-900 text-white rounded-lg font-semibold transform transition-transform hover:scale-105 text-lg"
                >
                  Login
                </Link>
              )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } sm:hidden mt-2 space-y-2 text-white bg-gray-800 p-4 rounded`}
        >
          <a href="/" className="block hover:text-brown-400">Home</a>
          <a href="#about" className="block hover:text-brown-400">About</a>
          <a href="/issue" className="block hover:text-brown-400">MyBooks</a>
          <a href="#browse" className="block hover:text-brown-400">Browse</a>
          <a href="#" className="block hover:text-brown-400">Contact</a>
          {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/userprofile"
                  className="block text-white text-lg hover:underline"
                >
                  <FaUserAlt />
                </Link>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-1 bg-red-800 hover:bg-red-900 text-white rounded-lg font-semibold text-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="block px-4 py-1 bg-red-800 hover:bg-red-900 text-white rounded-lg font-semibold text-lg"
              >
                Login
              </Link>
            )}
        </div>

        {/* Text Display */}
        {visible && (
          <p className="relative z-10 text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center px-4 animate-fade-in">
            {texts[currentIndex]}
          </p>
        )}

        {/* Optional: Dark Overlay to Improve Text Readability */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0"></div>
      </div>

     
   
  
      {/* Content Sections */}
      <div id="about">
        <About />
      </div>
      <div>
        <AboutusCards />
      </div>
      <div id="browse">
        <BookType />
      </div>
      {/* <div>
        <BookCards />
      </div> */}
      {/* <div id="bestauthor">
        <BestAuthor />
      </div>
      <div id="bestfiction">
        <BestFictional />
      </div>
      <div id="amazonseller">
        <Amazonseller />
      </div> */}
      {/* <div id="children">
        <Children />
      </div>
      <div id="history">
        <History />
      </div>
      <div id="fiction">
        <Fiction />
      </div>
      <div id="thriller">
        <Thriller />
      </div>
      <div id="romance">
        <Romance />
      </div>
      <div id="comics">
        <Comics />
      </div> */}
      <div id="cards-animate">
        <CardsAnimate />
      </div>
      <div id="footer">
        <Footer />
      </div>
    </>
  );
};

export default LibraryManagementTextOverlay;
