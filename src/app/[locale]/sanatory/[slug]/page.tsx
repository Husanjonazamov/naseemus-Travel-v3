"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useLocale, useTranslations } from "next-intl";
import config from "@/src/config";
import { motion, AnimatePresence } from "framer-motion";

import { Header } from "@/src/components/header";
import { TrustBadges } from "@/src/components/trust-badges";
import { PopularDestinations } from "@/src/components/popular-destinations";
import { NewTouring } from "@/src/components/new-touring-holidays";
import { Footer } from "@/src/components/footer";
import { Itinerary } from "@/src/components/itinerary";
import { TourDetails } from "@/src/components/tour-details";
import {
  HeartPulse,
  MapPin,
  Clock,
  Star,
  ShieldCheck,
  CheckCircle2,
  Play,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/src/components/ui/button";

interface Video {
  id: number;
  video: string;
}

interface Tour {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: string;
  image: string;
  date: number;
  category?: { id: number; title: string } | null;
  is_popular: boolean;
  is_new: boolean;
  images: string[];
  videos?: Video[];
}

export default function SanatoryDetail() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("tour_uzbekistan");
  const silkT = useTranslations("silk");

  const slug = params.slug;
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTour = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const res = await axios.get(
          `${config.BASE_URL}/api/sanatory/${encodeURIComponent(slug as string)}/`,
          {
            headers: { "Accept-Language": locale },
          }
        );
        setTour(res.data.data);
      } catch (err: any) {
        console.error("Sanatory fetch error:", err);
        if (err.response?.status === 404) router.push("/404");
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [slug, locale, router]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fbfbf9]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#007654]/20 border-t-[#007654] rounded-full animate-spin" />
        <p className="font-bold text-[#007654] animate-pulse">{t("loading")}</p>
      </div>
    </div>
  );

  if (!tour) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fbfbf9]">
      <p className="text-3xl font-black text-gray-300">Resort not found</p>
    </div>
  );

  return (
    <div className="w-full bg-[#fbfbf9] overflow-x-hidden">
      <Header />
      <TrustBadges />

      {/* Cinematic Sanatory Hero */}
      <section className="relative min-h-[440px] w-full overflow-hidden sm:min-h-[500px] lg:h-[80vh]">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            className="object-cover"
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#fbfbf9]" />
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-14 sm:px-6 sm:pb-24 lg:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <div className="mb-6 flex flex-wrap items-center gap-3 sm:mb-8">
              <div className="flex items-center gap-2 rounded-full bg-[#007654] px-3 py-1.5 shadow-xl shadow-black/20 sm:px-4">
                <HeartPulse size={14} className="text-white" />
                <span className="text-[10px] font-black tracking-widest text-white">Wellness & health retreat</span>
              </div>
              {(tour.is_popular || tour.is_new) && (
                <div className="flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-3 py-1.5 backdrop-blur-xl sm:px-4">
                  <Sparkles size={14} className="text-yellow-400" />
                  <span className="text-[10px] font-black tracking-widest text-white">
                    {tour.is_popular ? t("popular_tour") : t("new_tour")}
                  </span>
                </div>
              )}
            </div>

            <h1 className="mb-6 text-4xl font-black leading-[1.02] tracking-tighter text-white drop-shadow-2xl sm:text-5xl md:mb-8 md:text-6xl lg:text-8xl">
              {tour.title}
            </h1>

            <div className="flex flex-wrap items-center gap-5 sm:gap-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-white">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black tracking-[0.2em] text-white/60 mb-0.5">Duration</p>
                  <p className="text-xl font-bold text-white">{tour.date} {t("duration")}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
          {/* Left Column: Context & Overview */}
          <div className="space-y-20 lg:col-span-12 xl:col-span-8 xl:space-y-32">
            <section className="space-y-10 sm:space-y-12">
              <div className="space-y-5 sm:space-y-6">
                <h2 className="text-3xl font-black tracking-tight text-[#1a1a1a] sm:text-4xl md:text-5xl">
                  Escape to Serenity
                </h2>
                <div className="prose max-w-none whitespace-pre-line prose-lg font-medium leading-[1.8] text-gray-500 sm:prose-xl">
                  {tour.description.split(/\n\s*\n/).filter(p => p.trim()).map((para, idx) => {
                    const lines = para.trim().split('\n');
                    const isList = lines.every(line => line.trim().startsWith('-') || line.trim().startsWith('*'));

                    if (isList) {
                      return (
                        <ul key={idx} className="list-disc pl-6 mb-6 space-y-2">
                          {lines.map((line, lIdx) => (
                            <li key={lIdx}>{line.trim().substring(1).trim()}</li>
                          ))}
                        </ul>
                      );
                    }

                    return (
                      <p key={idx} className="mb-6 last:mb-0">
                        {para.trim()}
                      </p>
                    );
                  })}
                </div>
              </div>

              {/* Visual Health Grid */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {[
                  { title: "Expert Care", icon: HeartPulse, desc: "24/7 Professional medical supervision." },
                  { title: "Pure Nature", icon: MapPin, desc: "Located in the most pristine ecological zones." },
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-4 rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm sm:gap-6 sm:rounded-[32px] sm:p-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#dcfae7] text-[#007654] sm:h-16 sm:w-16">
                      <feat.icon size={32} />
                    </div>
                    <div>
                      <h4 className="mb-1 text-lg font-black text-[#1a1a1a] sm:text-xl">{feat.title}</h4>
                      <p className="text-gray-400 font-medium text-sm">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Resort Video Feature */}
            {tour.videos && tour.videos.length > 0 && (
              <section className="space-y-10 sm:space-y-12">
                <div className="flex items-end justify-between gap-4">
                  <h2 className="text-3xl font-black tracking-tight text-[#1a1a1a] sm:text-4xl">{t("videos")}</h2>
                  <div className="w-20 h-1 bg-[#007654] rounded-full" />
                </div>
                <div className="space-y-6 sm:space-y-10">
                  {tour.videos.map((vid) => (
                    <div
                      key={vid.id}
                      className="group relative aspect-video w-full overflow-hidden rounded-[24px] border-4 border-white shadow-2xl sm:rounded-[48px] sm:border-8"
                    >
                      <video
                        src={vid.video}
                        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all pointer-events-none" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div id="itinerary" className="pt-10 sm:pt-20">
              <Itinerary />
            </div>
          </div>

          {/* Sidebar: Booking & Highlights */}
          <div className="space-y-8 lg:col-span-12 xl:col-span-4 xl:space-y-12">
            <div className="space-y-8 xl:sticky xl:top-32 xl:space-y-12">
              <TourDetails tour={tour} />
              <div className="rounded-[28px] bg-[#121212] p-6 text-white sm:rounded-[40px] sm:p-10">
                <h3 className="mb-6 border-b border-white/10 pb-4 text-xl font-black sm:mb-8">Resort amenities</h3>
                <div className="space-y-4">
                  {[
                    "Natural Spring Water",
                    "Dietary Nutrition Plan",
                    "Physiotherapy Complex",
                    "Luxury Accommodation"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-[#007654]" />
                      <span className="font-bold text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-t-[40px] bg-[#f0f9f4] py-20 sm:rounded-t-[80px] sm:py-32">
        <PopularDestinations />
        <NewTouring />
      </div>

      <Footer />
    </div>
  );
}
