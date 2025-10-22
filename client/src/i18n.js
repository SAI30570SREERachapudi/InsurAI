import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./locales/en/translation.json";
import translationTE from "./locales/te/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },
  te: {
    translation: translationTE,
  },
};

i18n
  .use(LanguageDetector) // optional: auto-detect from browser/localStorage
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("lang") || "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
