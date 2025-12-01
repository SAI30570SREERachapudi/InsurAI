
import React, { useEffect, useState } from "react";
import axios from "../services/axiosInstance";
import "./Profile.css";

export default function Profile() {
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

      // Pre-fill edit fields
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
      alert("Profile updated!");
      setEditOpen(false);
      loadProfile();
    } catch (e) {
      alert("Failed to update profile"+e.message);
    }
  };

  // ---------------- PASSWORD CHANGE ----------------
  const requestOtp = async () => {
    try {
      await axios.post("/auth/password/request-otp", { oldPassword });
      alert("OTP sent to your email!");
      setOtpSent(true);
    } catch (e) {
      alert(e.response?.data?.message || "Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      await axios.post("/auth/password/verify", { otp, newPassword });
      alert("Password updated successfully!");
      setPassOpen(false);
    } catch (e) {
      alert("OTP Verification failed"+e.message);
    }
  };

  if (loading) return <p className="profile-loading">Loading profile...</p>;
  if (!user) return <p className="profile-error">Unable to load profile</p>;

  return (
    <div className="profile-wrapper">
      <h2 className="profile-title">My Profile</h2>

      <div className="profile-card">
        <div className="profile-row">
          <span className="profile-label">Name</span>
          <span className="profile-value">{user.name}</span>
        </div>

        <div className="profile-row">
          <span className="profile-label">Email</span>
          <span className="profile-value">{user.email}</span>
        </div>

        <div className="profile-row">
          <span className="profile-label">Phone</span>
          <span className="profile-value">{user.phone || "Not Provided"}</span>
        </div>

        <div className="profile-row">
          <span className="profile-label">Address</span>
          <span className="profile-value">
            {user.address || "Not Provided"}
          </span>
        </div>

        <div className="profile-row">
          <span className="profile-label">Role</span>
          <span className="profile-role">{user.role.replace("ROLE_", "")}</span>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="profile-actions">
        <button
          className="profile-btn edit-btn"
          onClick={() => setEditOpen(true)}
        >
          ✏️ Edit Profile
        </button>

        <button
          className="profile-btn password-btn"
          onClick={() => setPassOpen(true)}
        >
          🔒 Change Password
        </button>
      </div>

      {/* ------------------ EDIT PROFILE POPUP ------------------ */}
      {editOpen && (
        <div className="modal-overlay" onClick={() => setEditOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Profile</h3>

            <input
              className="modal-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
            />

            <input
              className="modal-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
            />

            <input
              className="modal-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />

            <button className="modal-save-btn" onClick={updateProfile}>
              Save Changes
            </button>
            <button
              className="modal-close-btn"
              onClick={() => setEditOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ------------------ CHANGE PASSWORD POPUP ------------------ */}
      {passOpen && (
        <div className="modal-overlay" onClick={() => setPassOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>Change Password</h3>

            {!otpSent ? (
              <>
                <input
                  type="password"
                  className="modal-input"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter Old Password"
                />

                <button className="modal-save-btn" onClick={requestOtp}>
                  Send OTP
                </button>
              </>
            ) : (
              <>
                <input
                  className="modal-input"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                />

                <input
                  type="password"
                  className="modal-input"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter New Password"
                />

                <button className="modal-save-btn" onClick={verifyOtp}>
                  Verify & Change
                </button>
              </>
            )}

            <button
              className="modal-close-btn"
              onClick={() => setPassOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
