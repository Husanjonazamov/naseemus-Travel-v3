"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

import { Header } from "@/src/components/header";
import { TrustBadges } from "@/src/components/trust-badges";
import { Footer } from "@/src/components/footer";
import { Itinerary } from "@/src/components/itinerary";
import { TourOverview } from "@/src/components/tour-overview";
import { TourDetails } from "@/src/components/tour-details";
import {
  Clock,
  Users,
  Star,
  ShieldCheck,
  MapPin,
  ArrowRight,
  TrendingUp,
  Award,
  Heart
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { SanatoriumSection } from "@/src/components/SanatoriumSection";
import { MediaMarquee } from "@/src/components/MediaMarquee";
import apiClient from "@/src/lib/api-client";
import { useAuth } from "@/src/context/AuthContext";
import tourService, { Tour as TourType } from "@/src/services/tour.service";
import { toast } from "react-toastify";

interface Tour {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: string;
  image: string;
  duration: string;
  date: number;
  category: { id: number; title: string } | string;
  location: string;
  rating: number;
  reviews_count: number;
  is_popular: boolean;
  is_new: boolean;
  images: { id: number; image: string }[];
  itineraries: any[];
  sanatories?: any[];
  is_liked: boolean;
}

export default function TourDetail() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("tour_uzbekistan");
  const silkT = useTranslations("silk");
  const detailT = useTranslations("tour_detail");
  const cardT = useTranslations("tour_card");

  const slug = params.slug as string;
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchTour = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const res = await apiClient.get(`/api/tour/${encodeURIComponent(slug)}/`);
        if (res.data.data) {
          const tourData = res.data.data;
          setTour(tourData);
          setIsLiked(tourData.is_liked || false);
        }
      } catch (err: any) {
        console.error("Tour fetch error:", err);
        if (err.response?.status === 404) {
          router.push(`/${locale}/404`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [slug, locale, router]);

  const toggleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.info(cardT("login_to_save"));
      router.push(`/${locale}/login`);
      return;
    }

    try {
      const prevState = isLiked;
      setIsLiked(!prevState);
      const response = await tourService.toggleLike(slug);
      setIsLiked(response.data.liked);
      if (response.data.liked) {
        toast.success(cardT("added_to_saved"));
      } else {
        toast.info(cardT("removed_from_saved"));
      }
    } catch (error) {
      console.error("Toggle like error:", error);
      setIsLiked(isLiked);
      toast.error("Something went wrong");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fbfbf9]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="w-12 h-12 border-4 border-[#007654]/20 border-t-[#007654] rounded-full animate-spin" />
        <p className="font-bold text-[#007654] animate-pulse">{t("loading")}</p>
      </motion.div>
    </div>
  );

  if (!tour) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-2xl font-black text-gray-400">Tour not found</p>
    </div>
  );

  return (
    <div className="w-full bg-[#fbfbf9] overflow-x-hidden relative">
      <Header />

      {/* Global Atmospheric Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#007654]/5 to-white pointer-events-none z-0" />
      <div className="absolute top-[100vh] right-0 w-[800px] h-[800px] bg-[#007654]/5 blur-[160px] rounded-full -mr-96 pointer-events-none z-0" />
      <div className="absolute top-[200vh] left-0 w-[800px] h-[800px] bg-[#007654]/5 blur-[160px] rounded-full -ml-96 pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[#007654]/5 blur-[160px] rounded-full -mr-96 pointer-events-none z-0" />

      <div className="relative z-10 w-full">

        {/* Premium Hero Section */}
        <section className="relative w-full lg:h-[85vh] min-h-[500px] md:min-h-[600px] overflow-hidden">
          {/* Background Image with Parallax-ready effect */}
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
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#fbfbf9]" />
          </motion.div>

          <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center lg:items-start lg:justify-end pb-12 md:pb-24 lg:pb-32">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl text-center lg:text-left flex flex-col items-center lg:items-start"
            >
              {/* Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6 md:mb-8">
                {(tour.is_popular || tour.is_new) && (
                  <div className="bg-white/20 backdrop-blur-xl border border-white/30 px-3 md:px-4 py-1.5 rounded-full flex items-center gap-2">
                    {tour.is_popular ? (
                      <TrendingUp size={12} className="text-yellow-400" strokeWidth={3} />
                    ) : (
                      <Award size={12} className="text-blue-400" strokeWidth={3} />
                    )}
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white">
                      {tour.is_popular ? t("popular_tour") : t("new_tour")}
                    </span>
                  </div>
                )}
                <div className="bg-[#007654] px-3 md:px-4 py-1.5 rounded-full flex items-center gap-2 shadow-xl shadow-black/20">
                  <ShieldCheck size={12} className="text-white" />
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white">{detailT("guaranteed_departure")}</span>
                </div>
                <button
                  onClick={toggleLike}
                  className={`w-9 h-9 md:w-10 md:h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 border ${isLiked ? 'bg-[#ff4d4d] text-white border-[#ff4d4d]' : 'bg-white/20 text-white border-white/30 hover:bg-[#007654] hover:text-white'}`}
                >
                  <Heart size={18} fill={isLiked ? "currentColor" : "none"} strokeWidth={2.5} />
                </button>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 md:mb-8 tracking-tighter leading-[1.1] md:leading-[1] drop-shadow-2xl text-center lg:text-left">
                {tour.title}
              </h1>

              {/* Mobile Price Display (Visible on mobile/tablet) */}
              <div className="lg:hidden mb-8 text-center bg-white/10 backdrop-blur-lg border border-white/20 p-4 rounded-2xl">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1">{detailT("starting_from")}</p>
                <p className="text-4xl font-black text-white">${tour.price}</p>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 md:gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl md:rounded-2xl flex items-center justify-center text-white">
                    <Clock size={20} className="md:w-6 md:h-6" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-0.5">{detailT("duration")}</p>
                    <p className="text-lg md:text-xl font-bold text-white leading-none">{tour.date} {t("duration")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl md:rounded-2xl flex items-center justify-center text-white">
                    <Star size={20} className="md:w-6 md:h-6 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-0.5">{detailT("rating")}</p>
                    <p className="text-lg md:text-xl font-bold text-white leading-none">4.9/5.0</p>
                  </div>
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="lg:hidden mt-10 w-full max-w-xs">
                <Button
                  onClick={() => {
                    const element = document.getElementById('booking-section');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full h-14 bg-[#007654] hover:bg-[#008c64] text-white rounded-xl font-black text-base shadow-xl shadow-[#007654]/20"
                >
                  {silkT("cta_book")}
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Floating Pricing Card - Desktop Only */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block absolute bottom-32 right-12 z-20"
          >
            <div className="bg-white/90 backdrop-blur-2xl p-8 rounded-[40px] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.3)] border border-white/40 w-80">
              <div className="mb-6">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">{detailT("starting_from")}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-[#1a1a1a]">${tour.price}</span>
                  <span className="text-gray-400 font-bold ml-1">/pp</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                  <MapPin size={18} className="text-[#007654]" />
                  <span>{detailT("central_asia")}</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                  <Users size={18} className="text-[#007654]" />
                  <span>{detailT("max_group")}</span>
                </div>
              </div>

              <Button
                onClick={() => {
                  const element = document.getElementById('booking-section');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full h-16 bg-[#007654] hover:bg-[#008c64] text-white rounded-2xl font-black text-lg transition-all duration-300 shadow-xl shadow-[#007654]/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                {silkT("cta_book")}
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Media Marquee Section */}
        <div className="bg-[#fbfbf9] py-12">
          <div className="max-w-7xl mx-auto px-4 mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#007654]/60">{detailT("gallery_subtitle")}</span>
            <h2 className="text-3xl font-black text-[#1a1a1a] mt-2">{detailT("gallery_title")}</h2>
          </div>
          <MediaMarquee
            images={
              tour.images && tour.images.length > 0
                ? tour.images.map((img: any) => img.image)
                : [tour.image]
            }
          />
        </div>

        <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Left Column: Overview & Itinerary */}
            <div className="lg:col-span-2 space-y-24">
              <div id="overview">
                <TourOverview tour={tour as any} />
              </div>

              {/* Sanatorium Section */}
              {tour.sanatories && tour.sanatories.length > 0 && (
                <div id="sanatoriums">
                  <SanatoriumSection sanatoriums={tour.sanatories.map((s: any) => ({
                    ...s,
                    facilities: s.facilities || ["Treatment", "Wellness", "Relaxation", "Medical Care"],
                    images: s.image ? [s.image] : [],
                    videos: s.videos?.map((v: any) => v.video) || []
                  }))} />
                </div>
              )}

              {tour.itineraries && tour.itineraries.length > 0 && (
                <div id="itinerary">
                  <Itinerary days={tour.itineraries} />
                </div>
              )}
            </div>

            {/* Right Column: Details & Booking Form */}
            <div className="space-y-12">
              <div id="booking-section">
                <TourDetails tour={tour as any} />
              </div>
              <TrustBadges />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
