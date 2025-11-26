import React, { useEffect, useState } from "react";
import axios from "../../services/axiosInstance";
import "./Appointments.css";

export default function CustomerAppointments() {
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
      alert("Failed to load appointments");
    }
  }

  return (
    <div className="appointment-wrapper">
      <h2>My Appointments</h2>

      {list.length === 0 ? (
        <p>No Appointments Found.</p>
      ) : (
        <div className="appointment-list">
          {list.map((a) => (
            <div key={a.id} className="appointment-item">
              <div>
                <h3>Agent: {a.agent?.name}</h3>
                <p>{a.reason}</p>
                <p>
                  📅 {a.date} — ⏰ {a.time}
                </p>
              </div>

              <span className={`status ${a.status.toLowerCase()}`}>{a.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
