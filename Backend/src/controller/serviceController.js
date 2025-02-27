// controllers/serviceController.js
import { Service } from "../models/Service.js";

export const serviceController = {
  // GET /api/services
  getAll: async (req, res) => {
    try {
      const services = await Service.findAll();
      res.status(200).json({ data: services, message: "Successfully fetched services" });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch services" });
    }
  },

  // GET /api/services/:id
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const service = await Service.findByPk(id);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.status(200).json({ data: service, message: "Service fetched successfully" });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch service" });
    }
  },

  // POST /api/services
  create: async (req, res) => {
    try {
      const { title, description, features, price, time } = req.body;

      const newService = await Service.create({ title, description, features, price, time });
      res.status(201).json({ data: newService, message: "Service created successfully" });
    } catch (err) {
      res.status(500).json({ error: "Failed to create service" });
    }
  },

  // PUT /api/services/:id
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, features, price, time } = req.body;
      const service = await Service.findByPk(id);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      service.title = title || service.title;
      service.description = description || service.description;
      service.features = features || service.features;
      service.price = price || service.price;
      service.time = time || service.time;
      await service.save();
      res.status(200).json({ data: service, message: "Service updated successfully" });
    } catch (err) {
      res.status(500).json({ error: "Failed to update service" });
    }
  },

  // DELETE /api/services/:id
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const service = await Service.findByPk(id);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      await service.destroy();
      res.status(200).json({ message: "Service deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete service" });
    }
  },
};
