import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { ...form, role: "admin" });
      alert("✅ Admin Registration successful, please login!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      {/* Left side image + overlay */}
      <div className="register-image">
        <img src="/register-bg.jpg" alt="Register" />
        <div className="overlay">
          <h1>Join Us Today</h1>
          <p>Secure and powerful admin dashboard access awaits you.</p>
        </div>
      </div>

      {/* Right side form */}
      <div className="register-form-wrapper">
        <div className="register-card">
          <h2>Admin Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn-register">
              Register Admin
            </button>

            <p className="login-link">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
