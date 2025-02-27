"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

function BillsAndPayment() {
  const [bills, setBills] = useState([])
  const [services, setServices] = useState([])
  const navigate = useNavigate()

  // Fetch bills (payment history) from localStorage
  useEffect(() => {
    const savedBills = localStorage.getItem("bills")
    if (savedBills) {
      setBills(JSON.parse(savedBills))
    }
  }, [])

  // Fetch available services from the backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/services", {
          headers: { "Content-Type": "application/json" },
        })
        if (response.ok) {
          const result = await response.json()
          setServices(result.data)
        } else {
          console.error("Failed to fetch services, status:", response.status)
        }
      } catch (error) {
        console.error("Error fetching services:", error)
      }
    }
    fetchServices()
  }, [])

  // Navigate to the services page with the selected service as state
  const handleOrderAgain = (serviceType) => {
    navigate("/dashboard/services", { state: { selectedService: serviceType } })
  }

  return (
    <div className="bills-container">
      <div className="bills-header">
        <button className="back-button" onClick={() => navigate("/dashboard")}>
          <ArrowLeft />
        </button>
        <h1>Payment History</h1>
      </div>


      {/* Available Services Section */}
      <div className="services-section">
        
        {services.length === 0 ? (
          <p>No payment available.</p>
        ) : (
          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <p>
                  <strong>Price:</strong> Rs. {service.price}
                </p>
                <p>
                  <strong>Time:</strong> {service.time}
                </p>
                {service.features && service.features.length > 0 && (
                  <ul>
                    {service.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                )}
                <button className="button primary" onClick={() => handleOrderAgain(service)}>
                  Order Again
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BillsAndPayment
