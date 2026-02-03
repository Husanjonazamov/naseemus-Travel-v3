"use client"

import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from "keen-slider/react"
import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import axios from "axios"
import config from "../config"
import { TourCard } from "./TourCard"

export default function NewHolidays() {
  const t = useTranslations("new_holidays")
  const [holidays, setHolidays] = useState<any[]>([])
  const [mounted, setMounted] = useState(false)

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 3, spacing: 24 },
    breakpoints: {
      "(max-width: 1024px)": { slides: { perView: 2, spacing: 16 } },
      "(max-width: 768px)": { slides: { perView: 1.2, spacing: 12 } },
    },
  })

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const res = await axios.get(`${config.BASE_URL}/api/tour/`)
        if (res.data.status && res.data.data.results) {
          setHolidays(res.data.data.results)
        }
      } catch (error) {
        console.error("Holidays API error:", error)
      }
    }
    fetchHolidays()
    setMounted(true)
  }, [])

  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.update()
    }
  }, [holidays])

  useEffect(() => {
    const timer = setInterval(() => instanceRef.current?.next(), 5000)
    return () => clearInterval(timer)
  }, [instanceRef])

  if (!mounted || holidays.length === 0) return null

  return (
    <section className="bg-white py-24 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              {t("title")}
            </h2>
            <p className="text-gray-500 text-lg max-w-xl">
              {t("description")}
            </p>
          </div>
        </div>

        <div ref={sliderRef} className="keen-slider !overflow-visible">
          {holidays.map((holiday) => (
            <div key={holiday.id} className="keen-slider__slide pb-10">
              <TourCard tour={holiday} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
