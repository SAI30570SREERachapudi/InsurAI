import React, { useEffect, useState } from "react";
import axios from "../../services/axiosInstance";
import "./adminDashboard.css";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const res = await axios.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error loading users", err);
    } finally {
      setLoading(false);
    }
  }

  async function approveAgent(id) {
    try {
      await axios.put(`/admin/approve/${id}`);
      alert("Agent approved successfully!");
      loadUsers();
    } catch (err) {
      alert("Approval failed: " + (err.response?.data?.message || ""));
    }
  }

  async function rejectAgent(id) {
    const reason = prompt("Enter reason for rejection:");

    if (!reason || reason.trim() === "") {
      alert("Rejection reason is required.");
      return;
    }

    try {
      await axios.put(`/admin/reject/${id}`, { reason });
      alert("Agent rejected successfully!");
      loadUsers();
    } catch (err) {
      alert("Rejection failed: " + (err.response?.data?.message || ""));
    }
  }

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Dashboard</h2>

      <div className="admin-card">
        <h3 className="section-title">New Registrations</h3>

        {users.length === 0 ? (
          <p>No new users found.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Document</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role.replace("ROLE_", "")}</td>

                  <td
                    className={
                      u.status === "APPROVED"
                        ? "status-approved"
                        : u.status === "REJECTED"
                        ? "status-rejected"
                        : "status-pending"
                    }
                  >
                    {u.status}
                  </td>

                  <td>
                    {u.documentPath ? (
                      <a
                        href={`http://localhost:8080/uploads/${u.documentPath
                          .split("/")
                          .pop()}`}
                        target="_blank"
                        rel="noreferrer"
                        className="doc-link"
                      >
                        View
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td>
                    {u.role === "ROLE_AGENT" && u.status === "PENDING" && (
                      <>
                        <button
                          className="approve-btn"
                          onClick={() => approveAgent(u.id)}
                        >
                          Approve
                        </button>

                        <button
                          className="reject-btn"
                          onClick={() => rejectAgent(u.id)}
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {u.status === "APPROVED" && <span>✔ Approved</span>}
                    {u.status === "REJECTED" && <span>✖ Rejected</span>}
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
