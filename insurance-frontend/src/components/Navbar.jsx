// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "../services/axiosInstance";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const role = localStorage.getItem("role");
//   const loggedIn = !!localStorage.getItem("token");

//   const logout = async () => {
//     try {
//       await axios.post("/auth/logout");
//     } catch (e) {}
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     navigate("/login");
//   };

//   return (
//     <nav
//       style={{
//         background: "#1e3a8a",
//         color: "#fff",
//         padding: 12,
//         display: "flex",
//         justifyContent: "space-between",
//       }}
//     >
//       <div style={{ fontWeight: 700 }}>Insurai</div>
//       <div>
//         {loggedIn ? (
//           <>
//             <Link to="/policies" style={{ color: "#fff", marginRight: 10 }}>
//               Policies
//             </Link>
//             {role === "ROLE_CUSTOMER" && (
//               <Link
//                 to="/dashboard/customer"
//                 style={{ color: "#fff", marginRight: 10 }}
//               >
//                 Dashboard
//               </Link>
//             )}
//             {role === "ROLE_AGENT" && (
//               <Link
//                 to="/dashboard/agent"
//                 style={{ color: "#fff", marginRight: 10 }}
//               >
//                 Dashboard
//               </Link>
//             )}
//             {role === "ROLE_ADMIN" && (
//               <Link
//                 to="/dashboard/admin"
//                 style={{ color: "#fff", marginRight: 10 }}
//               >
//                 Admin
//               </Link>
//             )}
//             <button
//               onClick={logout}
//               style={{
//                 background: "#dc2626",
//                 border: "none",
//                 color: "#fff",
//                 padding: "6px 10px",
//                 borderRadius: 4,
//               }}
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link to="/login" style={{ color: "#fff", marginRight: 10 }}>
//               Login
//             </Link>
//             <Link to="/register" style={{ color: "#fff", marginRight: 10 }}>
//               Register
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../services/axiosInstance";
import "./navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const loggedIn = !!localStorage.getItem("token");

  const logout = async () => {
    try {
      await axios.post("/auth/logout");
    } catch (e) {
      console.error("Logout error:", e);
    }
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          Insur<span>AI</span>
        </div>

        <div className="navbar-links">
          {loggedIn ? (
            <>
              <Link to="/policies" className="nav-item">
                Policies
              </Link>

              {role === "ROLE_CUSTOMER" && (
                <Link to="/dashboard/customer" className="nav-item">
                  Dashboard
                </Link>
              )}
              {role === "ROLE_AGENT" && (
                <Link to="/dashboard/agent" className="nav-item">
                  Agent Panel
                </Link>
              )}
              {role === "ROLE_ADMIN" && (
                <Link to="/dashboard/admin" className="nav-item">
                  Admin
                </Link>
              )}

              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-item">
                Login
              </Link>
              <Link to="/register" className="register-btn">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
