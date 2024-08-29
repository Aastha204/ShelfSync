import React from 'react';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';

const About = () => {
  return (
    <div className="flex flex-col p-4 lg:flex-row justify-around bg-[#F6E3BA] lg:pl-28 lg:pt-16">
      <div className="lg:w-1/2 p-4">
        <h1 className="text-2xl font-bold mb-4 text-center lg:text-6xl lg:mb-10 lg:text-left">About Us</h1>
        <p className="mb-4 text-sm sm:text-base lg:text-lg text-center lg:text-left">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos possimus dolore itaque maxime quibusdam ipsam voluptatibus aperiam alias, tempore autem odit saepe cum vitae commodi provident pariatur, sint nisi libero!
        </p>
        <div className="flex justify-center lg:justify-start space-x-4 lg:mt-10">
          <FaFacebook className="text-[#5a1d04] text-2xl" />
          <FaLinkedin className="text-[#5a1d04] text-2xl" />
        </div>
      </div>
      <div className="lg:w-1/2 p-4 flex justify-center">
        <img src="./images/aboutus.png" alt="About Us" className="w-full sm:w-2/3 lg:w-full h-auto" />
      </div>
    </div>
  );
};

export default About;
