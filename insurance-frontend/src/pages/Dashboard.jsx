import React from "react";

export default function Dashboard() {
  const role = localStorage.getItem("role");
  return (
    <div className="container" style={{ paddingTop: 20 }}>
      <div className="card">
        <h1>Welcome to your Dashboard</h1>
        <p>
          Your role: <strong>{role}</strong>
        </p>
        <p>From here you can navigate to policies and other modules.</p>
      </div>
    </div>
  );
}
