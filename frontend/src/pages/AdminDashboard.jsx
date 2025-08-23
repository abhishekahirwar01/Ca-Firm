// src/components/AdminDashboard.jsx
import { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");

  // data
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);

  // create forms
  const [newService, setNewService] = useState({ name: "", description: "" });
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
  });
  const [newDepartment, setNewDepartment] = useState({ name: "" });

  // edit states
  const [editService, setEditService] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [editDepartment, setEditDepartment] = useState(null);

  // password visibility
  const [visiblePasswords, setVisiblePasswords] = useState({});

  const togglePassword = (userId) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  // ===== Load data =====
  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    await Promise.all([loadServices(), loadUsers(), loadDepartments()]);
  };

  const loadServices = async () => {
    try {
      const res = await API.get("/services");
      if (Array.isArray(res.data)) setServices(res.data);
      else if (Array.isArray(res.data.services)) setServices(res.data.services);
      else setServices([]);
    } catch (err) {
      console.error(err);
      alert("Failed to load services");
      setServices([]);
    }
  };

  const loadUsers = async () => {
    try {
      const res = await API.get("/users");
      const filtered = (res.data || []).filter((u) => u.role !== "admin");
      setUsers(filtered);
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

  // ===== Add Handlers =====
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

  // ===== Delete Handlers =====
  const deleteService = async (id) => {
    try {
      await API.delete(`/services/${id}`);
      await Promise.all([loadServices(), loadDepartments()]);
    } catch (err) {
      console.error(err);
      alert("Failed to delete service");
    }
  };

  const deleteUser = async (id) => {
    try {
      await API.delete(`/users/${id}`);
      await Promise.all([loadUsers(), loadDepartments()]);
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };

  const deleteDepartment = async (id) => {
    try {
      await API.delete(`/departments/${id}`);
      loadDepartments();
    } catch (err) {
      console.error(err);
      alert("Failed to delete department");
    }
  };

  // ===== Edit: Services =====
  const beginEditService = (s) => {
    setEditService({ _id: s._id, name: s.name, description: s.description });
  };

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

  // ===== Edit: Users =====
  const beginEditUser = (u) => {
    setEditUser({
      _id: u._id,
      name: u.name || "",
      email: u.email || "",
      newPassword: "", // use newPassword instead of password
      department: u.department?._id || "",
      services: (u.services || []).map((s) =>
        typeof s === "object" ? s._id : s
      ),
    });
  };

  const toggleUserService = (serviceId) => {
    setEditUser((prev) => {
      const exists = prev.services.includes(serviceId);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((id) => id !== serviceId)
          : [...prev.services, serviceId],
      };
    });
  };

  const saveEditUser = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: editUser.name,
        email: editUser.email,
        services: editUser.services,
        department: editUser.department || null,
      };
      if (editUser.newPassword) payload.password = editUser.newPassword; // only update if newPassword provided

      await API.put(`/users/${editUser._id}`, payload);
      setEditUser(null);
      await Promise.all([loadUsers(), loadDepartments()]);
    } catch (err) {
      console.error(err);
      alert("Failed to update user");
    }
  };

  // ===== Edit: Departments =====
  const beginEditDepartment = (d) => {
    setEditDepartment({
      _id: d._id,
      name: d.name || "",
      users: (d.users || []).map((u) => u._id),
      services: (d.services || []).map((s) => s._id),
    });
  };

  const toggleDeptUser = (userId) => {
    setEditDepartment((prev) => {
      const exists = prev.users.includes(userId);
      return {
        ...prev,
        users: exists
          ? prev.users.filter((id) => id !== userId)
          : [...prev.users, userId],
      };
    });
  };

  const toggleDeptService = (serviceId) => {
    setEditDepartment((prev) => {
      const exists = prev.services.includes(serviceId);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((id) => id !== serviceId)
          : [...prev.services, serviceId],
      };
    });
  };

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
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>

      {/* Tab Navigation */}
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setActiveTab("services")}>Services</button>
        <button onClick={() => setActiveTab("users")}>Users</button>
        <button onClick={() => setActiveTab("departments")}>Departments</button>
      </div>

      {/* ===== Services Table ===== */}
      {activeTab === "services" && (
        <div>
          <h3>Manage Services</h3>
          <form onSubmit={addService} style={{ marginBottom: 15 }}>
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
            <button type="submit">Add Service</button>
          </form>

          <table
            border="1"
            cellPadding="8"
            style={{ width: "100%", marginBottom: 20 }}
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td>{s.description}</td>
                  <td>
                    <button onClick={() => beginEditService(s)}>Edit</button>
                    <button onClick={() => deleteService(s._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {editService && (
            <form onSubmit={saveEditService} style={{ marginTop: 16 }}>
              <h4>Edit Service</h4>
              <input
                placeholder="Name"
                value={editService.name}
                onChange={(e) =>
                  setEditService({ ...editService, name: e.target.value })
                }
                required
              />
              <input
                placeholder="Description"
                value={editService.description}
                onChange={(e) =>
                  setEditService({
                    ...editService,
                    description: e.target.value,
                  })
                }
                required
              />
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditService(null)}>
                Cancel
              </button>
            </form>
          )}
        </div>
      )}

      {/* ===== Users Table ===== */}
      {activeTab === "users" && (
        <div>
          <h3>Manage Users</h3>
          <form onSubmit={addUser} style={{ marginBottom: 15 }}>
            <input
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              required
            />
            <input
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
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
            <button type="submit">Add User</button>
          </form>

          <table
            border="1"
            cellPadding="8"
            style={{ width: "100%", marginBottom: 20 }}
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Department</th>
                <th>Services</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    {visiblePasswords[u._id] ? u.password : "******"}
                    <button
                      type="button"
                      onClick={() => togglePassword(u._id)}
                      style={{ marginLeft: 8 }}
                    >
                      {visiblePasswords[u._id] ? "Hide" : "Show"}
                    </button>
                  </td>
                  <td>{u.department?.name || "None"}</td>
                  <td>
                    {u.services?.length
                      ? u.services.map((s) => s.name).join(", ")
                      : "None"}
                  </td>
                  <td>
                    <button onClick={() => beginEditUser(u)}>Edit</button>
                    <button onClick={() => deleteUser(u._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {editUser && (
            <form onSubmit={saveEditUser} style={{ marginTop: 16 }}>
              <h4>Edit User</h4>
              <input
                placeholder="Name"
                value={editUser.name}
                onChange={(e) =>
                  setEditUser({ ...editUser, name: e.target.value })
                }
                required
              />
              <input
                placeholder="Email"
                value={editUser.email}
                onChange={(e) =>
                  setEditUser({ ...editUser, email: e.target.value })
                }
                required
              />
              <input
                placeholder="New Password (leave blank to keep)"
                type="password"
                value={editUser.newPassword || ""}
                onChange={(e) =>
                  setEditUser({ ...editUser, newPassword: e.target.value })
                }
              />

              <div>
                <label>Department: </label>
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

              <div>
                <div>Assign Services:</div>
                {services.map((s) => (
                  <label key={s._id} style={{ marginRight: 12 }}>
                    <input
                      type="checkbox"
                      checked={editUser.services?.includes(s._id) || false}
                      onChange={() => toggleUserService(s._id)}
                    />{" "}
                    {s.name}
                  </label>
                ))}
              </div>

              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditUser(null)}>
                Cancel
              </button>
            </form>
          )}
        </div>
      )}

      {/* ===== Departments Table ===== */}
      {activeTab === "departments" && (
        <div>
          <h3>Manage Departments</h3>
          <form onSubmit={addDepartment} style={{ marginBottom: 15 }}>
            <input
              placeholder="Department Name"
              value={newDepartment.name}
              onChange={(e) => setNewDepartment({ name: e.target.value })}
              required
            />
            <button type="submit">Add Department</button>
          </form>

          <table
            border="1"
            cellPadding="8"
            style={{ width: "100%", marginBottom: 20 }}
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Users</th>
                <th>Services</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((d) => (
                <tr key={d._id}>
                  <td>{d.name}</td>
                  <td>{d.users?.map((u) => u.name).join(", ") || "None"}</td>
                  <td>{d.services?.map((s) => s.name).join(", ") || "None"}</td>
                  <td>
                    <button onClick={() => beginEditDepartment(d)}>Edit</button>
                    <button onClick={() => deleteDepartment(d._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {editDepartment && (
            <form onSubmit={saveEditDepartment} style={{ marginTop: 16 }}>
              <h4>Edit Department</h4>
              <input
                placeholder="Name"
                value={editDepartment.name}
                onChange={(e) =>
                  setEditDepartment({ ...editDepartment, name: e.target.value })
                }
                required
              />

              <div>
                <div>Assign Users:</div>
                {users.map((u) => (
                  <label key={u._id} style={{ marginRight: 12 }}>
                    <input
                      type="checkbox"
                      checked={editDepartment.users?.includes(u._id) || false}
                      onChange={() => toggleDeptUser(u._id)}
                    />{" "}
                    {u.name || u.email}
                  </label>
                ))}
              </div>

              <div>
                <div>Assign Services:</div>
                {services.map((s) => (
                  <label key={s._id} style={{ marginRight: 12 }}>
                    <input
                      type="checkbox"
                      checked={
                        editDepartment.services?.includes(s._id) || false
                      }
                      onChange={() => toggleDeptService(s._id)}
                    />{" "}
                    {s.name}
                  </label>
                ))}
              </div>

              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditDepartment(null)}>
                Cancel
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
