"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { SiteConfig } from "@/types";
import {
  FacebookIcon,
  YouTubeIcon,
  InstagramIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";

interface FooterProps {
  config: SiteConfig;
}

export const Footer: React.FC<FooterProps> = ({ config }) => {
  const { isUrdu, t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const brandName = isUrdu ? config.name_ur : config.name_en;
  const brandSuffix = isUrdu ? config.suffix_ur : config.suffix_en;
  const fullBrand = `${brandName} ${brandSuffix}`;

  const navLinks = [
    { href: "#about", label: t("nav_about") },
    { href: "#events", label: t("nav_events") },
    { href: "#gallery", label: t("nav_gallery") },
    { href: "#social", label: t("nav_social") },
    { href: "#committee", label: t("nav_committee") },
    { href: "#contact", label: t("nav_contact") },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com/fazaliaowaisiaofficial",
      icon: <FacebookIcon size={18} />,
      hoverClass: "hover:bg-[#1877f2]",
    },
    {
      name: "Instagram",
      href: "https://instagram.com/fazaliaowaisiaofficial",
      icon: <InstagramIcon size={18} />,
      hoverClass: "hover:bg-[#e1306c]",
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@fazaliaowaisiaofficial",
      icon: <YouTubeIcon size={18} />,
      hoverClass: "hover:bg-[#ff0000]",
    },
    {
      name: "TikTok",
      href: "https://tiktok.com/@fazaliaowaisiaofficial",
      icon: <TikTokIcon size={18} />,
      hoverClass: "hover:bg-black",
    },
    {
      name: "WhatsApp",
      href: `https://wa.me/${config.contact.whatsapp}`,
      icon: <WhatsAppIcon size={18} />,
      hoverClass: "hover:bg-[#25d366]",
    },
  ];

  return (
    <footer className="bg-navy-950 text-white border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-6 flex flex-col items-start text-start">
            <Link href="#top" className="flex items-center gap-3 mb-5 group">
              <div className="w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-gold-500 to-gold-300 shadow-md">
                <div className="w-full h-full rounded-full overflow-hidden bg-navy-950 flex items-center justify-center">
                  <Image
                    src={config.logo}
                    alt={fullBrand}
                    width={44}
                    height={44}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                <span className="text-xl font-black text-white group-hover:text-gold-300 transition-colors">
                  {brandName}
                </span>
                <span className="text-xs font-bold text-gold-400 uppercase px-1.5 py-0.5 rounded bg-gold-400/10 border border-gold-400/30">
                  {brandSuffix}
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              {t("footer_about")}
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 text-start">
            <h4 className="text-sm font-bold text-gold-400 uppercase tracking-wider mb-5">
              {t("footer_quick_links")}
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-300 hover:text-gold-300 text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links Column */}
          <div className="md:col-span-3 text-start">
            <h4 className="text-sm font-bold text-gold-400 uppercase tracking-wider mb-5">
              {t("footer_social_links")}
            </h4>
            <div className="flex items-center gap-2.5 flex-wrap">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className={`w-10 h-10 rounded-full bg-white/10 hover:text-white border border-white/15 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md ${s.hoverClass}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-start">
          <p>
            © {currentYear} <strong className="text-white">{fullBrand}</strong> —{" "}
            {t("footer_rights")}
          </p>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Official Village Community Portal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
