"use client"

import { useState, useEffect } from "react"

function Services() {
  const [cart, setCart] = useState([])

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const services = [
    {
      id: 1,
      name: "Basic Service",
      description: "Essential maintenance package",
      price: 99.99,
    },
    {
      id: 2,
      name: "Standard Service",
      description: "Comprehensive care package",
      price: 149.99,
    },
    {
      id: 3,
      name: "Comprehensive Service",
      description: "Complete vehicle maintenance",
      price: 199.99,
    },
  ]

  const addToCart = (service) => {
    setCart([...cart, service])
  }

  return (
    <div className="dashboard-section">
      <div className="section-header">
        <h2>Car Service Booking</h2>
      </div>

      <div className="section-content">
        <h3>Schedule Packages</h3>

        <div className="service-list">
          {services.map((service) => (
            <div key={service.id} className="service-item">
              <div className="service-info">
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <p className="service-price">${service.price}</p>
              </div>
              <button className="button primary small" onClick={() => addToCart(service)}>
                + Add to cart
              </button>
            </div>
          ))}
        </div>

        <div className="service-actions">
          <button className="button primary">View Cart ({cart.length})</button>
        </div>
      </div>
    </div>
  )
}

export default Services

