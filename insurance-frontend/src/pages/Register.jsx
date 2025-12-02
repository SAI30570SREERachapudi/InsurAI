import React, { useState } from "react";
import axios from "../services/axiosInstance";
import "./Form.css";
import { useTranslation } from "react-i18next";

export default function Register() {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("ROLE_CUSTOMER");
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append(
        "user",
        new Blob(
          [
            JSON.stringify({
              name,
              email,
              password,
              phone,
              address,
              role,
            }),
          ],
          { type: "application/json" }
        )
      );

      if (role === "ROLE_AGENT" && document) {
        formData.append("document", document);
      }

      await axios.post("/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(t("register_success"));
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.message || t("register_failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">{t("register_title")}</h2>
        <p className="register-subtitle">{t("register_subtitle")}</p>

        <form onSubmit={handleSubmit} className="register-form">
          <input
            required
            placeholder={t("full_name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="register-input"
          />

          <input
            required
            placeholder={t("email_address")}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="register-input"
          />

          <input
            required
            placeholder={t("password")}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-input"
          />

          <input
            required
            placeholder={t("phone_number")}
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="register-input"
          />

          <textarea
            required
            placeholder={t("address")}
            rows="3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="register-textarea"
          ></textarea>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="register-select"
          >
            <option value="ROLE_CUSTOMER">{t("role_customer")}</option>
            <option value="ROLE_AGENT">{t("role_agent")}</option>
          </select>

          {role === "ROLE_AGENT" && (
            <div className="file-upload">
              <label className="file-label">{t("upload_document")}</label>
              <input
                type="file"
                accept="image/*, .pdf"
                onChange={(e) => setDocument(e.target.files[0])}
                className="file-input"
              />
            </div>
          )}

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? t("submitting") : t("register_button")}
          </button>
        </form>
      </div>
    </div>
  );
}
