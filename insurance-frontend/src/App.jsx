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
import Profile from "./pages/Profile";
import PolicyBuy from "./pages/PolicyBuy";
import PurchaseSuccess from "./pages/PurchaseSuccess";
import MyPolicies from "./pages/MyPolicies";
import BookAppointment from "./pages/appointments/Appointments";
import CustomerAppointments from "./pages/appointments/CustomerAppointments";
import AgentAppointments from "./pages/appointments/AgentAppointments";
import VerifyReceipt from "./pages/VerifyReceipt";
import CustomerHomePage from "./pages/CustomerHomePage";
import "./i18n";
import "./darkmode.css";

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
          path="/policies/buy/:id"
          element={
            <ProtectedRoute
              allowedRoles={
                [
                  "ROLE_CUSTOMER",
                  "ROLE_ADMIN",
                ] /* admin can view but only customers buy*/
              }
            >
              <PolicyBuy />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments/book"
          element={
            <ProtectedRoute allowedRoles={["ROLE_CUSTOMER"]}>
              <BookAppointment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/appointments/customer"
          element={
            <ProtectedRoute allowedRoles={["ROLE_CUSTOMER"]}>
              <CustomerAppointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/appointments/agent"
          element={
            <ProtectedRoute allowedRoles={["ROLE_AGENT"]}>
              <AgentAppointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/purchase/success"
          element={
            <ProtectedRoute allowedRoles={["ROLE_CUSTOMER", "ROLE_ADMIN"]}>
              <PurchaseSuccess />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/customer/"
          element={
            <ProtectedRoute allowedRoles={["ROLE_CUSTOMER", "ROLE_ADMIN"]}>
              <MyPolicies />
            </ProtectedRoute>
          }
        />
        <Route path="/verify-receipt/:id" element={<VerifyReceipt />} />

        {/* <Route
          path="/dashboard/customer"
          element={
            <ProtectedRoute allowedRoles={["ROLE_CUSTOMER", "ROLE_ADMIN"]}>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/dashboard/agent"
          element={
            <ProtectedRoute allowedRoles={["ROLE_AGENT", "ROLE_ADMIN"]}>
              <AgentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/homepage/customer"
          element={
            <ProtectedRoute allowedRoles={["ROLE_CUSTOMER"]}>
              <CustomerHomePage />
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
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["ROLE_CUSTOMER", "ROLE_AGENT"]}>
              <Profile />
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
