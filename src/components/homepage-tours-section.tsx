"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";

import tourService, { Tour } from "@/src/services/tour.service";
import { TourCard } from "@/src/components/TourCard";
import { Button } from "@/src/components/ui/button";

export function HomepageToursSection() {
  const locale = useLocale();
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await tourService.getTours();

        if (response.status && response.data.results) {
          setTours(response.data.results.slice(0, 6));
        }
      } catch (error) {
        console.error("Failed to load homepage tours:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  return (
    <section className="bg-[#fbfbf9] py-16 md:py-20" id="homepage-tours">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-5 sm:mb-12 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#007654]/20 bg-[#007654]/10 px-3 py-2 sm:mb-5 sm:px-4">
              <span className="h-2 w-2 rounded-full bg-[#007654]" />
              <span className="text-xs font-bold tracking-wider text-[#007654] sm:text-sm">
                Featured Tours
              </span>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-[#1a1a1a] sm:text-4xl md:text-5xl">
              Explore Our Signature Uzbekistan Tours
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:mt-5 sm:text-lg">
              Discover real tour packages designed around Uzbekistan&apos;s most iconic cities,
              cultural experiences, and Silk Road highlights.
            </p>
          </div>

          <Link href={`/${locale}/tour`} className="w-full shrink-0 md:w-auto">
            <Button className="h-12 w-full rounded-2xl bg-[#007654] px-6 font-black text-white hover:bg-[#008c64] sm:h-14 sm:px-8 md:w-auto">
              View All Tours
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-[480px] animate-pulse rounded-[24px] border border-[#f0f0f0] bg-white sm:h-[520px] sm:rounded-[32px]"
              />
            ))}
          </div>
        ) : tours.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
            {tours.map((tour) => (
              <div key={tour.id} className="h-full">
                <TourCard tour={tour} />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-[24px] border border-dashed border-[#007654]/20 bg-white px-6 py-12 text-center sm:rounded-[32px] sm:px-8 sm:py-16">
            <h3 className="text-xl font-black text-[#1a1a1a] sm:text-2xl">Tour packages are coming soon</h3>
            <p className="mt-3 text-sm text-gray-600 sm:text-base">
              We could not load tour packages right now. Please try again shortly or browse the
              full tours page.
            </p>
            <Link href={`/${locale}/tour`} className="mt-6 inline-block w-full sm:w-auto">
              <Button className="h-12 w-full rounded-2xl bg-[#007654] px-6 font-bold text-white hover:bg-[#008c64] sm:w-auto">
                Open Tours Page
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
