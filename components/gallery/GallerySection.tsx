"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GalleryCard } from "./GalleryCard";
import { GalleryAlbum, GalleryCategory } from "@/types";
import { Images, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface GallerySectionProps {
  initialAlbums: GalleryAlbum[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ initialAlbums }) => {
  const { isUrdu, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");

  const filters: { id: GalleryCategory; label: string }[] = [
    { id: "all", label: t("gallery_filter_all") },
    { id: "astana", label: t("gallery_filter_astana") },
    { id: "milad", label: t("gallery_filter_milad") },
    { id: "lectures", label: t("gallery_filter_lectures") },
    { id: "urs", label: t("gallery_filter_urs") },
    { id: "community", label: t("gallery_filter_community") },
    { id: "langar", label: t("gallery_filter_langar") },
  ];

  const filteredAlbums = initialAlbums.filter((album) => {
    if (activeCategory === "all") return true;
    return album.albumId === activeCategory;
  });

  return (
    <section id="gallery" className="py-20 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag={t("gallery_tag")}
          title={t("gallery_title")}
          subtitle={t("gallery_subtitle")}
        />

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveCategory(filter.id)}
              className={cn(
                "px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 shadow-sm",
                activeCategory === filter.id
                  ? "bg-navy-950 text-gold-300 border border-gold-400/80 shadow-md scale-105"
                  : "bg-slate-50 text-slate-700 hover:text-navy-950 hover:bg-slate-100 border border-slate-200"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Albums Grid — Clicking any album routes directly to /gallery?album=[id] */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredAlbums.map((album) => (
            <GalleryCard key={album.id} album={album} />
          ))}
        </div>

        {/* View All Gallery Hub CTA */}
        <div className="text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-navy-950 hover:bg-navy-900 text-gold-300 hover:text-gold-200 font-extrabold text-sm sm:text-base border border-gold-400/60 shadow-lg hover:shadow-gold-glow transition-all duration-300 hover:-translate-y-0.5"
          >
            <Images size={20} className="text-gold-400" />
            <span>{isUrdu ? "مکمل تصویری گیلری پورٹل کھولیں" : "Open Full Photo Gallery Portal"}</span>
            {isUrdu ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
          </Link>
        </div>
      </div>
    </section>
  );
};
