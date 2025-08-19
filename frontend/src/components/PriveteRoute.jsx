import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); // { name, role, email }

  // 1. If no token → redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // 2. If role is specified and user role doesn't match → unauthorized
  if (role && user?.role !== role) {
    return <Navigate to="/" />;
  }

  // ✅ All checks passed → allow access
  return children;
}
