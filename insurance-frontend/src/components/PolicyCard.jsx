import { useTranslation } from "react-i18next";

function PolicyCard({ policy }) {
  const { t } = useTranslation();

  return (
    <div className="policy-card">
      <h3>{policy.policyName}</h3>
      <p>{t("type")}: {policy.type}</p>
      <p>{t("premium")}: ₹{policy.premiumAmount}</p>
      <p>{t("coverage")}: ₹{policy.coverageAmount}</p>
      <button>{t("view_details")}</button>
    </div>
  );
}
