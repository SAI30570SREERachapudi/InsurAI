// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function Unauthorized() {
//   const navigate = useNavigate();

//   const handleGoBack = () => {
//     // If user is logged in, redirect to their dashboard
//     const role = localStorage.getItem("role");
//     if (role === "ROLE_CUSTOMER") navigate("/dashboard/customer");
//     else if (role === "ROLE_AGENT") navigate("/dashboard/agent");
//     else if (role === "ROLE_ADMIN") navigate("/dashboard/admin");
//     else navigate("/login");
//   };

//   return (
//     <div
//       style={{
//         height: "80vh",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         textAlign: "center",
//         color: "#1e3a8a",
//       }}
//     >
//       <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>
//         🚫 Unauthorized Access
//       </h1>
//       <p style={{ fontSize: "1.2rem", marginBottom: "20px", color: "#555" }}>
//         You do not have permission to view this page.
//       </p>
//       <button
//         onClick={handleGoBack}
//         style={{
//           padding: "10px 20px",
//           background: "#1e3a8a",
//           color: "white",
//           border: "none",
//           borderRadius: "6px",
//           cursor: "pointer",
//           fontSize: "1rem",
//         }}
//       >
//         Go Back
//       </button>
//     </div>
//   );
// }
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const nav = useNavigate();
  const role = localStorage.getItem("role");
  const goBack = () => {
    if (role === "ROLE_ADMIN") nav("/dashboard/admin");
    else if (role === "ROLE_AGENT") nav("/dashboard/agent");
    else if (role === "ROLE_CUSTOMER") nav("/dashboard/customer");
    else nav("/login");
  };
  return (
    <div
      style={{
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>🚫 Unauthorized</h1>
      <p>You don't have permission to access this page.</p>
      <button
        onClick={goBack}
        style={{
          padding: "8px 14px",
          background: "#1e3a8a",
          color: "#fff",
          border: "none",
          borderRadius: 6,
        }}
      >
        Go Back
      </button>
    </div>
  );
}
