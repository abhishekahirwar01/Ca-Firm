const express = require("express");
const {
  login,
  googleLogin,
  verifyOtp,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const router = express.Router();

// ---------------- Public Routes ----------------
router.post("/login", login); // Email + Password → sends OTP
router.post("/google-login", googleLogin); // Google login → sends OTP
router.post("/verify-otp", verifyOtp); // Verify OTP for login
router.post("/forgot-password", forgotPassword); // Request password reset
router.post("/reset-password/:token", resetPassword); // Reset password using token

module.exports = router;
