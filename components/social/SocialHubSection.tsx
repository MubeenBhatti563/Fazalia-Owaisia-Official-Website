"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SocialCard } from "./SocialCard";
import { SocialChannel } from "@/types";

interface SocialHubSectionProps {
  channels: SocialChannel[];
}

export const SocialHubSection: React.FC<SocialHubSectionProps> = ({ channels }) => {
  const { t } = useLanguage();

  return (
    <section id="social" className="relative overflow-hidden py-20 sm:py-24 bg-navy-950 border-b border-navy-800 text-white">
      {/* Background glow accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-navy-700/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          tag={t("social_tag")}
          title={t("social_title")}
          subtitle={t("social_subtitle")}
          isDark
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {channels.map((channel) => (
            <SocialCard key={channel.id} channel={channel} />
          ))}
        </div>
      </div>
    </section>
  );
};
