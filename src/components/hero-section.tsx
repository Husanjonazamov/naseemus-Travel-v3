"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
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
        console.error("Banner rasmlarni olishda xato:", error);
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
      {/* Slayder rasmlar */}
      {bannerImages.length > 0 ? (
        bannerImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image}
              alt={`Banner ${index + 1}`}
              fill
              priority={index === 0} // Faqat birinchi rasm yuqori ustuvorlikda yuklansin
              quality={95}
              className="object-cover object-center w-full h-full"
              sizes="100vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNMQ3NbPqQGHK6Qd4Q+0n5oIhO9d3O7XOu4A4P9b6i8V3j7zwj0="
            />
          </div>
        ))
      ) : (
        // Agar rasm bo‘lmasa, fallback gradient
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-blue-800" />
      )}

      {/* Qora overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Pastdagi banner matnlar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 via-black/50 to-transparent text-white py-6 sm:py-8 px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-7xl mx-auto text-center">
          <span className="text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wider">
            {t("EXCLUSIVELY_FOR_SOLO_TRAVELLERS")}
          </span>
          <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-400 drop-shadow-lg">
            25
          </span>
          <span className="text-xs sm:text-sm md:text-base">
            {t("OVER_25_YEARS_EXPERTISE")}
          </span>
          <span className="text-xs sm:text-sm md:text-base">
            {t("YOUR_MONEY_PROTECTED")}
          </span>
          <span className="text-xs sm:text-sm md:text-base">
            {t("HOLIDAY_ASSURANCE_GUARANTEE")}
          </span>
          <span className="text-xs sm:text-sm md:text-base">
            {t("NO_SINGLE_SUPPLEMENT")}
          </span>
        </div>
      </div>

      {/* Nuqtalar (indikatorlar) */}
      {bannerImages.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-30">
          {bannerImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all duration-300 rounded-full ${
                idx === currentIndex
                  ? "w-10 h-3 bg-green-500"
                  : "w-3 h-3 bg-white/60 hover:bg-white/80"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}