"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MapPin } from "lucide-react"

function Emergency() {
  const navigate = useNavigate()
  const [showConfirmation, setShowConfirmation] = useState("")

  const handleShareLocation = (service) => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Here you would typically send this to your backend
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          console.log(`Location shared for ${service}:`, location)
          setShowConfirmation(service)

          // Reset confirmation message after 3 seconds
          setTimeout(() => {
            setShowConfirmation("")
          }, 3000)
        },
        (error) => {
          console.error("Error getting location:", error)
          alert("Unable to get your location. Please enable location services.")
        },
      )
    } else {
      alert("Geolocation is not supported by your browser")
    }
  }

  return (
    <div className="emergency-container">
      <div className="emergency-card">
        <h1 className="emergency-title">Emergency We Care Wheels</h1>

        <section className="emergency-section">
          <h2 className="emergency-subtitle">Emergency Towing</h2>
          <p className="emergency-text">Click below to share your location and call the nearest towing service.</p>
          <button
            className={`share-location-btn ${showConfirmation === "towing" ? "confirmed" : ""}`}
            onClick={() => handleShareLocation("towing")}
          >
            <MapPin className="icon" />
            {showConfirmation === "towing" ? "Location Shared!" : "Share My Location"}
          </button>
        </section>

        <section className="emergency-section">
          <h2 className="emergency-subtitle">Emergency Inspection</h2>
          <p className="emergency-text">Click below to share your location and call the nearest towing service.</p>
          <button
            className={`share-location-btn ${showConfirmation === "inspection" ? "confirmed" : ""}`}
            onClick={() => handleShareLocation("inspection")}
          >
            <MapPin className="icon" />
            {showConfirmation === "inspection" ? "Location Shared!" : "Share My Location"}
          </button>
        </section>

        <button className="return-login-btn" onClick={() => navigate("/login")}>
          Return to Login
        </button>
      </div>
    </div>
  )
}

export default Emergency

