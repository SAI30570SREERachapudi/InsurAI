import React, { useEffect, useState } from "react";
import axios from "../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import "./Policies.css";

export default function Policies() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

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

  // Group policies by policyType
  const groupedPolicies = policies.reduce((group, policy) => {
    if (!group[policy.policyType]) {
      group[policy.policyType] = [];
    }
    group[policy.policyType].push(policy);
    return group;
  }, {});

  async function deletePolicy(id) {
    if (!window.confirm("Are you sure you want to delete this policy?")) return;

    try {
      await axios.delete(`/policies/${id}`);
      alert("Policy deleted.");
      window.location.reload();
    } catch (err) {
      alert("Delete failed!");
    }
  }

  return (
    <div className="policy-container">
      <h2 className="policy-title">Available Policies</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        Object.keys(groupedPolicies).map((type) => (
          <div key={type} className="policy-section">
            <h3 className="policy-group-title">{type} Policies</h3>

            <div className="policy-grid">
              {groupedPolicies[type].map((p) => (
                <div key={p.id} className="policy-card-ultimate">
                  
                  {/* Admin Buttons */}
                  {role === "ROLE_ADMIN" && (
                    <div className="admin-actions">
                      <span
                        className="edit-btn"
                        onClick={() => navigate(`/admin/policy/edit/${p.id}`)}
                      >
                        ✏️
                      </span>

                      <span
                        className="delete-btn"
                        onClick={() => deletePolicy(p.id)}
                      >
                        🗑️
                      </span>
                    </div>
                  )}

                  <div
                    className="policy-card-content"
                    onClick={() => setSelectedPolicy(p)}
                  >
                    <div className="pcard-icon">📄</div>
                    <h3>{p.policyName}</h3>
                  </div>

                </div>
              ))}
            </div>
          </div>
        ))
      )}

      {/* MODAL POPUP */}
      {selectedPolicy && (
        <div className="modal-overlay" onClick={() => setSelectedPolicy(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedPolicy.policyName}</h2>

            <p><strong>Type:</strong> {selectedPolicy.policyType}</p>
            <p><strong>Premium:</strong> ₹{selectedPolicy.premium}</p>
            <p><strong>Coverage:</strong> ₹{selectedPolicy.coverageAmount}</p>
            <p><strong>Years:</strong> {selectedPolicy.termInYears}</p>
            <p className="modal-description">{selectedPolicy.description}</p>

            <button className="close-btn" onClick={() => setSelectedPolicy(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
