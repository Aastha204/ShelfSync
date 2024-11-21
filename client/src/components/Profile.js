// src/components/Profile.js
import React, { useState } from 'react';

function Profile() {
  const [profile, setProfile] = useState({
    // name: 'John Doe',
    // email: 'johndoe@example.com',
    // phone: '123-456-7890',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    console.log('Profile updated:', profile);
  };

  return (
    <div className="profile">
      {/* <h2>Book Issue Slip</h2> */}
      {/* <input name="name" value={profile.name} onChange={handleChange} />
      <input name="email" value={profile.email} onChange={handleChange} />
      <input name="phone" value={profile.phone} onChange={handleChange} />
      <button onClick={handleUpdate}>Update Profile</button> */}
    </div>
  );
}

export default Profile;
