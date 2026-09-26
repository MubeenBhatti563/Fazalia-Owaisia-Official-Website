"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Language } from "@/types";
import { translations } from "@/lib/data/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isUrdu: boolean;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "fazalia_lang";

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("ur");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language;
      if (saved === "ur" || saved === "en") {
        setLanguageState(saved);
      }
    } catch {
      // localStorage may fail in private browsing mode or restricted env
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const isRtl = language === "ur";
      document.documentElement.setAttribute("lang", language);
      document.documentElement.setAttribute("dir", isRtl ? "rtl" : "ltr");
    }
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // ignore
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    if (lang === "ur" || lang === "en") {
      setLanguageState(lang);
    }
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === "ur" ? "en" : "ur"));
  };

  const t = (key: string): string => {
    const dict = translations[language] || translations["ur"];
    return dict[key] || translations["ur"][key] || key;
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    isUrdu: language === "ur",
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      <div className={language === "ur" ? "font-urdu" : "font-poppins"}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
