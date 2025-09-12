"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useLocale, useTranslations } from "next-intl"; // useLocale
import config from "@/src/config";

import { Header } from "@/src/components/header";
import { TrustBadges } from "@/src/components/trust-badges";
import { PopularDestinations } from "@/src/components/popular-destinations";
import { NewTouring } from "@/src/components/new-touring-holidays";
import { Footer } from "@/src/components/footer";
import { Itinerary } from "@/src/components/itenerary";
import { TourOverview } from "@/src/components/tour-overview";
import { TourDetails } from "@/src/components/tour-details";

interface Tour {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: string;
  image: string;
  date: number;
  category?: { id: number; title: string } | null;
  is_popular: boolean;
  is_new: boolean;
  images: string[];
}

export default function TourDetail() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale(); // joriy til
  const t = useTranslations("tour_uzbekistan");

  const slug = params.slug;
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTour = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        // APIga til header orqali yuboriladi
        const res = await axios.get(
          `${config.BASE_URL}/api/tour/${encodeURIComponent(slug)}/`,
          {
            headers: {
              "Accept-Language": locale, // backend shu tilga mos ma’lumot qaytaradi
            },
          }
        );
        setTour(res.data.data); // backenddan kelgan ma’lumot
      } catch (err: any) {
        console.error("Tourni olishda xatolik:", err);
        if (err.response?.status === 404) {
          router.push("/404");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [slug, locale, router]);

  if (loading) return <div className="text-center mt-10">{t("loading")}</div>;
  if (!tour) return <div className="text-center mt-10">{t("tour_not_found")}</div>;

  return (
    <div className="w-full overflow-x-hidden">
      {/* Headerga locale yuboriladi */}
      <Header locale={locale} />
      <TrustBadges />

      {/* Hero Section */}
      <section className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover absolute inset-0"
          quality={90}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-20 flex items-center justify-center h-full px-4">
          <h1 className="text-3xl sm:text-5xl font-bold text-white drop-shadow-lg text-center break-words">
            {tour.title} {/* Backenddan kelgan asl nom */}
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/40 text-white py-4 px-2 sm:px-4">
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 max-w-7xl mx-auto text-center">
          
            <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-green-500">
              ${tour.price}
            </span>
            <span className="text-sm sm:text-base md:text-lg">
               {tour.date} {t("duration")}
            </span>
            {tour.is_popular && (
              <span className="text-sm sm:text-base md:text-lg text-yellow-400 font-bold">
                {t("popular_tour")}
              </span>
            )}
            {tour.is_new && (
              <span className="text-sm sm:text-base md:text-lg text-blue-400 font-bold">
                {t("new_tour")}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Kontent */}
      <TourDetails tour={tour} />
      <TourOverview tour={tour} />
      <Itinerary />
      <PopularDestinations />
      <NewTouring />
      <Footer />
    </div>
  );
}
