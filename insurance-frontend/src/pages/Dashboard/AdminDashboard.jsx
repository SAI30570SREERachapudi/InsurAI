import React, { useEffect, useState } from "react";
import axios from "../../services/axiosInstance";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [pending, setPending] = useState([]);

  useEffect(() => {
    // You can comment this out when using backend
    // fetchPending();
    // Static data for demo
    setPending([
      {
        id: 1,
        name: "Ravi Kumar",
        email: "ravi.kumar@example.com",
        documentPath: "/uploads/ravi_licence.pdf",
      },
      {
        id: 2,
        name: "Priya Sharma",
        email: "priya.sharma@example.com",
        documentPath: "/uploads/priya_certificate.jpg",
      },
    ]);
  }, []);

  async function fetchPending() {
    try {
      const res = await axios.get("/admin/pending-agents");
      setPending(res.data);
    } catch (e) {
      console.error(e);
    }
  }

  async function verify(id) {
    try {
      await axios.put(`/admin/verify-agent/${id}`);
      fetchPending();
      alert("Agent verified");
    } catch (e) {
      alert("Failed to verify");
    }
  }

  return (
    <div className="admin-dashboard">
      <h2 className="admin-title">Admin Dashboard</h2>
      <h3 className="pending-title">Pending Agent Verifications</h3>

      {pending.length === 0 ? (
        <p className="no-pending">No pending agents</p>
      ) : (
        <div className="pending-list">
          {pending.map((a) => (
            <div className="agent-card" key={a.id}>
              <div className="agent-info">
                <p>
                  <strong>{a.name}</strong> ({a.email})
                </p>
                <p>
                  Document:{" "}
                  <span className="doc-name">
                    {a.documentPath ? a.documentPath.split("/").pop() : "N/A"}
                  </span>
                </p>
              </div>
              <button className="verify-btn" onClick={() => verify(a.id)}>
                Verify Agent
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
