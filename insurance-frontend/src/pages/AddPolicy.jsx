import React, { useEffect, useState } from "react";
import axios from "../services/axiosInstance";
import "./Dashboard/AdminDashboard.css";

export default function AddPolicy() {
  const [policyName, setPolicyName] = useState("");
  const [description, setDescription] = useState("");
  const [premium, setPremium] = useState("");
  const [coverageAmount, setCoverageAmount] = useState("");
  const [termInYears, setTermInYears] = useState("");
  const [policyType, setPolicyType] = useState("");

  const [policyTypes, setPolicyTypes] = useState([]);

  useEffect(() => {
    loadPolicyTypes();
  }, []);

  async function loadPolicyTypes() {
    try {
      const res = await axios.get("/policies/types");
      setPolicyTypes(res.data);
    } catch (err) {
      console.error("Error loading policy types", err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !policyName ||
      !description ||
      !premium ||
      !coverageAmount ||
      !termInYears ||
      !policyType
    ) {
      alert("Please fill all fields.");
      return;
    }

    const newPolicy = {
      policyName,
      description,
      premium,
      coverageAmount,
      termInYears,
      policyType,
      active: true,
    };

    try {
      await axios.post("/policies", newPolicy);
      alert("Policy added successfully!");

      // Clear form
      setPolicyName("");
      setDescription("");
      setPremium("");
      setCoverageAmount("");
      setTermInYears("");
      setPolicyType("");
    } catch (err) {
      alert("Failed to add policy: " + (err.response?.data?.message || ""));
    }
  }

  return (
    <div className="admin-container">
      <h2 className="admin-title">Add New Policy</h2>

      <div className="admin-card">
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
            placeholder="Enter policy description"
            rows="4"
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
            Save Policy
          </button>
        </form>
      </div>
    </div>
  );
}
