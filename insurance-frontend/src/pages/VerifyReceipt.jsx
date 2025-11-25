import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/axiosInstance";
import "./VerifyReceipt.css";

export default function VerifyReceipt() {
  const { id } = useParams();
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get(`/purchases/verify/${id}`);
        setInfo(res.data);
      } catch (e) {
        setErr("Unable to verify receipt");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <div className="vr-loading">Verifying...</div>;
  if (err) return <div className="vr-error">{err}</div>;
  if (!info) return <div className="vr-error">Receipt not found</div>;

  return (
    <div className="vr-page">
      <div className="vr-card">
        <h2>Receipt Verification</h2>
        <div className="vr-row">
          <strong>Receipt ID:</strong> {info.id}
        </div>
        <div className="vr-row">
          <strong>Policy:</strong> {info.policyName}
        </div>
        <div className="vr-row">
          <strong>Buyer:</strong> {info.buyerName}
        </div>
        <div className="vr-row">
          <strong>Purchase Date:</strong> {info.purchaseDate}
        </div>
        <div className={`vr-status ${info.status?.toLowerCase()}`}>
          {info.status}
        </div>

        <div className="vr-note">
          Verified via InsurAI — QR verification page.
        </div>
      </div>
    </div>
  );
}
