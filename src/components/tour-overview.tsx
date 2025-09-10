import { Plane, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

export function TourOverview() {
  const t = useTranslations("tour_uzbekistan");

  return (
    <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 mt-6 sm:mt-8 mb-6 sm:mb-8">
      <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Chap qism - Matn */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#007654] mb-4 sm:mb-5">
              {t("title")}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4 sm:mb-5 text-sm sm:text-base">
              {t("overview")}
            </p>

            <div className="flex items-center gap-3 sm:gap-4 mb-3">
              <MapPin className="w-5 h-5 text-[#007654]" />
              <span className="font-semibold text-sm sm:text-base">
                {t("type")}
              </span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <Plane className="w-5 h-5 text-[#007654]" />
              <span className="font-semibold text-sm sm:text-base">
                {t("flight_choices")}
              </span>
            </div>
          </div>

          {/* O'ng qism - Xarita */}
          <div className="relative">
            <img
              src="/images/uzbekistan-tour-map.png"
              alt={t("map_alt")}
              className="w-full h-56 sm:h-72 lg:h-80 object-cover rounded-lg shadow-md"
            />
            {/* Mobil uchun tugma rasmdan pastga tushadi */}
            <div className="absolute bottom-3 right-3 hidden sm:block">
              <button className="text-[#007654] hover:underline font-semibold text-sm sm:text-base">
                {t("enlarge_map")} →
              </button>
            </div>
          </div>

          {/* Faqat mobil uchun enlarge tugmasi */}
          <div className="sm:hidden mt-3 flex justify-center">
            <button className="text-[#007654] hover:underline font-semibold text-sm">
              {t("enlarge_map")} →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
