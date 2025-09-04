import { Button } from "./ui/button";
import { useTranslations } from "next-intl";

export function TourDetails() {
  const t = useTranslations("tour_uzbekistan");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        {/* Sarlavha */}
        <h1 className="text-3xl font-bold text-[#007654] mb-4">
          {t("title")}
        </h1>

        {/* Narx, Kun va Sana */}
        <div className="flex items-center justify-center gap-8 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#007654]">
              {t("price")}
            </div>
            <div className="text-sm text-gray-600">
              {t("price_label")}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#007654]">
              {t("duration")}
            </div>
            <div className="text-sm text-gray-600">
              {t("duration_label")}
            </div>
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
          <Button className="bg-[#007654] hover:bg-[#006148] text-white px-8 py-3">
            {t("cta_book")}
          </Button>
        </div>

        {/* Navigatsiya bo‘limi */}
        <div className="flex justify-center gap-8 border-b">
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
    </div>
  );
}
