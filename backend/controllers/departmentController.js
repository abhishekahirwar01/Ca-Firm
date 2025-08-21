const Department = require("../models/departmentModel");
const User = require("../models/userModel");
const Service = require("../models/serviceModel");

// 👉 Create Department
exports.createDepartment = async (req, res) => {
  try {
    const { name, services = [], users = [] } = req.body;

    const department = new Department({ name, services, users });
    await department.save();

    // Update Users with department
    if (users.length > 0) {
      await User.updateMany(
        { _id: { $in: users } },
        { department: department._id }
      );
    }

    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 👉 Get All Departments
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find()
      .populate("services", "name")
      .populate("users", "name email");

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

    department.name = name || department.name;
    department.services = services;

    // Remove old users
    await User.updateMany(
      { department: department._id },
      { $unset: { department: "" } }
    );

    // Add new users
    if (users.length > 0) {
      await User.updateMany(
        { _id: { $in: users } },
        { department: department._id }
      );
    }

    department.users = users;
    await department.save();

    res.json(department);
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

    // Remove department from users
    await User.updateMany({ department: id }, { $unset: { department: "" } });

    res.json({ message: "Department deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
