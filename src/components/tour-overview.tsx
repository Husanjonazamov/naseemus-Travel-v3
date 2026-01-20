"use client";

import { Plane, MapPin, X, Compass, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TourOverviewProps {
  tour: {
    title: string;
    description: string;
    maps?: string | null;
    category?: { id: number; title: string } | null;
  };
}

export function TourOverview({ tour }: TourOverviewProps) {
  const t = useTranslations("tour_uzbekistan");
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="flex flex-col gap-10">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#dcfae7] px-4 py-2 rounded-full">
            <Compass size={16} className="text-[#007654]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#007654]">Journey Overview</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] tracking-tight">
            Capturing the Essence of Your Stay
          </h2>
          <div className="prose prose-lg text-gray-500 font-medium leading-[1.8] max-w-none">
            {tour.description}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#dcfae7] rounded-2xl flex items-center justify-center text-[#007654]">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Focus</p>
              <p className="text-lg font-bold text-[#1a1a1a]">Classic Touring</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#dcfae7] rounded-2xl flex items-center justify-center text-[#007654]">
              <Plane size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Transport</p>
              <p className="text-lg font-bold text-[#1a1a1a]">Flight Choices Available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Map Integration */}
      <div className="relative group rounded-[40px] overflow-hidden border-8 border-white shadow-2xl">
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
        <img
          src={tour.maps || "/images/uzbekistan-tour-map.png"}
          alt={t("map_alt")}
          className="w-full h-[400px] object-cover transition-transform duration-[2000ms] group-hover:scale-105"
        />
        <div className="absolute bottom-6 right-6 z-20">
          <button
            onClick={() => setIsMapOpen(true)}
            className="bg-white/90 backdrop-blur-xl text-[#007654] px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl border border-white hover:bg-[#007654] hover:text-white transition-all duration-300"
          >
            {t("tabs.enlarge_map")}
          </button>
        </div>
      </div>

      {/* Highlights / Inclusions Mock */}
      <div className="bg-[#f0f9f4] p-10 rounded-[40px] border border-[#d1f2e1]">
        <h3 className="text-xl font-black text-[#007654] mb-8 uppercase tracking-widest text-center">Standard Inclusions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            "Airport transfers",
            "English-speaking guide",
            "Breakfast Daily",
            "Sightseeing tours",
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center gap-3">
              <CheckCircle2 size={24} className="text-[#007654]" />
              <span className="text-sm font-bold text-[#1a1a1a]">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isMapOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-lg" onClick={() => setIsMapOpen(false)} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]"
            >
              <button
                className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center bg-black/50 text-white rounded-full hover:bg-black transition-colors"
                onClick={() => setIsMapOpen(false)}
              >
                <X size={24} />
              </button>
              <img
                src={tour.maps || "/images/uzbekistan-tour-map.png"}
                alt={tour.title}
                className="w-full h-auto max-h-[85vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
