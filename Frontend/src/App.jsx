"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Landing from "./Landing"
import Login from "./Login"
import Signup from "./Signup"
import Dashboard from "./Dashboard"
import Emergency from "./Emergency"
import ForgotPassword from "./ForgotPassword"
import "./app.css"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem("token")
    if (auth) {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (userData) => {
    localStorage.setItem("auth", JSON.stringify(userData))
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("cart")
    setIsAuthenticated(false)
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
          />
          <Route path="/signup" element={<Signup onSignup={handleLogin} />} />
          <Route
            path="/dashboard/*"
            element={isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

