import { useEffect, useState } from "react";
import API from "../services/api";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");

  // Data states
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);

  // Form states
  const [newService, setNewService] = useState({ name: "", description: "" });
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
  });
  const [newDepartment, setNewDepartment] = useState({ name: "" });

  // Edit states
  const [editService, setEditService] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [editDepartment, setEditDepartment] = useState(null);

  // Password toggle
  const [showPasswords, setShowPasswords] = useState({});
  const togglePasswordVisibility = (id) => {
    setShowPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Load data
  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    await Promise.all([loadServices(), loadUsers(), loadDepartments()]);
  };

  const loadServices = async () => {
    try {
      const res = await API.get("/services");
      setServices(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load services");
    }
  };

  const loadUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers((res.data || []).filter((u) => u.role !== "admin"));
    } catch (err) {
      console.error(err);
      alert("Failed to load users");
    }
  };

  const loadDepartments = async () => {
    try {
      const res = await API.get("/departments");
      setDepartments(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load departments");
    }
  };

  // ===== ADD =====
  const addService = async (e) => {
    e.preventDefault();
    try {
      await API.post("/services", newService);
      setNewService({ name: "", description: "" });
      loadServices();
    } catch (err) {
      console.error(err);
      alert("Failed to add service");
    }
  };

  const addUser = async (e) => {
    e.preventDefault();
    try {
      await API.post("/users", newUser);
      setNewUser({ name: "", email: "", password: "", department: "" });
      await Promise.all([loadUsers(), loadDepartments()]);
    } catch (err) {
      console.error(err);
      alert("Failed to add user");
    }
  };

  const addDepartment = async (e) => {
    e.preventDefault();
    try {
      await API.post("/departments", { name: newDepartment.name });
      setNewDepartment({ name: "" });
      loadDepartments();
    } catch (err) {
      console.error(err);
      alert("Failed to add department");
    }
  };

  // ===== DELETE =====
  const deleteService = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await API.delete(`/services/${id}`);
      await Promise.all([loadServices(), loadDepartments()]);
    } catch (err) {
      console.error(err);
      alert("Failed to delete service");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await API.delete(`/users/${id}`);
      await Promise.all([loadUsers(), loadDepartments()]);
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };

  const deleteDepartment = async (id) => {
    if (!window.confirm("Delete this department?")) return;
    try {
      await API.delete(`/departments/${id}`);
      loadDepartments();
    } catch (err) {
      console.error(err);
      alert("Failed to delete department");
    }
  };

  // ===== EDIT =====
  const beginEditService = (s) => setEditService({ ...s });
  const beginEditUser = (u) =>
    setEditUser({
      _id: u._id,
      name: u.name,
      email: u.email,
      password: "",
      department: u.department?._id || "",
      services: (u.services || []).map((s) =>
        typeof s === "object" ? s._id : s
      ),
    });
  const beginEditDepartment = (d) =>
    setEditDepartment({
      _id: d._id,
      name: d.name,
      users: (d.users || []).map((u) => u._id),
      services: (d.services || []).map((s) => s._id),
    });

  const saveEditService = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/services/${editService._id}`, {
        name: editService.name,
        description: editService.description,
      });
      setEditService(null);
      loadServices();
    } catch (err) {
      console.error(err);
      alert("Failed to update service");
    }
  };

  const toggleUserService = (serviceId) =>
    setEditUser((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((id) => id !== serviceId)
        : [...prev.services, serviceId],
    }));

  const saveEditUser = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: editUser.name,
        email: editUser.email,
        services: editUser.services,
        department: editUser.department || null,
      };
      if (editUser.password) payload.password = editUser.password;
      await API.put(`/users/${editUser._id}`, payload);
      setEditUser(null);
      await Promise.all([loadUsers(), loadDepartments()]);
    } catch (err) {
      console.error(err);
      alert("Failed to update user");
    }
  };

  const toggleDeptUser = (id) =>
    setEditDepartment((prev) => ({
      ...prev,
      users: prev.users.includes(id)
        ? prev.users.filter((uid) => uid !== id)
        : [...prev.users, id],
    }));

  const toggleDeptService = (id) =>
    setEditDepartment((prev) => ({
      ...prev,
      services: prev.services.includes(id)
        ? prev.services.filter((sid) => sid !== id)
        : [...prev.services, id],
    }));

  const saveEditDepartment = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/departments/${editDepartment._id}`, {
        name: editDepartment.name,
        users: editDepartment.users,
        services: editDepartment.services,
      });
      setEditDepartment(null);
      await Promise.all([loadDepartments(), loadServices()]);
    } catch (err) {
      console.error(err);
      alert("Failed to update department");
    }
  };

  return (
    <div className="admin-dashboard">
      <h2 className="dashboard-title">Admin Dashboard</h2>

      {/* Tabs */}
      <div className="tab-navigation">
        {["services", "users", "departments"].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      {activeTab === "services" && <ServiceTab />}
      {activeTab === "users" && <UserTab />}
      {activeTab === "departments" && <DepartmentTab />}
    </div>
  );

  // --- Tab Components ---
  function ServiceTab() {
    return (
      <div className="tab-content">
        <h3>Manage Services</h3>
        <form onSubmit={addService} className="add-form">
          <input
            placeholder="Service Name"
            value={newService.name}
            onChange={(e) =>
              setNewService({ ...newService, name: e.target.value })
            }
            required
          />
          <input
            placeholder="Description"
            value={newService.description}
            onChange={(e) =>
              setNewService({ ...newService, description: e.target.value })
            }
            required
          />
          <button type="submit" className="btn-primary">
            Add Service
          </button>
        </form>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td>{s.description}</td>
                  <td className="action-buttons">
                    <button
                      className="btn-edit"
                      onClick={() => beginEditService(s)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => deleteService(s._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {editService && (
          <Modal
            onClose={() => setEditService(null)}
            title={`Edit Service: ${editService.name}`}
          >
            <form onSubmit={saveEditService} className="edit-form row-layout">
              <div className="form-group">
                <label>Name:</label>
                <input
                  value={editService.name}
                  onChange={(e) =>
                    setEditService({ ...editService, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <input
                  value={editService.description}
                  onChange={(e) =>
                    setEditService({
                      ...editService,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  Save
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setEditService(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    );
  }

  function UserTab() {
    return (
      <div className="tab-content">
        <h3>Manage Users</h3>
        <form onSubmit={addUser} className="add-form">
          <input
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
          />
          <input
            placeholder="Email"
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
          <input
            placeholder="Password"
            type="password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            required
          />
          <select
            value={newUser.department}
            onChange={(e) =>
              setNewUser({ ...newUser, department: e.target.value })
            }
          >
            <option value="">Select Department</option>
            {departments.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
          </select>
          <button type="submit" className="btn-primary">
            Add User
          </button>
        </form>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Department</th>
                <th>Services</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    {showPasswords[u._id] ? u.password || "N/A" : "••••••••"}
                    <button
                      className="btn-toggle-password"
                      onClick={() => togglePasswordVisibility(u._id)}
                    >
                      {showPasswords[u._id] ? "Hide" : "Show"}
                    </button>
                  </td>
                  <td>{u.department?.name || "None"}</td>
                  <td>{u.services?.map((s) => s.name).join(", ") || "None"}</td>
                  <td className="action-buttons">
                    <button
                      className="btn-edit"
                      onClick={() => beginEditUser(u)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => deleteUser(u._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {editUser && (
          <Modal
            onClose={() => setEditUser(null)}
            title={`Edit User: ${editUser.name}`}
          >
            <form onSubmit={saveEditUser} className="edit-form row-layout">
              <div className="form-group">
                <label>Name:</label>
                <input
                  value={editUser.name}
                  onChange={(e) =>
                    setEditUser({ ...editUser, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={editUser.email}
                  onChange={(e) =>
                    setEditUser({ ...editUser, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>New Password:</label>
                <input
                  type="password"
                  placeholder="Leave blank to keep current"
                  value={editUser.password}
                  onChange={(e) =>
                    setEditUser({ ...editUser, password: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Department:</label>
                <select
                  value={editUser.department || ""}
                  onChange={(e) =>
                    setEditUser({ ...editUser, department: e.target.value })
                  }
                >
                  <option value="">None</option>
                  {departments.map((d) => (
                    <option key={d._id} value={d._id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group full-width">
                <label>Services:</label>
                <div className="checkbox-group">
                  {services.map((s) => (
                    <label key={s._id}>
                      <input
                        type="checkbox"
                        checked={editUser.services.includes(s._id)}
                        onChange={() => toggleUserService(s._id)}
                      />{" "}
                      {s.name}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-actions full-width">
                <button type="submit" className="btn-primary">
                  Save
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setEditUser(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    );
  }

  function DepartmentTab() {
    return (
      <div className="tab-content">
        <h3>Manage Departments</h3>
        <form onSubmit={addDepartment} className="add-form">
          <input
            placeholder="Department Name"
            value={newDepartment.name}
            onChange={(e) => setNewDepartment({ name: e.target.value })}
            required
          />
          <button type="submit" className="btn-primary">
            Add Department
          </button>
        </form>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Users</th>
                <th>Services</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((d) => (
                <tr key={d._id}>
                  <td>{d.name}</td>
                  <td>{d.users?.map((u) => u.name).join(", ") || "None"}</td>
                  <td>{d.services?.map((s) => s.name).join(", ") || "None"}</td>
                  <td className="action-buttons">
                    <button
                      className="btn-edit"
                      onClick={() => beginEditDepartment(d)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => deleteDepartment(d._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {editDepartment && (
          <Modal
            onClose={() => setEditDepartment(null)}
            title={`Edit Department: ${editDepartment.name}`}
          >
            <form
              onSubmit={saveEditDepartment}
              className="edit-form row-layout"
            >
              <div className="form-group">
                <label>Name:</label>
                <input
                  value={editDepartment.name}
                  onChange={(e) =>
                    setEditDepartment({
                      ...editDepartment,
                      name: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Users:</label>
                <div className="checkbox-group">
                  {users.map((u) => (
                    <label key={u._id}>
                      <input
                        type="checkbox"
                        checked={editDepartment.users.includes(u._id)}
                        onChange={() => toggleDeptUser(u._id)}
                      />{" "}
                      {u.name}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group full-width">
                <label>Services:</label>
                <div className="checkbox-group">
                  {services.map((s) => (
                    <label key={s._id}>
                      <input
                        type="checkbox"
                        checked={editDepartment.services.includes(s._id)}
                        onChange={() => toggleDeptService(s._id)}
                      />{" "}
                      {s.name}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-actions full-width">
                <button type="submit" className="btn-primary">
                  Save
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setEditDepartment(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    );
  }

  function Modal({ children, onClose, title }) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h4>{title}</h4>
            <button className="modal-close" onClick={onClose}>
              ×
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  }
}
