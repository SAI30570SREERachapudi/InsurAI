import React, { useEffect, useState } from "react";
import axios from "../../services/axiosInstance";
import "./Appointments.css";
import { useTranslation } from "react-i18next";

export default function CustomerAppointments() {
  const { t } = useTranslation();
  const [list, setList] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const res = await axios.get("/appointments/customer");
      setList(res.data);
    } catch (err) {
      console.error(err);
      alert(t("failed_load_appointments"));
    }
  }

  return (
    <div className="appointment-wrapper">
      <h2>{t("my_appointments")}</h2>

      {list.length === 0 ? (
        <p>{t("no_appointments_found")}</p>
      ) : (
        <div className="appointment-list">
          {list.map((a) => (
            <div key={a.id} className="appointment-item">
              <div>
                <h3>{t("agent")}: {a.agent?.name}</h3>
                <p>{a.reason}</p>
                <p>
                  📅 {a.date} — ⏰ {a.time}
                </p>
              </div>

              <span className={`status ${a.status.toLowerCase()}`}>
                {t(a.status.toLowerCase())}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
