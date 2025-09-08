"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";

export function TourDetails() {
  const t = useTranslations("tour_uzbekistan");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        {/* Sarlavha */}
        <h1 className="text-3xl font-bold text-[#007654] mb-4">
          {t("title")}
        </h1>

        {/* Narx, Kun va Sana */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#007654]">
              {t("price")}
            </div>
            <div className="text-sm text-gray-600">{t("price_label")}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#007654]">
              {t("duration")}
            </div>
            <div className="text-sm text-gray-600">{t("duration_label")}</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-[#007654]">
              {t("departure_dates")}
            </div>
            <div className="text-sm text-gray-600">
              {t("departure_dates_label")}
            </div>
          </div>  

          {/* Bron qilish tugmasi */}
          <Button
            onClick={() => setIsOpen(true)}
            className="
              bg-gradient-to-r from-[#007654] to-[#009e6f] 
              hover:from-[#006148] hover:to-[#00885d] 
              text-white px-8 py-6
              transition-transform transform hover:scale-105
              mt-4 md:mt-0
            "
          >
            {t("cta_book")}
          </Button>
        </div>

        {/* Navigatsiya bo‘limi */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 border-b text-sm md:text-base">
          <button className="pb-2 border-b-2 border-[#007654] text-[#007654] font-semibold">
            {t("tabs.discover")}
          </button>
          <button className="pb-2 text-gray-600 hover:text-[#007654]">
            {t("tabs.itinerary")}
          </button>
          <button className="pb-2 text-gray-600 hover:text-[#007654]">
            {t("tabs.accommodation")}
          </button>
          <button className="pb-2 text-gray-600 hover:text-[#007654]">
            {t("tabs.reviews")}
          </button>
          <button className="pb-2 text-gray-600 hover:text-[#007654]">
            {t("tabs.optional_excursions")}
          </button>
          <button className="pb-2 text-gray-600 hover:text-[#007654]">
            {t("tabs.dates")}
          </button>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Orqa fon */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Modal form */}
          <div className="relative bg-white rounded-t-2xl md:rounded-2xl shadow-xl p-4 md:p-6 w-full max-w-md md:max-w-lg z-10 
            h-[90vh] md:h-auto overflow-y-auto animate-slideUp">
            <h2 className="text-xl md:text-2xl font-bold text-[#007654] mb-4">
              {t("cta_book")}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ism
                </label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border rounded-lg focus:ring-[#007654] focus:border-[#007654]"
                  placeholder="Ismingizni kiriting"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Telefon raqam
                </label>
                <input
                  type="tel"
                  className="w-full mt-1 p-2 border rounded-lg focus:ring-[#007654] focus:border-[#007654]"
                  placeholder="+998 90 123 45 67"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nechi kishi
                </label>
                <input
                  type="number"
                  className="w-full mt-1 p-2 border rounded-lg focus:ring-[#007654] focus:border-[#007654]"
                  min="1"
                  placeholder="2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Sana
                </label>
                <input
                  type="date"
                  className="w-full mt-1 p-2 border rounded-lg focus:ring-[#007654] focus:border-[#007654]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Qo‘shimcha izoh
                </label>
                <textarea
                  className="w-full mt-1 p-2 border rounded-lg focus:ring-[#007654] focus:border-[#007654]"
                  rows={3}
                  placeholder="Masalan, alohida talablaringiz bo‘lsa yozing..."
                ></textarea>
              </div>

              <div className="flex flex-col md:flex-row justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="w-full md:w-auto"
                >
                  Bekor qilish
                </Button>
                <Button
                  type="submit"
                  className="w-full md:w-auto bg-[#007654] hover:bg-[#006148] text-white px-6"
                >
                  Yuborish
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
