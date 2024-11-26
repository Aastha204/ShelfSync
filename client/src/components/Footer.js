import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import termsofuse from "./termsofuse";



const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/terms");
  };
  const handleNavigationabout = () => {
    navigate("/about");
  };
  const handleNavigationPrivacy = () => {
    navigate("/privacyPolicy");
  };
  const handleNavigationcontact = () => {
    navigate("/contact");
  };
  return (
    <footer className="bg-[#2E1D0F] w-full p-12 text-white flex flex-col md:flex-row justify-between items-start space-y-6 md:space-y-0 md:space-x-12">
      {/* Contact Section */}
      <div className="flex-1">
        <h2 className="font-bold mb-4 text-lg text-yellow-400">Let us help you</h2>
        <Link to="/account" className="block mb-2 hover:text-yellow-300 cursor-pointer">ShelfSync@gmail.com</Link>
        {/* <Link to="/issue" className="block hover:text-yellow-300 cursor-pointer">Your Books</Link> */}
      </div>
      <div className="flex-1">
        <h2 className="font-bold mb-4 text-lg text-yellow-400">ABOUT</h2>
        <p className="mb-2 hover:text-yellow-300 cursor-pointer"onClick={handleNavigationabout}>About Us</p>
        <p className="mb-2 hover:text-yellow-300 cursor-pointer"onClick={handleNavigationcontact}>Contact Us</p>
      </div>

      {/* Contact Information */}
      <div className="flex-1">
        <h2 className="font-bold mb-4 text-lg text-yellow-400">Contact Us</h2>
        <p className="mb-2 hover:text-yellow-300 cursor-pointer">+91 1234567890</p>
        <p className="hover:text-yellow-300 cursor-pointer">+91 9876543210</p>
      </div>
      <div className="flex-1">
        <h2 className="font-bold mb-4 text-lg text-yellow-400">CONSUMER POLICY</h2>
        <p className="mb-2 hover:text-yellow-300 cursor-pointer" onClick={handleNavigation}>Terms of Use</p>
        <p className="hover:text-yellow-300 cursor-pointer"  onClick={() =>  navigate("/privacyPolicy")}>Privacy Policy</p>
      </div>

      {/* Address Section */}
      <div className="flex-1">
        <h2 className="font-bold mb-4 text-lg text-yellow-400">Address</h2>
        <p className="mb-2">Chitkara University</p>
        <p>Rajpura , Punjab</p>
      </div>

      {/* Social Media Icons */}
      <div className="flex-1 flex flex-col items-start space-y-4 mt-6 md:mt-0">
        <h2 className="font-bold mb-4 text-lg text-yellow-400">Follow Us</h2>
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-300 transition-colors duration-300">
            <FaFacebookF className="text-2xl" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-300 transition-colors duration-300">
            <FaTwitter className="text-2xl" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-300 transition-colors duration-300">
            <FaInstagram className="text-2xl" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-300 transition-colors duration-300">
            <FaLinkedinIn className="text-2xl" />
          </a>
        </div>
      </div>
      {/* <div className="text-center mt-6 mb-2">
        <p className="text-sm text-white">© ShelfSync. All rights reserved.</p>
      </div> */}
    </footer>
  );
};

export default Footer;
