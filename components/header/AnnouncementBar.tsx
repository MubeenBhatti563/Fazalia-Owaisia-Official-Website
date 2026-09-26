"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Announcement } from "@/types";
import { Megaphone, X } from "lucide-react";

interface AnnouncementBarProps {
  announcement: Announcement;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ announcement }) => {
  const { isUrdu } = useLanguage();
  const [closed, setClosed] = useState(false);

  if (!announcement.enabled || closed) return null;

  const badgeText = isUrdu ? announcement.badge_ur : announcement.badge_en;
  const messageText = isUrdu ? announcement.text_ur : announcement.text_en;

  return (
    <aside
      className="relative z-50 bg-gradient-to-r from-red-700 via-red-600 to-red-800 text-white shadow-md border-b border-red-500/40"
      aria-label="Urgent Announcement"
    >
      <div className="max-w-7xl mx-auto px-4 py-2 sm:py-2.5 flex items-center justify-between gap-3 text-xs sm:text-sm">
        {/* Badge & Icon */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold px-2.5 py-0.5 rounded-full text-xs animate-pulse">
            <Megaphone size={14} className="text-gold-200" />
            <span>{badgeText}</span>
          </span>
        </div>

        {/* Marquee / Scroll Text */}
        <div className="flex-1 overflow-hidden font-medium text-center sm:text-start px-2">
          <p className="truncate sm:whitespace-normal line-clamp-1 sm:line-clamp-none">
            {messageText}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setClosed(true)}
          className="flex-shrink-0 text-white/80 hover:text-white hover:bg-white/20 p-1 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Close Announcement"
        >
          <X size={16} />
        </button>
      </div>
    </aside>
  );
};
