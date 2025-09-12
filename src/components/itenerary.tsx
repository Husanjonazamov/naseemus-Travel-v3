"use client";

import { Button } from "./ui/button";
import { Printer, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import axios from "axios";
import Link from "next/link";
import config from "@/src/config"; // BASE_URL shu yerda

interface Tour {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  date: number;
}

export function Itinerary() {
  const t = useTranslations("tour_uzbekistan.itinerary");
  const [tours, setTours] = useState<Tour[]>([]);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);

  useEffect(() => {
    async function fetchTours() {
      try {
        const res = await axios.get(`${config.BASE_URL}/api/tour/`);
        const data: Tour[] = res.data.data.results;
        setTours(data);
        if (data.length) setSelectedTour(data[0]);
      } catch (error) {
        console.error("API error:", error);
      }
    }
    fetchTours();
  }, []);

  const handleNextTour = () => {
    if (!selectedTour) return;
    const currentIndex = tours.findIndex((t) => t.id === selectedTour.id);
    if (currentIndex < tours.length - 1) {
      setSelectedTour(tours[currentIndex + 1]);
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
            {tours.map((tour) => (
              <Link key={tour.id} href={`/tour/${tour.slug}`}>
                <div
                  className={`py-3 px-2 cursor-pointer border-b transition-colors ${
                    selectedTour?.id === tour.id
                      ? "text-[#007654] font-semibold"
                      : "text-gray-700 hover:text-[#007654]"
                  }`}
                  onClick={() => setSelectedTour(tour)}
                >
                  {tour.title}
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile Dropdown */}
          <div className="lg:hidden mb-4">
            <select
              className="w-full border rounded-lg p-2 text-gray-700"
              value={selectedTour?.id || 0}
              onChange={(e) => {
                const tour = tours.find((t) => t.id === Number(e.target.value));
                if (tour) setSelectedTour(tour);
              }}
            >
              {tours.map((tour) => (
                <option key={tour.id} value={tour.id}>
                  {tour.title}
                </option>
              ))}
            </select>
          </div>

          {/* Right Panel - Image and Content */}
          <div className="flex flex-col h-[28rem]">
            <motion.img
              key={selectedTour?.image}
              src={selectedTour?.image || "/placeholder.svg"}
              alt={selectedTour?.title}
              className="w-full h-64 object-cover rounded-lg shadow-md"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />

            <div className="mt-3 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-[#007654] mb-2">
                <Link href={`/tour/${selectedTour?.slug}`}>
                  {selectedTour?.title}
                </Link>
              </h3>

              <p className="text-gray-700 leading-relaxed flex-grow">
                {selectedTour?.description}
              </p>
              <div className="flex justify-end mt-4">
                <Button
                  className="bg-[#007654] hover:bg-[#006148] text-white"
                  onClick={handleNextTour}
                  disabled={
                    !selectedTour ||
                    tours.findIndex((t) => t.id === selectedTour.id) ===
                      tours.length - 1
                  }
                >
                  {selectedTour &&
                  tours.findIndex((t) => t.id === selectedTour.id) ===
                    tours.length - 1
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
