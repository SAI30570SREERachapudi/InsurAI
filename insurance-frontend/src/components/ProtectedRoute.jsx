// import React from "react";
// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children, allowedRoles = [] }) {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   if (!token) return <Navigate to="/login" replace />;
//   if (allowedRoles.length > 0 && !allowedRoles.includes(role))
//     return <Navigate to="/unauthorized" replace />;
//   return children;
// }
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // User not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Role-based route protection
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Allowed → render page
  return children;
}
