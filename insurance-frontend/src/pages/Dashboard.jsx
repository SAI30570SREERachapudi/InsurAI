import React from "react";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <div className="container" style={{ paddingTop: 20 }}>
      <h1 style={{ marginBottom: 20 }}>{t("dashboard_title")}</h1>

      <div className="card" style={{ overflow: "hidden" }}>
        <img
          src="/images/homepages.png"
          alt={t("dashboard_image_alt")}
          style={{
            width: "100%",
            height: "90vh",
            display: "block"
          }}
        />
      </div>
    </div>
  );
}
