"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function VehiclePortfolio() {
  const [vehicles, setVehicles] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState(null)
  const [newVehicle, setNewVehicle] = useState({
    vehicleName: "",
    purchaseDate: "",
    numberPlate: "",
    fuelType: "",
  })
  const navigate = useNavigate()

  useEffect(() => {
    const savedVehicles = localStorage.getItem("vehicles")
    if (savedVehicles) {
      setVehicles(JSON.parse(savedVehicles))
    }
  }, [])

  const handleAddVehicle = () => {
    if (!newVehicle.vehicleName || !newVehicle.purchaseDate || !newVehicle.numberPlate || !newVehicle.fuelType) {
      alert("Please fill in all fields")
      return
    }

    const updatedVehicles = editingVehicle
      ? vehicles.map((v) => (v.id === editingVehicle.id ? { ...newVehicle, id: v.id } : v))
      : [...vehicles, { ...newVehicle, id: Date.now() }]

    setVehicles(updatedVehicles)
    localStorage.setItem("vehicles", JSON.stringify(updatedVehicles))
    handleCloseModal()
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingVehicle(null)
    setNewVehicle({
      vehicleName: "",
      purchaseDate: "",
      numberPlate: "",
      fuelType: "",
    })
  }

  const handleUpdateVehicle = (vehicle) => {
    setEditingVehicle(vehicle)
    setNewVehicle(vehicle)
    setShowModal(true)
  }

  const handleDeleteVehicle = (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      const updatedVehicles = vehicles.filter((vehicle) => vehicle.id !== id)
      setVehicles(updatedVehicles)
      localStorage.setItem("vehicles", JSON.stringify(updatedVehicles))
    }
  }

  return (
    <div className="vehicle-portfolio">
      <div className="portfolio-header">
        <div className="header-with-nav">
          <button className="nav-back" onClick={() => navigate("/dashboard")}>
            ←
          </button>
          <h2>Vehicle Portfolio</h2>
        </div>
      </div>

      <div className="portfolio-content">
        {vehicles.length === 0 ? (
          <div className="empty-state">
            <p>No vehicles added yet. Add your first vehicle!</p>
          </div>
        ) : (
          <div className="vehicle-grid">
            {vehicles.map((vehicle, index) => (
              <div key={vehicle.id} className="vehicle-card">
                <h3 className="vehicle-title">Vehicle {index + 1}</h3>
                <div className="vehicle-info">
                  <div className="info-row">
                    <span className="info-label">Vehicle Name:</span>
                    <span className="info-value">{vehicle.vehicleName}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Purchased On:</span>
                    <span className="info-value">{vehicle.purchaseDate}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Number Plate:</span>
                    <span className="info-value">{vehicle.numberPlate}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Fuel type:</span>
                    <span className="info-value">{vehicle.fuelType}</span>
                  </div>
                </div>
                <div className="vehicle-actions">
                  <button className="button update" onClick={() => handleUpdateVehicle(vehicle)}>
                    Update
                  </button>
                  <button className="button delete" onClick={() => handleDeleteVehicle(vehicle.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <button className="button add-vehicle" onClick={() => setShowModal(true)}>
          Add Vehicle
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content vehicle-modal">
            <button className="modal-close" onClick={handleCloseModal}>
              ×
            </button>
            <h3>{editingVehicle ? "Update Vehicle" : "Add New Vehicle"}</h3>

            <div className="modal-form">
              <div className="form-group">
                <label>Vehicle Name:</label>
                <input
                  type="text"
                  value={newVehicle.vehicleName}
                  onChange={(e) =>
                    setNewVehicle({
                      ...newVehicle,
                      vehicleName: e.target.value,
                    })
                  }
                  placeholder="Enter vehicle name"
                />
              </div>

              <div className="form-group">
                <label>Purchased On:</label>
                <input
                  type="date"
                  value={newVehicle.purchaseDate}
                  onChange={(e) =>
                    setNewVehicle({
                      ...newVehicle,
                      purchaseDate: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Number Plate:</label>
                <input
                  type="text"
                  value={newVehicle.numberPlate}
                  onChange={(e) =>
                    setNewVehicle({
                      ...newVehicle,
                      numberPlate: e.target.value,
                    })
                  }
                  placeholder="Enter number plate"
                />
              </div>

              <div className="form-group">
                <label>Fuel type:</label>
                <select
                  value={newVehicle.fuelType}
                  onChange={(e) =>
                    setNewVehicle({
                      ...newVehicle,
                      fuelType: e.target.value,
                    })
                  }
                >
                  <option value="">Select fuel type</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <button className="button primary" onClick={handleAddVehicle}>
                {editingVehicle ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default VehiclePortfolio

