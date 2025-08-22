const Service = require("../models/serviceModel");
const Department = require("../models/departmentModel");

// 👉 Create Service (Admin only)
exports.createService = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name)
      return res.status(400).json({ message: "Service name is required" });

    const service = new Service({ name, description });
    await service.save();

    res.status(201).json({ message: "Service created successfully", service });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating service", error: err.message });
  }
};

// 👉 Get All Services
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json({ services });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching services", error: err.message });
  }
};

// 👉 Update Service (Admin only)
exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const service = await Service.findById(id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    service.name = name || service.name;
    service.description = description || service.description;
    await service.save();

    res.json({ message: "Service updated successfully", service });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating service", error: err.message });
  }
};

// 👉 Delete Service (Admin only)
exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findByIdAndDelete(id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    // Remove service from all departments
    await Department.updateMany(
      { services: service._id },
      { $pull: { services: service._id } }
    );

    res.json({ message: "Service deleted successfully", service });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting service", error: err.message });
  }
};
