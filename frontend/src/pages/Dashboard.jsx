import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
  const { auth, logout } = useContext(AuthContext);

  return (
    <div className="p-6">
      <h1>
        Welcome {auth.name} ({auth.role})
      </h1>
      <button onClick={logout}>Logout</button>

      <h2>Available Services</h2>
      <div className="card-grid">
        {(auth.role === "admin" ||
          auth.role === "ca" ||
          auth.role === "staff" ||
          auth.role === "client") && (
          <Link to="services/fca" className="service-card">
            <h3>FCA</h3>
          </Link>
        )}

        {(auth.role === "admin" || auth.role === "ca") && (
          <Link to="services/tumbledy" className="service-card">
            <h3>Tumbledy</h3>
          </Link>
        )}

        {(auth.role === "admin" ||
          auth.role === "ca" ||
          auth.role === "client") && (
          <Link to="services/pdf-viewer" className="service-card">
            <h3>PDF Viewer</h3>
          </Link>
        )}

        {(auth.role === "admin" || auth.role === "ca") && (
          <Link to="services/reports" className="service-card">
            <h3>Reports & Analytics</h3>
          </Link>
        )}

        {(auth.role === "admin" ||
          auth.role === "ca" ||
          auth.role === "staff") && (
          <Link to="services/tax" className="service-card">
            <h3>Task Management</h3>
          </Link>
        )}
      </div>

      {/* Nested routes render here */}
      <div className="service-outlet">
        <Outlet />
      </div>
    </div>
  );
}
