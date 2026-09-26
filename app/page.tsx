import {
  getSiteConfig,
  getLatestAnnouncement,
  getEvents,
  getFeaturedEvent,
  getGalleryAlbums,
  getSocialChannels,
  getCommitteeMembers,
} from "@/lib/services";
import { AnnouncementBar } from "@/components/header/AnnouncementBar";
import { Header } from "@/components/header/Header";
import { Hero } from "@/components/hero/Hero";
import { AboutSection } from "@/components/about/AboutSection";
import { EventsSection } from "@/components/events/EventsSection";
import { GallerySection } from "@/components/gallery/GallerySection";
import { SocialHubSection } from "@/components/social/SocialHubSection";
import { CommitteeSection } from "@/components/committee/CommitteeSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/footer/Footer";
import { FloatingActions } from "@/components/ui/FloatingActions";

export default async function HomePage() {
  const [
    config,
    announcement,
    events,
    featuredEvent,
    galleryAlbums,
    socialChannels,
    committeeMembers,
  ] = await Promise.all([
    getSiteConfig(),
    getLatestAnnouncement(),
    getEvents("all"),
    getFeaturedEvent(),
    getGalleryAlbums("all"),
    getSocialChannels(),
    getCommitteeMembers(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Top Urgent Announcement Bar */}
      <AnnouncementBar announcement={announcement} />

      {/* 2. Sticky Header Navigation with One-Line Brand & Language Switcher */}
      <Header config={config} />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* 3. Hero Section with Live Countdown Timer & Shrine Visual Card */}
        <Hero config={config} featuredEvent={featuredEvent} />

        {/* 4. About Section with 3 Mission Pillars */}
        <AboutSection />

        {/* 5. Village Events & Upcoming Programs with Filters & WhatsApp Invitation */}
        <EventsSection initialEvents={events} />

        {/* 6. Photo Gallery Section with Full Scroll-Down Related Photos Lightbox */}
        <GallerySection initialAlbums={galleryAlbums} />

        {/* 7. Dedicated Social Media Channels Hub (FB, YT, Insta, TikTok, WA) */}
        <SocialHubSection channels={socialChannels} />

        {/* 8. Village Committee & Coordinators Directory */}
        <CommitteeSection members={committeeMembers} />

        {/* 9. Contact & Information Section */}
        <ContactSection contact={config.contact} />
      </main>

      {/* 10. Site Footer */}
      <Footer config={config} />

      {/* 11. Floating Actions (WhatsApp & Back-to-Top) */}
      <FloatingActions whatsappNumber={config.contact.whatsapp} />
    </div>
  );
}
