"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import wheels from "./images/m.webp"; // Ensure the correct path

const LandingPage = () => {
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className={`landing ${darkMode ? "dark-mode" : "light-mode"}`}>
      {/* Fixed Header */}
      <header className="heading">
        <div className="company-name">WHEELS</div>
        <nav>
          <ul className="nav-links">
            <li>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault()
                  navigate("/")
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#servi"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("servi")
                }}
              >
                Our Services
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("about")
                }}
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#footer"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("footer")
                }}
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="#feedback"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("feedback")
                }}
              >
                Feedback
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="body">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h2>QUALITY SERVICES FOR EVERY RIDE</h2>
            <p>
              From routine maintenance to emergency assistance, we ensure top-notch care for your vehicle with certified
              technicians and state-of-the-art facilities.
            </p>
            <div className="hero-buttons">
              <button className="primary-btn" onClick={() => navigate("/login")}>
                Book Now
              </button>
              <button className="secondary-btn" onClick={() => scrollToSection("services")}>
                Learn More
              </button>
            </div>
          </div>
          <img src={wheels || "/placeholder.svg"} alt="Car Service" className="hero-image" />
        </section>

        {/* Services Section */}
        <section id="servi" className="servi">
          <h3>Our Services</h3>
          <div className="service-cards1">
            <div className="service-card1">
              <h4>Basic Servicing</h4>
              <p>Essential maintenance to keep your car running smoothly.</p>
            </div>
            <div className="service-card1">
              <h4>Comprehensive Servicing</h4>
              <p>In-depth inspection and servicing for optimal performance.</p>
            </div>
            <div className="service-card1">
              <h4>Emergency Assistance</h4>
              <p>24/7 roadside help and quick recovery services.</p>
            </div>
            <div className="service-card1">
              <h4>Custom Solutions</h4>
              <p>Personalized maintenance plans for your vehicle.</p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about">
          <h3>About Us</h3>
          <p>
            Wheels is revolutionizing Nepal's car service industry by digitally empowering local garages with an
            all-in-one software solution. Our platform enables workshops to track leads, invoices, and service history
            while ensuring seamless customer communication, transparency, and no hidden charges.
          </p>
        </section>

        {/* Feedback Section */}
        <section id="feedback" className="feedback">
          <h3>Your Opinion Matters</h3>
          <p>Help us improve by sharing your experience</p>
          <button className="feedback-btn" onClick={() => navigate("/feedback")}>
            Share Feedback
          </button>
        </section>

        {/* Footer */}
        <footer id="footer" className="footer">
          <p>© 2025 We Care Wheels. All rights reserved.</p>
          <p>Man Bhawan, Kathmandu, Bagmati Province, 44700 Nepal | (+977) 9742458587</p>
        </footer>
      </main>
    </div>
  )
}

export default LandingPage

