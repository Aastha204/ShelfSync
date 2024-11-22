import React from 'react';
import '../styles/aboutmain.css';
import { FaFacebook, FaLinkedin, FaInstagram, FaGithub, FaEnvelope } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';

const About = () => {
  return (
    <div className="flex flex-col lg:flex-row p-6 lg:p-12 bg-[#f7f7f7]">
      {/* Left Column */}
      <div className="lg:w-2/3 p-4 flex flex-col justify-center items-center lg:items-start lg:pr-12">
        <h1 className="text-3xl font-bold mb-6 lg:text-6xl lg:mb-8 text-heading ">
          About Us
        </h1>
        <p className="mb-6 text-base lg:text-lg text-center lg:text-left text-paragraph leading-relaxed">
          Welcome to <strong className="text-highlight">ShelfSync</strong>, the dynamic library management solution designed to streamline and enhance library operations. Whether you're a librarian or a user, ShelfSync offers an intuitive platform for easy book browsing, reserving, and issuing. For administrators, it provides powerful tools for inventory control, book circulation tracking, and user management. With a focus on simplicity, security, and scalability, ShelfSync transforms library management into an efficient and rewarding experience for all.
        </p>
        <div className="flex flex-col items-center lg:items-start space-y-6 lg:space-y-8">
          <div className="flex justify-center lg:justify-start space-x-6">
            <FaFacebook className="text-facebook text-3xl lg:text-4xl hover:text-facebook-hover" />
            <FaLinkedin className="text-linkedin text-3xl lg:text-4xl hover:text-linkedin-hover" />
            <FaInstagram className="text-Instagram text-3xl lg:text-4xl hover:text-Instagram-hover" />
            <FaGithub className="text-github text-3xl lg:text-4xl hover:text-github-hover" />
            <FaEnvelope className="text-envelope text-3xl lg:text-4xl hover:text-envelope-hover" />
          </div>
          <a href="/contact" className="flex items-center px-6 py-3 bg-[#5a1d04] text-white text-lg font-semibold rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105">
            <span className="mr-2">Contact Us</span>
            <FaArrowRight />
          </a>
        </div>
      </div>

      {/* Right Column */}
      <div className="lg:w-1/3 p-4 flex justify-center lg:justify-end items-center">
        <img src="./images/aboutfinal.png" alt="About Us" className="w-full sm:w-2/3 lg:w-full h-auto mt-6 lg:mt-0 shadow-lg rounded-lg hover:shadow-xl transition-shadow" />
      </div>
    </div>
  );
};

export default About;
