import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getEventById,
  getAllEventIds,
  getSiteConfig,
  getLatestAnnouncement,
} from "@/lib/services";
import { AnnouncementBar } from "@/components/header/AnnouncementBar";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { FloatingActions } from "@/components/ui/FloatingActions";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Calendar, Clock, MapPin, Mic, ArrowLeft, ArrowRight, Share2, Star } from "lucide-react";
import type { Metadata } from "next";

interface EventDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const ids = await getAllEventIds();
  return ids.map((id) => ({
    id: String(id),
  }));
}

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  const event = await getEventById(Number(params.id));
  if (!event) {
    return {
      title: "پروگرام دستیاب نہیں | Fazalia Owaisia",
    };
  }

  return {
    title: `${event.title_ur} | فضلیہ اویسیہ آفیشل`,
    description: event.description_ur,
    openGraph: {
      title: event.title_ur,
      description: event.description_ur,
      images: [event.image],
    },
  };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const eventId = Number(params.id);
  const [event, config, announcement] = await Promise.all([
    getEventById(eventId),
    getSiteConfig(),
    getLatestAnnouncement(),
  ]);

  if (!event) {
    notFound();
  }

  const shareText = `*فضلیہ اویسیہ آفیشل پروگرام کی دعوت*\n\n📌 *${event.title_ur}*\n🗓️ ${event.dateDisplay_ur}\n⏰ ${event.time_ur}\n🕌 ${event.location_ur}\n\n${event.description_ur}\n\nمزید معلومات: https://fazaliaowaisiaofficial.com/events/${event.id}`;
  const waShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <AnnouncementBar announcement={announcement} />
      <Header config={config} />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-gold-600 transition-colors">
              ہوم
            </Link>
            <span>/</span>
            <Link href="/#events" className="hover:text-gold-600 transition-colors">
              پروگرامز
            </Link>
            <span>/</span>
            <span className="text-navy-950 font-bold truncate max-w-xs sm:max-w-md">
              {event.title_ur}
            </span>
          </div>

          {/* Main Card */}
          <article className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xl">
            {/* Event Hero Poster */}
            <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-navy-950">
              <Image
                src={event.image}
                alt={event.title_ur}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />

              {/* Badges on Poster */}
              <div className="absolute bottom-6 inset-x-6 flex items-center justify-between flex-wrap gap-3">
                <span className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-gold-400 text-navy-950 shadow-md">
                  {event.category_ur}
                </span>

                {event.isFeatured && (
                  <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-navy-950/90 text-gold-300 border border-gold-400 shadow-md">
                    <Star size={14} className="fill-gold-400 text-gold-400" />
                    <span>خاص سالانہ پروگرام</span>
                  </span>
                )}
              </div>
            </div>

            {/* Event Details Content */}
            <div className="p-6 sm:p-10 text-start">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-navy-950 mb-6 leading-tight">
                {event.title_ur}
              </h1>

              {/* Info Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 bg-slate-50 p-5 rounded-2xl border border-slate-200 text-sm sm:text-base">
                <div className="flex items-center gap-3 text-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-gold-400/20 text-gold-600 flex items-center justify-center flex-shrink-0">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-500">تاریخِ تقریب</span>
                    <span className="font-bold">{event.dateDisplay_ur}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-gold-400/20 text-gold-600 flex items-center justify-center flex-shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-500">وقت</span>
                    <span className="font-bold">{event.time_ur}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-800 sm:col-span-2">
                  <div className="w-10 h-10 rounded-xl bg-gold-400/20 text-gold-600 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-500">مقامِ تقریب</span>
                    <span className="font-bold">{event.location_ur}</span>
                  </div>
                </div>

                {event.speaker_ur && (
                  <div className="flex items-center gap-3 text-slate-800 sm:col-span-2">
                    <div className="w-10 h-10 rounded-xl bg-gold-400/20 text-gold-600 flex items-center justify-center flex-shrink-0">
                      <Mic size={20} />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-slate-500">خطاب و ثناء خوانی</span>
                      <span className="font-bold">{event.speaker_ur}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Detailed Description */}
              <div className="mb-10 text-slate-700 text-base sm:text-lg leading-loose space-y-4">
                <h3 className="text-xl font-bold text-navy-950 pb-2 border-b border-slate-200">
                  تفصیلات و دعوت نامہ
                </h3>
                <p>{event.description_ur}</p>
                <p className="text-slate-500 text-sm">
                  ہماری آپ سے پرخلوص التماس ہے کہ اپنے تمام عزیز و اقارب اور احباب کو اس بابرکت تقریب کی اطلاع دیں اور باوضو شرکت فرما کر دارین کی سعادتیں حاصل کریں۔
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200">
                <a
                  href={waShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-whatsapp hover:bg-whatsapp-dark text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                >
                  <WhatsAppIcon size={20} />
                  <span>واٹس ایپ پر دعوت نامہ شیئر کریں</span>
                </a>

                <Link
                  href="/#events"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 hover:bg-navy-950 hover:text-white text-navy-950 font-bold text-sm sm:text-base transition-all"
                >
                  <span>تمام پروگرامز کی فہرست دیکھیں</span>
                </Link>
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer config={config} />
      <FloatingActions whatsappNumber={config.contact.whatsapp} />
    </div>
  );
}
