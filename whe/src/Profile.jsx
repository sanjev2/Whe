import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Profile = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark-mode', savedDarkMode);

    // Optional: Add this if you want to apply dark mode to specific component elements
    const elements = document.querySelectorAll('.dark-mode');
    elements.forEach((element) => {
        element.classList.toggle('dark-mode', savedDarkMode);
    });
}, []);


  useEffect(() => {
    // Retrieve user data from localStorage
    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");
    const location = localStorage.getItem("userLocation");
    const number = localStorage.getItem("userNumber");

    // If user data is not found, navigate to signup
    if (!name) {
      navigate("/signup");
    } else {
      setUserData({ name, email, location, number });
    }
  }, [navigate]);

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">User Profile</h1>
      <div className="profile-info">
        <div className="info-item">
          <label>Full Name:</label>
          <span>{userData.name}</span>
        </div>
        <div className="info-item">
          <label>Email Address:</label>
          <span>{userData.email}</span>
        </div>
        <div className="info-item">
          <label>Location:</label>
          <span>{userData.location}</span>
        </div>
        <div className="info-item">
          <label>Phone Number:</label>
          <span>{userData.number}</span>
        </div>
      </div>
      <div className="profile-actions">
      <Link to="/editprofile" className="edit-profile-btn">
        Edit Profile
      </Link>
        <button className="back-dashboard-btn" onClick={handleBackToDashboard}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Profile;
