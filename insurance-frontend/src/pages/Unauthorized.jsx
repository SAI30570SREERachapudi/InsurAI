import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Unauthorized() {
  const nav = useNavigate();
  const { t } = useTranslation();

  const role = localStorage.getItem("role");

  const goBack = () => {
    if (role === "ROLE_ADMIN") nav("/dashboard/admin");
    else if (role === "ROLE_AGENT") nav("/dashboard/agent");
    else if (role === "ROLE_CUSTOMER") nav("/dashboard/customer");
    else nav("/login");
  };

  return (
    <div
      style={{
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>🚫 {t("unauthorized_title")}</h1>
      <p>{t("unauthorized_message")}</p>

      <button
        onClick={goBack}
        style={{
          padding: "8px 14px",
          background: "#1e3a8a",
          color: "#fff",
          border: "none",
          borderRadius: 6,
        }}
      >
        {t("go_back")}
      </button>
    </div>
  );
}
