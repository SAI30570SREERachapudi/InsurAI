import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerDashboard from "./pages/Dashboard/CustomerDashboard";
import AgentDashboard from "./pages/Dashboard/AgentDashboard";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import Policies from "./pages/Policies";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import AdminRequests from "./pages/Dashboard/AdminRequests";
import AddPolicy from "./pages/AddPolicy";
import Footer from "./pages/footer";
import Dashboard from "./pages/Dashboard";
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          path="/policies"
          element={
            <ProtectedRoute
              allowedRoles={["ROLE_CUSTOMER", "ROLE_AGENT", "ROLE_ADMIN"]}
            >
              <Policies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/customer"
          element={
            <ProtectedRoute allowedRoles={["ROLE_CUSTOMER", "ROLE_ADMIN"]}>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/agent"
          element={
            <ProtectedRoute allowedRoles={["ROLE_AGENT", "ROLE_ADMIN"]}>
              <AgentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/requests"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <AdminRequests />
            </ProtectedRoute>
          }
        />
<Route
  path="/admin/policy/edit/:id"
  element={
    <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
      <AddPolicy /> {/* You can reuse AddPolicy with edit mode */}
    </ProtectedRoute>
  }
/>

        <Route
          path="/admin/policy/add"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <AddPolicy />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
