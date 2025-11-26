import React, { useEffect, useState } from "react";
import axios from "../services/axiosInstance";
import "./Purchase.css";
import "./AppointmentsSide.css"; // ⭐ NEW CSS FILE

export default function MyPolicies() {
  const [purchases, setPurchases] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPolicies();
    loadAppointments();
  }, []);

  async function loadPolicies() {
    try {
      const res = await axios.get("/purchases/my");
      setPurchases(res.data || []);
    } catch (e) {
      console.error(e);
      alert("Failed to load purchases.");
    } finally {
      setLoading(false);
    }
  }

  async function loadAppointments() {
    try {
      const res = await axios.get("/appointments/customer");
      setAppointments(res.data || []);
    } catch (e) {
      console.error(e);
    }
  }

  async function cancelSubscription(id) {
    if (!window.confirm("Are you sure you want to cancel this policy?")) return;

    try {
      await axios.put(`/purchases/cancel/${id}`);
      alert("Policy cancelled.");

      setPurchases((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: "CANCELLED" } : p))
      );
    } catch (e) {
      alert("Cancellation failed." + e.message);
    }
  }

  if (loading) return <div className="purchase-loading">Loading...</div>;

  return (
    <div className="two-column-wrapper">
      {/* LEFT COLUMN – Purchased Policies */}
      <div className="left-column">
        <div className="purchase-card wide">
          <h2>My Purchased Policies</h2>

          {purchases.length === 0 ? (
            <p>You have not purchased any policy yet.</p>
          ) : (
            <div className="purchase-list">
              {purchases.map((p) => (
                <div key={p.id} className="purchase-item">
                  <div className="pi-left">
                    <div className="pi-title">
                      {p.policy?.policyName || "Policy"}
                    </div>

                    <div className="pi-meta">
                      <span>
                        {p.nomineeName ? `Nominee: ${p.nomineeName}` : ""}
                      </span>
                      <span>
                        {p.purchaseDate ? ` • Bought: ${p.purchaseDate}` : ""}
                      </span>
                    </div>
                  </div>

                  <div className="pi-right">
                    <div className={`status ${p.status?.toLowerCase()}`}>
                      {p.status}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="purchase-actions">
                    <button
                      className="receipt-btn"
                      onClick={() =>
                        window.open(
                          `http://localhost:8080/api/purchases/receipt/${p.id}`
                        )
                      }
                    >
                      📄 Receipt
                    </button>

                    {p.status !== "CANCELLED" && (
                      <button
                        className="cancel-btn"
                        onClick={() => cancelSubscription(p.id)}
                      >
                        ❌ Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN – Appointments */}
      <div className="right-column">
        <div className="appointment-card">
          <h2>My Appointments</h2>

          {appointments.length === 0 ? (
            <p>No appointments booked yet.</p>
          ) : (
            <div className="appointment-list">
              {appointments.map((a) => (
                <div key={a.id} className="appointment-item">
                  <div>
                    <strong>Agent:</strong> {a.agent?.name}
                  </div>
                  <div>
                    <strong>Date:</strong> {a.date}
                  </div>
                  <div>
                    <strong>Status:</strong>{" "}
                    <span className={`a-status ${a.status.toLowerCase()}`}>
                      {a.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
