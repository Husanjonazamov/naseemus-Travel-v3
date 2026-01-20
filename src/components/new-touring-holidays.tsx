"use client"

import { useEffect, useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Button } from "./ui/button"
import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import { TourCard } from "./TourCard"
import axios from "axios"
import config from "../config"
import { ArrowLeft, ArrowRight } from "lucide-react"

export function NewTouring() {
  const t = useTranslations("newHoliday")
  const locale = useLocale()

  const [destinations, setDestinations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1.1, spacing: 20 },
    breakpoints: {
      "(min-width: 768px)": { slides: { perView: 2, spacing: 30 } },
      "(min-width: 1024px)": { slides: { perView: 3, spacing: 40 } },
    },
  })

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const lang = locale || "en"
        const res = await axios.get(`${config.BASE_URL}/api/tour/`, {
          headers: { "Accept-Language": lang },
        })
        // We take up to 9 new tours for a robust section
        setDestinations(res.data.data.results.slice(0, 9))
      } catch (error) {
        console.error("API error:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchTours()
  }, [locale])

  return (
    <section className="py-24 px-4 bg-transparent overflow-hidden" id="newTour">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-3xl">
            <h4 className="text-[#007654] font-black uppercase tracking-[0.3em] text-[10px] mb-4">{t("subtitle")}</h4>
            <h2 className="text-5xl md:text-6xl font-black text-[#1a1a1a] mb-6 tracking-tight leading-[1.1]">
              {t("newHoliday")}
            </h2>
            <p className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
              {t("description")}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="w-14 h-14 rounded-full border-[#f0f0f0] hover:border-[#007654] hover:text-[#007654] bg-white transition-all shadow-sm"
              onClick={() => instanceRef.current?.prev()}
            >
              <ArrowLeft size={24} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-14 h-14 rounded-full border-[#f0f0f0] hover:border-[#007654] hover:text-[#007654] bg-white transition-all shadow-sm"
              onClick={() => instanceRef.current?.next()}
            >
              <ArrowRight size={24} />
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-[32px] h-[600px] animate-pulse border border-[#f0f0f0]" />
            ))}
          </div>
        ) : (
          <div className="relative">
            <div ref={sliderRef} className="keen-slider !overflow-visible">
              {destinations.map((tour) => (
                <div key={tour.id} className="keen-slider__slide px-2 md:px-0">
                  <TourCard tour={tour} />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-20 text-center">
          <Link href="/tour">
            <Button variant="outline" className="h-16 px-12 rounded-2xl border-[#007654] text-[#007654] hover:bg-[#007654] hover:text-white transition-all font-bold text-lg shadow-xl shadow-[#007654]/5">
              {t("exploreMore")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
