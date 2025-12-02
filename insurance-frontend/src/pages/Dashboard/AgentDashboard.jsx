import React, { useEffect, useState } from "react";
import axios from "../../services/axiosInstance";
import "./AgentDashboard.css";
import { useTranslation } from "react-i18next";

export default function AgentDashboard() {
  const { t } = useTranslation();
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
      alert(t("failed_to_load_stats"));
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="dashboard-loading">{t("loading")}...</div>;

  const { metrics, weeklyChart, typeChart } = stats;

  return (
    <div className="agent-dashboard">
      {/* HEADER */}
      <div className="header-card">
        <h1>👋 {t("welcome_back_agent")}</h1>
        <p>{t("performance_insights")}</p>
      </div>

      {/* METRICS */}
      <div className="metric-grid">
        <div className="metric-card glow total">
          <h2>{metrics.total}</h2>
          <p>{t("total_appointments")}</p>
        </div>

        <div className="metric-card glow completed">
          <h2>{metrics.completed}</h2>
          <p>{t("completed")}</p>
        </div>

        <div className="metric-card glow pending">
          <h2>{metrics.pending}</h2>
          <p>{t("pending")}</p>
        </div>

        <div className="metric-card glow cancelled">
          <h2>{metrics.cancelled}</h2>
          <p>{t("cancelled")}</p>
        </div>
      </div>

      {/* CHARTS */}
      <div className="charts-row">

        {/* Weekly Chart */}
        <div className="chart-card">
          <h3>📅 {t("weekly_activity")}</h3>
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

        {/* Type chart */}
        <div className="chart-card">
          <h3>📊 {t("appointment_types")}</h3>
          <div className="type-list">
            {typeChart.map((tObj, i) => (
              <div
                className="type-item fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
                key={i}
              >
                <span>{tObj.type}</span>
                <span className="type-count">{tObj.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
