import React from "react";
import { useNavigate } from "react-router-dom";
import "./Purchase.css";

export default function PurchaseSuccess() {
  const navigate = useNavigate();
  return (
    <div className="purchase-wrapper">
      <div className="purchase-card">
        <h2>Payment Successful 🎉</h2>
        <p>
          Your policy purchase was successful. A confirmation email will be sent
          shortly.
        </p>

        <div className="purchase-actions">
          <button className="btn ghost" onClick={() => navigate("/policies")}>
            Back to Policies
          </button>
          <button
            className="btn primary"
            onClick={() => navigate("/dashboard/customer")}
          >
            Go to My Policies
          </button>
        </div>
      </div>
    </div>
  );
}
