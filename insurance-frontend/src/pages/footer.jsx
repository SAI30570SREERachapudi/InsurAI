import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="gradient-footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>Insur<span>AI</span></h2>
          <p>Modern, fast and smart insurance solutions.</p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Company</h4>
            <a href="/policies">Policies</a>
            <a href="/dashboard/customer">Customer Portal</a>
            <a href="/dashboard/agent">Agent Panel</a>
            <a href="/dashboard/admin">Admin Dashboard</a>
          </div>

          <div>
            <h4>Insurance</h4>
            <a>Health Insurance</a>
            <a>Life Insurance</a>
            <a>Vehicle Insurance</a>
            <a>Travel Insurance</a>
            <a>Home Insurance</a>
          </div>

          <div>
            <h4>Contact</h4>
            <a>Email: support@insurai.com</a>
            <a>Phone: +91 98765 43210</a>
            <a>Hyderabad, Telangana</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} InsurAI — Simplifying insurance through technology.
      </div>
    </footer>
  );
}
