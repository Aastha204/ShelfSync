import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from './utils';
import '@fortawesome/fontawesome-free/css/all.min.css';

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60); // Countdown timer
  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("loggedInUserEmail"); // Replace with appropriate storage
    const name = localStorage.getItem("loggedInUserName");
    const isLogin=false
    console.log('OTP:', otp); // Debugging
    console.log('Email:', email); // Debugging
    if (!otp || !email) {
      handleError('OTP and email are required.');
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp, email,name,isLogin }),
      });
  
      const result = await response.json();
      if (result.success) {
        handleSuccess(result.message);
        setTimeout(() => navigate('/login'), 1000);
      } else {
        handleError(result.message);
      }
    } catch (err) {
      handleError('An error occurred during OTP verification.');
    }
  };
  
  const handleResendOtp = async () => {
    if (timer > 0) {
      handleError('Please wait before resending OTP.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await response.json();
      if (result.success) {
        handleSuccess(result.message);
        setTimer(60); // Reset timer
      } else {
        handleError(result.message);
      }
    } catch (err) {
      handleError('Failed to resend OTP. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 sm:p-8 relative">
  <video
    autoPlay
    muted
    loop
    className="absolute top-0 left-0 w-full h-full object-cover -z-10"
  >
    <source src="/videos/library2.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  <div className="p-12 bg-white rounded-lg shadow-lg h-auto max-w-md sm:max-w-lg">
    <h2 className="text-4xl font-bold text-brown-700 text-center">OTP Verification</h2>
    <form className="mt-8" onSubmit={handleVerifyOtp}>
      <label className="block text-sm font-medium text-gray-700 text-3xl">Enter OTP</label>
      <input
        type="text"
        value={otp}
        onChange={handleChange}
        className="w-full px-6 py-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-brown-500"
      />
      <button
        type="submit"
        className="w-full bg-brown-600 hover:bg-brown-700 text-white font-bold py-4 px-6 rounded-lg mt-8"
      >
        Verify OTP
      </button>
    </form>
    <button
      onClick={handleResendOtp}
      disabled={timer > 0}
      className={`w-full ${
        timer > 0 ? "bg-gray-500 cursor-not-allowed" : "bg-brown-600 hover:bg-brown-700"
      } text-white font-bold py-4 px-6 rounded-lg mt-6`}
    >
      Resend OTP {timer > 0 && `(Wait ${timer}s)`}
    </button>
  </div>
  <ToastContainer />
</div>

  );
  
};

export default OtpVerification;
