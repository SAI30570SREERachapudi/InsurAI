import React, { useEffect, useState } from "react";
import axios from "../../services/axiosInstance";
import "./AgentDashboard.css";

export default function AgentDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const res = await axios.get("/appointments/agent/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Error loading stats:", err);
      alert("Failed to load dashboard stats.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="dashboard-loading">Loading...</div>;

  const { metrics, weeklyChart, typeChart } = stats;

  return (
    <div className="agent-dashboard">
      {/* HEADER */}
      <div className="header-card">
        <h1>👋 Welcome Back, Agent</h1>
        <p>Your performance insights at a glance</p>
      </div>

      {/* METRICS CARDS */}
      <div className="metric-grid">
        <div className="metric-card glow total">
          <h2>{metrics.total}</h2>
          <p>Total Appointments</p>
        </div>

        <div className="metric-card glow completed">
          <h2>{metrics.completed}</h2>
          <p>Completed</p>
        </div>

        <div className="metric-card glow pending">
          <h2>{metrics.pending}</h2>
          <p>Pending</p>
        </div>

        <div className="metric-card glow cancelled">
          <h2>{metrics.cancelled}</h2>
          <p>Cancelled</p>
        </div>
      </div>

      {/* CHARTS SECTION */}
      <div className="charts-row">
        
        {/* Weekly Chart */}
        <div className="chart-card">
          <h3>📅 Weekly Activity</h3>
          <div className="bar-chart">
            {weeklyChart.map((day, i) => (
              <div className="bar-item" key={i}>
                <div
                  className="bar"
                  style={{
                    height: `${day.count * 25}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                ></div>
                <span>{day.day.substring(0, 3)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Type Distribution */}
        <div className="chart-card">
          <h3>📊 Appointment Types</h3>
          <div className="type-list">
            {typeChart.map((t, i) => (
              <div className="type-item fade-in" style={{ animationDelay: `${i * 0.1}s` }} key={i}>
                <span>{t.type}</span>
                <span className="type-count">{t.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
