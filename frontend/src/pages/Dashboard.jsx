import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function Dashboard() {
  const { auth, logout } = useContext(AuthContext);

  return (
    <div className="p-6">
      <h1 className="text-2xl">
        Welcome {auth.name} ({auth.role})
      </h1>
      <button onClick={logout}>Logout</button>

      {auth.role === "admin" && <p>Admin can manage users and all routes</p>}
      {auth.role === "ca" && <p>CA Dashboard: Access to tax & audits</p>}
      {auth.role === "staff" && <p>Staff Dashboard: Task Management</p>}
      {auth.role === "client" && (
        <p>Client Dashboard: View reports & invoices</p>
      )}
    </div>
  );
}
