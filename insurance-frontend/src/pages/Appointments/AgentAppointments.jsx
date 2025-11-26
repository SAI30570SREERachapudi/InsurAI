import React, { useEffect, useState } from "react";
import axios from "../../services/axiosInstance";
import "./Appointments.css";

export default function AgentAppointments() {
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
      alert("Failed loading appointments");
    }
  }

  async function changeStatus(id, status) {
    try {
      await axios.put(`/appointments/status/${id}?status=${status}`);
      alert("Updated!");
      load();
    } catch (err) {
      alert("Error updating" + err.message);
    }
  }

  return (
    <div className="appointment-wrapper">
      <h2>Appointments With You</h2>

      {list.length === 0 ? (
        <p>No Appointments Assigned.</p>
      ) : (
        <div className="appointment-list">
          {list.map((a) => (
            <div key={a.id} className="appointment-item">
              <div>
                <h3>Customer: {a.customer?.name}</h3>
                <p>{a.reason}</p>
                <p>
                  📅 {a.date} — ⏰ {a.time}
                </p>
              </div>

              <div className="status-actions">
                <span className={`status ${a.status.toLowerCase()}`}>
                  {a.status}
                </span>

                <button onClick={() => changeStatus(a.id, "ACCEPTED")}>
                  Accept
                </button>
                <button onClick={() => changeStatus(a.id, "COMPLETED")}>
                  Complete
                </button>
                <button onClick={() => changeStatus(a.id, "CANCELLED")}>
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
