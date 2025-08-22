// src/pages/UserDashboard.jsx
import { useEffect, useState } from "react";
import API from "../services/api";
import "./UserDashboard.css"; // We'll create this CSS file

export default function UserDashboard() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const res = await API.get("/users/my-services");
      console.log("Fetched services:", res.data); // debug
      setServices(res.data || []); // ✅ backend is returning array directly
    } catch (err) {
      console.error("Error fetching services:", err);
      alert("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-dashboard">
      <div className="dashboard-header">
        <h1>User Dashboard</h1>
        <p>Manage your assigned services</p>
      </div>

      <div className="services-section">
        <div className="section-header">
          <h2>Your Assigned Services</h2>
          <div className="services-count">{services.length} services</div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading your services...</p>
          </div>
        ) : services.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No services assigned yet</h3>
            <p>
              You haven't been assigned to any services yet. Please check back
              later or contact your administrator.
            </p>
          </div>
        ) : (
          <div className="services-grid">
            {services.map((s) => (
              <div key={s._id} className="service-card">
                <div className="service-icon">{s.name[0].toUpperCase()}</div>
                <div className="service-content">
                  <h3 className="service-name">{s.name}</h3>
                  <p className="service-description">{s.description}</p>
                </div>
                <div className="service-status">Active</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
