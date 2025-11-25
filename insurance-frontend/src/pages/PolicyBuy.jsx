import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../services/axiosInstance";
import "./Purchase.css";

export default function PolicyBuy() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);

  // customer info (prefill from backend)
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });

  // nominee fields
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
        alert("Failed to load policy or user info.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  // create purchase (dummy payment success)
  const submitPurchase = async () => {
    try {
      // Build purchase DTO (server expects PolicyPurchase-like payload)
      const dto = {
        nomineeName,
        nomineeRelation,
        nomineePhone,
        nomineeAge,
      };

      await axios.post(`/purchases/create/${id}`, dto);
      // navigate to a success page
      navigate("/purchase/success");
    } catch (err) {
      console.error(err);
      alert("Purchase failed. Try again.");
    }
  };

  if (loading) return <div className="purchase-loading">Loading...</div>;
  if (!policy) return <div className="purchase-error">Policy not found</div>;

  return (
    <div className="purchase-wrapper">
      <div className="purchase-card">
        <h2>Buy Policy — {policy.policyName}</h2>

        <div className="purchase-steps">
          <div className={`step ${step === 1 ? "active" : ""}`}>1. Summary</div>
          <div className={`step ${step === 2 ? "active" : ""}`}>2. Nominee</div>
          <div className={`step ${step === 3 ? "active" : ""}`}>3. Payment</div>
        </div>

        {step === 1 && (
          <div className="step-panel">
            <h3>Policy Summary</h3>
            <p><strong>Type:</strong> {policy.policyType}</p>
            <p><strong>Premium:</strong> ₹{policy.premium}</p>
            <p><strong>Coverage:</strong> ₹{policy.coverageAmount}</p>
            <p><strong>Term:</strong> {policy.termInYears} years</p>
            <p className="desc">{policy.description}</p>

            <h4>Your details</h4>
            <p>{customer.name} — {customer.email} {customer.phone && `• ${customer.phone}`}</p>

            <div className="purchase-actions">
              <button className="btn ghost" onClick={() => navigate("/policies")}>Cancel</button>
              <button className="btn primary" onClick={() => setStep(2)}>Next</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step-panel">
            <h3>Nominee Details</h3>

            <label>Nominee Name</label>
            <input value={nomineeName} onChange={(e) => setNomineeName(e.target.value)} />

            <label>Relationship</label>
            <input value={nomineeRelation} onChange={(e) => setNomineeRelation(e.target.value)} />

            <label>Nominee Phone</label>
            <input value={nomineePhone} onChange={(e) => setNomineePhone(e.target.value)} />

            <label>Nominee Age</label>
            <input type="number" value={nomineeAge} onChange={(e) => setNomineeAge(e.target.value)} />

            <div className="purchase-actions">
              <button className="btn ghost" onClick={() => setStep(1)}>Back</button>
              <button
                className="btn primary"
                onClick={() => {
                  if (!nomineeName || !nomineeRelation) {
                    alert("Please fill nominee name and relation.");
                    return;
                  }
                  setStep(3);
                }}
              >
                Next → Payment
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-panel">
            <h3>Payment (Dummy)</h3>
            <p>This is a demo payment flow. No real payment provider is used.</p>

            <div className="payment-summary">
              <div><strong>Policy:</strong> {policy.policyName}</div>
              <div><strong>Amount to pay:</strong> ₹{policy.premium}</div>
            </div>

            <div className="purchase-actions">
              <button className="btn ghost" onClick={() => setStep(2)}>Back</button>

              {/* Dummy "Pay" button */}
              <button
                className="btn primary"
                onClick={() => {
                  // simulate small delay then submit purchase
                  setTimeout(() => submitPurchase(), 500);
                }}
              >
                Pay ₹{policy.premium}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
