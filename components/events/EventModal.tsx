"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { EventItem } from "@/types";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { X, Calendar, Clock, MapPin, Mic } from "lucide-react";

interface EventModalProps {
  event: EventItem | null;
  onClose: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  const { isUrdu, t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (event) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [event, onClose]);

  if (!event) return null;

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 inset-inline-end-4 z-20 w-10 h-10 rounded-full bg-navy-950/70 hover:bg-navy-950 text-white flex items-center justify-center border border-white/20 transition-all hover:rotate-90"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Modal Hero Image */}
        <div className="relative w-full h-64 sm:h-72 flex-shrink-0 bg-navy-950">
          <Image
            src={event.image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 680px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />
          <div className="absolute bottom-4 inset-x-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-gold-400 text-navy-950 shadow-md">
              {category}
            </span>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 text-start">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 mb-4 leading-snug">
            {title}
          </h2>

          {/* Details list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-sm">
            <div className="flex items-center gap-2.5 text-slate-700">
              <Calendar size={17} className="text-gold-600 flex-shrink-0" />
              <span>
                <strong>{t("event_date_label")}</strong> {dateDisplay}
              </span>
            </div>

            <div className="flex items-center gap-2.5 text-slate-700">
              <Clock size={17} className="text-gold-600 flex-shrink-0" />
              <span>
                <strong>{t("event_time_label")}</strong> {timeDisplay}
              </span>
            </div>

            <div className="flex items-center gap-2.5 text-slate-700 sm:col-span-2">
              <MapPin size={17} className="text-gold-600 flex-shrink-0" />
              <span>
                <strong>{t("event_venue_label")}</strong> {location}
              </span>
            </div>

            {speaker && (
              <div className="flex items-center gap-2.5 text-slate-700 sm:col-span-2">
                <Mic size={17} className="text-gold-600 flex-shrink-0" />
                <span>
                  <strong>{t("event_speaker_label")}</strong> {speaker}
                </span>
              </div>
            )}
          </div>

          {/* Full description */}
          <div className="text-slate-600 text-base leading-relaxed mb-8 space-y-3">
            <p>{desc}</p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <a
              href={waShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-whatsapp hover:bg-whatsapp-dark text-white font-bold text-sm shadow-md transition-all hover:-translate-y-0.5"
            >
              <WhatsAppIcon size={18} />
              <span>{t("event_modal_share_btn")}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
