"use client"; // Next.js 13+ client component uchun

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import config from "../config";

export function HeroSection() {
  const t = useTranslations("hero");
  const [bannerImages, setBannerImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // API dan banner rasmlarni olish
    const fetchBanner = async () => {
      try {
        const res = await fetch(`${config.BASE_URL}/api/banner/`);
        const data = await res.json();

        if (data.status && data.data.results.length > 0) {
          const images = data.data.results.map((item) => {
            console.log("Rasm URL:", item.image); // << map ichida item mavjud
            return item.image;
          });
          setBannerImages(images);
        }
      } catch (error) {
        console.error("Banner rasmlarni olishda xato:", error);
      }
    };

    fetchBanner();
  }, []);


  useEffect(() => {
    if (bannerImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % bannerImages.length);
      }, 5000); // 5 soniyada bir rasm almashtiriladi

      return () => clearInterval(interval);
    }
  }, [bannerImages]);

  return (
    <section className="relative w-full h-[280px] sm:h-[350px] md:h-[450px] overflow-hidden">
      {/* Background Image Slayder */}
      {bannerImages.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt={`Hero background ${index + 1}`}
          fill
          className={`object-cover absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          quality={90}
          priority
          sizes="100vw"
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content Section */}
      <div className="relative z-20 w-full h-full flex flex-col justify-between">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center h-full">
          <div className="flex-1"></div>
        </div>

        {/* Custom Banner */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/40 text-white py-4 sm:py-6 md:py-8 px-3 sm:px-6 w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 text-center items-center w-full max-w-7xl mx-auto">
            <span className="text-sm sm:text-base md:text-lg font-bold tracking-wide">
              {t("EXCLUSIVELY_FOR_SOLO_TRAVELLERS")}
            </span>
            <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-green-500">
              25
            </span>
            <span className="text-sm sm:text-base md:text-lg">
              {t("OVER_25_YEARS_EXPERTISE")}
            </span>
            <span className="text-sm sm:text-base md:text-lg">
              {t("YOUR_MONEY_PROTECTED")}
            </span>
            <span className="text-sm sm:text-base md:text-lg">
              {t("HOLIDAY_ASSURANCE_GUARANTEE")}
            </span>
            <span className="text-sm sm:text-base md:text-lg">
              {t("NO_SINGLE_SUPPLEMENT")}
            </span>
          </div>
        </div>

        {/* Slide Indicators */}
        {bannerImages.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
            {bannerImages.map((_, idx) => (
              <span
                key={idx}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                  idx === currentIndex ? "bg-green-500 w-4 h-4" : "bg-[#dcfae7]/50"
                }`}
                onClick={() => setCurrentIndex(idx)}
              ></span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
