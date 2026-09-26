"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { CountdownTimer } from "./CountdownTimer";
import { SiteConfig, EventItem } from "@/types";
import { MosqueIcon } from "@/components/ui/Icons";
import { Award, CalendarCheck, Share2, Images } from "lucide-react";

interface HeroProps {
  config: SiteConfig;
  featuredEvent: EventItem | null;
}

export const Hero: React.FC<HeroProps> = ({ config, featuredEvent }) => {
  const { isUrdu, t } = useLanguage();

  const brandTitle = isUrdu
    ? `${config.name_ur} ${config.suffix_ur}`
    : `${config.name_en} ${config.suffix_en}`;

  const tagline = isUrdu ? config.tagline_ur : config.tagline_en;
  const description = isUrdu ? config.heroDescription_ur : config.heroDescription_en;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="top"
      className="relative bg-gradient-navy-hero text-white overflow-hidden py-16 sm:py-20 lg:py-24 border-b-2 border-gold-400/40"
    >
      {/* Decorative Traditional Islamic Jali Pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none bg-repeat"
        style={{
          backgroundImage: "url('/images/pattern/jali-pattern.svg')",
          backgroundSize: "140px",
        }}
      />

      {/* Subtle Radial Glow in Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-navy-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Content & Countdown */}
          <div className="lg:col-span-7 flex flex-col items-start text-start">
            {/* Official Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/40 text-gold-300 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
              <Award size={16} className="text-gold-400" />
              <span>{t("hero_badge")}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight sm:leading-tight mb-4 drop-shadow-md">
              {brandTitle}
            </h1>

            {/* Tagline */}
            <p className="text-lg sm:text-xl font-bold text-gold-300 mb-4 leading-relaxed">
              {tagline}
            </p>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed">
              {description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-2">
              <button
                type="button"
                onClick={() => scrollTo("events")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-navy-950 font-bold text-sm sm:text-base shadow-gold hover:shadow-gold-glow hover:-translate-y-0.5 transition-all duration-200"
              >
                <CalendarCheck size={18} />
                <span>{t("hero_btn_explore")}</span>
              </button>

              <button
                type="button"
                onClick={() => scrollTo("social")}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-gold-400/80 text-white hover:text-gold-300 hover:bg-gold-400/10 font-semibold text-sm sm:text-base transition-all duration-200"
              >
                <Share2 size={18} className="text-gold-400" />
                <span>{t("hero_btn_social")}</span>
              </button>

              <button
                type="button"
                onClick={() => scrollTo("gallery")}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-gold-400/80 text-white hover:text-gold-300 hover:bg-gold-400/10 font-semibold text-sm sm:text-base transition-all duration-200"
              >
                <Images size={18} className="text-gold-400" />
                <span>{t("hero_btn_gallery")}</span>
              </button>
            </div>

            {/* Next Major Event Countdown Box */}
            <CountdownTimer event={featuredEvent} />
          </div>

          {/* Right Column: Visual Shrine Image Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-md lg:max-w-none">
              {/* Outer Golden Glow Border Frame */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-gold-400/60 shadow-2xl bg-navy-950 transition-all duration-300 group-hover:border-gold-400 group-hover:shadow-gold-glow">
                <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full">
                  <Image
                    src={config.heroImage}
                    alt={t("hero_img_badge")}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />
                </div>

                {/* Bottom Overlay Badge */}
                <div className="absolute bottom-4 inset-x-4 p-3.5 rounded-2xl bg-navy-950/85 backdrop-blur-md border border-gold-400/30 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold-400/20 border border-gold-400/50 flex items-center justify-center text-gold-300 flex-shrink-0">
                    <MosqueIcon size={22} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gold-400 uppercase tracking-wider">
                      {isUrdu ? "مرکزی مقام" : "Central Sanctuary"}
                    </span>
                    <span className="text-sm font-bold text-white">
                      {t("hero_img_badge")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
