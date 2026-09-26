"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { GalleryAlbum, RelatedGalleryImage } from "@/types";
import { WhatsAppIcon } from "@/components/ui/Icons";
import {
  ChevronLeft,
  ChevronRight,
  Images,
  FolderOpen,
  Share2,
  Maximize2,
  ArrowRight,
  ArrowLeft,
  Home,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface GalleryViewerProps {
  allAlbums: GalleryAlbum[];
}

export const GalleryViewer: React.FC<GalleryViewerProps> = ({ allAlbums }) => {
  const { isUrdu, t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Parse album ID from query params or default to first album
  const albumParam = searchParams.get("album");
  const photoParam = searchParams.get("photo");

  const initialAlbumId = albumParam ? Number(albumParam) : allAlbums[0]?.id || 1;
  const initialPhotoIndex = photoParam ? Number(photoParam) : 0;

  const [activeAlbumId, setActiveAlbumId] = useState<number>(initialAlbumId);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(initialPhotoIndex);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Sync state when URL searchParams change
  useEffect(() => {
    if (albumParam) {
      const parsed = Number(albumParam);
      if (!isNaN(parsed) && allAlbums.some((a) => a.id === parsed)) {
        setActiveAlbumId(parsed);
      }
    }
    if (photoParam) {
      const parsedPhoto = Number(photoParam);
      if (!isNaN(parsedPhoto)) {
        setActivePhotoIndex(parsedPhoto);
      }
    }
  }, [albumParam, photoParam, allAlbums]);

  // Find active album
  const activeAlbum = allAlbums.find((a) => a.id === activeAlbumId) || allAlbums[0];

  // Get photos list in this album folder
  const photosList: RelatedGalleryImage[] = activeAlbum
    ? activeAlbum.relatedImages && activeAlbum.relatedImages.length > 0
      ? activeAlbum.relatedImages
      : [{ src: activeAlbum.image, title_ur: activeAlbum.title_ur, title_en: activeAlbum.title_en }]
    : [];

  const totalPhotos = photosList.length;
  const safeIndex =
    activePhotoIndex >= 0 && activePhotoIndex < totalPhotos ? activePhotoIndex : 0;
  const currentPhoto = photosList[safeIndex] || photosList[0];

  // Update URL without full page reload when changing photo/album
  const updateUrl = useCallback(
    (albumId: number, photoIdx: number) => {
      const url = `/gallery?album=${albumId}&photo=${photoIdx}`;
      window.history.replaceState(null, "", url);
    },
    []
  );

  // Change active photo
  const setPhoto = (index: number) => {
    if (index >= 0 && index < totalPhotos) {
      setActivePhotoIndex(index);
      updateUrl(activeAlbumId, index);
    }
  };

  // Previous image navigation (<)
  const handlePrev = useCallback(() => {
    if (totalPhotos <= 1) return;
    const newIndex = (safeIndex - 1 + totalPhotos) % totalPhotos;
    setActivePhotoIndex(newIndex);
    updateUrl(activeAlbumId, newIndex);
  }, [safeIndex, totalPhotos, activeAlbumId, updateUrl]);

  // Next image navigation (>)
  const handleNext = useCallback(() => {
    if (totalPhotos <= 1) return;
    const newIndex = (safeIndex + 1) % totalPhotos;
    setActivePhotoIndex(newIndex);
    updateUrl(activeAlbumId, newIndex);
  }, [safeIndex, totalPhotos, activeAlbumId, updateUrl]);

  // Select different album/folder
  const handleSelectAlbum = (albumId: number) => {
    setActiveAlbumId(albumId);
    setActivePhotoIndex(0);
    updateUrl(albumId, 0);
  };

  // Keyboard navigation (< and > / Left and Right arrows)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        // In RTL, left arrow is next or previous depending on convention; let's support standard < / >
        if (isUrdu) {
          handleNext();
        } else {
          handlePrev();
        }
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (isUrdu) {
          handlePrev();
        } else {
          handleNext();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext, isUrdu]);

  // Mobile Touch Swipe Handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;

    // Minimum swipe threshold 50px
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        // Swiped right -> In RTL this is previous, in LTR this is previous
        isUrdu ? handleNext() : handlePrev();
      } else {
        // Swiped left
        isUrdu ? handlePrev() : handleNext();
      }
    }
    setTouchStartX(null);
  };

  if (!activeAlbum || !currentPhoto) return null;

  const albumTitle = isUrdu ? activeAlbum.albumTitle_ur : activeAlbum.albumTitle_en;
  const albumCategory = isUrdu ? activeAlbum.category_ur : activeAlbum.category_en;
  const photoTitle = isUrdu ? currentPhoto.title_ur : currentPhoto.title_en;
  const photoDesc = isUrdu ? activeAlbum.description_ur : activeAlbum.description_en;

  const shareText = `*${albumTitle} — فضلیہ اویسیہ آفیشل البم*\n\n📸 *${photoTitle}*\n\nمکمل تصویر دیکھیں: https://fazaliaowaisiaofficial.com/gallery?album=${activeAlbum.id}&photo=${safeIndex}`;
  const waShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 text-start">
      {/* Top Breadcrumb & Quick Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 flex-wrap">
          <Link
            href="/"
            className="flex items-center gap-1.5 hover:text-gold-600 transition-colors font-medium"
          >
            <Home size={15} />
            <span>{t("nav_home")}</span>
          </Link>
          <span>/</span>
          <span className="text-navy-950 font-bold">{t("nav_gallery")}</span>
          <span>/</span>
          <span className="text-gold-600 font-bold truncate max-w-[200px] sm:max-w-xs">
            {albumTitle}
          </span>
        </div>

        <Link
          href="/#gallery"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-navy-800 hover:text-gold-600 transition-colors"
        >
          {isUrdu ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
          <span>{isUrdu ? "ہوم پیج پر واپس جائیں" : "Back to Home"}</span>
        </Link>
      </div>

      {/* Album / Folder Selector Tabs */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">
          <FolderOpen size={16} className="text-gold-500" />
          <span>{isUrdu ? "گیلری کے تمام فولڈرز / البمز:" : "Gallery Image Folders / Albums:"}</span>
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto pb-3 scrollbar-thin">
          {allAlbums.map((album) => {
            const isSelected = album.id === activeAlbumId;
            const albumName = isUrdu ? album.albumTitle_ur : album.albumTitle_en;
            const count = album.relatedImages ? album.relatedImages.length : 1;

            return (
              <button
                key={album.id}
                type="button"
                onClick={() => handleSelectAlbum(album.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 flex-shrink-0 shadow-sm",
                  isSelected
                    ? "bg-navy-950 text-gold-300 border-2 border-gold-400 shadow-md scale-102"
                    : "bg-white text-slate-700 hover:text-navy-950 hover:bg-slate-100 border border-slate-200"
                )}
              >
                <span>{albumName}</span>
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-[11px] font-bold",
                    isSelected ? "bg-gold-400 text-navy-950" : "bg-slate-100 text-slate-600"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN HIGH-IMPACT IMAGE STAGE WITH PREV (<) AND NEXT (>) NAVIGATION */}
      <div className="relative rounded-3xl overflow-hidden bg-navy-950 border-2 border-gold-400/40 shadow-2xl mb-8 group select-none">
        {/* Top Info Bar Overlay on Image */}
        <div className="absolute top-0 inset-x-0 z-20 p-4 sm:p-5 flex items-center justify-between gap-3 bg-gradient-to-b from-navy-950/95 via-navy-950/60 to-transparent">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-gold-400 text-navy-950 shadow-md">
              {albumCategory}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-navy-950/80 border border-gold-400/40 text-gold-300 backdrop-blur-md">
              {t("image_of")} {safeIndex + 1} {t("image_out_of")} {totalPhotos}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* WhatsApp Share for this image */}
            <a
              href={waShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-whatsapp hover:bg-whatsapp-dark text-white font-bold text-xs shadow-md transition-all hover:scale-105"
              title={t("btn_share_whatsapp")}
            >
              <WhatsAppIcon size={14} />
              <span className="hidden sm:inline">{t("btn_share_whatsapp")}</span>
            </a>

            {/* Direct Image Link */}
            <a
              href={currentPhoto.src}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title={isUrdu ? "مکمل تصویر دیکھیں" : "View Full Size"}
            >
              <Maximize2 size={16} />
            </a>
          </div>
        </div>

        {/* Central Visual Stage */}
        <div
          className="relative w-full h-[52vh] sm:h-[62vh] md:h-[68vh] max-h-[720px] bg-black flex items-center justify-center overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* PREVIOUS BUTTON (<) */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute inset-inline-start-3 sm:inset-inline-start-6 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-navy-950/80 hover:bg-gold-500 text-gold-300 hover:text-navy-950 border-2 border-gold-400/50 hover:border-gold-400 flex items-center justify-center transition-all duration-200 shadow-2xl backdrop-blur-md hover:scale-110 active:scale-95 group/btn"
            aria-label="Previous Image (<)"
            title={isUrdu ? "پچھلی تصویر (<)" : "Previous Image (<)"}
          >
            {isUrdu ? (
              <ChevronRight size={28} className="group-hover/btn:translate-x-0.5 transition-transform" />
            ) : (
              <ChevronLeft size={28} className="group-hover/btn:-translate-x-0.5 transition-transform" />
            )}
          </button>

          {/* Active HD Image */}
          <div className="relative w-full h-full p-2 sm:p-4">
            <Image
              src={currentPhoto.src}
              alt={photoTitle}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-contain transition-opacity duration-300"
            />
          </div>

          {/* NEXT BUTTON (>) */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute inset-inline-end-3 sm:inset-inline-end-6 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-navy-950/80 hover:bg-gold-500 text-gold-300 hover:text-navy-950 border-2 border-gold-400/50 hover:border-gold-400 flex items-center justify-center transition-all duration-200 shadow-2xl backdrop-blur-md hover:scale-110 active:scale-95 group/btn"
            aria-label="Next Image (>)"
            title={isUrdu ? "اگلی تصویر (>)" : "Next Image (>)"}
          >
            {isUrdu ? (
              <ChevronLeft size={28} className="group-hover/btn:-translate-x-0.5 transition-transform" />
            ) : (
              <ChevronRight size={28} className="group-hover/btn:translate-x-0.5 transition-transform" />
            )}
          </button>
        </div>

        {/* Bottom Captions & Descriptions */}
        <div className="p-5 sm:p-7 bg-navy-950 border-t border-gold-400/20 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1">
            <span className="text-xs font-semibold text-gold-400 uppercase tracking-wider block mb-1">
              {albumTitle}
            </span>
            <h2 className="text-lg sm:text-2xl font-extrabold text-white leading-snug">
              {photoTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 line-clamp-2">
              {photoDesc}
            </p>
          </div>

          {/* Keyboard hint badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-xs flex-shrink-0 self-start sm:self-center">
            <span>{isUrdu ? "کی بورڈ تیر کے نشانات" : "Use keyboard arrows"}</span>
            <kbd className="px-1.5 py-0.5 rounded bg-black/50 border border-white/20 text-gold-300 font-mono text-[11px]">
              &lt;
            </kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-black/50 border border-white/20 text-gold-300 font-mono text-[11px]">
              &gt;
            </kbd>
          </div>
        </div>
      </div>

      {/* QUICK HORIZONTAL THUMBNAILS REEL */}
      <div className="mb-12">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h3 className="text-sm font-bold text-navy-950 uppercase tracking-wider flex items-center gap-1.5">
            <Layers size={16} className="text-gold-600" />
            <span>{isUrdu ? "فولڈر کی تمام تصاویر کی پٹی:" : "Photos In This Folder:"}</span>
          </h3>
          <span className="text-xs text-slate-500">
            {totalPhotos} {t("gallery_photo_count")}
          </span>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-thin">
          {photosList.map((photo, index) => {
            const isSelected = index === safeIndex;
            return (
              <button
                key={index}
                type="button"
                onClick={() => setPhoto(index)}
                className={cn(
                  "relative w-24 h-18 sm:w-28 sm:h-20 rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all duration-200 group bg-navy-950 focus:outline-none",
                  isSelected
                    ? "border-gold-500 shadow-gold scale-105 ring-2 ring-gold-400/40"
                    : "border-slate-200 hover:border-gold-400 opacity-70 hover:opacity-100"
                )}
                title={isUrdu ? photo.title_ur : photo.title_en}
              >
                <Image
                  src={photo.src}
                  alt={photo.title_ur}
                  fill
                  sizes="120px"
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <span className="absolute bottom-1 inset-inline-end-1 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                  #{index + 1}
                </span>
                {isSelected && (
                  <div className="absolute inset-0 border-2 border-gold-400 pointer-events-none rounded-2xl" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* FULL RESPONSIVE GRID OF ALL PHOTOS IN THIS FOLDER */}
      <div className="mb-16">
        <h3 className="text-lg sm:text-xl font-extrabold text-navy-950 mb-6 flex items-center gap-2">
          <Images size={20} className="text-gold-600" />
          <span>{isUrdu ? "اس فولڈر کی تمام تصاویر (کلک کر کے دیکھیں):" : "All Photos In This Folder (Click to open):"}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photosList.map((photo, index) => {
            const isSelected = index === safeIndex;
            return (
              <div
                key={index}
                onClick={() => setPhoto(index)}
                className={cn(
                  "cursor-pointer rounded-3xl overflow-hidden border bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group text-start",
                  isSelected
                    ? "border-gold-400 ring-2 ring-gold-400/30 shadow-md"
                    : "border-slate-200 hover:border-gold-400"
                )}
              >
                <div className="relative aspect-[16/10] w-full bg-navy-950 overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.title_ur}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  <span className="absolute top-3 inset-inline-start-3 px-3 py-0.5 rounded-full text-xs font-bold bg-navy-950/80 text-gold-300 border border-gold-400/40">
                    تصویر #{index + 1}
                  </span>

                  {isSelected && (
                    <span className="absolute top-3 inset-inline-end-3 px-3 py-0.5 rounded-full text-xs font-extrabold bg-gold-400 text-navy-950 shadow-md">
                      {isUrdu ? "منتخب تصویر" : "Active"}
                    </span>
                  )}
                </div>

                <div className="p-5 flex flex-col justify-between flex-1">
                  <h4 className="text-base font-bold text-navy-950 group-hover:text-gold-600 transition-colors line-clamp-2 mb-3">
                    {isUrdu ? photo.title_ur : photo.title_en}
                  </h4>

                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-600 group-hover:underline">
                    <span>{isUrdu ? "بڑے سائز میں دیکھیں" : "View in Stage"}</span>
                    {isUrdu ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* EXPLORE OTHER FOLDERS SECTION */}
      <div className="pt-10 border-t border-slate-200">
        <h3 className="text-xl sm:text-2xl font-extrabold text-navy-950 mb-6">
          {isUrdu ? "دیگر تصویری البمز اور فولڈرز:" : "Explore Other Image Folders:"}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allAlbums
            .filter((a) => a.id !== activeAlbumId)
            .map((album) => {
              const albumName = isUrdu ? album.albumTitle_ur : album.albumTitle_en;
              const count = album.relatedImages ? album.relatedImages.length : 1;

              return (
                <div
                  key={album.id}
                  onClick={() => handleSelectAlbum(album.id)}
                  className="cursor-pointer group rounded-3xl overflow-hidden bg-white border border-slate-200 hover:border-gold-400 hover:shadow-xl transition-all duration-300 p-4 flex items-center gap-4 text-start"
                >
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-navy-950 flex-shrink-0">
                    <Image
                      src={album.image}
                      alt={albumName}
                      fill
                      sizes="96px"
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex flex-col flex-1 overflow-hidden">
                    <span className="text-xs font-bold text-gold-600 uppercase mb-1">
                      {isUrdu ? album.category_ur : album.category_en}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-navy-950 group-hover:text-navy-800 transition-colors truncate">
                      {albumName}
                    </h4>
                    <span className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <Images size={13} />
                      <span>{count} {t("gallery_photo_count")}</span>
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
