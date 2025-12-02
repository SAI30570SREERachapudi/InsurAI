import React, { useEffect, useState } from "react";
import axios from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import "./adminDashboard.css";
import { useTranslation } from "react-i18next";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
      const latest = res.data.slice(-3).reverse();
      setRecentPolicies(latest);
    } catch (err) {
      console.error("Error loading recent policies:", err);
    }
  }

  return (
    <div className="admin-container">
      <h2 className="admin-title">{t("admin_dashboard")}</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.totalUsers}</h3>
          <p>{t("total_users")}</p>
        </div>

        <div
          className="stat-card clickable"
          onClick={() => navigate("/admin/requests")}
        >
          <h3>{stats.pendingAgents}</h3>
          <p>{t("pending_agent_requests")}</p>
        </div>

        <div className="stat-card">
          <h3>{stats.totalPolicies}</h3>
          <p>{t("total_policies")}</p>
        </div>
      </div>

      <h3 className="section-title">{t("recent_policies")}</h3>
      <div className="policy-grid">
        {recentPolicies.length === 0 ? (
          <p>{t("no_policies_added")}</p>
        ) : (
          recentPolicies.map((p) => (
            <div key={p.id} className="policy-card">
              <h4>{p.policyName}</h4>
              <p>{t("type")}: {p.policyType}</p>
              <p>{t("premium")}: ₹{p.premium}</p>
              <p>{t("years")}: {p.termInYears}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
