"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Login from "./Login"
import Signup from "./Signup"
import Dashboard from "./Dashboard"
import "./app.css"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem("auth")
    if (auth) {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (userData) => {
    localStorage.setItem("auth", JSON.stringify(userData))
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("auth")
    localStorage.removeItem("cart")
    setIsAuthenticated(false)
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onSignup={handleLogin} />} />
          <Route
            path="/dashboard/*"
            element={isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App

