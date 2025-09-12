"use client"

import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from "keen-slider/react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "./ui/button"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import axios from "axios"
import config from "../config"

interface Holiday {
  id: number
  title: string
  slug: string
  description: string
  price: string
  image: string
  date: number
}

// Description-ni 20 so'z bilan kesish
const truncateDescription = (text: string, wordLimit = 20) => {
  const words = text.split(" ")
  if (words.length <= wordLimit) return text
  return words.slice(0, wordLimit).join(" ") + "..."
}

// Narxni formatlash
const formatPrice = (price: string) => {
  const num = parseFloat(price)
  return num % 1 === 0 ? num.toFixed(0) : num.toFixed(2)
}

export default function NewHolidays() {
  const t = useTranslations("last")
  const taa = useTranslations("silk")
  const router = useRouter()
  const [holidays, setHolidays] = useState<Holiday[]>([])

  // Keen Slider konfiguratsiyasi
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 3, spacing: 16 },
    breakpoints: {
      "(max-width: 1024px)": { slides: { perView: 2, spacing: 12 } },
      "(max-width: 768px)": { slides: { perView: 1, spacing: 8 } },
    },
  })

  // API orqali ma'lumot olish
  useEffect(() => {
    const fetchHolidays = async (url?: string) => {
      try {
        const res = await axios.get(url || `${config.BASE_URL}/api/tour/`)
        if (res.data.status && res.data.data.results) {
          setHolidays((prev) => [...prev, ...res.data.data.results])
          if (res.data.data.links.next) {
            fetchHolidays(res.data.data.links.next)
          }
        }
      } catch (error) {
        console.error("Holidays API error:", error)
      }
    }
    fetchHolidays()
  }, [])

  // Avtomatik aylanish
  useEffect(() => {
    const timer = setInterval(() => instanceRef.current?.next(), 3000)
    return () => clearInterval(timer)
  }, [instanceRef])

  return (
    <section className="bg-[#E6F4EF] py-16 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-[#007654] text-center mb-12 tracking-wide">
          {t("last_minute_holidays")}
        </h2>

        <div ref={sliderRef} className="keen-slider overflow-visible">
          {holidays.map((holiday) => (
            <div
              key={holiday.id}
              className="keen-slider__slide flex-shrink-0 w-full md:w-[calc(33.333%-16px)] flex flex-col bg-white overflow-hidden shadow-lg rounded-lg"
            >
              {/* Image */}
              <div className="relative h-64 md:h-80 w-full group overflow-hidden">
                <Image
                  src={holiday.image}
                  alt={holiday.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <h3 className="text-white text-lg md:text-2xl font-bold text-center px-4 leading-tight">
                    {holiday.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  {truncateDescription(holiday.description, 20)}
                </p>

                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <div className="w-2 h-2 bg-[#007654] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-xl font-bold text-green-700">
                      ${formatPrice(holiday.price)}
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <div className="w-2 h-2 bg-[#007654] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-xl text-green-700 font-bold">
                      {taa("duration")}: {holiday.date} {taa("day")}
                    </span>
                  </li>
                </ul>

                <div className="mt-auto flex justify-end">
                  <Button
                    className="bg-[#007654] hover:bg-[#00543C] font-bold text-lg text-white px-8 py-6 rounded-md shadow-md transition-all"
                    onClick={() => router.push(`/tour/${holiday.slug}`)}
                  >
                    {t("explore")}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
