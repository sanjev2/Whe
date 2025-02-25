"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

function Login({ onLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }
    onLogin({ email })
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>We Care Wheels</h1>
        <h2>Welcome Back</h2>
        <p style={{ textAlign: "center", color: "#666", marginBottom: "24px" }}>Please login to your account</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <Link to="/forgot-password" className="forgot-password">
            Forgot Password?
          </Link>

          <button type="submit" className="button primary">
            Login
          </button>

          <button type="button" className="button emergency">
            Emergency
          </button>

          {error && <div className="error">{error}</div>}
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  )
}

export default Login

