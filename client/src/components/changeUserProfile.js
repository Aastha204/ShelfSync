import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/changeUserProfile.css";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    phone: "",
    profession: "",
    gender: "",
    dob: "",
  });

  const today1 = new Date();
  const fiveYearsEarlier = new Date();
  fiveYearsEarlier.setFullYear(today1.getFullYear() - 5);

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("loggedInUserEmail");
    if (!userEmail) {
      toast.error("User email not found");
      return;
    }

    fetch(`http://localhost:3001/api/userProfile?email=${userEmail}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const formattedDob = data.dob
          ? new Date(data.dob).toISOString().split("T")[0]
          : "";
        setFormData({
          phone: data.phoneNo || "",
          profession: data.profession || "",
          gender: data.gender || "",
          dob: formattedDob,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data. Please try again.");
        setIsLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userEmail = localStorage.getItem("loggedInUserEmail");
    if (!userEmail) {
      toast.error("User email not found");
      return;
    }

    const today = new Date();
    const birthDate = new Date(formData.dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    const updatedFormData = { ...formData, age, email: userEmail };

    fetch(`http://localhost:3001/api/userProfile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(updatedFormData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("User profile updated successfully:", data);
        toast.success("Profile updated successfully!");
        navigate("/userprofile");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile. Please try again.");
      });
  };

  const navigateHome = () => {
    navigate("/userprofile");
  };

  const today = new Date().toISOString().split("T")[0];
  const minDob = new Date();
  minDob.setFullYear(minDob.getFullYear() - 100);

  if (isLoading) {
    return <div>Loading user details...</div>;
  }

  return (
    <div className="background-wrapper">
      <ToastContainer position="top-right" autoClose={3000} />
      <button className="home-button" onClick={navigateHome}>
        <FontAwesomeIcon icon={faUser} /> Profile
      </button>
      <div className="form-container">
        <h2>User Details Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="^[789]\d{9}$"
              title="Enter a valid 10-digit Indian phone number starting with 7, 8, or 9"
            />
          </div>
          <div className="form-group">
            <label htmlFor="profession">Profession</label>
            <input
              type="text"
              id="profession"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              required
              pattern="^(?!\s*$)[a-zA-Z\s]{5,}$"
              title="Profession should be at least 5 characters long, contain letters and spaces only, and must not be empty or consist of spaces."
              minLength="5"
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              max={fiveYearsEarlier.toISOString().split("T")[0]}
              min={minDob.toISOString().split("T")[0]}
            />
          </div>
          <button type="submit" className="submit-btn1">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormComponent;
