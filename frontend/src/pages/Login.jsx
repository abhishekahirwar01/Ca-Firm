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

      // Save token & full user object
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Redirect based on role
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
      </div>

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

          <p className="register-link">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
