import React, { useEffect, useState } from "react";
import axios from "../../services/axiosInstance";
import "./Appointments.css";
import { useTranslation } from "react-i18next";

export default function BookAppointment() {
  const { t } = useTranslation();

  const [agents, setAgents] = useState([]);
  const [agentId, setAgentId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    loadAgents();
  }, []);

  async function loadAgents() {
    try {
      const res = await axios.get("/auth/users");
      const onlyAgents = res.data.filter(
        (u) => u.role === "ROLE_AGENT" && u.verified
      );
      setAgents(onlyAgents);
    } catch (err) {
      console.error(err);
      alert(t("failed_load_agents"));
    }
  }

  async function book() {
    if (!agentId || !date || !time) {
      alert(t("fill_all_details"));
      return;
    }

    try {
      await axios.post(`/appointments/book/${agentId}`, {
        date,
        time,
        reason
      });

      alert(t("appointment_booked"));
      setAgentId("");
      setDate("");
      setTime("");
      setReason("");
    } catch (err) {
      alert(t("booking_failed"));
    }
  }

  return (
    <div className="appointment-wrapper">
      <h2>{t("book_appointment")}</h2>

      <div className="form-card">
        <label>{t("choose_agent")}</label>
        <select value={agentId} onChange={(e) => setAgentId(e.target.value)}>
          <option value="">{t("select")}</option>
          {agents.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name} ({a.email})
            </option>
          ))}
        </select>

        <label>{t("select_date")}</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

        <label>{t("select_time")}</label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />

        <label>{t("reason")}</label>
        <textarea
          rows="3"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        ></textarea>

        <button className="primary-btn" onClick={book}>
          📅 {t("book_appointment")}
        </button>
      </div>
    </div>
  );
}
