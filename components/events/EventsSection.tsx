"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EventCard } from "./EventCard";
import { EventModal } from "./EventModal";
import { EventItem, EventCategory } from "@/types";
import { cn } from "@/lib/utils";

interface EventsSectionProps {
  initialEvents: EventItem[];
}

export const EventsSection: React.FC<EventsSectionProps> = ({ initialEvents }) => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<EventCategory>("all");
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const categories: { id: EventCategory; label: string }[] = [
    { id: "all", label: t("filter_all") },
    { id: "spiritual", label: t("filter_spiritual") },
    { id: "welfare", label: t("filter_welfare") },
    { id: "community", label: t("filter_community") },
  ];

  const filteredEvents = initialEvents.filter((ev) => {
    if (activeCategory === "all") return true;
    return ev.category === activeCategory;
  });

  return (
    <section id="events" className="py-20 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag={t("events_tag")}
          title={t("events_title")}
          subtitle={t("events_subtitle")}
        />

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 shadow-sm",
                activeCategory === cat.id
                  ? "bg-navy-950 text-gold-300 border border-gold-400/80 shadow-md scale-105"
                  : "bg-white text-slate-700 hover:text-navy-950 hover:bg-slate-100 border border-slate-200"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200 max-w-md mx-auto">
            <p className="text-slate-500 font-medium">{t("empty_events_msg")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onOpenDetails={(ev) => setSelectedEvent(ev)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Event Details Modal */}
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </section>
  );
};
