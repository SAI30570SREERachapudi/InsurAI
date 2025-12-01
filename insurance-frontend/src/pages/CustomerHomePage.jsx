import React, { useEffect, useState } from "react";
import axios from "../services/axiosInstance";
import "./CustomerHome.css";
import { useTranslation } from "react-i18next";

export default function CustomerHome() {
  const { t } = useTranslation();

  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    loadHomeData();
  }, []);

  async function loadHomeData() {
    try {
      const u = await axios.get("/auth/me");
      setUser(u.data);

      const p = await axios.get("/purchases/my");
      const a = await axios.get("/appointments/customer");

      setStats({
        totalPolicies: p.data.length,
        activePolicies: p.data.filter((x) => x.status === "ACTIVE").length,
        cancelledPolicies: p.data.filter((x) => x.status === "CANCELLED").length,
        nextPremium:
          p.data.length > 0 ? p.data[0].nextPremiumDue : t("no_policies"),
      });

      setAppointments(a.data || []);
    } catch (err) {
      console.error("Home load failed", err);
    }
  }

  return (
    <div className="home-container">
      
      {/* ========================= HEADER ========================= */}
      <div className="home-hero">
        <h1>
          {t("welcome_back")}, <span>{user?.name}</span> 👋
        </h1>
        <p>{t("protection_journey")}</p>
      </div>

      {/* ========================= QUICK STATS ========================= */}
      <div className="stats-row">
        <div className="stat-card">
          <h3>{stats?.totalPolicies || 0}</h3>
          <p>{t("total_policies")}</p>
        </div>

        <div className="stat-card">
          <h3>{stats?.activePolicies || 0}</h3>
          <p>{t("active_policies")}</p>
        </div>

        <div className="stat-card">
          <h3>{stats?.cancelledPolicies || 0}</h3>
          <p>{t("cancelled")}</p>
        </div>

        <div className="stat-card highlight">
          <h3>{stats?.nextPremium || t("no_due")}</h3>
          <p>{t("next_premium")}</p>
        </div>
      </div>

      {/* ========================= UPCOMING APPOINTMENT ========================= */}
      <div className="section-card">
        <h2>📅 {t("upcoming_appointment")}</h2>

        {appointments.length === 0 ? (
          <p>{t("no_appointments")}</p>
        ) : (
          <div className="appointment-box">
            <h3>
              {t("with_agent")}: {appointments[0].agent?.name}
            </h3>

            <p>
              {t("date")}: <strong>{appointments[0].date}</strong>
            </p>

            <p>
              {t("time")}: <strong>{appointments[0].time}</strong>
            </p>

            <p>
              {t("reason")}: <strong>{appointments[0].reason}</strong>
            </p>
          </div>
        )}
      </div>

      {/* ========================= RECOMMENDED POLICIES ========================= */}
      <div className="section-card">
        <h2>🔥 {t("recommended_policies")}</h2>

        <div className="policy-suggestions">
          <div className="policy-card">
            <h3>{t("health_shield")}</h3>
            <p>{t("health_shield_desc")}</p>
          </div>

          <div className="policy-card">
            <h3>{t("life_secure")}</h3>
            <p>{t("life_secure_desc")}</p>
          </div>

          <div className="policy-card">
            <h3>{t("vehicle_protect")}</h3>
            <p>{t("vehicle_protect_desc")}</p>
          </div>
        </div>
      </div>

      {/* ========================= TIPS CAROUSEL ========================= */}
      <div className="tips-carousel">
        <h2>💡 {t("insurance_tips")}</h2>

        <div className="tips-slider">
          <div className="tip">✔ {t("tip_1")}</div>
          <div className="tip">✔ {t("tip_2")}</div>
          <div className="tip">✔ {t("tip_3")}</div>
          <div className="tip">✔ {t("tip_4")}</div>
        </div>
      </div>
    </div>
  );
}
