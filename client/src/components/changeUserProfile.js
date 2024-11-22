import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/changeUserProfile.css';

const FormComponent = () => {
    const [formData, setFormData] = useState({
        phone: '',
        address: '',
        gender: '',
        dob: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const userEmail = localStorage.getItem('loggedInUserEmail');

        if (!userEmail) {
            alert('User email not found');
            return;
        }

        // Calculate age from dob
        const today = new Date();
        const birthDate = new Date(formData.dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--; // Adjust if the birthday hasn't occurred yet this year
        }

        // Include calculated age in the form data
        const updatedFormData = { ...formData, age, email: userEmail };

        fetch(`http://localhost:3001/api/userProfile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(updatedFormData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('User profile updated successfully:', data);
            alert('Profile updated successfully!');
            navigate('/userprofile'); // Navigate after successful form submission
        })
        .catch(error => {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        });
    };

    const navigateHome = () => {
        navigate('/userprofile');
    };

    return (
        <div className="background-wrapper">
            <button className="home-button" onClick={navigateHome}>Home</button>
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
                            pattern="\d{10}"
                            title="Please enter a 10-digit phone number"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        ></textarea>
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
                        />
                    </div>
                    <button type="submit" className="submit-btn1">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default FormComponent;
