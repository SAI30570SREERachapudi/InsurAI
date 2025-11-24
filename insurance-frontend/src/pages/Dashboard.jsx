import React from "react";

export default function Dashboard() {
  return (
    <div className="container" style={{ paddingTop: 20 }}>
      <div className="card" style={{ overflow: "hidden" }}>
        <img
          src="/images/homepages.png"
          alt="Dashboard"
          style={{
            width: "100%",
            height: "90vh",
            // filter: "brightness(70%)", // reduces brightness
            display: "block",
          }}
        />
      </div>
    </div>
  );
}
