"use client"

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserProfile() {
  const [profile, setProfile] = useState({
    id: null,
    fullName: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch user details from the backend "get me" endpoint
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:4000/api/auth/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Use response.data.data.user (per your backend response)
        const user = response.data.data.user;
        setProfile({
          id: user.id,
          fullName: user.name || "",
          email: user.email || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to load profile");
        setLoading(false);
      });
  }, []);

  // API integration for updating the user profile
  const handleSave = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("User not authenticated");
      return;
    }

    axios
      .put(
        `http://localhost:4000/api/users/${profile.id}`,
        {
          name: profile.fullName,
          email: profile.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setIsEditing(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to update profile");
      });
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="dashboard-section">
      <div className="section-header">
        <h2>User Profile</h2>
      </div>

      <div className="section-content profile-content">
        <div className="profile-fields">
          <div className="profile-field">
            <label>Full Name</label>
            {isEditing ? (
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
              />
            ) : (
              <div className="field-value">{profile.fullName}</div>
            )}
          </div>

          <div className="profile-field">
            <label>Email Address</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
              />
            ) : (
              <div className="field-value">{profile.email}</div>
            )}
          </div>
        </div>

        <div className="profile-actions">
          {isEditing ? (
            <button className="button primary" onClick={handleSave}>
              Save Changes
            </button>
          ) : (
            <button className="button primary" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          )}
          <button className="button secondary" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
