"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Printer,
  ChevronRight,
  MapPin,
  Compass,
  ArrowRight
} from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  image: string;
}

interface ItineraryProps {
  days?: ItineraryDay[];
}

export function Itinerary({ days }: ItineraryProps) {
  const t = useTranslations("tour_uzbekistan.itinerary");
  const [activeDay, setActiveDay] = useState(1);

  if (!days || days.length === 0) {
    return null;
  }

  const handlePrint = () => {
    window.print();
  };

  const currentDay = days.find(d => d.day === activeDay) || days[0];

  return (
    <div className="w-full py-12 bg-transparent" id="itinerary">
      <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#dcfae7] px-3 py-1.5 rounded-full mb-3">
            <Compass size={14} className="text-[#007654]" />
            <span className="text-[9px] font-bold tracking-widest text-[#007654]">Expedition plan</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] tracking-tight">
            {t("title")}
          </h2>
        </div>

        <Button
          variant="outline"
          onClick={handlePrint}
          className="h-10 px-5 border-gray-200 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-gray-50"
        >
          <Printer size={16} />
          <span className="hidden sm:inline">{t("print")}</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Timeline List */}
        <div className="lg:col-span-5 space-y-2 max-h-[500px] overflow-y-auto pr-2">
          {days.map((day) => (
            <motion.div
              key={day.day}
              onClick={() => setActiveDay(day.day)}
              className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-300 border ${activeDay === day.day ? "bg-white border-[#007654] shadow-md" : "bg-transparent border-transparent hover:bg-white/50 hover:border-gray-100" }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${activeDay === day.day ? "bg-[#007654] text-white" : "bg-gray-100 text-gray-400 group-hover:bg-[#dcfae7] group-hover:text-[#007654]" }`}>
                  {day.day}
                </div>
                <div className="flex-grow">
                  <p className={`text-[9px] font-bold tracking-widest mb-0.5 transition-colors ${activeDay === day.day ? "text-[#007654]/60" : "text-gray-400" }`}>
                    Day {day.day}
                  </p>
                  <h4 className={`text-sm font-semibold transition-colors line-clamp-1 ${activeDay === day.day ? "text-[#1a1a1a]" : "text-gray-500" }`}>
                    {day.title}
                  </h4>
                </div>
                <ChevronRight size={18} className={`text-[#007654] transition-opacity ${activeDay === day.day ? "opacity-100" : "opacity-0"}`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Side: Day Details */}
        <div className="lg:col-span-7 sticky top-24 h-fit">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={currentDay.image}
                  alt={currentDay.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="bg-[#007654] px-4 py-1.5 rounded-full text-white text-[10px] font-bold tracking-wider">
                    Day {activeDay}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">
                  {currentDay.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {currentDay.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin size={14} className="text-[#007654]" />
                    <span className="text-[10px] font-bold tracking-wider">Tour stop</span>
                  </div>
                  {activeDay < days.length && (
                    <Button
                      onClick={() => setActiveDay(activeDay + 1)}
                      variant="ghost"
                      className="text-[#007654] text-sm font-semibold hover:bg-[#dcfae7] h-9 px-3 rounded-lg"
                    >
                      {t("next_day")}
                      <ArrowRight size={14} className="ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
