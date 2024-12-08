import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  // Retrieve the user's email from local storage
  const userEmail = localStorage.getItem("loggedInUserEmail");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      console.log({
        email: userEmail,
        currentPassword,
        newPassword,
      });

      const response = await axios.post(
        "http://localhost:3001/auth/update-password",
        {
          email: userEmail,
          currentPassword,
          newPassword,
        }
      );

      console.log('Server response:', response.data);

      setSuccessMessage(response.data.message);
      setError('');

      // Delay the navigation by 3000 milliseconds (3 seconds)
      setTimeout(() => {
        navigate("/userProfile");
      }, 3000); // 3000ms = 3 seconds

    } catch (err) {
      console.error('Axios Error:', err);
      setError('Failed to update password. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-center text-2xl font-semibold text-brown-800 mb-6">
        Change Password
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-lg text-brown-700 mb-2">Current Password</label>
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
            />
            <i
              className={`fas ${showCurrentPassword ? "fa-eye-slash" : "fa-eye"} absolute right-3 top-3 cursor-pointer`}
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            ></i>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-lg text-brown-700 mb-2">New Password</label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
            />
            <i
              className={`fas ${showNewPassword ? "fa-eye-slash" : "fa-eye"} absolute right-3 top-3 cursor-pointer`}
              onClick={() => setShowNewPassword(!showNewPassword)}
            ></i>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-lg text-brown-700 mb-2">Confirm New Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
            />
            <i
              className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} absolute right-3 top-3 cursor-pointer`}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            ></i>
          </div>
        </div>

        {error && <p className="text-red-500 text-center font-bold">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-center font-bold">{successMessage}</p>
        )}

        <button
          type="submit"
          className="w-full py-2 mt-4 bg-brown-800 text-white font-semibold rounded-md hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
