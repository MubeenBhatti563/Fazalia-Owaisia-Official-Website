"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SocialChannel } from "@/types";
import {
  FacebookIcon,
  YouTubeIcon,
  InstagramIcon,
  TikTokIcon,
  WhatsAppIcon,
  VerifiedCheckIcon,
} from "@/components/ui/Icons";
import { ExternalLink } from "lucide-react";

interface SocialCardProps {
  channel: SocialChannel;
}

export const SocialCard: React.FC<SocialCardProps> = ({ channel }) => {
  const { isUrdu, t } = useLanguage();

  const title = isUrdu ? channel.title_ur : channel.title_en;
  const desc = isUrdu ? channel.desc_ur : channel.desc_en;
  const btnText = isUrdu ? channel.btn_text_ur : channel.btn_text_en;
  const badgeText = isUrdu ? channel.followersBadge_ur : channel.followersBadge_en;

  const renderIcon = (id: string) => {
    switch (id) {
      case "facebook":
        return <FacebookIcon size={24} className="text-white" />;
      case "youtube":
        return <YouTubeIcon size={24} className="text-white" />;
      case "instagram":
        return <InstagramIcon size={24} className="text-white" />;
      case "tiktok":
        return <TikTokIcon size={24} className="text-white" />;
      case "whatsapp":
        return <WhatsAppIcon size={24} className="text-white" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative rounded-3xl overflow-hidden bg-navy-900 border border-gold-400/20 hover:border-gold-400 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col group text-start">
      {/* Top Accent Gradient Bar */}
      <div className="h-1.5 w-full" style={{ background: channel.gradient }} />

      <div className="p-6 sm:p-7 flex flex-col flex-1">
        {/* Card Header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            {/* Icon Wrapper */}
            <div
              className="w-13 h-13 p-3 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
              style={{ background: channel.gradient }}
            >
              {renderIcon(channel.id)}
            </div>

            {/* Platform & Handle */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-bold text-white">
                  {channel.name}
                </span>
                <span className="text-sky-400" title={t("verified_badge_tooltip")}>
                  <VerifiedCheckIcon size={16} />
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {channel.handle}
              </span>
            </div>
          </div>

          {/* Badge Pill */}
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-gold-300 border border-white/10 flex-shrink-0">
            {badgeText}
          </span>
        </div>

        {/* Card Body */}
        <div className="flex-1 mb-6">
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gold-300 transition-colors">
            {title}
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {desc}
          </p>
        </div>

        {/* Card Footer Button */}
        <a
          href={channel.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl text-white font-bold text-sm shadow-md transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5"
          style={{ background: channel.gradient }}
        >
          <span>{btnText}</span>
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
};
