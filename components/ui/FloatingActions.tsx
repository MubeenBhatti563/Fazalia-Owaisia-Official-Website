"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { WhatsAppIcon } from "./Icons";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingActionsProps {
  whatsappNumber: string;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ whatsappNumber }) => {
  const { isUrdu, t } = useLanguage();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 350);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prefilledMessage = isUrdu
    ? "السلام علیکم! مجھے فضلیہ اویسیہ پورٹل و پروگرامز کے حوالے سے معلومات درکار ہیں۔"
    : "Hello! I need information regarding Fazalia Owaisia events.";

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(prefilledMessage)}`;

  return (
    <>
      {/* Floating WhatsApp Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 inline-flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-full bg-whatsapp hover:bg-whatsapp-dark text-white font-bold text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
        aria-label="WhatsApp Contact"
      >
        <WhatsAppIcon size={22} className="group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline">{t("whatsapp_float_text")}</span>
      </a>

      {/* Back to Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-6 right-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-navy-900/90 hover:bg-gold-500 text-gold-400 hover:text-navy-950 border border-gold-400/50 flex items-center justify-center shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400",
          showBackToTop
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 translate-y-4 invisible pointer-events-none"
        )}
        aria-label={t("back_to_top")}
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
};
