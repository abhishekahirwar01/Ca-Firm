const Service = require("../models/serviceModel");

// Create service
exports.createService = async (req, res) => {
  try {
    const { name, description } = req.body;
    const service = new Service({ name, description });
    await service.save();
    res.status(201).json({ message: "Service created", service });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all services
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update service
exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedService = await Service.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    if (!updatedService)
      return res.status(404).json({ message: "Service not found" });
    res.json({ message: "Service updated", service: updatedService });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete service
exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedService = await Service.findByIdAndDelete(id);
    if (!deletedService)
      return res.status(404).json({ message: "Service not found" });
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
