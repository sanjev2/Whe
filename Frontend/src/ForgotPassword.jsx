"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

function ForgotPassword() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError("")
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Basic validation
    if (!formData.email || !formData.newPassword || !formData.confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    // Here you would typically make an API call to reset the password
    // For now, we'll simulate success
    setSuccess(true)
    setTimeout(() => {
      navigate("/login")
    }, 2000)
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="brand-title">We Care Wheels</h1>
        <h2 className="auth-subtitle">Reset Password</h2>
        <p className="auth-description">Enter your email and new password</p>

        {success ? (
          <div className="success-message">Password reset successful! Redirecting to login...</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="button primary">
              Reset Password
            </button>
          </form>
        )}

        <p className="auth-footer">
          <span className="link-text" onClick={() => navigate("/login")}>
            Back to Login
          </span>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword

