"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
  isMobile?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = "",
  isMobile = false,
}) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={cn(
        "inline-flex items-center p-1 rounded-full bg-navy-950/60 border border-gold-400/40 backdrop-blur-md shadow-inner",
        className
      )}
      role="group"
      aria-label="Language Selector"
    >
      <button
        type="button"
        onClick={() => setLanguage("ur")}
        className={cn(
          "px-3.5 py-1 text-xs sm:text-sm font-bold rounded-full transition-all duration-200 select-none",
          language === "ur"
            ? "bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 shadow-md font-extrabold"
            : "text-slate-300 hover:text-white"
        )}
        aria-pressed={language === "ur"}
      >
        اردو
      </button>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={cn(
          "px-3.5 py-1 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 select-none",
          language === "en"
            ? "bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 shadow-md font-extrabold"
            : "text-slate-300 hover:text-white"
        )}
        aria-pressed={language === "en"}
      >
        English
      </button>
    </div>
  );
};
