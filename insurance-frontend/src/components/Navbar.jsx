// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "../services/axiosInstance";
// import "./navbar.css";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const role = localStorage.getItem("role");
//   const loggedIn = !!localStorage.getItem("token");

//   const logout = async () => {
//     try {
//       await axios.post("/auth/logout");
//     } catch (e) {
//       console.error("Logout error:", e);
//     }
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     navigate("/login");
//   };

//   const goHome = () => {
//     if (!loggedIn) return navigate("/login");

//     if (role === "ROLE_ADMIN") navigate("/dashboard/admin");
//     else if (role === "ROLE_AGENT") navigate("/dashboard/agent");
//     else if (role === "ROLE_CUSTOMER") navigate("/homepage/customer");
//     else navigate("/login");
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         <div
//           className="navbar-logo"
//           onClick={goHome}
//           style={{ cursor: "pointer" }}
//         >
//           Insur<span>AI</span>
//         </div>

//         <div className="navbar-links">
//           {loggedIn ? (
//             <>
//               {/* ⭐ HOME - styled like normal nav link */}
//               <span onClick={goHome} className="nav-item">
//                 Home
//               </span>

//               <Link to="/policies" className="nav-item">
//                 Policies
//               </Link>

//               {role === "ROLE_CUSTOMER" && (
//                 <Link to="/dashboard/customer" className="nav-item">
//                   Dashboard
//                 </Link>
//               )}

//               {role === "ROLE_AGENT" && (
//                 <Link to="/dashboard/agent" className="nav-item">
//                   Agent Panel
//                 </Link>
//               )}
//               {role === "ROLE_CUSTOMER" && (
//                 <Link to="/appointments/book" className="nav-item">
//                   Connect
//                 </Link>
//               )}
//               {role === "ROLE_AGENT" && (
//                 <Link to="/appointments/agent" className="nav-item">
//                   My Meetings
//                 </Link>
//               )}
//               {role === "ROLE_ADMIN" && (
//                 <>
//                   <Link to="/admin/policy/add" className="nav-item">
//                     Add Policy
//                   </Link>

//                   <Link to="/admin/requests" className="nav-item">
//                     Requests
//                   </Link>
//                 </>
//               )}
//               {role !== "ROLE_ADMIN" && (
//                 <Link to="/profile" className="nav-item">
//                   Profile
//                 </Link>
//               )}

//               <span onClick={logout} className="nav-item logout-link">
//                 Logout
//               </span>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="nav-item">
//                 Login
//               </Link>
//               <Link to="/register" className="register-btn">
//                 Register
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../services/axiosInstance";
import "./navbar.css";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import "../darkmode.css";
export default function Navbar() {
  // DARK MODE
  // THEME HANDLING
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.body.className = ""; // remove old classes
    document.body.classList.add(`theme-${theme}`);

    localStorage.setItem("theme", theme);
  }, [theme]);

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

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

  const goHome = () => {
    if (!loggedIn) return navigate("/login");

    if (role === "ROLE_ADMIN") navigate("/dashboard/admin");
    else if (role === "ROLE_AGENT") navigate("/dashboard/agent");
    else if (role === "ROLE_CUSTOMER") navigate("/homepage/customer");
    else navigate("/login");
  };

  // ⭐ Language Change Handler
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* LOGO */}
        <div
          className="navbar-logo"
          onClick={goHome}
          style={{ cursor: "pointer" }}
        >
          Insur<span>AI</span>
        </div>

        {/* NAV LINKS */}
        <div className="navbar-links">
          {loggedIn ? (
            <>
              <span onClick={goHome} className="nav-item">
                {t("home")}
              </span>

              <Link to="/policies" className="nav-item">
                {t("policies")}
              </Link>

              {role === "ROLE_CUSTOMER" && (
                <Link to="/dashboard/customer" className="nav-item">
                  {t("dashboard")}
                </Link>
              )}

              {role === "ROLE_AGENT" && (
                <Link to="/dashboard/agent" className="nav-item">
                  {t("agent_panel")}
                </Link>
              )}

              {role === "ROLE_CUSTOMER" && (
                <Link to="/appointments/book" className="nav-item">
                  {t("connect")}
                </Link>
              )}

              {role === "ROLE_AGENT" && (
                <Link to="/appointments/agent" className="nav-item">
                  {t("my_meetings")}
                </Link>
              )}

              {role === "ROLE_ADMIN" && (
                <>
                  <Link to="/admin/policy/add" className="nav-item">
                    {t("add_policy")}
                  </Link>
                  <Link to="/admin/requests" className="nav-item">
                    {t("requests")}
                  </Link>
                </>
              )}

              {role !== "ROLE_ADMIN" && (
                <Link to="/profile" className="nav-item">
                  {t("profile")}
                </Link>
              )}

              {/* LOGOUT */}
              <span onClick={logout} className="nav-item logout-link">
                {t("logout")}
              </span>
              {/* 🌗 Animated Theme Toggle */}
              <div className="theme-toggle-wrapper">
                <label className="theme-switch">
                  <input
                    type="checkbox"
                    checked={theme !== "light"}
                    onChange={() =>
                      setTheme(theme === "light" ? "dark" : "light")
                    }
                  />
                  <span className="slider round"></span>
                </label>
              </div>

              {/* 🌐 Language Selector */}
              <select
                className="lang-select"
                onChange={(e) => changeLanguage(e.target.value)}
                value={i18n.language}
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="te">తెలుగు</option>
                <option value="ta">தமிழ்</option>
              </select>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-item">
                {t("login")}
              </Link>
              <Link to="/register" className="register-btn">
                {t("register")}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
