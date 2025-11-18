import React, { useEffect, useState } from "react";
import axios from "../../services/axiosInstance";
import "./adminDashboard.css";

export default function AdminDashboard() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPendingAgents();
  }, []);

  async function loadPendingAgents() {
    try {
      const res = await axios.get("/admin/pending-agents");
      setAgents(res.data);
    } catch (err) {
      console.error("Error loading pending agents", err);
    } finally {
      setLoading(false);
    }
  }

  async function approveAgent(id) {
    try {
      await axios.put(`/admin/approve/${id}`);
      alert("Agent Approved");
      loadPendingAgents();
    } catch (err) {
      alert("Approval Failed: " + (err.response?.data?.message || ""));
    }
  }

  async function rejectAgent(id) {
    try {
      await axios.put(`/admin/reject/${id}`);
      alert("Agent Rejected");
      loadPendingAgents();
    } catch (err) {
      alert("Reject Failed");
    }
  }

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Dashboard</h2>

      <div className="admin-card">
        <h3 className="section-title">Pending Agent Approvals</h3>

        {agents.length === 0 ? (
          <p>No pending agents.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Document</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {agents.map((a) => (
                <tr key={a.id}>
                  <td>{a.name}</td>
                  <td>{a.email}</td>

                  <td>
                    {a.documentPath ? (
                      <a
                        href={`http://localhost:8080/uploads/${a.documentPath}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View Document
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="status-pending">PENDING</td>

                  <td>
                    <button
                      className="approve-btn"
                      onClick={() => approveAgent(a.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => rejectAgent(a.id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
