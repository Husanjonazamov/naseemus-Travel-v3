"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "@/src/config";
import Image from "next/image";
import Link from "next/link"; // Linkni import qilamiz

interface Tour {
  id: number;
  title: string;
  image: string;
  category: { id: number; title: string } | null;
}

interface Category {
  title: string;
  tours: Tour[];
}

// Title -> URL friendly slug funksiyasi
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, ""); // faqat harflar, raqamlar va '-' qoldiradi

export const TourDrop = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axios.get(`${config.BASE_URL}/api/tour/`);
        const tours: Tour[] = res.data.data.results;
        setTours(tours);

        // Kategoriyalarni guruhlash
        const catMap: { [key: string]: Tour[] } = {};
        tours.forEach((tour) => {
          if (tour.category?.title) {
            if (!catMap[tour.category.title]) catMap[tour.category.title] = [];
            catMap[tour.category.title].push(tour);
          }
        });

        const catArray: Category[] = Object.keys(catMap).map((title) => ({
          title,
          tours: catMap[title],
        }));

        setCategories(catArray);
      } catch (err) {
        console.error("Tourlarni olishda xatolik:", err);
      }
    };

    fetchTours();
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-6 mt-6 max-h-[80vh] overflow-y-auto bg-white/70 backdrop-blur-md shadow-lg rounded-xl p-4">
        {tours.map((tour) => (
          <Link
            key={tour.id}
            href={`/tour/${slugify(tour.title)}`} // Title asosida URL
            className="flex items-center gap-4 border-b border-gray-200 pb-3 hover:bg-gray-100/70 rounded-lg transition"
          >
            <div className="relative w-20 h-16 flex-shrink-0">
              <Image
                src={tour.image}
                alt={tour.title}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <h4 className="text-base md:text-lg font-medium text-gray-800 hover:text-green-700 transition">
              {tour.title}
            </h4>
          </Link>
        ))}
      </div>
    </div>
  );
};
