import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import FCA from "./services/FCA";
import Tumbledy from "./services/Tumbledy";
import PDFViewer from "./services/PdfViewer";
import Reports from "./services/Reports";
import Tax from "./services/Tax";
import PrivateRoute from "./components/PriveteRoute";
import Layout from "./components/Layout";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Protected Dashboard & Services */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route
              path="services/fca"
              element={
                <PrivateRoute>
                  <FCA />
                </PrivateRoute>
              }
            />
            <Route
              path="services/tumbledy"
              element={
                <PrivateRoute>
                  <Tumbledy />
                </PrivateRoute>
              }
            />
            <Route
              path="services/pdf-viewer"
              element={
                <PrivateRoute>
                  <PDFViewer />
                </PrivateRoute>
              }
            />
            <Route
              path="services/reports"
              element={
                <PrivateRoute>
                  <Reports />
                </PrivateRoute>
              }
            />
            <Route
              path="services/tax"
              element={
                <PrivateRoute>
                  <Tax />
                </PrivateRoute>
              }
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
