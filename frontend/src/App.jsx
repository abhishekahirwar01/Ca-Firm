import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
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

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Dashboard with nested services */}
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
                  <PrivateRoute roles={["admin", "ca", "staff", "client"]}>
                    <FCA />
                  </PrivateRoute>
                }
              />
              <Route
                path="services/tumbledy"
                element={
                  <PrivateRoute roles={["admin", "ca"]}>
                    <Tumbledy />
                  </PrivateRoute>
                }
              />
              <Route
                path="services/pdf-viewer"
                element={
                  <PrivateRoute roles={["admin", "ca", "client"]}>
                    <PDFViewer />
                  </PrivateRoute>
                }
              />
              <Route
                path="services/reports"
                element={
                  <PrivateRoute roles={["admin", "ca"]}>
                    <Reports />
                  </PrivateRoute>
                }
              />
              <Route
                path="services/tax"
                element={
                  <PrivateRoute roles={["admin", "ca", "staff"]}>
                    <Tax />
                  </PrivateRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
