import React, { useEffect, useState } from "react";
import axios from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import "./adminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingAgents: 0,
    totalPolicies: 0,
  });

  const [recentPolicies, setRecentPolicies] = useState([]);

  useEffect(() => {
    loadStats();
    loadRecentPolicies();
  }, []);

  async function loadStats() {
    try {
      const usersRes = await axios.get("/admin/users");
      const policiesRes = await axios.get("/policies");

      const pendingAgentsCount = usersRes.data.filter(
        (u) => u.role === "ROLE_AGENT" && u.status === "PENDING"
      ).length;

      setStats({
        totalUsers: usersRes.data.length,
        pendingAgents: pendingAgentsCount,
        totalPolicies: policiesRes.data.length,
      });
    } catch (err) {
      console.error("Error loading stats:", err);
    }
  }

  async function loadRecentPolicies() {
    try {
      const res = await axios.get("/policies");
      const latest = res.data.slice(-3); // last 3 policies
      setRecentPolicies(latest.reverse());
    } catch (err) {
      console.error("Error loading recent policies:", err);
    }
  }

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Dashboard</h2>

      {/* Stats Section */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.totalUsers}</h3>
          <p>Total Users</p>
        </div>

        <div
          className="stat-card clickable"
          onClick={() => navigate("/admin/requests")}
        >
          <h3>{stats.pendingAgents}</h3>
          <p>Pending Agent Requests</p>
        </div>

        <div className="stat-card">
          <h3>{stats.totalPolicies}</h3>
          <p>Total Policies</p>
        </div>
      </div>

      <h3 className="section-title">Recently Added Policies</h3>
      <div className="policy-grid">
        {recentPolicies.length === 0 ? (
          <p>No policies added yet.</p>
        ) : (
          recentPolicies.map((p) => (
            <div key={p.id} className="policy-card">
              <h4>{p.policyName}</h4>
              <p>Type: {p.policyType}</p>
              <p>Premium: ₹{p.premium}</p>
              <p>Years: {p.termInYears}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
