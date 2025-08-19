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

router.post("/", authMiddleware, adminMiddleware, createService);
router.get("/", authMiddleware, getServices);
router.put("/:id", authMiddleware, adminMiddleware, updateService);
router.delete("/:id", authMiddleware, adminMiddleware, deleteService);

module.exports = router;
