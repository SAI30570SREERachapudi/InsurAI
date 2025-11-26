import React, { useEffect, useState } from "react";
import axios from "../services/axiosInstance";
import "./CustomerHome.css";

export default function CustomerHome() {
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
        cancelledPolicies: p.data.filter((x) => x.status === "CANCELLED")
          .length,
        nextPremium:
          p.data.length > 0 ? p.data[0].nextPremiumDue : "No policies",
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
          Welcome back, <span>{user?.name}</span> 👋
        </h1>
        <p>Your protection journey starts here.</p>
      </div>

      {/* ========================= QUICK STATS ========================= */}
      <div className="stats-row">
        <div className="stat-card">
          <h3>{stats?.totalPolicies || 0}</h3>
          <p>Total Policies</p>
        </div>

        <div className="stat-card">
          <h3>{stats?.activePolicies || 0}</h3>
          <p>Active Policies</p>
        </div>

        <div className="stat-card">
          <h3>{stats?.cancelledPolicies || 0}</h3>
          <p>Cancelled</p>
        </div>

        <div className="stat-card highlight">
          <h3>{stats?.nextPremium || "No Due"}</h3>
          <p>Next Premium</p>
        </div>
      </div>

      {/* ========================= UPCOMING APPOINTMENT ========================= */}
      <div className="section-card">
        <h2>📅 Your Upcoming Appointment</h2>

        {appointments.length === 0 ? (
          <p>No appointments booked yet.</p>
        ) : (
          <div className="appointment-box">
            <h3>With Agent: {appointments[0].agent?.name}</h3>
            <p>
              Date: <strong>{appointments[0].date}</strong>
            </p>
            <p>
              Time: <strong>{appointments[0].time}</strong>
            </p>
            <p>
              Reason: <strong>{appointments[0].reason}</strong>
            </p>
          </div>
        )}
      </div>

      {/* ========================= RECOMMENDED POLICIES ========================= */}
      <div className="section-card">
        <h2>🔥 Recommended Policies for You</h2>

        <div className="policy-suggestions">
          <div className="policy-card">
            <h3>Health Shield+</h3>
            <p>High coverage with low premium</p>
          </div>

          <div className="policy-card">
            <h3>Life Secure Plan</h3>
            <p>Best for long term protection</p>
          </div>

          <div className="policy-card">
            <h3>Vehicle Protect</h3>
            <p>Total protection for your ride</p>
          </div>
        </div>
      </div>

      {/* ========================= TIPS CAROUSEL ========================= */}
      <div className="tips-carousel">
        <h2>💡 Insurance Tips</h2>
        <div className="tips-slider">
          <div className="tip">✔ Know what coverage you really need</div>
          <div className="tip">✔ Always renew your premium on time.</div>
          <div className="tip">✔ Keep your nominee info updated.</div>
          <div className="tip">✔ Choose policies based on life goals.</div>
        </div>
      </div>
    </div>
  );
}
