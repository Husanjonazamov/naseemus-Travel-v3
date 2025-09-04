"use client";

import { Button } from "./ui/button";
import { Printer, Download } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function Itinerary() {
  const t = useTranslations("tour_uzbekistan.itinerary");
  const [selectedDay, setSelectedDay] = useState(1);

  const days = Array.from({ length: 10 }, (_, index) => ({
    day: index + 1,
    title: t(`days.${index + 1}.title`),
    description: t(`days.${index + 1}.description`),
    image: t(`days.${index + 1}.image`),
  }));

  const currentDay = days.find((day) => day.day === selectedDay) || days[0];

  const handleNextDay = () => {
    if (selectedDay < days.length) {
      setSelectedDay(selectedDay + 1);
    }
  };

  return (
    <div className="py-8 mt-4">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h2 className="text-3xl font-bold text-[#007654]">{t("title")}</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Printer className="w-4 h-4 mr-2" />
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
            </Button>
            <Button className="bg-[#007654] hover:bg-[#006148] text-white">
              {t("print")}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Scrollable List */}
          <div className="h-[28rem] overflow-y-auto border-r pr-2 lg:block hidden">
            {days.map((day) => (
              <div
                key={day.day}
                className={`py-3 px-2 cursor-pointer border-b transition-colors ${
                  selectedDay === day.day
                    ? "text-[#007654] font-semibold"
                    : "text-gray-700 hover:text-[#007654]"
                }`}
                onClick={() => setSelectedDay(day.day)}
              >
                {t("day_label", { day: day.day })} - {day.title}
              </div>
            ))}
          </div>

          {/* Mobile Dropdown */}
          <div className="lg:hidden mb-4">
            <select
              className="w-full border rounded-lg p-2 text-gray-700"
              value={selectedDay}
              onChange={(e) => setSelectedDay(Number(e.target.value))}
            >
              {days.map((day) => (
                <option key={day.day} value={day.day}>
                  {t("day_label", { day: day.day })} - {day.title}
                </option>
              ))}
            </select>
          </div>

          {/* Right Panel - Image and Content */}
          <div className="flex flex-col h-[28rem]">
            <motion.img
              key={currentDay.image}
              src={currentDay.image || "/placeholder.svg"}
              alt={`${t("day_label", { day: currentDay.day })} - ${currentDay.title}`}
              className="w-full h-64 object-cover rounded-lg shadow-md"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />

            <div className="mt-3 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-[#007654] mb-2">
                {t("day_heading", { day: currentDay.day, title: currentDay.title.toUpperCase() })}
              </h3>
              <p className="text-gray-700 leading-relaxed flex-grow">
                {currentDay.description}
              </p>
              <div className="flex justify-end mt-4">
                <Button
                  className="bg-[#007654] hover:bg-[#006148] text-white"
                  onClick={handleNextDay}
                  disabled={selectedDay >= days.length}
                >
                  {selectedDay >= days.length
                    ? t("end_of_journey")
                    : t("next_day")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
