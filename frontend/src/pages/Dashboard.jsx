import { Link, Outlet, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="p-6">
      <h1>Welcome {name}</h1>
      <button onClick={handleLogout}>Logout</button>

      <h2>Available Services</h2>
      <div className="card-grid">
        <Link to="services/fca" className="service-card">
          <h3>FCA</h3>
        </Link>

        <Link to="services/tumbledy" className="service-card">
          <h3>Tumbledy</h3>
        </Link>

        <Link to="services/pdf-viewer" className="service-card">
          <h3>PDF Viewer</h3>
        </Link>

        <Link to="services/reports" className="service-card">
          <h3>Reports & Analytics</h3>
        </Link>

        <Link to="services/tax" className="service-card">
          <h3>Task Management</h3>
        </Link>
      </div>

      {/* Nested services will load here */}
      <div className="service-outlet">
        <Outlet />
      </div>
    </div>
  );
}
