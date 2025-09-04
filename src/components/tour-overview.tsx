import { Plane, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

export function TourOverview() {
  const t = useTranslations("tour_uzbekistan");

  return (
    <div className="container max-w-6xl mx-auto px-6 py-10 mt-8 mb-8">
      <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Chap qism - Matn */}
          <div>
            <h2 className="text-2xl font-bold text-[#007654] mb-5">
              {t("title")}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-5 text-base">
              {t("overview")}
            </p>

            <div className="flex items-center gap-4 mb-3">
              <MapPin className="w-5 h-5 text-[#007654]" />
              <span className="font-semibold text-base">
                {t("type")}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Plane className="w-5 h-5 text-[#007654]" />
              <span className="font-semibold text-base">
                {t("flight_choices")}
              </span>
            </div>
          </div>

          {/* O'ng qism - Xarita */}
          <div className="relative">
            <img
              src="/images/uzbekistan-tour-map.png"
              alt={t("map_alt")}
              className="w-full h-80 object-cover rounded-lg shadow-md"
            />
            <div className="absolute bottom-3 right-3">
              <button className="text-[#007654] hover:text-[#007654] font-semibold text-base">
                {t("enlarge_map")} →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
