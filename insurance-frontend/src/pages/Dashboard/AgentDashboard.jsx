import React, { useState, useEffect } from "react";
import "./AgentDashboard.css";

export default function AgentDashboard() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Static data for demo (replace with API call later)
    setApplications([
      {
        id: 101,
        customerName: "Aarav Mehta",
        policyType: "Health Insurance",
        status: "Pending",
      },
      {
        id: 102,
        customerName: "Neha Gupta",
        policyType: "Life Insurance",
        status: "Approved",
      },
      {
        id: 103,
        customerName: "Rahul Sharma",
        policyType: "Car Insurance",
        status: "Rejected",
      },
    ]);
  }, []);

  return (
    <div className="agent-dashboard">
      <h2 className="agent-title">Agent Dashboard</h2>
      <p className="agent-welcome">
        Welcome, <strong>Agent!</strong> Manage your customers and policy
        applications here.
      </p>

      <div className="applications-container">
        <h3 className="section-title">Customer Applications</h3>

        {applications.length === 0 ? (
          <p className="no-apps">No applications found.</p>
        ) : (
          <table className="applications-table">
            <thead>
              <tr>
                <th>Application ID</th>
                <th>Customer Name</th>
                <th>Policy Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id}>
                  <td>{app.id}</td>
                  <td>{app.customerName}</td>
                  <td>{app.policyType}</td>
                  <td
                    className={`status ${
                      app.status === "Approved"
                        ? "approved"
                        : app.status === "Rejected"
                        ? "rejected"
                        : "pending"
                    }`}
                  >
                    {app.status}
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
