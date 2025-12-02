import React, { useEffect, useState } from "react";
import axios from "../../services/axiosInstance";
import "./Appointments.css";
import { useTranslation } from "react-i18next";

export default function AgentAppointments() {
  const { t } = useTranslation();
  const [list, setList] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const res = await axios.get("/appointments/agent");
      setList(res.data);
    } catch (err) {
      console.error(err);
      alert(t("failed_load_appointments"));
    }
  }

  async function changeStatus(id, status) {
    try {
      await axios.put(`/appointments/status/${id}?status=${status}`);
      alert(t("status_updated"));
      load();
    } catch (err) {
      alert(t("status_update_error"));
    }
  }

  return (
    <div className="appointment-wrapper">
      <h2>{t("appointments_with_you")}</h2>

      {list.length === 0 ? (
        <p>{t("no_appointments_assigned")}</p>
      ) : (
        <div className="appointment-list">
          {list.map((a) => (
            <div key={a.id} className="appointment-item">
              <div>
                <h3>{t("customer")}: {a.customer?.name}</h3>
                <p>{a.reason}</p>
                <p>
                  📅 {a.date} — ⏰ {a.time}
                </p>
              </div>

              <div className="status-actions">
                <span className={`status ${a.status.toLowerCase()}`}>
                  {t(a.status.toLowerCase())}
                </span>

                <button onClick={() => changeStatus(a.id, "ACCEPTED")}>
                  {t("accept")}
                </button>
                <button onClick={() => changeStatus(a.id, "COMPLETED")}>
                  {t("complete")}
                </button>
                <button onClick={() => changeStatus(a.id, "CANCELLED")}>
                  {t("cancel")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
