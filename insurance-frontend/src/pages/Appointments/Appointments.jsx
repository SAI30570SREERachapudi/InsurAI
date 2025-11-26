import React, { useEffect, useState } from "react";
import axios from "../../services/axiosInstance";
import "./Appointments.css";

export default function BookAppointment() {
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
      const res = await axios.get("/auth/users"); // all users
      const onlyAgents = res.data.filter((u) => u.role === "ROLE_AGENT" && u.verified);
      setAgents(onlyAgents);
    } catch (err) {
      console.error(err);
      alert("Failed to load agents");
    }
  }

  async function book() {
    if (!agentId || !date || !time) {
      alert("Fill all details");
      return;
    }

    try {
      await axios.post(`/appointments/book/${agentId}`, {
        date,
        time,
        reason
      });

      alert("Appointment booked!");
      setAgentId("");
      setDate("");
      setTime("");
      setReason("");
    } catch (err) {
      console.error(err);
      alert("Booking Failed!");
    }
  }

  return (
    <div className="appointment-wrapper">
      <h2>Book an Appointment</h2>

      <div className="form-card">
        <label>Choose Agent</label>
        <select value={agentId} onChange={(e) => setAgentId(e.target.value)}>
          <option value="">Select</option>
          {agents.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name} ({a.email})
            </option>
          ))}
        </select>

        <label>Select Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

        <label>Select Time</label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />

        <label>Reason</label>
        <textarea 
          rows="3"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        ></textarea>

        <button className="primary-btn" onClick={book}>
          📅 Book Appointment
        </button>
      </div>
    </div>
  );
}
