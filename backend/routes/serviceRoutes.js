const express = require("express");
const {
  createService,
  getServices,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Admin-only service management
router.post("/", authMiddleware, adminMiddleware, createService);
router.put("/:id", authMiddleware, adminMiddleware, updateService);
router.delete("/:id", authMiddleware, adminMiddleware, deleteService);

// Public for authenticated users: fetch services
router.get("/", authMiddleware, getServices);

module.exports = router;
