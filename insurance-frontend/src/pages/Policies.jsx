import React, { useEffect, useState } from "react";
import axios from "../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import "./Policies.css";
import { useTranslation } from "react-i18next";

export default function Policies() {
  const { t } = useTranslation();

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

  const groupedPolicies = policies.reduce((group, policy) => {
    if (!group[policy.policyType]) group[policy.policyType] = [];
    group[policy.policyType].push(policy);
    return group;
  }, {});

  async function deletePolicy(id) {
    if (!window.confirm(t("confirm_delete"))) return;

    try {
      await axios.delete(`/policies/${id}`);
      alert(t("policy_deleted"));
      window.location.reload();
    } catch (err) {
      alert(t("delete_failed"));
    }
  }

  return (
    <div className="policy-container">
      <h2 className="policy-title">{t("available_policies")}</h2>

      {loading ? (
        <p>{t("loading")}</p>
      ) : (
        Object.keys(groupedPolicies).map((type) => (
          <div key={type} className="policy-section">
            <h3 className="policy-group-title">
              {type} {t("policies")}
            </h3>

            <div className="policy-grid">
              {groupedPolicies[type].map((p) => (
                <div key={p.id} className="policy-card-ultimate">

                  {/* ADMIN BUTTONS */}
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

                  {/* CUSTOMER BUY BUTTON */}
                  {role === "ROLE_CUSTOMER" && (
                    <div className="customer-actions">
                      <button
                        className="buy-btn"
                        onClick={() => navigate(`/policies/buy/${p.id}`)}
                      >
                        {t("buy_now")}
                      </button>
                    </div>
                  )}

                  {/* CARD CONTENT */}
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

      {/* MODAL */}
      {selectedPolicy && (
        <div className="modal-overlay" onClick={() => setSelectedPolicy(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedPolicy.policyName}</h2>

            <p><strong>{t("type")}:</strong> {selectedPolicy.policyType}</p>
            <p><strong>{t("premium")}:</strong> ₹{selectedPolicy.premium}</p>
            <p><strong>{t("coverage")}:</strong> ₹{selectedPolicy.coverageAmount}</p>
            <p><strong>{t("years")}:</strong> {selectedPolicy.termInYears}</p>

            <p className="modal-description">{selectedPolicy.description}</p>

            <button className="close-btn" onClick={() => setSelectedPolicy(null)}>
              {t("close")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
