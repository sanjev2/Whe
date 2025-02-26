"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

function BillsAndPayment() {
  const [bills, setBills] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const savedBills = localStorage.getItem("bills")
    if (savedBills) {
      setBills(JSON.parse(savedBills))
    }
  }, [])

  const handleOrderAgain = (serviceType) => {
    navigate("/dashboard/services", { state: { selectedService: serviceType } })
  }

  return (
    <div className="bills-container">
      <div className="bills-header">
        <button className="back-button" onClick={() => navigate("/dashboard")}>
          <ArrowLeft />
        </button>
        <h1>My Payments</h1>
      </div>

      <div className="bills-content">
        {bills.length === 0 ? (
          <div className="empty-state">
            <p>No payment history available.</p>
          </div>
        ) : (
          <div className="bills-list">
            {bills.map((bill) => (
              <div key={bill.id} className="bill-item">
                <div className="bill-service-info">
                  <h3>{bill.service}</h3>
                  <p>{bill.addOns}</p>
                  <p className="bill-total">Total: Rs. {bill.price}</p>
                </div>
                <div className="bill-status-actions">
                  <span className="payment-status">Payment Completed</span>
                  <div className="bill-actions">
                    <button className="button secondary" onClick={() => handleOrderAgain(bill.service)}>
                      Order Again
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BillsAndPayment

