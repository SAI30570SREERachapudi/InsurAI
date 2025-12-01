import React, { useEffect, useState } from "react";
import axios from "../services/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./AddPolicy.css";

export default function AddPolicy() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();

  const [policyName, setPolicyName] = useState("");
  const [description, setDescription] = useState("");
  const [premium, setPremium] = useState("");
  const [coverageAmount, setCoverageAmount] = useState("");
  const [termInYears, setTermInYears] = useState("");
  const [policyType, setPolicyType] = useState("");

  const [policyTypes, setPolicyTypes] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    loadPolicyTypes();
    if (id) {
      setIsEdit(true);
      loadPolicyForEditing(id);
    }
  }, [id]);

  async function loadPolicyTypes() {
    try {
      const res = await axios.get("/policies/types");
      setPolicyTypes(res.data);
    } catch (err) {
      console.error("Error loading policy types", err);
    }
  }

  async function loadPolicyForEditing(policyId) {
    try {
      const res = await axios.get(`/policies/${policyId}`);
      const p = res.data;

      setPolicyName(p.policyName);
      setDescription(p.description);
      setPremium(p.premium);
      setCoverageAmount(p.coverageAmount);
      setTermInYears(p.termInYears);
      setPolicyType(p.policyType);
    } catch (err) {
      alert("Failed to load policy for editing.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const policyData = {
      policyName,
      description,
      premium,
      coverageAmount,
      termInYears,
      policyType,
      active: true,
    };

    try {
      if (isEdit) {
        await axios.put(`/policies/${id}`, policyData);
        alert(t("update_policy") + " ✔");
      } else {
        await axios.post("/policies", policyData);
        alert(t("save_policy") + " ✔");
      }

      navigate("/policies");
    } catch (err) {
      alert("Failed: " + (err.response?.data?.message || ""));
    }
  }

  return (
    <div className="admin-container">
      <h2 className="admin-title">
        {isEdit ? t("edit_policy") : t("add_new_policy")}
      </h2>

      <div className="admin-card glass-card">
        <form className="policy-form" onSubmit={handleSubmit}>
          
          <label>{t("policy_name")}</label>
          <input
            type="text"
            value={policyName}
            onChange={(e) => setPolicyName(e.target.value)}
            placeholder={t("enter_policy_name")}
          />

          <label>{t("description")}</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            placeholder={t("enter_description")}
          />

          <label>{t("premium")}</label>
          <input
            type="number"
            value={premium}
            onChange={(e) => setPremium(e.target.value)}
            placeholder={t("enter_premium")}
          />

          <label>{t("coverage_amount")}</label>
          <input
            type="number"
            value={coverageAmount}
            onChange={(e) => setCoverageAmount(e.target.value)}
            placeholder={t("enter_coverage_amount")}
          />

          <label>{t("term_years")}</label>
          <input
            type="number"
            value={termInYears}
            onChange={(e) => setTermInYears(e.target.value)}
            placeholder={t("enter_term_years")}
          />

          <label>{t("policy_type")}</label>
          <select
            value={policyType}
            onChange={(e) => setPolicyType(e.target.value)}
          >
            <option value="">{t("select_policy_type")}</option>
            {policyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <button type="submit" className="approve-btn">
            {isEdit ? t("update_policy") : t("save_policy")}
          </button>
        </form>
      </div>
    </div>
  );
}
