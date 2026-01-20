"use client";

import { Bed, Star, Award } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function TrustBadges() {
  const t = useTranslations("trustBadges");

  const badges = [
    {
      icon: Bed,
      label: t("ROOM_OF_YOUR_OWN_GUARANTEED"),
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      icon: Star,
      label: t("RATED_EXCELLENT_ON_TRUSTPILOT"),
      color: "text-yellow-500",
      bg: "bg-yellow-50",
      fill: true
    },
    {
      icon: Award,
      label: t("OVER_25_YEARS_EXPERTISE"),
      color: "text-[#007654]",
      bg: "bg-[#dcfae7]"
    }
  ];

  return (
    <section className="w-full bg-white border-y border-gray-100 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-6 md:gap-4">
          {badges.map((badge, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 5 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-3 group"
            >
              <div className={`w-9 h-9 ${badge.bg} rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
                <badge.icon
                  size={18}
                  className={`${badge.color} ${badge.fill ? 'fill-current' : ''}`}
                />
              </div>
              <span className="text-[11px] font-semibold text-gray-700 leading-tight max-w-[140px]">
                {badge.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
