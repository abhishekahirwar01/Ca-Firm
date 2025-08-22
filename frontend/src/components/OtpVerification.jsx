// src/components/OtpVerification.jsx
import React, { useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";

export default function OtpVerification({ email, onSuccess }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/verify-otp", { email, otp });
      alert("OTP verified successfully!");
      onSuccess(res.data.token, res.data.user);
    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      const res = await API.post("/auth/login", { email, password: "" });
      // Empty password for admin/user will trigger OTP resend
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="otp-container">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="otp-card"
      >
        <h2>Enter OTP</h2>
        <p>
          An OTP has been sent to: <strong>{email}</strong>
        </p>

        <form onSubmit={handleVerify} className="otp-form">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="verify-btn"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </motion.button>
        </form>

        <p className="resend-text">
          Didn't receive OTP?{" "}
          <button type="button" onClick={handleResend} className="resend-btn">
            Resend OTP
          </button>
        </p>
      </motion.div>
    </div>
  );
}
