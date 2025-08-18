import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "./Register.css"; // external CSS file

export default function Register() {
  const [form, setForm] = useState({
    role: "client",
    name: "",
    clientBusinessName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    panNumber: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Registration successful, please login!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      {/* Left Side Image */}
      <div className="register-image">
        <img src="/register-bg.jpg" alt="Register" />
      </div>

      {/* Right Side Form */}
      <div className="register-form">
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>

          <label>Role:</label>
          <div className="role-options">
            <label>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={form.role === "admin"}
                onChange={handleChange}
              />
              Admin
            </label>

            <label>
              <input
                type="radio"
                name="role"
                value="ca"
                checked={form.role === "ca"}
                onChange={handleChange}
              />
              CA
            </label>

            <label>
              <input
                type="radio"
                name="role"
                value="staff"
                checked={form.role === "staff"}
                onChange={handleChange}
              />
              Staff
            </label>

            <label>
              <input
                type="radio"
                name="role"
                value="client"
                checked={form.role === "client"}
                onChange={handleChange}
              />
              Client
            </label>
          </div>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          {form.role === "client" && (
            <input
              type="text"
              name="clientBusinessName"
              placeholder="Business Name"
              value={form.clientBusinessName}
              onChange={handleChange}
              required
            />
          )}

          {form.role !== "client" && (
            <input
              type="text"
              name="panNumber"
              placeholder="PAN Number"
              value={form.panNumber}
              onChange={handleChange}
              required
            />
          )}

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

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
          />

          <button type="submit" className="btn-register">
            Register
          </button>

          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
