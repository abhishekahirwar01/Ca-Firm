import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { auth, provider } from "../firebase"; // Firebase imports
import { signInWithPopup } from "firebase/auth";
import "./Login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Handle email/password input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Email/password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);

      // Save token & user info in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name);

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  // Firebase Google login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Send user info to backend to create/find user & generate JWT
      const res = await API.post("/auth/google-login", {
        name: user.displayName,
        email: user.email,
      });

      // Save token & user info in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name);

      navigate("/dashboard");
    } catch (err) {
      alert("Google login failed");
    }
  };

  return (
    <div className="login-container">
      {/* Left side image */}
      <div className="login-image">
        <img src="/register-bg.jpg" alt="Login Cover" />
      </div>

      {/* Right side form */}
      <div className="login-form-wrapper">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-login">
            Login
          </button>

          {/* Firebase Google login */}
          <button
            type="button"
            className="btn-login btn-google"
            onClick={handleGoogleLogin}
          >
            Continue with Google
          </button>

          <p>
            <Link
              to="/forgot-password"
              style={{ textDecoration: "underline", color: "blue" }}
            >
              Forgot Password?
            </Link>
          </p>

          {/* Register link */}
          <p className="register-link">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
