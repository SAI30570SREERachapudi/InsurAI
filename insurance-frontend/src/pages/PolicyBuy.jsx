import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../services/axiosInstance";
import "./Purchase.css";
import { useTranslation } from "react-i18next";

export default function PolicyBuy() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);

  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });

  const [nomineeName, setNomineeName] = useState("");
  const [nomineeRelation, setNomineeRelation] = useState("");
  const [nomineePhone, setNomineePhone] = useState("");
  const [nomineeAge, setNomineeAge] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [pRes, meRes] = await Promise.all([
          axios.get(`/policies/${id}`),
          axios.get("/auth/me"),
        ]);

        setPolicy(pRes.data);
        setCustomer({
          name: meRes.data.name,
          email: meRes.data.email,
          phone: meRes.data.phone || "",
        });
      } catch (e) {
        console.error(e);
        alert(t("load_failed"));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, t]);

  const submitPurchase = async () => {
    try {
      const dto = {
        nomineeName,
        nomineeRelation,
        nomineePhone,
        nomineeAge,
      };

      await axios.post(`/purchases/create/${id}`, dto);
      navigate("/purchase/success");
    } catch (err) {
      console.error(err);
      alert(t("purchase_failed"));
    }
  };

  if (loading) return <div className="purchase-loading">{t("loading")}</div>;
  if (!policy)
    return <div className="purchase-error">{t("policy_not_found")}</div>;

  return (
    <div className="purchase-wrapper">
      <div className="purchase-card">
        <h2>
          {t("buy_policy")} — {policy.policyName}
        </h2>

        <div className="purchase-steps">
          <div className={`step ${step === 1 ? "active" : ""}`}>
            1. {t("summary")}
          </div>
          <div className={`step ${step === 2 ? "active" : ""}`}>
            2. {t("nominee")}
          </div>
          <div className={`step ${step === 3 ? "active" : ""}`}>
            3. {t("payment")}
          </div>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="step-panel">
            <h3>{t("policy_summary")}</h3>

            <p>
              <strong>{t("type")}:</strong> {policy.policyType}
            </p>
            <p>
              <strong>{t("premium")}:</strong> ₹{policy.premium}
            </p>
            <p>
              <strong>{t("coverage")}:</strong> ₹{policy.coverageAmount}
            </p>
            <p>
              <strong>{t("term")}:</strong> {policy.termInYears} {t("years")}
            </p>

            <p className="desc">{policy.description}</p>

            <h4>{t("your_details")}</h4>
            <p>
              {customer.name} — {customer.email}{" "}
              {customer.phone && `• ${customer.phone}`}
            </p>

            <div className="purchase-actions">
              <button className="btn ghost" onClick={() => navigate("/policies")}>
                {t("cancel")}
              </button>
              <button className="btn primary" onClick={() => setStep(2)}>
                {t("next")}
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="step-panel">
            <h3>{t("nominee_details")}</h3>

            <label>{t("nominee_name")}</label>
            <input
              value={nomineeName}
              onChange={(e) => setNomineeName(e.target.value)}
            />

            <label>{t("relationship")}</label>
            <input
              value={nomineeRelation}
              onChange={(e) => setNomineeRelation(e.target.value)}
            />

            <label>{t("nominee_phone")}</label>
            <input
              value={nomineePhone}
              onChange={(e) => setNomineePhone(e.target.value)}
            />

            <label>{t("nominee_age")}</label>
            <input
              type="number"
              value={nomineeAge}
              onChange={(e) => setNomineeAge(e.target.value)}
            />

            <div className="purchase-actions">
              <button className="btn ghost" onClick={() => setStep(1)}>
                {t("back")}
              </button>

              <button
                className="btn primary"
                onClick={() => {
                  if (!nomineeName || !nomineeRelation) {
                    alert(t("fill_nominee_warning"));
                    return;
                  }
                  setStep(3);
                }}
              >
                {t("next_payment")}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="step-panel">
            <h3>{t("payment_dummy")}</h3>
            <p>{t("payment_info")}</p>

            <div className="payment-summary">
              <div>
                <strong>{t("policy")}:</strong> {policy.policyName}
              </div>
              <div>
                <strong>{t("amount_to_pay")}:</strong> ₹{policy.premium}
              </div>
            </div>

            <div className="purchase-actions">
              <button className="btn ghost" onClick={() => setStep(2)}>
                {t("back")}
              </button>

              <button
                className="btn primary"
                onClick={() => {
                  setTimeout(() => submitPurchase(), 500);
                }}
              >
                {t("pay")} ₹{policy.premium}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
