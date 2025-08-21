import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import { motion } from "framer-motion";
import API from "../services/api";
import "./Login.css"; // Use the same CSS as Login/Google login

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/forgot-password", { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="login-card"
      >
        <h1 className="login-title">Forgot Password</h1>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <FiMail className="input-icon" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="login-btn"
          >
            Send Reset Link
          </motion.button>

          {message && (
            <p style={{ marginTop: "10px", color: "#2563eb", fontWeight: 500 }}>
              {message}
            </p>
          )}

          <div className="login-footer">
            <p>
              Remembered your password?{" "}
              <Link to="/login" className="login-link">
                Login here
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
