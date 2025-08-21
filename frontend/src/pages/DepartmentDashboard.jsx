import { useState, useEffect } from "react";
import API from "../api";
import DepartmentForm from "./DepartmentForm";

export default function DepartmentDashboard() {
  const [departments, setDepartments] = useState([]);
  const [editingDept, setEditingDept] = useState(null);

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    const res = await API.get("/departments");
    setDepartments(res.data);
  };

  const deleteDepartment = async (id) => {
    await API.delete(`/departments/${id}`);
    loadDepartments();
  };

  return (
    <div className="dashboard">
      <h2>Departments</h2>
      <DepartmentForm onSuccess={loadDepartments} editingDept={editingDept} />

      <ul>
        {departments.map((dept) => (
          <li key={dept._id}>
            <strong>{dept.name}</strong> <br />
            Users:{" "}
            {dept.users && dept.users.length > 0
              ? dept.users.map((u) => `${u.name} (${u.email})`).join(", ")
              : "No users"}{" "}
            <br />
            Services:{" "}
            {dept.services && dept.services.length > 0
              ? dept.services.map((s) => s.name).join(", ")
              : "No services"}
            <br />
            <button onClick={() => setEditingDept(dept)}>Edit</button>
            <button onClick={() => deleteDepartment(dept._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
