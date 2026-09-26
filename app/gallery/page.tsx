import React, { Suspense } from "react";
import {
  getGalleryAlbums,
  getSiteConfig,
  getLatestAnnouncement,
} from "@/lib/services";
import { AnnouncementBar } from "@/components/header/AnnouncementBar";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { FloatingActions } from "@/components/ui/FloatingActions";
import { GalleryViewer } from "@/components/gallery/GalleryViewer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "یادگار تصویری گیلری | فضلیہ اویسیہ آفیشل",
  description:
    "آستانہ عالیہ شریف، سالانہ عرس اور گاؤں کے تمام دینی و فلاحی پروگرامز کی یادگار تصویری البمز اور مناظر۔",
  openGraph: {
    title: "یادگار تصویری گیلری | فضلیہ اویسیہ آفیشل",
    description:
      "آستانہ عالیہ شریف اور گاؤں کے پروگرامز کی تصویری گیلری۔",
    images: ["/images/gallery/gallery-1.png"],
  },
};

export default async function GalleryPage() {
  const [allAlbums, config, announcement] = await Promise.all([
    getGalleryAlbums("all"),
    getSiteConfig(),
    getLatestAnnouncement(),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* 1. Top Urgent Announcement Bar */}
      <AnnouncementBar announcement={announcement} />

      {/* 2. Header Navigation */}
      <Header config={config} />

      {/* 3. Main Gallery Viewer with Router (< and > image switching) */}
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="py-24 text-center text-navy-950 font-bold">
              تصویری گیلری لوڈ ہو رہی ہے...
            </div>
          }
        >
          <GalleryViewer allAlbums={allAlbums} />
        </Suspense>
      </main>

      {/* 4. Footer */}
      <Footer config={config} />

      {/* 5. Floating Actions */}
      <FloatingActions whatsappNumber={config.contact.whatsapp} />
    </div>
  );
}
