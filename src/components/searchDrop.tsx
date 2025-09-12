"use client";

import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { PopularDestinations } from "./popular-destinations";
import config from "../config";
import { useTranslations } from "next-intl";

const months = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

interface Tour {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: string;
  image: string;
  is_popular: boolean;
  is_new: boolean;
}

interface SearchDropdownProps {
  onClose: () => void;
}

export function SearchDropdown({ onClose }: SearchDropdownProps) {
  const t = useTranslations('SearchDropdown'); // JSON translate fayllardan
  const currentYear = new Date().getFullYear();

  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [departureDate, setDepartureDate] = useState<{ month: string; year: number } | null>(null);
  const [returnDate, setReturnDate] = useState<{ month: string; year: number } | null>(null);
  const [passengers, setPassengers] = useState(1);
  const [showPicker, setShowPicker] = useState<"departure" | "return" | null>(null);
  const [year, setYear] = useState(currentYear);

  // API’dan ma’lumotlarni olish
  const [popularTours, setPopularTours] = useState<Tour[]>([]);
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axios.get(`${config.BASE_URL}/api/tour/?page=1`);
        const popular = res.data.data.results.filter((tour: Tour) => tour.is_popular).slice(0, 8);
        setPopularTours(popular);
      } catch (error) {
        console.error("API Error:", error);
      }
    };
    fetchTours();
  }, []);

  const handleSearch = () => {
    console.log({ departureCity, arrivalCity, departureDate, returnDate, passengers });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center">
      {/* Overlay with blur */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity"
      />

      {/* Fullscreen Modal */}
      <div className="relative w-full h-full bg-white flex flex-col z-[2100]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b flex-shrink-0">
          <h2 className="text-2xl font-semibold">{t('title')}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex-1 overflow-y-auto flex flex-col gap-6">
          {/* Inputs */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex flex-col">
              <label className="mb-1 font-medium text-gray-700">{t('from')}</label>
              <input
                type="text"
                placeholder={t('fromPlaceholder')}
                value={departureCity}
                onChange={(e) => setDepartureCity(e.target.value)}
                className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex-1 flex flex-col">
              <label className="mb-1 font-medium text-gray-700">{t('to')}</label>
              <input
                type="text"
                placeholder={t('toPlaceholder')}
                value={arrivalCity}
                onChange={(e) => setArrivalCity(e.target.value)}
                className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">{t('passengers')}</label>
              <div className="flex items-center border rounded-lg px-3 py-2 justify-between w-full">
                <button
                  onClick={() => setPassengers(Math.max(1, passengers - 1))}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span>{passengers}</span>
                <button
                  onClick={() => setPassengers(passengers + 1)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Date selectors */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="mb-1 font-medium text-gray-700">{t('departureDate')}</label>
              <div
                className="border rounded-lg px-3 py-2 cursor-pointer hover:border-green-500"
                onClick={() => setShowPicker("departure")}
              >
                {departureDate ? `${departureDate.month} ${departureDate.year}` : t('selectDate')}
              </div>
            </div>
            <div className="flex-1">
              <label className="mb-1 font-medium text-gray-700">{t('returnDate')}</label>
              <div
                className="border rounded-lg px-3 py-2 cursor-pointer hover:border-green-500"
                onClick={() => setShowPicker("return")}
              >
                {returnDate ? `${returnDate.month} ${returnDate.year}` : t('selectDate')}
              </div>
            </div>
          </div>

          {/* Popular Destinations full width, responsive */}
          <div className="w-full">
            <PopularDestinations tours={popularTours} />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t flex-shrink-0">
          <button
            onClick={handleSearch}
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            {t('searchNow')}
          </button>
        </div>
      </div>

      {/* Date Picker modal */}
      {showPicker && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-[3000] p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xs md:max-w-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setYear(year - 1)} className="p-2 rounded hover:bg-gray-100">
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <span className="font-semibold text-lg">{year}</span>
              <button onClick={() => setYear(year + 1)} className="p-2 rounded hover:bg-gray-100">
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {months.map((month) => (
                <button
                  key={month}
                  onClick={() => {
                    if (showPicker === "departure") setDepartureDate({ month, year });
                    else setReturnDate({ month, year });
                    setShowPicker(null);
                  }}
                  className="px-3 py-2 border rounded-lg hover:bg-green-50 text-center"
                >
                  {month}
                </button>
              ))}
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={() => setShowPicker(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                {t('cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
