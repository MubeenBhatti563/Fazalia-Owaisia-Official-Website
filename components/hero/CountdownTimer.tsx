"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { EventItem } from "@/types";
import { Hourglass } from "lucide-react";

interface CountdownTimerProps {
  event: EventItem | null;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ event }) => {
  const { isUrdu, t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    if (!event || !event.targetDate) return;

    const target = new Date(event.targetDate).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [event]);

  if (!event) return null;

  const eventTitle = isUrdu ? event.title_ur : event.title_en;

  const timeUnits = [
    { label: t("days"), value: timeLeft.days },
    { label: t("hours"), value: timeLeft.hours },
    { label: t("minutes"), value: timeLeft.minutes },
    { label: t("seconds"), value: timeLeft.seconds },
  ];

  return (
    <div className="bg-navy-950/80 border border-gold-400/40 rounded-2xl p-5 sm:p-6 backdrop-blur-md shadow-2xl max-w-lg mt-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-gold-400/20 text-xs sm:text-sm">
        <div className="flex items-center gap-1.5 text-slate-300 font-medium">
          <Hourglass size={16} className="text-gold-400 animate-spin" style={{ animationDuration: "6s" }} />
          <span>{t("countdown_title")}</span>
        </div>
        <span className="font-bold text-gold-300 truncate max-w-[200px] sm:max-w-xs">
          {eventTitle}
        </span>
      </div>

      {/* Grid of 4 Timer Units */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
        {timeUnits.map((unit, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center p-2.5 sm:p-3 bg-navy-900/90 rounded-xl border border-gold-400/20 shadow-inner group hover:border-gold-400/50 transition-colors"
          >
            <span className="text-xl sm:text-2xl md:text-3xl font-black text-white font-mono tracking-tight group-hover:text-gold-300 transition-colors">
              {unit.value}
            </span>
            <span className="text-[11px] sm:text-xs font-semibold text-gold-400 mt-1 uppercase tracking-wider">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
