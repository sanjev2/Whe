"use client"

import { useState } from "react"
import { useNavigate, Routes, Route } from "react-router-dom"
import Services from "./Services"
import Settings from "./Settings"
import UserProfile from "./UserProfile"
import VehiclePortfolio from "./VehiclePortfolio"
import BillsAndPayment from "./BillsAndPayment"

function Dashboard({ onLogout }) {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState("dashboard")

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "🏠", path: "/dashboard" },
    { id: "profile", label: "User Profile", icon: "👤", path: "/dashboard/profile" },
    { id: "services", label: "Services", icon: "🛠", path: "/dashboard/services" },
    { id: "vehicle", label: "Vehicle Portfolio", icon: "🚗", path: "/dashboard/vehicle" },
    { id: "bills", label: "Bills and Payment", icon: "💰", path: "/dashboard/bills" },
    { id: "settings", label: "Settings", icon: "⚙️", path: "/dashboard/settings" },
  ]

  const handleNavClick = (item) => {
    setActiveNav(item.id)
    navigate(item.path)
  }

  return (
    <div className="dashboard">
      <nav className="sidebar">
        <div className="brand">Wheels</div>
        <ul className="nav-items">
          {navItems.map((item) => (
            <li
              key={item.id}
              className={`nav-item ${activeNav === item.id ? "active" : ""}`}
              onClick={() => handleNavClick(item)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>

      <main className="main-content">
        <header className="dashboard-header">
          <h1>Welcome to Dashboard</h1>
          <button onClick={onLogout} className="button logout">
            Log out
          </button>
        </header>

        <div className="content-area">
          <Routes>
            <Route path="/" element={<DashboardHome navigate={navigate} />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/services" element={<Services />} />
            <Route path="/vehicle" element={<VehiclePortfolio />} />
            <Route path="/bills" element={<BillsAndPayment />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

function DashboardHome({ navigate }) {
  return (
    <div className="dashboard-home">
      <button className="button add-service" onClick={() => navigate("/dashboard/services")}>
        + Add Service
      </button>
    
    </div>
  )
}

export default Dashboard

