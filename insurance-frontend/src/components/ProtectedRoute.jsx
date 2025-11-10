// import React from "react";
// import { Navigate } from "react-router-dom";

// /**
//  * Role-based Protected Route
//  * @param {ReactNode} children - The component to render
//  * @param {string[]} allowedRoles - Array of roles allowed to access the route
//  */
// export default function ProtectedRoute({ children, allowedRoles = [] }) {
//   const token = localStorage.getItem("token");
//   const userRole = localStorage.getItem("role");

//   // User not logged in → go to login
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   // Role-based access control
//   if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   // Authorized
//   return children;
// }
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" replace />;
  if (allowedRoles.length > 0 && !allowedRoles.includes(role))
    return <Navigate to="/unauthorized" replace />;
  return children;
}
