import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/axiosInstance";
import "./VerifyReceipt.css";
import { useTranslation } from "react-i18next";

export default function VerifyReceipt() {
  const { id } = useParams();
  const { t } = useTranslation();

  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get(`/purchases/verify/${id}`);
        setInfo(res.data);
      } catch (e) {
        setErr(t("verify_error"));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, t]);

  if (loading) return <div className="vr-loading">{t("verifying")}</div>;
  if (err) return <div className="vr-error">{err}</div>;
  if (!info) return <div className="vr-error">{t("receipt_not_found")}</div>;

  return (
    <div className="vr-page">
      <div className="vr-card">
        <h2>{t("receipt_verification")}</h2>

        <div className="vr-row">
          <strong>{t("receipt_id")}:</strong> {info.id}
        </div>

        <div className="vr-row">
          <strong>{t("policy")}:</strong> {info.policyName}
        </div>

        <div className="vr-row">
          <strong>{t("buyer")}:</strong> {info.buyerName}
        </div>

        <div className="vr-row">
          <strong>{t("purchase_date")}:</strong> {info.purchaseDate}
        </div>

        <div className={`vr-status ${info.status?.toLowerCase()}`}>
          {info.status}
        </div>

        <div className="vr-note">{t("verified_note")}</div>
      </div>
    </div>
  );
}
