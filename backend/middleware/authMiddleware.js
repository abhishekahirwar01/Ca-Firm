const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Auth middleware
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Hardcoded admin
    if (decoded.id === "admin-id") {
      req.user = {
        id: "admin-id",
        role: "admin",
        name: "Admin",
        email: "ahirwarabhi01@gmail.com",
      };
      return next();
    }

    // Normal users
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// Admin-only middleware
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
