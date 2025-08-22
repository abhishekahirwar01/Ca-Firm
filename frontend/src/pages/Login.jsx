import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { motion } from "framer-motion";
import API from "../services/api"; // your API instance
import { auth, provider } from "../firebase"; // Firebase config
import { signInWithPopup } from "firebase/auth";
import OtpVerification from "../components/OtpVerification"; // OTP component
import "./Login.css"; // External CSS

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [otpSent, setOtpSent] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Email/Password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", formData);

      // Backend only sends OTP first
      setOtpSent(true);
      setOtpEmail(res.data.email);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const res = await API.post("/auth/google-login", {
        name: user.displayName,
        email: user.email,
      });

      // OTP flow for Google login
      setOtpSent(true);
      setOtpEmail(res.data.email);
    } catch (err) {
      alert("Google login failed");
    }
  };

  // Called after OTP is successfully verified
  const handleOtpSuccess = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    if (user.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/dashboard");
    }
  };

  // Show OTP verification if OTP sent
  if (otpSent) {
    return <OtpVerification email={otpEmail} onSuccess={handleOtpSuccess} />;
  }

  return (
    <div className="login-container">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="login-card"
      >
        <h1 className="login-title">Login</h1>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <FiMail className="input-icon" />
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FiLock className="input-icon" />
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="login-btn"
          >
            Sign In
          </motion.button>

          <motion.button
            type="button"
            onClick={handleGoogleLogin}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="google-btn"
          >
            <img src="./googleicon.png" alt="Google" className="google-icon" />
            Continue with Google
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
