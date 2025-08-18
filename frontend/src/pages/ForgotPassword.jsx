import { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import "./Login.css"; 

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
      <div className="login-image">
        <img src="/register-bg.jpg" alt="Forgot Password" />
      </div>

      <div className="login-form-wrapper">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Forgot Password</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn-login">
            Send Reset Link
          </button>
          {message && <p style={{ marginTop: "10px" }}>{message}</p>}

          <p className="register-link">
            Remembered? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
