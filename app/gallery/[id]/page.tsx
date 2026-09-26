import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  getAlbumById,
  getAllAlbumIds,
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

interface GalleryAlbumPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const ids = await getAllAlbumIds();
  return ids.map((id) => ({
    id: String(id),
  }));
}

export async function generateMetadata({ params }: GalleryAlbumPageProps): Promise<Metadata> {
  const album = await getAlbumById(Number(params.id));
  if (!album) {
    return {
      title: "البم دستیاب نہیں | Fazalia Owaisia",
    };
  }

  return {
    title: `${album.albumTitle_ur} | فضلیہ اویسیہ تصویری گیلری`,
    description: album.description_ur,
    openGraph: {
      title: album.albumTitle_ur,
      description: album.description_ur,
      images: [album.image],
    },
  };
}

export default async function GalleryAlbumPage({ params }: GalleryAlbumPageProps) {
  const albumId = Number(params.id);
  const [album, allAlbums, config, announcement] = await Promise.all([
    getAlbumById(albumId),
    getGalleryAlbums("all"),
    getSiteConfig(),
    getLatestAnnouncement(),
  ]);

  if (!album) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <AnnouncementBar announcement={announcement} />
      <Header config={config} />

      <main className="flex-1">
        <Suspense
          fallback={
            <div className="py-24 text-center text-navy-950 font-bold">
              البم لوڈ ہو رہا ہے...
            </div>
          }
        >
          <GalleryViewer allAlbums={allAlbums} />
        </Suspense>
      </main>

      <Footer config={config} />
      <FloatingActions whatsappNumber={config.contact.whatsapp} />
    </div>
  );
}
