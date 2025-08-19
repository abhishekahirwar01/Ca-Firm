import { useEffect, useState } from "react";
import API from "../services/api";

export default function UserDashboard() {
  const [services, setServices] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const res = await API.get("/users");
    const current = res.data.find((u) => u._id === user.id);
    setServices(current?.services || []);
  };

  return (
    <div className="container mt-4">
      <h4>Your Assigned Services</h4>
      <div className="row">
        {services.length === 0 && <p>No services assigned yet.</p>}
        {services.map((s) => (
          <div className="col-md-4 mb-3" key={s._id || s}>
            <div className="card shadow h-100">
              <div className="card-body">
                <h5 className="card-title">{s.name || s}</h5>
                <p className="card-text">{s.description}</p>
                <p className="card-text">
                  Access your {s.name || s} tools here.
                </p>
                <button className="btn btn-primary">Open</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
