"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import config from "../config";

export function HeroSection() {
  const t = useTranslations("hero");
  const [bannerImages, setBannerImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch(`${config.BASE_URL}/api/banner/`);
        const data = await res.json();

        if (data.status && data.data.results.length > 0) {
          const images = data.data.results.map((item: any) => item.image);
          setBannerImages(images);
        }
      } catch (error) {
        console.error("Banner error:", error);
      }
    };

    fetchBanner();
  }, []);

  useEffect(() => {
    if (bannerImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [bannerImages]);

  return (
    <section className="relative w-full h-[280px] sm:h-[350px] md:h-[450px] lg:h-[560px] overflow-hidden">
      {/* Animated Background Images */}
      <AnimatePresence mode="wait">
        {bannerImages.length > 0 ? (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={bannerImages[currentIndex]}
              alt={`Banner ${currentIndex + 1}`}
              fill
              priority
              quality={95}
              className="object-cover object-center w-full h-full"
              sizes="100vw"
            />
          </motion.div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#007654] to-[#004d36]" />
        )}
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Ken Burns effect for static fallback */}
      {bannerImages.length === 1 && (
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          <Image
            src={bannerImages[0]}
            alt="Banner"
            fill
            priority
            quality={95}
            className="object-cover"
          />
        </motion.div>
      )}

      {/* Hero Content with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute inset-0 flex items-center justify-center z-10"
      >
        <div className="text-center text-white px-4 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
           className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight text-gray-200"
style={{
  textShadow: "0 3px 15px rgba(0,0,0,0.7)"
}}
          >
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-sm sm:text-base md:text-lg text-white font-medium max-w-2xl mx-auto"
            style={{ textShadow: "0 2px 10px rgba(141, 140, 140, 0.7)" }}
          >
            {t("description")}
          </motion.p>
        </div>
      </motion.div>

      {/* Bottom Trust Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 via-black/50 to-transparent py-5 px-4"
      >
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-5xl mx-auto">
          {[
            { key: "EXCLUSIVELY_FOR_SOLO_TRAVELLERS" },
            { key: "YOUR_MONEY_PROTECTED" },
            { key: "HOLIDAY_ASSURANCE_GUARANTEE" },
            { key: "NO_SINGLE_SUPPLEMENT" }
          ].map((item, idx) => (
            <motion.span
              key={item.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + idx * 0.1 }}
              className="text-[10px] sm:text-xs text-white/80 font-semibold uppercase tracking-wider"
            >
              {t(item.key)}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Dots Indicator */}
      {bannerImages.length > 1 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {bannerImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all duration-300 rounded-full ${idx === currentIndex
                ? "w-8 h-2 bg-[#007654]"
                : "w-2 h-2 bg-white/50 hover:bg-white/80"
                }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}