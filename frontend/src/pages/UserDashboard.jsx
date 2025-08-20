import { useEffect, useState } from "react";
import API from "../services/api";

export default function UserDashboard() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const res = await API.get("/users/my-services");
      setServices(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load services");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h4>Your Assigned Services</h4>
      {services.length === 0 ? (
        <p>No services assigned yet.</p>
      ) : (
        <ul>
          {services.map((s) => (
            <li key={s._id}>
              <strong>{s.name}</strong>: {s.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
