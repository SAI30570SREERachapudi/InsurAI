import React, { useEffect, useState } from "react";
import axios from "../../services/axiosInstance";
import "./AdminRequests.css";
import { useTranslation } from "react-i18next";

export default function AdminRequests() {
  const { t } = useTranslation();
  const [agents, setAgents] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const res = await axios.get("/admin/users");

      setAgents(res.data.filter((u) => u.role === "ROLE_AGENT"));
      setCustomers(res.data.filter((u) => u.role === "ROLE_CUSTOMER"));
    } catch (err) {
      console.error("Error loading users", err);
    } finally {
      setLoading(false);
    }
  }

  async function approveAgent(id) {
    try {
      await axios.put(`/admin/approve/${id}`);
      setAgents((prev) =>
        prev.map((u) => (u.id === id ? { ...u, status: "APPROVED" } : u))
      );
      alert(t("agent_approved"));
    } catch (err) {
      alert(t("approval_failed"));
    }
  }

  async function rejectAgent(id) {
    const reason = prompt(t("enter_rejection_reason"));

    if (!reason.trim()) {
      alert(t("reason_required"));
      return;
    }

    try {
      await axios.put(`/admin/reject/${id}`, { reason });
      setAgents((prev) =>
        prev.map((u) => (u.id === id ? { ...u, status: "REJECTED" } : u))
      );
      alert(t("agent_rejected"));
    } catch (err) {
      alert(t("rejection_failed"));
    }
  }

  if (loading) return <p>{t("loading")}...</p>;

  return (
    <div className="admin-container">
      <h2 className="admin-title">{t("agent_approval_requests")}</h2>

      <div className="admin-card modern-card">
        <h3 className="section-title">{t("agent_requests")}</h3>

        {agents.length === 0 ? (
          <p>{t("no_agents_found")}</p>
        ) : (
          <table className="admin-table stylish-table">
            <thead>
              <tr>
                <th>{t("name")}</th>
                <th>{t("email")}</th>
                <th>{t("status")}</th>
                <th>{t("document")}</th>
                <th>{t("actions")}</th>
              </tr>
            </thead>

            <tbody>
              {agents.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.status}</td>

                  <td>
                    {u.documentPath ? (
                      <a
                        href={`http://localhost:8080/uploads/${u.documentPath.split("/").pop()}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {t("view")}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td>
                    {u.status === "PENDING" && (
                      <>
                        <button onClick={() => approveAgent(u.id)}>
                          {t("approve")}
                        </button>
                        <button onClick={() => rejectAgent(u.id)}>
                          {t("reject")}
                        </button>
                      </>
                    )}

                    {u.status === "APPROVED" && <span>✔ {t("approved")}</span>}
                    {u.status === "REJECTED" && <span>✖ {t("rejected")}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="admin-card modern-card">
        <h3 className="section-title">{t("customers")}</h3>

        {customers.length === 0 ? (
          <p>{t("no_customers_found")}</p>
        ) : (
          <table className="admin-table stylish-table">
            <thead>
              <tr>
                <th>{t("name")}</th>
                <th>{t("email")}</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
