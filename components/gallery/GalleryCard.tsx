"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { GalleryAlbum } from "@/types";
import { Images, Maximize2 } from "lucide-react";

interface GalleryCardProps {
  album: GalleryAlbum;
  onOpen?: (album: GalleryAlbum) => void;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({ album }) => {
  const { isUrdu, t } = useLanguage();

  const title = isUrdu ? album.title_ur : album.title_en;
  const tag = isUrdu ? album.category_ur : album.category_en;
  const albumTitle = isUrdu ? album.albumTitle_ur : album.albumTitle_en;
  const count = (album.relatedImages && album.relatedImages.length) || 1;

  return (
    <Link
      href={`/gallery?album=${album.id}`}
      aria-label={title}
      className="group relative rounded-3xl overflow-hidden cursor-pointer bg-navy-950 border border-slate-200 hover:border-gold-400 shadow-sm hover:shadow-2xl transition-all duration-300 aspect-[4/3] flex flex-col justify-end text-start focus:outline-none focus:ring-2 focus:ring-gold-400 block"
    >
      {/* Background Image */}
      <Image
        src={album.image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover group-hover:scale-105 transition-transform duration-700"
        loading="lazy"
      />

      {/* Dark Ambient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent group-hover:via-navy-950/50 transition-all duration-300" />

      {/* Top Badges */}
      <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none z-10">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-gold-400 text-navy-950 shadow-md">
          {tag}
        </span>

        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-navy-950/80 backdrop-blur-md border border-gold-400/40 text-gold-300 shadow-md">
          <Images size={13} />
          <span>
            {count} {t("gallery_photo_count")}
          </span>
        </span>
      </div>

      {/* Bottom Information */}
      <div className="relative z-10 p-6 flex flex-col items-start">
        <span className="text-xs font-bold text-gold-400 uppercase tracking-wider mb-1">
          {albumTitle}
        </span>
        <h4 className="text-base sm:text-lg font-bold text-white mb-4 line-clamp-2 group-hover:text-gold-300 transition-colors">
          {title}
        </h4>

        {/* CTA Button */}
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 group-hover:bg-gold-500 text-white group-hover:text-navy-950 font-semibold text-xs sm:text-sm border border-white/20 group-hover:border-gold-500 shadow-md transition-all duration-300">
          <Maximize2 size={14} />
          <span>{t("gallery_click_to_view")}</span>
        </span>
      </div>
    </Link>
  );
};
