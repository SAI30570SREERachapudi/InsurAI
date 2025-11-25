import React, { useEffect, useState } from "react";
import axios from "../services/axiosInstance";
import "./Purchase.css";

export default function MyPolicies() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get("/purchases/my");
        setPurchases(res.data || []);
      } catch (e) {
        console.error(e);
        alert("Failed to load purchases.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  async function cancelSubscription(id) {
    if (!window.confirm("Are you sure you want to cancel this policy?")) return;

    try {
      await axios.put(`/purchases/cancel/${id}`);
      alert("Policy subscription cancelled.");

      // Update UI instantly
      setPurchases((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: "CANCELLED" } : p))
      );
    } catch (e) {
      console.error(e);
      alert("Failed to cancel subscription.");
    }
  }

  if (loading) return <div className="purchase-loading">Loading...</div>;

  return (
    <div className="purchase-wrapper">
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

                {/* Buttons Section */}
                {/* Buttons Section */}
                <div className="purchase-actions">
                  <button
                    className="receipt-btn"
                    onClick={() =>
                      window.open(
                        `http://localhost:8080/api/purchases/receipt/${p.id}`
                      )
                    }
                  >
                    📄 Download Receipt
                  </button>

                  {/* Show cancel button only if NOT cancelled */}
                  {p.status !== "CANCELLED" && (
                    <button
                      className="cancel-btn"
                      onClick={() => cancelSubscription(p.id)}
                    >
                      ❌ Cancel Subscription
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
