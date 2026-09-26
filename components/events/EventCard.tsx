"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { EventItem } from "@/types";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Calendar, Clock, MapPin, Mic, Info, Star } from "lucide-react";

interface EventCardProps {
  event: EventItem;
  onOpenDetails: (event: EventItem) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onOpenDetails }) => {
  const { isUrdu, t } = useLanguage();

  const title = isUrdu ? event.title_ur : event.title_en;
  const category = isUrdu ? event.category_ur : event.category_en;
  const dateDisplay = isUrdu ? event.dateDisplay_ur : event.dateDisplay_en;
  const timeDisplay = isUrdu ? event.time_ur : event.time_en;
  const location = isUrdu ? event.location_ur : event.location_en;
  const speaker = isUrdu ? event.speaker_ur : event.speaker_en;
  const desc = isUrdu ? event.description_ur : event.description_en;

  const shareHeader = isUrdu
    ? "فضلیہ اویسیہ آفیشل پروگرام کی دعوت"
    : "Invitation to Fazalia Owaisia Village Event";
  const shareText = `*${shareHeader}*\n\n📌 *${title}*\n🗓️ ${dateDisplay}\n⏰ ${timeDisplay}\n🕌 ${location}\n\n${desc}\n\nمزید تفصیلات: فضلیہ اویسیہ آفیشل`;
  const waShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  return (
    <article className="group relative rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl hover:border-gold-400 transition-all duration-300 flex flex-col h-full text-start">
      {/* Poster Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-950">
        <Image
          src={event.image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Category Pill */}
        <span className="absolute top-4 inset-inline-start-4 px-3.5 py-1 rounded-full text-xs font-bold bg-navy-950/80 backdrop-blur-md border border-gold-400/50 text-gold-300 shadow-md">
          {category}
        </span>

        {/* Featured Badge */}
        {event.isFeatured && (
          <span className="absolute top-4 inset-inline-end-4 px-3 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 shadow-md flex items-center gap-1">
            <Star size={13} className="fill-navy-950" />
            <span>{t("featured_event_badge")}</span>
          </span>
        )}
      </div>

      {/* Event Content Body */}
      <div className="p-6 sm:p-7 flex flex-col flex-1">
        {/* Date Row */}
        <div className="flex items-center gap-2 text-gold-600 font-bold text-xs sm:text-sm mb-3">
          <Calendar size={16} />
          <span>{dateDisplay}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-navy-950 mb-4 group-hover:text-navy-800 transition-colors line-clamp-2 leading-snug">
          {title}
        </h3>

        {/* Metadata Details */}
        <div className="space-y-2 mb-5 text-xs sm:text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Clock size={15} className="text-gold-500 flex-shrink-0" />
            <span>
              <strong className="text-slate-900">{t("event_time_label")}</strong> {timeDisplay}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={15} className="text-gold-500 flex-shrink-0" />
            <span className="truncate">
              <strong className="text-slate-900">{t("event_venue_label")}</strong> {location}
            </span>
          </div>

          {speaker && (
            <div className="flex items-center gap-2">
              <Mic size={15} className="text-gold-500 flex-shrink-0" />
              <span className="truncate">
                <strong className="text-slate-900">{t("event_speaker_label")}</strong> {speaker}
              </span>
            </div>
          )}
        </div>

        {/* Description snippet */}
        <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 mb-6 leading-relaxed flex-1">
          {desc}
        </p>

        {/* Card Footer Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
          <a
            href={waShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-whatsapp/10 hover:bg-whatsapp text-whatsapp hover:text-white font-semibold text-xs sm:text-sm transition-all duration-200"
            title={t("btn_share_whatsapp")}
          >
            <WhatsAppIcon size={16} />
            <span>{t("btn_share_whatsapp")}</span>
          </a>

          <button
            type="button"
            onClick={() => onOpenDetails(event)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs sm:text-sm border border-gold-400/40 hover:border-gold-400 transition-all duration-200"
          >
            <Info size={15} className="text-gold-400" />
            <span>{t("btn_details")}</span>
          </button>
        </div>
      </div>
    </article>
  );
};
