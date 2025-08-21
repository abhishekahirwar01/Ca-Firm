import { useState, useEffect } from "react";
import API from "../api";

export default function DepartmentForm({ onSuccess, editingDept }) {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]); // multiple users
  const [services, setServices] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allServices, setAllServices] = useState([]);

  useEffect(() => {
    loadUsers();
    loadServices();

    if (editingDept) {
      setName(editingDept.name);
      setUsers(editingDept.users?.map((u) => u._id) || []);
      setServices(editingDept.services?.map((s) => s._id) || []);
    }
  }, [editingDept]);

  const loadUsers = async () => {
    const res = await API.get("/users");
    setAllUsers(res.data);
  };

  const loadServices = async () => {
    const res = await API.get("/services");
    setAllServices(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { name, users, services };

    if (editingDept) {
      await API.put(`/departments/${editingDept._id}`, payload);
    } else {
      await API.post("/departments", payload);
    }

    onSuccess();
    setName("");
    setUsers([]);
    setServices([]);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h3>{editingDept ? "Edit Department" : "Create Department"}</h3>

      <input
        type="text"
        placeholder="Department Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label>Assign Users</label>
      <select
        multiple
        value={users}
        onChange={(e) =>
          setUsers([...e.target.selectedOptions].map((opt) => opt.value))
        }
      >
        {allUsers.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name} ({user.email})
          </option>
        ))}
      </select>

      <label>Assign Services</label>
      <select
        multiple
        value={services}
        onChange={(e) =>
          setServices([...e.target.selectedOptions].map((opt) => opt.value))
        }
      >
        {allServices.map((service) => (
          <option key={service._id} value={service._id}>
            {service.name}
          </option>
        ))}
      </select>

      <button type="submit">{editingDept ? "Update" : "Create"}</button>
    </form>
  );
}
