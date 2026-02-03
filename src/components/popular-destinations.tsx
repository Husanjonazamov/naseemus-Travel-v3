"use client"

import { useEffect, useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Button } from "./ui/button"
import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import axios from "axios"
import config from "../config"
import { TourCard } from "./TourCard"

export function PopularDestinations() {
  const t = useTranslations("Popular")
  const locale = useLocale() || "en"

  const [destinations, setDestinations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await axios.get(`${config.BASE_URL}/api/tour/`, {
          headers: { "Accept-Language": locale },
        })
        if (res.data.status && res.data.data.results) {
          const popularTours = res.data.data.results.filter(
            (tour: any) => tour.is_popular
          )
          setDestinations(popularTours.slice(0, 6))
        }
      } catch (error) {
        console.error("API error:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchDestinations()
  }, [locale])

  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1.2, spacing: 16 },
    breakpoints: {
      "(min-width: 768px)": { slides: { perView: 2, spacing: 20 }, drag: false },
      "(min-width: 1024px)": { slides: { perView: 3, spacing: 24 }, drag: false },
    },
  })

  return (
    <section className="py-24 px-4 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            {t("popularDestinations")}
          </h2>
          <p className="text-gray-500 text-lg">
            {t("description")}
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 animate-pulse rounded-2xl h-[450px]" />
            ))}
          </div>
        ) : (
          <div className="relative">
            {/* Desktop Grid */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-8">
              {destinations.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>

            {/* Mobile Slider */}
            <div ref={sliderRef} className="keen-slider lg:hidden">
              {destinations.map((tour) => (
                <div key={tour.id} className="keen-slider__slide pb-4">
                  <TourCard tour={tour} />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-16">
          <Link href={`/${locale}/tour`}>
            <Button variant="outline" className="border-[#007654] text-[#007654] hover:bg-[#dcfae7] rounded-full px-12 py-6 text-lg">
              {t("exploreAll")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
