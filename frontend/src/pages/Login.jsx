import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import "./Login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Email/Password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
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

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      alert("Google login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src="/register-bg.jpg" alt="Login Cover" />
        <div className="overlay">
          <h1>Welcome Back!</h1>
          <p>Access your account and manage everything in one place.</p>
        </div>
      </div>

      <div className="login-form-wrapper">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Sign In</h2>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-login primary">
            Login
          </button>

          <button
            type="button"
            className="btn-login google"
            onClick={handleGoogleLogin}
          >
            <img src="/googleicon.png" alt="Google" />
            Continue with Google
          </button>

          <p className="forgot-link">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>

          <p className="register-link">
            Don’t have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
