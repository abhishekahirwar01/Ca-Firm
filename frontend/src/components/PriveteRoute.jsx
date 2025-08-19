import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const PrivateRoute = ({ children, roles }) => {
  const { auth } = useContext(AuthContext);

  if (!auth?.token) return <Navigate to="/login" />;

  if (roles && !roles.includes(auth.role)) {
    return <Navigate to="/dashboard" />; // Access denied
  }

  return children;
};

export default PrivateRoute;
