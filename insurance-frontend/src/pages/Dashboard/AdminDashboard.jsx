import React, { useEffect, useState } from "react";
import axios from "../../services/axiosInstance";

export default function AdminDashboard() {
  const [pending, setPending] = useState([]);
  useEffect(() => {
    fetchPending();
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
      alert("Failed");
    }
  }
  return (
    <div style={{ padding: 24 }}>
      <h2>Admin Dashboard</h2>
      <h3>Pending Agents</h3>
      {pending.length === 0 ? (
        <p>No pending agents</p>
      ) : (
        pending.map((a) => (
          <div
            key={a.id}
            style={{ border: "1px solid #eee", padding: 12, marginBottom: 8 }}
          >
            <p>
              <strong>{a.name}</strong> ({a.email})
            </p>
            <p>
              Document:{" "}
              {a.documentPath ? a.documentPath.split("/").pop() : "N/A"}
            </p>
            <button
              onClick={() => verify(a.id)}
              style={{
                padding: "6px 10px",
                background: "#16a34a",
                color: "#fff",
                border: "none",
                borderRadius: 4,
              }}
            >
              Verify
            </button>
          </div>
        ))
      )}
    </div>
  );
}
