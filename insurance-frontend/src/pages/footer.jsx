import { useTranslation } from "react-i18next";
import "./footer.css";
export default function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="gradient-footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>Insur<span>AI</span></h2>
          <p>{t("footer_brand_tagline")}</p>
        </div>

        <div className="footer-links">
          <div>
            <h4>{t("footer_company")}</h4>
            <a href="/policies">{t("footer_policies")}</a>
            <a href="/dashboard/customer">{t("footer_customer_portal")}</a>
            <a href="/dashboard/agent">{t("footer_agent_panel")}</a>
            <a href="/dashboard/admin">{t("footer_admin_dashboard")}</a>
          </div>

          <div>
            <h4>{t("footer_insurance")}</h4>
            <a>{t("footer_health_insurance")}</a>
            <a>{t("footer_life_insurance")}</a>
            <a>{t("footer_vehicle_insurance")}</a>
            <a>{t("footer_travel_insurance")}</a>
            <a>{t("footer_home_insurance")}</a>
          </div>

          <div>
            <h4>{t("footer_contact")}</h4>
            <a>{t("footer_email")}: support@insurai.com</a>
            <a>{t("footer_phone")}: +91 98765 43210</a>
            <a>{t("footer_location")}</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} InsurAI — {t("footer_bottom")}
      </div>
    </footer>
  );
}
