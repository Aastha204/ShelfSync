import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from './utils';
import '@fortawesome/fontawesome-free/css/all.min.css';


const validateName = (name) => {
  if (!name) return "Name is required.";
  if (/\d/.test(name)) return "Name must not contain numbers.";
  if (name.length < 3 || name.length > 15) return "Name must be between 3 and 15 characters.";
  const regex = /^[a-zA-Z]+(?:[.'-]?[a-zA-Z]+)*(?: [a-zA-Z]+(?:[.'-]?[a-zA-Z]+)*)*$/;
  if (!regex.test(name)) return "Invalid name format.";
  return "";
};

const validatePassword = (password) => {
  if (!password) return "Password is required.";
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/;
  if (!regex.test(password)) {
    return "Password must be 6-15 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
  }
  return "";
};

const validateEmail = (email) => {
  if (!email) return "Email is required.";
  const regex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|yahoo\.com|hotmail\.com|live\.com|icloud\.com)$/;
  if (!regex.test(email)) {
    return "Email must belong to a supported domain (e.g., gmail.com, outlook.com).";
  }
  return "";
};

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo({ ...signupInfo, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    // Validate fields
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (nameError || emailError || passwordError) {
      if (nameError) handleError(nameError);
      if (emailError) handleError(emailError);
      if (passwordError) handleError(passwordError);
      return;
    }

    try {
      const url = "http://localhost:3001/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else if (error) {
        const details = error?.details[0]?.message || "Signup failed.";
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError("An error occurred during signup. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center p-4 sm:p-8">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/videos/library2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="container mx-auto px-4 py-8 bg-brown-800 bg-opacity-80 rounded-lg relative max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <div className="w-full mx-auto relative overflow-hidden">
          <div className="flex w-full relative" style={{ minHeight: '460px' }}>

            {/* Signup Form */}
            <div className="absolute w-full">
              <div className="p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-brown-700 text-center">Sign Up</h2>
                <form className="mt-4" onSubmit={handleSignup}>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    onChange={handleChange}
                    value={signupInfo.name}
                    type="text"
                    name="name"
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-brown-500"
                  />

                  <label className="block text-sm font-medium text-gray-700 mt-4">Email</label>
                  <input
                    type="email"
                    value={signupInfo.email}
                    onChange={handleChange}
                    name="email"
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-brown-500"
                  />

                  <label className="block text-sm font-medium text-gray-700 mt-4">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={signupInfo.password}
                      onChange={handleChange}
                      name="password"
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-brown-500"
                    />
                    <span
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                    >
                      {showPassword ? (
                       <i className="fas fa-eye text-gray-600" />
                      ) : (
                        
                        <i className="fas fa-eye-slash text-gray-600" />
                      )}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brown-600 hover:bg-brown-700 text-white font-bold py-2 px-4 rounded-lg mt-6"
                  >
                    Sign Up
                  </button>
                </form>
                <Link to="/login" className="text-sm text-center mt-4">
                  Already have an account?{' '}
                  <span className="text-brown-600 hover:text-brown-700 cursor-pointer">
                    Login
                  </span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
