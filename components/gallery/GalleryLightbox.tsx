"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { GalleryAlbum, RelatedGalleryImage } from "@/types";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { X, ChevronLeft, ChevronRight, Images, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface GalleryLightboxProps {
  activeAlbum: GalleryAlbum | null;
  allAlbums: GalleryAlbum[];
  onClose: () => void;
  onSelectAlbum: (album: GalleryAlbum) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  activeAlbum,
  allAlbums,
  onClose,
  onSelectAlbum,
}) => {
  const { isUrdu, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  // When active album changes, reset index to 0
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeAlbum]);

  const relatedList: RelatedGalleryImage[] = activeAlbum
    ? activeAlbum.relatedImages && activeAlbum.relatedImages.length > 0
      ? activeAlbum.relatedImages
      : [{ src: activeAlbum.image, title_ur: activeAlbum.title_ur, title_en: activeAlbum.title_en }]
    : [];

  const total = relatedList.length;
  const currentPhoto = relatedList[currentIndex] || relatedList[0];

  const stepImage = (delta: number) => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev + delta + total) % total);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        stepImage(isUrdu ? 1 : -1);
      } else if (e.key === "ArrowRight") {
        stepImage(isUrdu ? -1 : 1);
      }
    };

    if (activeAlbum) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeAlbum, isUrdu, total]);

  if (!activeAlbum || !currentPhoto) return null;

  const albumTitle = isUrdu ? activeAlbum.albumTitle_ur : activeAlbum.albumTitle_en;
  const photoTitle = isUrdu ? currentPhoto.title_ur : currentPhoto.title_en;
  const photoDesc = isUrdu ? activeAlbum.description_ur : activeAlbum.description_en;

  const shareText = `*${albumTitle} — فضلیہ اویسیہ آفیشل تصویری گیلری*\n\n📸 ${photoTitle}\n\nمزید تصاویر دیکھیں: فضلیہ اویسیہ آفیشل پورٹل`;
  const waShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-navy-950/90 backdrop-blur-xl animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-navy-900 border border-gold-400/50 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[94vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-5 sm:px-6 py-3.5 bg-navy-950/95 border-b border-gold-400/20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 shadow-sm">
              {albumTitle}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-gold-300">
              {t("image_of")} {currentIndex + 1} {t("image_out_of")} {total}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-red-600 text-white flex items-center justify-center transition-colors focus:outline-none"
            aria-label={t("gallery_modal_close")}
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Container (Stage + Thumbnails + Full Scroll-Down Reel + Other Albums) */}
        <div className="overflow-y-auto flex-1">
          {/* Main Visual Stage */}
          <div className="relative w-full h-[40vh] sm:h-[50vh] bg-black/80 flex items-center justify-center p-3 sm:p-6 group select-none">
            {/* Prev Arrow */}
            {total > 1 && (
              <button
                onClick={() => stepImage(-1)}
                className="absolute inset-inline-start-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-navy-950/70 hover:bg-gold-500 hover:text-navy-950 text-gold-300 border border-gold-400/40 flex items-center justify-center transition-all duration-200 shadow-lg"
                aria-label="Previous"
              >
                {isUrdu ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
              </button>
            )}

            {/* Active Image */}
            <div className="relative w-full h-full">
              <Image
                src={currentPhoto.src}
                alt={photoTitle}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
              />
            </div>

            {/* Next Arrow */}
            {total > 1 && (
              <button
                onClick={() => stepImage(1)}
                className="absolute inset-inline-end-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-navy-950/70 hover:bg-gold-500 hover:text-navy-950 text-gold-300 border border-gold-400/40 flex items-center justify-center transition-all duration-200 shadow-lg"
                aria-label="Next"
              >
                {isUrdu ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
              </button>
            )}
          </div>

          {/* Active Photo Metadata */}
          <div className="p-5 sm:p-6 bg-navy-950 border-t border-b border-navy-800 flex flex-wrap items-center justify-between gap-4 text-start">
            <div className="flex-1 min-w-[240px]">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                {photoTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                {photoDesc}
              </p>
            </div>

            <a
              href={waShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-whatsapp hover:bg-whatsapp-dark text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex-shrink-0"
            >
              <WhatsAppIcon size={16} />
              <span>{t("btn_share_whatsapp")}</span>
            </a>
          </div>

          {/* Related Pictures Showcase Section (Scroll All Down) */}
          <div className="p-5 sm:p-8 bg-navy-950/60 text-start">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-2 border-b border-gold-400/20">
              <div className="flex items-center gap-2 text-gold-400 font-bold text-sm sm:text-base uppercase tracking-wider">
                <Images size={18} />
                <span>{t("gallery_related_title")}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-medium">
                <ArrowDown size={14} className="animate-bounce" />
                <span>{t("gallery_scroll_hint")}</span>
              </div>
            </div>

            {/* Quick Horizontal Thumbnails Reel */}
            {total > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-6 scrollbar-thin">
                {relatedList.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={cn(
                      "relative w-20 h-16 sm:w-24 sm:h-18 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all duration-200 group bg-black",
                      currentIndex === idx
                        ? "border-gold-400 shadow-gold scale-105"
                        : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <Image
                      src={item.src}
                      alt={item.title_ur}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                    <span className="absolute bottom-1 inset-inline-end-1 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      {idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Full Scroll-Down Grid of All Related Pictures */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
              {relatedList.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={cn(
                    "cursor-pointer rounded-2xl overflow-hidden border bg-navy-900 transition-all duration-300 flex flex-col group",
                    currentIndex === idx
                      ? "border-gold-400 shadow-gold-glow"
                      : "border-gold-400/20 hover:border-gold-400 hover:shadow-xl"
                  )}
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                    <Image
                      src={item.src}
                      alt={item.title_ur}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 300px"
                    />
                    <span className="absolute top-2 inset-inline-start-2 px-2.5 py-0.5 rounded-full text-xs font-bold bg-navy-950/80 text-gold-300 border border-gold-400/40">
                      #{idx + 1}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-1">
                    <h4 className="text-sm font-semibold text-white group-hover:text-gold-300 transition-colors line-clamp-2 mb-3">
                      {isUrdu ? item.title_ur : item.title_en}
                    </h4>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 group-hover:underline">
                      <span>{t("gallery_view_large")}</span>
                      <ChevronRight size={14} className={isUrdu ? "rotate-180" : ""} />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Explore Other Albums Section */}
            <div className="pt-6 border-t border-white/10">
              <h4 className="text-sm font-bold text-gold-400 uppercase tracking-wider mb-4">
                {t("gallery_other_albums")}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {allAlbums
                  .filter((a) => a.id !== activeAlbum.id)
                  .map((album) => (
                    <button
                      key={album.id}
                      type="button"
                      onClick={() => onSelectAlbum(album)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold-400 text-start flex flex-col gap-2 transition-all group"
                    >
                      <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-black">
                        <Image
                          src={album.image}
                          alt={album.title_ur}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                          sizes="120px"
                        />
                      </div>
                      <span className="text-xs font-bold text-white group-hover:text-gold-300 truncate">
                        {isUrdu ? album.albumTitle_ur : album.albumTitle_en}
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
