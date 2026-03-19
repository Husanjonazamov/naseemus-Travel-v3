"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import apiClient from "@/src/lib/api-client";

interface Tour {
  id: number;
  title: string;
  slug: string;
  image: string;
  category: { id: number; title: string } | null;
}

interface Category {
  title: string;
  tours: Tour[];
}

export const TourDrop = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const locale = useLocale();
  const t = useTranslations("tour_dropdown");

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await apiClient.get("/api/tour/");
        const tours: Tour[] = res.data.data.results;

        const groupedTours = tours.reduce<Record<string, Tour[]>>((acc, tour) => {
          const title = tour.category?.title || "Other";
          if (!acc[title]) {
            acc[title] = [];
          }
          acc[title].push(tour);
          return acc;
        }, {});

        setCategories(
          Object.entries(groupedTours).map(([title, categoryTours]) => ({
            title,
            tours: categoryTours.slice(0, 6),
          }))
        );
      } catch (err) {
        console.error("Error fetching tours:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-[#007654]" />
      </div>
    );
  }

  return (
    <div className="max-h-[64vh] overflow-y-auto p-3 no-scrollbar">
      <div className="flex flex-wrap items-start gap-3">
        {categories.map((category) => (
          <div
            key={category.title}
            className="w-full max-w-[270px] space-y-3 rounded-2xl border border-gray-100/80 bg-white p-3 shadow-sm"
          >
            <div className="flex items-end justify-between gap-3 border-b border-gray-100 pb-2">
              <h3 className="text-xs font-black italic tracking-[0.16em] text-[#007654]/70">
                {category.title}
              </h3>
              <span className="text-[10px] font-black tracking-[0.14em] text-gray-400">
                {category.tours.length} packages
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {category.tours.map((tour) => (
                <Link
                  key={tour.id}
                  href={`/${locale}/tour/${tour.slug}`}
                  className="group flex flex-col items-start gap-2 rounded-xl border border-gray-100 p-2 transition-all duration-300 hover:border-[#007654]/20 hover:bg-[#dcfae7]/20 hover:shadow-[0_12px_24px_-18px_rgba(0,118,84,0.35)]"
                >
                  <div className="relative h-16 w-full overflow-hidden rounded-lg shadow-sm transition-shadow group-hover:shadow-md">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-center">
                    <div>
                      <h4 className="line-clamp-2 text-xs font-bold text-gray-900 transition-colors group-hover:text-[#007654]">
                        {tour.title}
                      </h4>
                      <p className="mt-0.5 line-clamp-2 text-[10px] font-medium text-gray-500">
                        {t("discover_beauty")} {category.title}
                      </p>
                    </div>

                    <div className="mt-2 flex items-center gap-1.5 text-[9px] font-black tracking-wide text-[#007654]">
                      <span>{t("view_detail")}</span>
                      <div className="h-[1px] w-3 bg-[#007654]" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-col items-start gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col">
          <p className="text-sm font-bold text-gray-900">{t("cant_find")}</p>
          <p className="mt-1 text-xs font-medium text-gray-500">{t("explore_all")}</p>
        </div>
        <Link href={`/${locale}/tour`} className="w-full sm:w-auto">
          <button className="w-full rounded-xl bg-[#007654] px-4 py-2 text-sm font-bold text-white shadow-lg shadow-[#007654]/10 transition-colors hover:bg-[#005c42] sm:w-auto sm:px-5">
            {t("view_all_tours")}
          </button>
        </Link>
      </div>
    </div>
  );
};
