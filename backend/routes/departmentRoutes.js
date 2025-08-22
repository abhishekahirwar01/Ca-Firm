const express = require("express");
const {
  createDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departmentController");

const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Admin-only for create/update/delete
router.post("/", authMiddleware, adminMiddleware, createDepartment);
router.put("/:id", authMiddleware, adminMiddleware, updateDepartment);
router.delete("/:id", authMiddleware, adminMiddleware, deleteDepartment);

// Authenticated users can fetch departments
router.get("/", authMiddleware, getDepartments);

module.exports = router;
