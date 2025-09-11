"use client"

import { useEffect, useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Button } from "./ui/button"
import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import axios from "axios"
import config from "../config"

export function PopularDestinations() {
  const t = useTranslations("Popular") // Section title
  const e = useTranslations("last")    // Explore button
  const locale = useLocale() || "en"   // ➤ hozirgi til

  const [destinations, setDestinations] = useState<any[]>([])
  const [isMobile, setIsMobile] = useState(false)

  // Mobile detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Fetch data from API
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await axios.get(`${config.BASE_URL}/api/tour/`, {
          headers: { "Accept-Language": locale }
        })
        if (res.data.status && res.data.data.results) {
          const popularTours = res.data.data.results.filter(
            (tour: any) => tour.is_popular
          )
          setDestinations(popularTours.slice(0, 6))
        }
      } catch (error) {
        console.error("API dan ma'lumot olishda xatolik:", error)
      }
    }
    fetchDestinations()
  }, [locale])

  // Keen Slider
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1.1, spacing: 10 },
    breakpoints: {
      "(min-width: 768px)": { slides: { perView: 3, spacing: 16 }, drag: false },
    },
  })

  // Price formatting: 3,232$ tarzida
  const formatPrice = (price: number) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-2xl md:text-4xl font-bold text-center text-[#007654] mb-12">
          {t("popularDestinations")}
        </h2>

        {isMobile ? (
          // Mobile Slider
          <div ref={sliderRef} className="keen-slider">
            {destinations.map((destination, index) => (
              <div
                key={index}
                className="keen-slider__slide flex flex-col bg-[#f0faf7] shadow-lg overflow-hidden"
              >
                {/* Image */}
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url('${destination.image}')` }}
                ></div>

                {/* Content */}
                <div className="flex flex-col flex-grow p-6">
                  <h3 className="text-md md:text-xl font-bold text-[#007654] mb-2">
                    {destination.title}
                  </h3>
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                    {destination.description}
                  </p>

                  <div className="flex flex-col-reverse items-start gap-4 mt-auto">
                    <Link href={`/tour/${encodeURIComponent(destination.title)}`} className="w-full">
                      <Button className="w-full bg-[#007654] text-white font-bold py-4 md:py-6 text-base md:text-lg shadow-md">
                        {e("explore")}
                      </Button>
                    </Link>
                    <p className="text-[#007654] font-bold text-2xl md:text-3xl">
                      {formatPrice(destination.price)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Desktop Grid
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <div
                key={index}
                className="flex flex-col bg-[#f0faf7] shadow-lg overflow-hidden"
              >
                {/* Image */}
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url('${destination.image}')` }}
                ></div>

                {/* Content */}
                <div className="flex flex-col flex-grow p-6">
                  <h3 className="text-xl font-bold text-[#007654] mb-2">
                    {destination.title}
                  </h3>
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                    {destination.description}
                  </p>

                  {/* Price va Button */}
                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-[#007654] font-bold text-3xl md:text-4xl">
                      {formatPrice(destination.price)}
                    </p>
                    <Link href={`/tour/${encodeURIComponent(destination.title)}`}>
                      <Button className="bg-[#007654] text-white font-bold px-6 md:px-8 py-4 md:py-6 text-base md:text-lg shadow-md">
                        {e("explore")}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
