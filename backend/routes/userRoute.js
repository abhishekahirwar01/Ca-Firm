const express = require("express");
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getMyServices,
} = require("../controllers/authController");

const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Admin-only routes
router.get("/", authMiddleware, adminMiddleware, getAllUsers);
router.post("/", authMiddleware, adminMiddleware, createUser);
router.put("/:id", authMiddleware, adminMiddleware, updateUser);
router.delete("/:id", authMiddleware, adminMiddleware, deleteUser);

// User-specific routes
router.get("/my-services", authMiddleware, getMyServices);

module.exports = router;
