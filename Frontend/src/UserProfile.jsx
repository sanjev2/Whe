"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function UserProfile() {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    location: "",
    phoneNumber: "",
  })
  const [isEditing, setIsEditing] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile")
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile))
    setIsEditing(false)
  }

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    })
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
              <input type="text" name="fullName" value={profile.fullName} onChange={handleChange} />
            ) : (
              <div className="field-value">{profile.fullName}</div>
            )}
          </div>

          <div className="profile-field">
            <label>Email Address</label>
            {isEditing ? (
              <input type="email" name="email" value={profile.email} onChange={handleChange} />
            ) : (
              <div className="field-value">{profile.email}</div>
            )}
          </div>

          <div className="profile-field">
            <label>Location</label>
            {isEditing ? (
              <input type="text" name="location" value={profile.location} onChange={handleChange} />
            ) : (
              <div className="field-value">{profile.location}</div>
            )}
          </div>

          <div className="profile-field">
            <label>Phone Number</label>
            {isEditing ? (
              <input type="tel" name="phoneNumber" value={profile.phoneNumber} onChange={handleChange} />
            ) : (
              <div className="field-value">{profile.phoneNumber}</div>
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
  )
}

export default UserProfile

