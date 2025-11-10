import React, { useEffect, useState } from "react";
import axios from "../services/axiosInstance";

export default function Policies() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("/policies");
        setPolicies(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="container" style={{ paddingTop: 20 }}>
      <div className="card">
        <h2>Available Policies</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
              gap: 12,
            }}
          >
            {policies.map((p) => (
              <div
                key={p.id}
                style={{
                  border: "1px solid #e5e7eb",
                  padding: 12,
                  borderRadius: 8,
                }}
              >
                <h3 style={{ margin: "0 0 8px 0" }}>{p.policyName}</h3>
                <p>Type: {p.type}</p>
                <p>Premium: ₹{p.premiumAmount}</p>
                <p>Coverage: ₹{p.coverageAmount}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
