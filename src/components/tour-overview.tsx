import { Plane, MapPin, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface TourOverviewProps {
  tour: {
    title: string;
    description: string;
    maps?: string | null; // backenddan keladigan xarita URL
    category?: { id: number; title: string } | null;
  };
}

export function TourOverview({ tour }: TourOverviewProps) {
  const t = useTranslations("tour_uzbekistan");
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 mt-6 sm:mt-8 mb-6 sm:mb-8">
      <div className="bg-[#dcfae7] rounded-2xl shadow-lg p-5 sm:p-6 lg:p-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Chap qism - Matn */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#007654] mb-4 sm:mb-5">
              {tour.title}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4 sm:mb-5 text-sm sm:text-base">
              {tour.description}
            </p>

            {/* CLASSIC TOURING */}
            <div className="flex items-center gap-3 sm:gap-4 mb-3">
              <MapPin className="w-5 h-5 text-[#007654]" />
              <span className="font-semibold text-sm sm:text-base">
                CLASSIC TOURING
              </span>
            </div>

            {/* FLIGHT CHOICES */}
            <div className="flex items-center gap-3 sm:gap-4">
              <Plane className="w-5 h-5 text-[#007654]" />
              <span className="font-semibold text-sm sm:text-base">
                FLIGHT CHOICES
              </span>
            </div>

            {/* Agar category mavjud bo‘lsa, qo‘shimcha ko‘rsatish */}
            {tour.category && (
              <div className="flex items-center gap-3 sm:gap-4 mt-3">
                <MapPin className="w-5 h-5 text-[#007654]" />
                <span className="font-semibold text-sm sm:text-base">
                  {tour.category.title}
                </span>
              </div>
            )}
          </div>

          {/* O'ng qism - Xarita */}
          <div className="relative">
            <img
              src={tour.maps || "/images/uzbekistan-tour-map.png"}
              alt={t("map_alt")}
              className="w-full h-56 sm:h-72 lg:h-80 object-cover rounded-lg shadow-md"
            />
            {/* Mobil uchun tugma rasmdan pastga tushadi */}
            <div className="absolute bottom-3 right-3">
              <button
                className="text-[#007654] hover:underline font-semibold text-sm sm:text-base"
                onClick={() => setIsMapOpen(true)}
              >
                {t("enlarge_map")} →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Map Modal */}
      {isMapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative max-w-4xl w-full p-4">
            <button
              className="absolute top-2 right-2 text-white bg-black/40 rounded-full p-2 hover:bg-black/60"
              onClick={() => setIsMapOpen(false)}
            >
              <X size={24} />
            </button>
            <img
              src={tour.maps || "/images/uzbekistan-tour-map.png"}
              alt={tour.title}
              className="w-full h-auto object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
