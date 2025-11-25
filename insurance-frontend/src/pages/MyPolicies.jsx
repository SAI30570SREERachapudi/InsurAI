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
                  <div className="pi-title">{p.policy?.policyName || "Policy"}</div>
                  <div className="pi-meta">
                    <span>{p.nomineeName ? `Nominee: ${p.nomineeName}` : ""}</span>
                    <span>{p.purchaseDate ? ` • Bought: ${p.purchaseDate}` : ""}</span>
                  </div>
                </div>

                <div className="pi-right">
                  <div className={`status ${p.status?.toLowerCase()}`}>{p.status}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
