import React, { useEffect, useState } from "react";
import "./CustomerDashboard.css";

export default function CustomerDashboard() {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    // Static sample data for presentation/demo
    setPolicies([
      {
        id: 1,
        policyName: "Health Protect Plan",
        premium: "₹12,000 / year",
        status: "Active",
        renewalDate: "2026-02-14",
      },
      {
        id: 2,
        policyName: "Life Secure Plus",
        premium: "₹18,500 / year",
        status: "Expired",
        renewalDate: "2024-12-20",
      },
      {
        id: 3,
        policyName: "Car Shield Basic",
        premium: "₹9,800 / year",
        status: "Active",
        renewalDate: "2026-06-10",
      },
    ]);
  }, []);

  return (
    <div className="customer-dashboard">
      <h2 className="customer-title">Customer Dashboard</h2>
      <p className="customer-subtitle">
        Welcome back! View your policies, renewal details, and claim status here.
      </p>

      <div className="policy-section">
        <h3 className="section-heading">My Policies</h3>

        {policies.length === 0 ? (
          <p className="no-policies">You have no active policies.</p>
        ) : (
          <table className="policy-table">
            <thead>
              <tr>
                <th>Policy Name</th>
                <th>Premium</th>
                <th>Status</th>
                <th>Renewal Date</th>
              </tr>
            </thead>
            <tbody>
              {policies.map((policy) => (
                <tr key={policy.id}>
                  <td>{policy.policyName}</td>
                  <td>{policy.premium}</td>
                  <td
                    className={`status ${
                      policy.status === "Active" ? "active" : "expired"
                    }`}
                  >
                    {policy.status}
                  </td>
                  <td>{policy.renewalDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="buy-policy-container">
        <button className="buy-policy-btn">Buy New Policy</button>
      </div>
    </div>
  );
}
