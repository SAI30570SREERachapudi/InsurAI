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

  const goHome = () => {
    if (!loggedIn) return navigate("/login");

    if (role === "ROLE_ADMIN") navigate("/dashboard/admin");
    else if (role === "ROLE_AGENT") navigate("/dashboard/agent");
    else if (role === "ROLE_CUSTOMER") navigate("/dashboard/customer");
    else navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div
          className="navbar-logo"
          onClick={goHome}
          style={{ cursor: "pointer" }}
        >
          Insur<span>AI</span>
        </div>

        <div className="navbar-links">
          {loggedIn ? (
            <>
              {/* ⭐ HOME - styled like normal nav link */}
              <span onClick={goHome} className="nav-item">
                Home
              </span>

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
                <>
                  <Link to="/admin/policy/add" className="nav-item">
                    Add Policy
                  </Link>

                  <Link to="/admin/requests" className="nav-item">
                    Requests
                  </Link>
                </>
              )}

              <span onClick={logout} className="nav-item logout-link">
                Logout
              </span>
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
