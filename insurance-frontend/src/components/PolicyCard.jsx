import React from "react";
import "./PolicyCard.css";

function PolicyCard({ policy }) {
  return (
    <div className="policy-card">
      <h3>{policy.policyName}</h3>
      <p>Type: {policy.type}</p>
      <p>Premium: ₹{policy.premiumAmount}</p>
      <p>Coverage: ₹{policy.coverageAmount}</p>
      <button>View Details</button>
    </div>
  );
}

export default PolicyCard;
