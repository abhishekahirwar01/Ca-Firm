const Department = require("../models/departmentModel");
const User = require("../models/userModel");
const Service = require("../models/serviceModel");

// 👉 Create Department (Admin only)
exports.createDepartment = async (req, res) => {
  try {
    const { name, services = [], users = [] } = req.body;

    if (!name)
      return res.status(400).json({ error: "Department name is required" });

    const department = new Department({ name, services, users });
    await department.save();

    // Assign department to selected users
    if (users.length > 0) {
      await User.updateMany(
        { _id: { $in: users } },
        { department: department._id }
      );
    }

    res.status(201).json({ message: "Department created", department });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 👉 Get All Departments
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find()
      .populate("services", "name")
      .populate("users", "name email role");

    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 👉 Update Department (name, services, users)
exports.updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, services = [], users = [] } = req.body;

    const department = await Department.findById(id);
    if (!department)
      return res.status(404).json({ error: "Department not found" });

    // Update name and services
    department.name = name || department.name;
    department.services = services;

    // Remove department from old users
    await User.updateMany(
      { department: department._id },
      { $unset: { department: "" } }
    );

    // Assign department to new users
    if (users.length > 0) {
      await User.updateMany(
        { _id: { $in: users } },
        { department: department._id }
      );
    }

    department.users = users;
    await department.save();

    res.json({ message: "Department updated", department });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 👉 Delete Department
exports.deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.findByIdAndDelete(id);
    if (!department)
      return res.status(404).json({ error: "Department not found" });

    // Remove department from all users
    await User.updateMany({ department: id }, { $unset: { department: "" } });

    res.json({ message: "Department deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
