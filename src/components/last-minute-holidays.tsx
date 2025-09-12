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

const truncateDescription = (text: string, wordLimit = 20) => {
  const words = text.split(" ")
  if (words.length <= wordLimit) return text
  return words.slice(0, wordLimit).join(" ") + "..."
}

const formatPrice = (price: string) => {
  const num = parseFloat(price)
  return num % 1 === 0 ? num.toFixed(0) : num.toFixed(2)
}

export default function LastMinuteHolidays() {
  const t = useTranslations("last")
  const taa = useTranslations("silk")
  const router = useRouter()
  const [holidays, setHolidays] = useState<Holiday[]>([])
  const [mounted, setMounted] = useState(false)

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
    setMounted(true)
  }, [])

  // Slider yangilash data kelganda
  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.update()
    }
  }, [holidays])

  // Avtomatik aylanish
  useEffect(() => {
    const timer = setInterval(() => instanceRef.current?.next(), 4000)
    return () => clearInterval(timer)
  }, [instanceRef])

  if (!mounted || holidays.length === 0) return null

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
              className="keen-slider__slide flex flex-col bg-white overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-52 md:h-64 group overflow-hidden rounded-t-2xl">
                <Image
                  src={holiday.image}
                  alt={holiday.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                  <h3 className="text-white text-xl md:text-2xl font-bold leading-tight">
                    {holiday.title}
                  </h3>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4 line-clamp-3">
                  {truncateDescription(holiday.description, 30)}
                </p>

                <div className="flex items-center justify-between mb-6">
                  <div className="text-green-700 font-bold text-xl md:text-2xl ">
                    ${formatPrice(holiday.price)}
                  </div>

                  <div className="flex items-center gap-1 text-green-700 font-bold text-xl">
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3"
                      />
                    </svg> */}
                    <span>
                      {holiday.date} {taa("day")}
                    </span>
                  </div>
                </div>

                <Button
                  className="bg-[#007654] hover:bg-[#00543C] font-semibold text-white py-4 rounded-lg transition-all"
                  onClick={() => router.push(`/tour/${holiday.slug}`)}
                >
                  {t("explore")}
                </Button>
              </div>
            </div>

          ))}
        </div>
      </div>
    </section>
  )
}
