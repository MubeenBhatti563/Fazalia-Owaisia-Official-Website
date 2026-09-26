"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MosqueIcon } from "@/components/ui/Icons";
import { HeartHandshake, Radio } from "lucide-react";

export const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      id: "spiritual",
      icon: <MosqueIcon size={28} className="text-gold-500" />,
      title: t("feature_1_title"),
      desc: t("feature_1_desc"),
    },
    {
      id: "welfare",
      icon: <HeartHandshake size={28} className="text-gold-500" />,
      title: t("feature_2_title"),
      desc: t("feature_2_desc"),
    },
    {
      id: "media",
      icon: <Radio size={28} className="text-gold-500" />,
      title: t("feature_3_title"),
      desc: t("feature_3_desc"),
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag={t("about_tag")}
          title={t("about_title")}
          subtitle={t("about_desc")}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group relative p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-gold-400 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col items-start text-start"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-2xl bg-gold-400/10 border border-gold-400/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-navy-950 transition-all duration-300 shadow-sm">
                <div className="group-hover:text-navy-950 transition-colors">
                  {feature.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-navy-950 mb-3 group-hover:text-navy-800 transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
