"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import qr from "./images/qr.png"
import esewa from "./images/esewa.png"
import khalti from "./images/khalti.png"
import visa from "./images/visa.png"
import ips from "./images/ips.png"

function Services() {
  const [cart, setCart] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)
  const [selectedService, setSelectedService] = useState(null)
  const [selectedOil, setSelectedOil] = useState(null)
  const [showCart, setShowCart] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

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
      title: "Basic Service",
      description: "• 1000 Kms or 1 Month Warranty • Every 5000 Kms or 3 Months (Recommended)",
      features: [
        "Oil and Filter Change",
        "Visual Inspection",
        "Fluid Top-ups",
        "Tire Inspection",
        "Hoses, Belts, and Hydraulic Lines Check",
        "Road Test",
      ],
      price: 3769,
      time: "6 Hrs",
    },
    {
      id: 2,
      title: "Standard Service",
      description: "• 1000 Kms or 1 Month Warranty • Every 10,000 Kms or 6 Months (Recommended)",
      features: [
        "Wiper Fluid Replacement",
        "Car Wash",
        "Engine Oil Replacement",
        "Air Filter Cleaning",
        "Heater/Spark Plugs Checking",
        "Battery Water Top Up",
      ],
      price: 4869,
      time: "8 Hrs",
    },
    {
      id: 3,
      title: "Comprehensive Service",
      description: "• 1000 Kms or 1 Month Warranty • Every 20,000 Kms or 12 Months (Recommended)",
      features: [
        "AC Filter Replacement",
        "Car Scanning",
        "Gear Oil Top Up",
        "Front Brake Pads Serviced",
        "Engine Flushing",
        "Fuel Filter Checking",
      ],
      price: 7899,
      time: "12 Hrs",
    },
  ]

  const oils = [
    {
      id: 1,
      name: "Synthetic Oil",
      type: "Mobil 5W40",
      description: "Exceptional Performance Boost.",
      price: 0,
    },
    {
      id: 2,
      name: "Fully Synthetic Oil",
      type: "Mobil 5W30",
      description: "Best for Daily Commutes & Engine Protection.",
      price: 3000,
    },
  ]

  const handleAddToCart = (service) => {
    setSelectedService(service)
    setShowModal(true)
  }

  const handleOilSelection = (oil) => {
    setSelectedOil(oil)
  }

  const handleAddServiceWithOil = () => {
    if (!selectedOil) {
      alert("Please select an oil type")
      return
    }

    const serviceWithOil = {
      ...selectedService,
      oil: selectedOil,
      totalPrice: selectedService.price + selectedOil.price,
      id: Date.now(),
    }

    setCart([...cart, serviceWithOil])
    setShowModal(false)
    setSelectedService(null)
    setSelectedOil(null)
  }

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const handleProceedToCheckout = () => {
    setShowCart(false)
    setShowReceipt(true)
  }

  const handleSaveBill = () => {
    const currentBills = JSON.parse(localStorage.getItem("bills") || "[]")
    const newBill = {
      id: Date.now(),
      service: cart[0].title,
      oilType: cart[0].oil.name,
      price: cart.reduce((total, item) => total + item.totalPrice, 0),
      time: cart[0].time,
      date: new Date().toISOString().split("T")[0],
      status: "completed",
      addOns: `1 Service & 3 Add Ons`,
    }

    localStorage.setItem("bills", JSON.stringify([...currentBills, newBill]))
    setCart([])
    localStorage.removeItem("cart")
    setShowSuccess(true)

    // Automatically hide success message and redirect after 2 seconds
    setTimeout(() => {
      setShowSuccess(false)
      navigate("/dashboard")
    }, 2000)
  }

  if (showSuccess) {
    return (
      <div className="success-container">
        <div className="success-message">Bill saved successfully!</div>
      </div>
    )
  }

  if (showReceipt && cart.length > 0) {
    const latestService = cart[0]
    return (
      <div className="receipt-container">
        <div className="receipt-header">
          <button className="back-button" onClick={() => setShowReceipt(false)}>
            <ArrowLeft />
          </button>
          <h1>Service Receipt</h1>
        </div>

        <div className="receipt-card">
          <div className="receipt-row">
            <span className="receipt-label">Service:</span>
            <span className="receipt-value">{latestService.title}</span>
          </div>
          <div className="receipt-row">
            <span className="receipt-label">Oil type:</span>
            <span className="receipt-value">{latestService.oil.name}</span>
          </div>
          <div className="receipt-row">
            <span className="receipt-label">Price:</span>
            <span className="receipt-value">Rs.{latestService.totalPrice}</span>
          </div>
          <div className="receipt-row">
            <span className="receipt-label">Time:</span>
            <span className="receipt-value">{latestService.time}</span>
          </div>
        </div>

        <div className="qr-code">
          <img src={qr} alt="QR Code" />
        </div>

        <div className="payment-section">
          <h3>Payment Methods</h3>
          <div className="payment-methods">
            <img src={esewa} alt="eSewa" className="payment-logo" />
            <img src={khalti} alt="Khalti" className="payment-logo" />
            <img src={visa} alt="Visa" className="payment-logo" />
            <img src={ips} alt="ConnectIPS" className="payment-logo" />
          </div>
        </div>

        <div className="receipt-actions">
          <button className="button primary" onClick={handleSaveBill}>
            Save Bill
          </button>
          <button className="button primary" onClick={() => navigate("/dashboard")}>
            Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="services-container">
      <h1>Schedule Packages</h1>

      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <div className="service-header">
              <h3>{service.title}</h3>
              <div className="service-warranty">{service.description}</div>
            </div>
            <div className="service-content">
              <ul className="service-features">
                {service.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <div className="service-footer">
                <div className="service-info">
                  <span className="service-price">₨ {service.price}</span>
                  <span className="service-time">⏱ {service.time}</span>
                </div>
                <button className="button add-to-cart" onClick={() => handleAddToCart(service)}>
                  + Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content oil-selection-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              ×
            </button>
            <h2>Select Oil Type</h2>
            <div className="oil-options">
              {oils.map((oil) => (
                <div
                  key={oil.id}
                  className={`oil-option ${selectedOil?.id === oil.id ? "selected" : ""}`}
                  onClick={() => handleOilSelection(oil)}
                >
                  <div className="oil-radio">
                    <div className="radio-inner"></div>
                  </div>
                  <div className="oil-info">
                    <h3>{oil.name}</h3>
                    <p className="oil-type">{oil.type}</p>
                    <p className="oil-description">{oil.description}</p>
                    <p className="oil-price">Rs. {oil.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="button primary" onClick={handleAddServiceWithOil}>
              Add To Cart
            </button>
          </div>
        </div>
      )}

      {showCart && (
        <div className="modal-overlay" onClick={() => setShowCart(false)}>
          <div className="modal-content cart-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowCart(false)}>
              ×
            </button>
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
              <p className="empty-cart">Your cart is empty</p>
            ) : (
              <div className="cart-items">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <h3>{item.title}</h3>
                      <p>
                        {item.oil.name} - {item.oil.type}
                      </p>
                      <p className="cart-item-price">₨ {item.totalPrice}</p>
                    </div>
                    <button className="button remove" onClick={() => handleRemoveFromCart(item.id)}>
                      Remove
                    </button>
                  </div>
                ))}
                <div className="cart-total">
                  <h3>Total:</h3>
                  <p>₨ {cart.reduce((total, item) => total + item.totalPrice, 0)}</p>
                </div>
                <button className="button primary" onClick={handleProceedToCheckout}>
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="services-footer">
        <button className="button secondary" onClick={() => navigate("/dashboard")}>
          Return to Dashboard
        </button>
        <button className="button primary" onClick={() => setShowCart(true)}>
          View Cart ({cart.length})
        </button>
      </div>
    </div>
  )
}

export default Services

