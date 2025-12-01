import React, { useState } from "react";
import axios from "../services/axiosInstance";
import "./Form.css";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/auth/login", { email, password });
      if (res.data.token) localStorage.setItem("token", res.data.token);
      if (res.data.role) localStorage.setItem("role", res.data.role);
      const role = res.data.role;

      if (role === "ROLE_ADMIN") window.location.href = "/dashboard/admin";
      else if (role === "ROLE_AGENT") window.location.href = "/dashboard/agent";
      else window.location.href = "/dashboard/customer";

    } catch (err) {
      alert(err.response?.data?.message || t("login_failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">{t("login_title")} </h2>
        <p className="login-subtitle">{t("login_subtitle")}</p>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            required
            type="email"
            placeholder={t("email_placeholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />

          <input
            required
            type="password"
            placeholder={t("password_placeholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? t("login_loading") : t("login_button")}
          </button>
        </form>
      </div>
    </div>
  );
}
