"use client";

import React, { useState, useEffect } from "react";
import apiClient from "@/src/lib/api-client";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

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

        // Group by category
        const catMap: { [key: string]: Tour[] } = {};
        tours.forEach((tour) => {
          const catTitle = tour.category?.title || "Other";
          if (!catMap[catTitle]) catMap[catTitle] = [];
          catMap[catTitle].push(tour);
        });

        const catArray: Category[] = Object.keys(catMap).map((title) => ({
          title,
          tours: catMap[title].slice(0, 4), // Show up to 4 tours per category
        }));

        setCategories(catArray);
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
      <div className="p-12 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#007654]"></div>
      </div>
    );
  }

  return (
    <div className="p-8 max-h-[70vh] overflow-y-auto no-scrollbar">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {categories.map((category) => (
          <div key={category.title} className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#007654]/60 border-b border-gray-100 pb-3 italic">
              {category.title}
            </h3>
            <div className="grid gap-4">
              {category.tours.map((tour) => (
                <Link
                  key={tour.id}
                  href={`/${locale}/tour/${tour.slug}`}
                  className="group flex flex-col gap-3 p-3 -m-3 rounded-2xl hover:bg-[#dcfae7]/40 transition-all duration-500"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900 group-hover:text-[#007654] transition-colors line-clamp-1">
                      {tour.title}
                    </h4>
                    <p className="text-xs text-gray-500 font-medium mt-1 line-clamp-1">
                      {t("discover_beauty")} {category.title}
                    </p>
                    <div className="flex items-center gap-2 mt-3 text-[10px] font-black uppercase tracking-wider text-[#007654] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                      <span>{t("view_detail")}</span>
                      <div className="h-[1px] w-4 bg-[#007654]" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-sm font-bold text-gray-900">{t("cant_find")}</p>
          <p className="text-xs text-gray-500 font-medium mt-1">{t("explore_all")}</p>
        </div>
        <Link href={`/${locale}/tour`}>
          <button className="bg-[#007654] text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-[#005c42] transition-colors shadow-lg shadow-[#007654]/10">
            {t("view_all_tours")}
          </button>
        </Link>
      </div>
    </div>
  );
};
