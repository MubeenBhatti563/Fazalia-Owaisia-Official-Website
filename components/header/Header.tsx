"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SiteConfig } from "@/types";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  config: SiteConfig;
}

export const Header: React.FC<HeaderProps> = ({ config }) => {
  const { isUrdu, t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      if (pathname === "/") {
        const sections = ["top", "about", "events", "gallery", "social", "committee", "contact"];
        const scrollPosition = window.scrollY + 120;

        for (const sectionId of sections) {
          const el = document.getElementById(sectionId);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      } else if (pathname.startsWith("/gallery")) {
        setActiveSection("gallery");
      } else if (pathname.startsWith("/events")) {
        setActiveSection("events");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const navItems = [
    { id: "top", label: t("nav_home"), href: "/#top" },
    { id: "about", label: t("nav_about"), href: "/#about" },
    { id: "events", label: t("nav_events"), href: "/#events" },
    { id: "gallery", label: t("nav_gallery"), href: "/gallery" },
    { id: "social", label: t("nav_social"), href: "/#social" },
    { id: "committee", label: t("nav_committee"), href: "/#committee" },
    { id: "contact", label: t("nav_contact"), href: "/#contact" },
  ];

  const brandName = isUrdu ? config.name_ur : config.name_en;
  const brandSuffix = isUrdu ? config.suffix_ur : config.suffix_en;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: { id: string; href: string }) => {
    setMobileMenuOpen(false);

    if (item.id === "gallery") {
      // If already on /gallery, scroll to top
      if (pathname.startsWith("/gallery")) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    if (pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(item.id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300 w-full",
        scrolled
          ? "bg-navy-950/95 backdrop-blur-md shadow-lg border-b border-gold-400/20 py-2.5"
          : "bg-navy-900/90 backdrop-blur-sm border-b border-navy-800 py-3.5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand: Strictly One Line Title */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none"
          aria-label={isUrdu ? config.brandFull_ur : config.brandFull_en}
        >
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full p-0.5 bg-gradient-to-tr from-gold-500 to-gold-300 shadow-md group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full rounded-full overflow-hidden bg-navy-950 flex items-center justify-center">
              <Image
                src={config.logo}
                alt="Fazalia Owaisia Logo"
                width={44}
                height={44}
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </div>

          <div className="flex items-baseline gap-1.5 whitespace-nowrap">
            <span className="text-lg sm:text-xl md:text-2xl font-black text-white group-hover:text-gold-300 transition-colors tracking-tight">
              {brandName}
            </span>
            <span className="text-xs sm:text-sm font-bold text-gold-400 tracking-wide uppercase px-1.5 py-0.5 rounded bg-gold-400/10 border border-gold-400/30">
              {brandSuffix}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={(e) => handleNavClick(e, item)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200",
                activeSection === item.id
                  ? "bg-gold-500/20 text-gold-300 border border-gold-400/40 shadow-sm"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions: Desktop Language Switcher & Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy-950/98 backdrop-blur-xl border-b border-gold-400/30 px-5 pt-4 pb-6 transition-all duration-300 shadow-2xl animate-in slide-in-from-top-2">
          <div className="flex justify-center mb-5 pb-4 border-b border-white/10">
            <LanguageSwitcher className="scale-105" />
          </div>

          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={cn(
                  "px-4 py-2.5 rounded-xl text-base font-semibold transition-all flex items-center justify-between",
                  activeSection === item.id
                    ? "bg-gold-500/20 text-gold-300 border border-gold-400/30"
                    : "text-slate-200 hover:bg-white/5 hover:text-white"
                )}
              >
                <span>{item.label}</span>
                {activeSection === item.id && (
                  <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                )}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
