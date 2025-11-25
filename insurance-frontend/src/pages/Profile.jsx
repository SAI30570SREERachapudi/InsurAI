import React, { useEffect, useState } from "react";
import axios from "../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadProfile = async () => {
    try {
      const res = await axios.get("/auth/me");
      setUser(res.data);
    } catch (err) {
      console.error("Failed to load user profile", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

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
          onClick={() => navigate("/profile/edit")}
        >
          ✏️ Edit Profile
        </button>

        <button
          className="profile-btn password-btn"
          onClick={() => navigate("/profile/change-password")}
        >
          🔒 Change Password
        </button>
      </div>
    </div>
  );
}
