"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "@/src/config";
import { Header } from "@/src/components/header";
import { Footer } from "@/src/components/footer";
import { TourCard } from "@/src/components/TourCard";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowDown } from "lucide-react";

interface Tour {
  id: number;
  title: string;
  slug: string;
  image: string;
  category: { id: number; title: string } | null;
  price: string;
  count_day?: number;
  description?: string;
  date?: number;
}

export default function TourListPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [bannerImages, setBannerImages] = useState<string[]>([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const t = useTranslations("searchPage");
  const tHero = useTranslations("hero"); // Reuse hero translations for trust badges or general vibe

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [toursRes, bannerRes] = await Promise.all([
          axios.get(`${config.BASE_URL}/api/tour/`),
          axios.get(`${config.BASE_URL}/api/banner/`),
        ]);

        if (toursRes.data?.data?.results) {
          setTours(toursRes.data.data.results);
        }

        if (bannerRes.data?.data?.results?.length > 0) {
          setBannerImages(bannerRes.data.data.results.map((item: any) => item.image));
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Banner Slideshow
  useEffect(() => {
    if (bannerImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentBannerIndex((prev) => (prev + 1) % bannerImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [bannerImages]);

  const scrollToTours = () => {
    const toursSection = document.getElementById("tours-grid");
    toursSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative h-[56vh] min-h-[420px] w-full overflow-hidden sm:min-h-[460px] md:min-h-[500px]">
        <AnimatePresence mode="wait">
          {bannerImages.length > 0 ? (
            <motion.div
              key={currentBannerIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
            >
              <Image
                src={bannerImages[currentBannerIndex]}
                alt="Tour Banner"
                fill
                className="object-cover object-center"
                priority
              />
            </motion.div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#007654] to-[#004d36]" />
          )}
        </AnimatePresence>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Hero Content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center sm:px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4 text-4xl font-black tracking-tight text-white drop-shadow-2xl sm:mb-6 md:text-6xl lg:text-7xl"
          >
            {t("tours")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 max-w-2xl text-base font-medium text-white/90 drop-shadow-lg sm:text-lg md:mb-10 md:text-2xl"
          >
            {t("bestDirections")}
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onClick={scrollToTours}
            className="group flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20 sm:px-8 sm:py-4"
          >
            {t("seePrices")}
            <ArrowDown className="group-hover:translate-y-1 transition-transform" />
          </motion.button>
        </div>
      </section>

      {/* --- TOURS GRID SECTION --- */}
      <main id="tours-grid" className="mx-auto w-full max-w-[1400px] flex-grow px-4 py-16 md:px-8 md:py-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#007654]"></div>
            <p className="text-gray-500 font-medium animate-pulse">Yuklanmoqda...</p>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8"
          >
            {tours.map((tour) => (
              <motion.div
                key={tour.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                className="h-[480px] sm:h-[520px]"
              >
                <TourCard tour={tour} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && tours.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl font-medium">{t("noResults")}</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
