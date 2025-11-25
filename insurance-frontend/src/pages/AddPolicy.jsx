import React, { useEffect, useState } from "react";
import axios from "../services/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import "./AddPolicy.css";

export default function AddPolicy() {
  const navigate = useNavigate();
  const { id } = useParams(); // << detect edit mode

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
        alert("Policy updated successfully!");
      } else {
        await axios.post("/policies", policyData);
        alert("Policy added successfully!");
      }

      navigate("/policies");
    } catch (err) {
      alert("Failed: " + (err.response?.data?.message || ""));
    }
  }

  return (
    <div className="admin-container">
      <h2 className="admin-title">
        {isEdit ? "Edit Policy" : "Add New Policy"}
      </h2>

      <div className="admin-card glass-card">
        <form className="policy-form" onSubmit={handleSubmit}>
          <label>Policy Name</label>
          <input
            type="text"
            value={policyName}
            onChange={(e) => setPolicyName(e.target.value)}
            placeholder="Enter policy name"
          />

          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            placeholder="Enter policy description"
          />

          <label>Premium</label>
          <input
            type="number"
            value={premium}
            onChange={(e) => setPremium(e.target.value)}
            placeholder="Enter premium amount"
          />

          <label>Coverage Amount</label>
          <input
            type="number"
            value={coverageAmount}
            onChange={(e) => setCoverageAmount(e.target.value)}
            placeholder="Enter coverage amount"
          />

          <label>Term (Years)</label>
          <input
            type="number"
            value={termInYears}
            onChange={(e) => setTermInYears(e.target.value)}
            placeholder="Enter number of years"
          />

          <label>Policy Type</label>
          <select
            value={policyType}
            onChange={(e) => setPolicyType(e.target.value)}
          >
            <option value="">Select Policy Type</option>
            {policyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <button type="submit" className="approve-btn">
            {isEdit ? "Update Policy" : "Save Policy"}
          </button>
        </form>
      </div>
    </div>
  );
}
