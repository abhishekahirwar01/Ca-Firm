import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Login.css"; // reuse your login styles

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post(`/auth/reset-password/${token}`, { password });
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 2000); // redirect to login after success
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src="/register-bg.jpg" alt="Reset Password" />
      </div>

      <div className="login-form-wrapper">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Reset Password</h2>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-login">
            Reset Password
          </button>
          {message && <p style={{ marginTop: "10px" }}>{message}</p>}
        </form>
      </div>
    </div>
  );
}
