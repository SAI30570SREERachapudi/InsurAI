import React, { useEffect, useState } from "react";
import "./CustomerDashboard.css";
import { useTranslation } from "react-i18next";

export default function CustomerDashboard() {
  const { t } = useTranslation();
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    setPolicies([
      {
        id: 1,
        policyName: "Health Protect Plan",
        premium: "₹12,000 / year",
        status: "Active",
        renewalDate: "2026-02-14"
      },
      {
        id: 2,
        policyName: "Life Secure Plus",
        premium: "₹18,500 / year",
        status: "Expired",
        renewalDate: "2024-12-20"
      },
      {
        id: 3,
        policyName: "Car Shield Basic",
        premium: "₹9,800 / year",
        status: "Active",
        renewalDate: "2026-06-10"
      }
    ]);
  }, []);

  return (
    <div className="customer-dashboard">
      <h2 className="customer-title">{t("customer_dashboard")}</h2>
      <p className="customer-subtitle">{t("customer_dashboard_subtitle")}</p>

      <div className="policy-section">
        <h3 className="section-heading">{t("my_policies")}</h3>

        {policies.length === 0 ? (
          <p className="no-policies">{t("no_policies")}</p>
        ) : (
          <table className="policy-table">
            <thead>
              <tr>
                <th>{t("policy_name")}</th>
                <th>{t("premium")}</th>
                <th>{t("status")}</th>
                <th>{t("renewal_date")}</th>
              </tr>
            </thead>

            <tbody>
              {policies.map((p) => (
                <tr key={p.id}>
                  <td>{p.policyName}</td>
                  <td>{p.premium}</td>
                  <td
                    className={`status ${
                      p.status === "Active" ? "active" : "expired"
                    }`}
                  >
                    {t(p.status.toLowerCase())}
                  </td>
                  <td>{p.renewalDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="buy-policy-container">
        <button className="buy-policy-btn">{t("buy_new_policy")}</button>
      </div>
    </div>
  );
}
