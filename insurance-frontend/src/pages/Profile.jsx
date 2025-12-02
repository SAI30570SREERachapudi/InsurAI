import React, { useEffect, useState } from "react";
import axios from "../services/axiosInstance";
import "./Profile.css";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { t } = useTranslation();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // POPUPS
  const [editOpen, setEditOpen] = useState(false);
  const [passOpen, setPassOpen] = useState(false);

  // Edit Profile Fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Change Password States
  const [oldPassword, setOldPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const loadProfile = async () => {
    try {
      const res = await axios.get("/auth/me");
      setUser(res.data);

      setName(res.data.name);
      setPhone(res.data.phone || "");
      setAddress(res.data.address || "");
    } catch (err) {
      console.error("Failed to load user profile", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  // ---------------- EDIT PROFILE ----------------
  const updateProfile = async () => {
    try {
      await axios.put("/auth/update", { name, phone, address });
      alert(t("edit_profile_save_success"));
      setEditOpen(false);
      loadProfile();
    } catch (e) {
      alert(t("edit_profile_save_failed"));
    }
  };

  // ---------------- PASSWORD CHANGE ----------------
  const requestOtp = async () => {
    try {
      await axios.post("/auth/password/request-otp", { oldPassword });
      alert(t("otp_sent_message"));
      setOtpSent(true);
    } catch (e) {
      alert(t("otp_failed_message"));
    }
  };

  const verifyOtp = async () => {
    try {
      await axios.post("/auth/password/verify", { otp, newPassword });
      alert(t("password_change_success"));
      setPassOpen(false);
    } catch (e) {
      alert(t("password_change_failed"));
    }
  };

  if (loading) return <p className="profile-loading">{t("profile_loading")}</p>;
  if (!user) return <p className="profile-error">{t("profile_error")}</p>;

  return (
    <div className="profile-wrapper">
      <h2 className="profile-title">{t("profile_title")}</h2>

      <div className="profile-card">
        <div className="profile-row">
          <span className="profile-label">{t("profile_name")}</span>
          <span className="profile-value">{user.name}</span>
        </div>

        <div className="profile-row">
          <span className="profile-label">{t("profile_email")}</span>
          <span className="profile-value">{user.email}</span>
        </div>

        <div className="profile-row">
          <span className="profile-label">{t("profile_phone")}</span>
          <span className="profile-value">
            {user.phone || t("profile_not_provided")}
          </span>
        </div>

        <div className="profile-row">
          <span className="profile-label">{t("profile_address")}</span>
          <span className="profile-value">
            {user.address || t("profile_not_provided")}
          </span>
        </div>

        <div className="profile-row">
          <span className="profile-label">{t("profile_role")}</span>
          <span className="profile-role">{user.role.replace("ROLE_", "")}</span>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="profile-actions">
        <button className="profile-btn edit-btn" onClick={() => setEditOpen(true)}>
          {t("profile_edit_btn")}
        </button>

        <button className="profile-btn password-btn" onClick={() => setPassOpen(true)}>
          {t("profile_password_btn")}
        </button>
      </div>

      {/* EDIT PROFILE POPUP */}
      {editOpen && (
        <div className="modal-overlay" onClick={() => setEditOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>{t("edit_profile_title")}</h3>

            <input
              className="modal-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("edit_profile_name_placeholder")}
            />

            <input
              className="modal-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t("edit_profile_phone_placeholder")}
            />

            <input
              className="modal-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={t("edit_profile_address_placeholder")}
            />

            <button className="modal-save-btn" onClick={updateProfile}>
              {t("edit_profile_save")}
            </button>

            <button className="modal-close-btn" onClick={() => setEditOpen(false)}>
              {t("edit_profile_cancel")}
            </button>
          </div>
        </div>
      )}

      {/* CHANGE PASSWORD POPUP */}
      {passOpen && (
        <div className="modal-overlay" onClick={() => setPassOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>{t("password_change_title")}</h3>

            {!otpSent ? (
              <>
                <input
                  type="password"
                  className="modal-input"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder={t("password_old_placeholder")}
                />

                <button className="modal-save-btn" onClick={requestOtp}>
                  {t("password_send_otp")}
                </button>
              </>
            ) : (
              <>
                <input
                  className="modal-input"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder={t("password_enter_otp")}
                />

                <input
                  type="password"
                  className="modal-input"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder={t("password_new_placeholder")}
                />

                <button className="modal-save-btn" onClick={verifyOtp}>
                  {t("password_verify_change")}
                </button>
              </>
            )}

            <button className="modal-close-btn" onClick={() => setPassOpen(false)}>
              {t("password_cancel")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
