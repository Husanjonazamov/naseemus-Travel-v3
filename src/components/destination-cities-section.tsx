"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { useLocale } from "next-intl";

import { destinations } from "@/src/lib/destinations";

export function DestinationCitiesSection() {
  const locale = useLocale() || "en";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#dcfae7]/30 py-16 md:py-20">
      <div className="absolute left-0 top-0 h-[420px] w-[420px] rounded-full bg-[#007654]/5 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[480px] w-[480px] rounded-full bg-[#007654]/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl sm:mb-12 md:mb-14">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#007654]/20 bg-[#007654]/10 px-3 py-2 sm:mb-6 sm:px-4">
            <span className="h-2 w-2 rounded-full bg-[#007654] animate-pulse" />
            <span className="text-xs font-bold tracking-wider text-[#007654] sm:text-sm">
              Silk Road Highlights
            </span>
          </div>

          <h2 className="text-3xl font-black tracking-tight text-[#1a1a1a] sm:text-4xl md:text-5xl">
            Discover the Silk Road Cities of Uzbekistan
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:mt-5 sm:text-lg">
            Explore Uzbekistan&apos;s most iconic cities through immersive travel guides designed to
            inspire your next cultural journey.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {destinations.map((city, index) => (
            <motion.div
              key={city.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
            >
              <Link
                href={`/${locale}/destinations/${city.slug}`}
                className="group block overflow-hidden rounded-[24px] border border-white/40 bg-white shadow-[0_24px_60px_-18px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_32px_80px_-18px_rgba(0,118,84,0.18)] sm:rounded-[32px]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={city.image}
                    alt={city.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-2 backdrop-blur-md sm:left-6 sm:top-6 sm:px-4">
                    <MapPin size={15} className="text-white" />
                    <span className="text-xs font-black tracking-[0.18em] text-white">
                      Uzbekistan
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8">
                    <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl md:text-4xl">
                      {city.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/85 md:mt-3 md:text-base">
                      {city.preview[(locale as "en" | "ru" | "uz") || "en"]}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-black tracking-wider text-white md:mt-6">
                      Explore destination
                      <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
