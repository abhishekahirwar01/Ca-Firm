import { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminDashboard() {
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);
  const [newService, setNewService] = useState({ name: "", description: "" });
  const [editService, setEditService] = useState(null);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    services: [],
  });
  const [editUser, setEditUser] = useState(null);
  const [assignUser, setAssignUser] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const s = await API.get("/services");
      const u = await API.get("/users");
      setServices(s.data);
      setUsers(u.data.filter((u) => u.role !== "admin"));
    } catch {
      alert("Failed to load data");
    }
  };

  const handleAddService = async () => {
    if (!newService.name || !newService.description)
      return alert("Fill all fields");
    try {
      await API.post("/services", newService);
      setNewService({ name: "", description: "" });
      loadData();
    } catch {
      alert("Failed to add service");
    }
  };

  const handleEditService = async () => {
    if (!editService.name || !editService.description)
      return alert("Fill all fields");
    try {
      await API.put(`/services/${editService.id}`, {
        name: editService.name,
        description: editService.description,
      });
      setEditService(null);
      loadData();
    } catch {
      alert("Failed to update service");
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await API.delete(`/services/${id}`);
      loadData();
    } catch {
      alert("Failed to delete service");
    }
  };

  const handleAddUser = async () => {
    if (!newUser.email || !newUser.password) return alert("Fill all fields");
    try {
      await API.post("/users", newUser);
      setNewUser({ email: "", password: "", services: [] });
      loadData();
    } catch {
      alert("Failed to add user");
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await API.delete(`/users/${id}`);
      loadData();
    } catch {
      alert("Failed to delete user");
    }
  };

  const handleEditUser = async () => {
    if (!editUser.email) return alert("Email required");
    try {
      await API.put(`/users/${editUser.id}`, {
        email: editUser.email,
        password: editUser.password || undefined,
      });
      setEditUser(null);
      loadData();
    } catch {
      alert("Failed to update user");
    }
  };

  const handleAssignServices = async () => {
    if (!assignUser) return;
    try {
      await API.put(`/users/${assignUser.id}`, {
        services: assignUser.services,
      });
      setAssignUser(null);
      loadData();
    } catch {
      alert("Failed to assign services");
    }
  };

  const getServiceName = (id) =>
    services.find((s) => s._id === id)?.name || "Unknown";

  const tableStyle = {
    borderCollapse: "collapse",
    width: "100%",
    marginTop: "10px",
  };
  const thtdStyle = {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  };
  const buttonStyle = {
    marginRight: "5px",
    padding: "5px 10px",
    cursor: "pointer",
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Admin Dashboard</h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {/* Services Table */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          <h3>Services</h3>
          <input
            placeholder="Service Name"
            value={newService.name}
            onChange={(e) =>
              setNewService({ ...newService, name: e.target.value })
            }
          />
          <input
            placeholder="Description"
            value={newService.description}
            onChange={(e) =>
              setNewService({ ...newService, description: e.target.value })
            }
          />
          <button style={buttonStyle} onClick={handleAddService}>
            Add Service
          </button>

          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thtdStyle}>Name</th>
                <th style={thtdStyle}>Description</th>
                <th style={thtdStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s._id}>
                  {editService?.id === s._id ? (
                    <>
                      <td style={thtdStyle}>
                        <input
                          value={editService.name}
                          onChange={(e) =>
                            setEditService({
                              ...editService,
                              name: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td style={thtdStyle}>
                        <input
                          value={editService.description}
                          onChange={(e) =>
                            setEditService({
                              ...editService,
                              description: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td style={thtdStyle}>
                        <button style={buttonStyle} onClick={handleEditService}>
                          Save
                        </button>
                        <button
                          style={buttonStyle}
                          onClick={() => setEditService(null)}
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td style={thtdStyle}>{s.name}</td>
                      <td style={thtdStyle}>{s.description}</td>
                      <td style={thtdStyle}>
                        <button
                          style={buttonStyle}
                          onClick={() =>
                            setEditService({
                              id: s._id,
                              name: s.name,
                              description: s.description,
                            })
                          }
                        >
                          Edit
                        </button>
                        <button
                          style={buttonStyle}
                          onClick={() => handleDeleteService(s._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Users Table */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          <h3>Users</h3>
          <input
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <input
            placeholder="Password"
            type="password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />
          <button style={buttonStyle} onClick={handleAddUser}>
            Add User
          </button>

          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thtdStyle}>Email</th>
                <th style={thtdStyle}>Services</th>
                <th style={thtdStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td style={thtdStyle}>{u.email}</td>
                  <td style={thtdStyle}>
                    {(u.services || [])
                      .map((s) =>
                        typeof s === "object" ? s.name : getServiceName(s)
                      )
                      .join(", ") || "None"}
                  </td>
                  <td style={thtdStyle}>
                    <button
                      style={buttonStyle}
                      onClick={() =>
                        setEditUser({ id: u._id, email: u.email, password: "" })
                      }
                    >
                      Edit
                    </button>
                    <button
                      style={buttonStyle}
                      onClick={() =>
                        setAssignUser({
                          id: u._id,
                          services:
                            u.services?.map((s) =>
                              typeof s === "object" ? s._id : s
                            ) || [],
                        })
                      }
                    >
                      Assign Services
                    </button>
                    <button
                      style={buttonStyle}
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

      {/* Edit User */}
      {editUser && (
        <section style={{ marginTop: "20px" }}>
          <h3>Edit User {editUser.email}</h3>
          <input
            placeholder="Email"
            value={editUser.email}
            onChange={(e) =>
              setEditUser({ ...editUser, email: e.target.value })
            }
          />
          <input
            placeholder="New Password"
            type="password"
            value={editUser.password}
            onChange={(e) =>
              setEditUser({ ...editUser, password: e.target.value })
            }
          />
          <button style={buttonStyle} onClick={handleEditUser}>
            Save
          </button>
          <button style={buttonStyle} onClick={() => setEditUser(null)}>
            Cancel
          </button>
        </section>
      )}

      {/* Assign Services */}
      {assignUser && (
        <section style={{ marginTop: "20px" }}>
          <h3>Assign Services</h3>
          {services.map((s) => (
            <div key={s._id}>
              <label>
                <input
                  type="checkbox"
                  checked={assignUser.services.includes(s._id)}
                  onChange={(e) =>
                    setAssignUser({
                      ...assignUser,
                      services: e.target.checked
                        ? [...assignUser.services, s._id]
                        : assignUser.services.filter((id) => id !== s._id),
                    })
                  }
                />
                {s.name}
              </label>
            </div>
          ))}
          <button style={buttonStyle} onClick={handleAssignServices}>
            Save
          </button>
          <button style={buttonStyle} onClick={() => setAssignUser(null)}>
            Cancel
          </button>
        </section>
      )}
    </div>
  );
}
