import React, { useState } from "react";
import { Link } from "react-router-dom";
import { handleError, handleSuccess } from "./utils";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const LoginViaOTP = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState(""); // State for name
  const [isOtpSent, setIsOtpSent] = useState(false); // To track if OTP has been sent

  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const isLogin = true;
    if (!email || !name) {
      return handleError("Both name and email are required.");
    }
    try {
      const response = await fetch("http://localhost:3001/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, isLogin }),
      });
      const result = await response.json();
      if (result.success) {
        setIsOtpSent(true);
        handleSuccess(result.message);
      } else {
        handleError(result.message || "Something went wrong."); // Show correct error here
      }
    } catch (error) {
      handleError("An error occurred. Please try again later.");
    }
  };
  

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const isLogin=true;
    if (!otp) {
      return handleError("OTP is required.");
    }
    try {
      const response = await fetch("http://localhost:3001/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp, email,name,isLogin }),
      });
      const result = await response.json();
      if (result.success) {
        localStorage.setItem("loggedInUserName", name);
        localStorage.setItem("loggedInUserEmail", email);
        handleSuccess("OTP verified successfully.");
        setTimeout(() => {
          navigate("/userprofile");
        }, 5000);
        // You can redirect to login or dashboard page after successful verification
      } else {
        handleError(result.message || "Invalid OTP.");
      }
    } catch (error) {
      handleError("An error occurred. Please try again later.");
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
      <div className="container mx-auto px-4 py-8 bg-transparent-800 bg-opacity-40 rounded-lg relative max-w-sm sm:max-w-md">
        <div className="p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-5xl font-bold text-brown-700 text-center">
            Login via OTP
          </h2>
          <form className="mt-4" onSubmit={isOtpSent ? handleOtpSubmit : handleEmailSubmit}>
            {!isOtpSent ? (
              <>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-brown-500"
                />
                <label className="block text-sm font-medium text-gray-700 mt-4">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-brown-500"
                />
                <button
                  type="submit"
                  className="w-full bg-brown-600 hover:bg-brown-700 text-white font-bold py-2 px-4 rounded-lg mt-6"
                >
                  Send OTP
                </button>
              </>
            ) : (
              <>
                <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
                <input
                  type="text"
                  name="otp"
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-brown-500"
                />
                <button
                  type="submit"
                  className="w-full bg-brown-600 hover:bg-brown-700 text-white font-bold py-2 px-4 rounded-lg mt-6"
                >
                  Verify OTP
                </button>
              </>
            )}
          </form>
          <Link to="/login" className="text-sm text-brown-600 hover:text-brown-700 mt-4 block text-center">
            Login Via Password
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginViaOTP;
