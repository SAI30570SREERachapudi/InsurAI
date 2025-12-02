import React from "react";
import { useNavigate } from "react-router-dom";
import "./Purchase.css";
import { useTranslation } from "react-i18next";

export default function PurchaseSuccess() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="purchase-wrapper">
      <div className="purchase-card">
        <h2>{t("purchase_success_title")}</h2>

        <p>{t("purchase_success_message")}</p>

        <div className="purchase-actions">
          <button className="btn ghost" onClick={() => navigate("/policies")}>
            {t("back_to_policies")}
          </button>

          <button
            className="btn primary"
            onClick={() => navigate("/dashboard/customer")}
          >
            {t("go_to_my_policies")}
          </button>
        </div>
      </div>
    </div>
  );
}
