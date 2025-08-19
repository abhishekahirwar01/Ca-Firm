// AdminDashboard.jsx
import { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminDashboard() {
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);
  const [newService, setNewService] = useState({ name: "", description: "" });
  const [selectedUser, setSelectedUser] = useState(null);
  const [assignServices, setAssignServices] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const s = await API.get("/services");
      const u = await API.get("/users");
      setServices(s.data);
      setUsers(u.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load data");
    }
  };

  // CREATE Service
  const handleAddService = async () => {
    try {
      await API.post("/services", newService);
      setNewService({ name: "", description: "" });
      loadData();
      const modal = window.bootstrap.Modal.getInstance(
        document.getElementById("addServiceModal")
      );
      modal?.hide();
    } catch (err) {
      alert("Failed to create service");
    }
  };

  // UPDATE Service
  const handleUpdateService = async (service) => {
    try {
      const updatedName = prompt("Enter new service name:", service.name);
      const updatedDescription = prompt(
        "Enter new description:",
        service.description
      );
      if (!updatedName) return;

      await API.put(`/services/${service._id}`, {
        name: updatedName,
        description: updatedDescription,
      });
      loadData();
    } catch (err) {
      alert("Failed to update service");
    }
  };

  // DELETE Service
  const handleDeleteService = async (id) => {
    try {
      if (window.confirm("Are you sure to delete this service?")) {
        await API.delete(`/services/${id}`);
        loadData();
      }
    } catch (err) {
      alert("Failed to delete service");
    }
  };

  // DELETE User
  const handleDeleteUser = async (id) => {
    try {
      if (window.confirm("Are you sure to delete this user?")) {
        await API.delete(`/users/${id}`);
        loadData();
      }
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  // ASSIGN Services to User
  const handleAssignServices = async () => {
    if (!selectedUser) return;
    try {
      await API.put(`/users/${selectedUser._id}`, {
        services: assignServices,
      });
      setSelectedUser(null);
      setAssignServices([]);
      loadData();
      const modal = window.bootstrap.Modal.getInstance(
        document.getElementById("assignServiceModal")
      );
      modal?.hide();
    } catch (err) {
      alert("Failed to assign services");
    }
  };

  // Helper function to get service name safely
  const getServiceName = (service) => {
    if (!service) return "Unknown Service";
    return service.name || service;
  };

  return (
    <div className="container mt-4">
      <h3>Admin Dashboard</h3>
      <div className="row">
        {/* Services Section */}
        <div className="col-md-6">
          <h4>Services</h4>
          <button
            className="btn btn-success mb-2"
            data-bs-toggle="modal"
            data-bs-target="#addServiceModal"
          >
            Add Service
          </button>
          <ul className="list-group">
            {services.map((s) => (
              <li
                key={s._id}
                className="list-group-item d-flex justify-content-between"
              >
                <span>{s.name}</span>
                <div>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleUpdateService(s)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteService(s._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Users Section */}
        <div className="col-md-6">
          <h4>Users</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Services</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    {u.services?.map((s) => (
                      <span className="badge bg-info me-1" key={s?._id || s}>
                        {getServiceName(s)}
                      </span>
                    ))}
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-1"
                      data-bs-toggle="modal"
                      data-bs-target="#assignServiceModal"
                      onClick={() => {
                        setSelectedUser(u);
                        setAssignServices(
                          u.services?.map((s) => s?._id || s) || []
                        );
                      }}
                    >
                      Assign Services
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteUser(u._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Service Modal */}
      <div className="modal fade" id="addServiceModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Service</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Service Name"
                value={newService.name}
                onChange={(e) =>
                  setNewService({ ...newService, name: e.target.value })
                }
              />
              <textarea
                className="form-control"
                placeholder="Description"
                value={newService.description}
                onChange={(e) =>
                  setNewService({ ...newService, description: e.target.value })
                }
              ></textarea>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleAddService}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Assign Services Modal (Always Rendered) */}
      <div className="modal fade" id="assignServiceModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Assign Services to {selectedUser?.name || ""}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={() => setSelectedUser(null)}
              ></button>
            </div>
            <div className="modal-body">
              {services.map((s) => (
                <div className="form-check" key={s._id}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={s._id}
                    checked={assignServices.includes(s._id)}
                    onChange={(e) => {
                      if (e.target.checked)
                        setAssignServices([...assignServices, s._id]);
                      else
                        setAssignServices(
                          assignServices.filter((id) => id !== s._id)
                        );
                    }}
                  />
                  <label className="form-check-label" htmlFor={s._id}>
                    {s.name}
                  </label>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setSelectedUser(null)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleAssignServices}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
