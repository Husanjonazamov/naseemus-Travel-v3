"use client"

import { useEffect, useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Button } from "./ui/button"
import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import axios from "axios"
import { motion } from "framer-motion"
import config from "../config"

export function NewTouring() {
  const t = useTranslations("newHoliday") // Title
  const e = useTranslations("last")       // Explore button text
  const locale = useLocale()

  const [destinations, setDestinations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Keen Slider setup
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1.1, spacing: 10 },
    breakpoints: {
      "(min-width: 768px)": { slides: { perView: 3, spacing: 16 }, drag: false },
    },
  })

  // Detect mobile
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Fetch tours from API
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const lang = locale || "en"
        const res = await axios.get(`${config.BASE_URL}/api/tour/`, {
          headers: { "Accept-Language": lang },
        })
        setDestinations(res.data.data.results.slice(0, 6))
      } catch (error) {
        console.error("API error:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchTours()
  }, [locale])

  // Loading skeleton cards
  const loadingCards = Array.from({ length: 6 }).map((_, index) => (
    <div
      key={index}
      className="flex flex-col bg-gray-100 animate-pulse overflow-hidden  h-[400px]"
    >
      <div className="h-48 bg-gray-200"></div>
      <div className="flex flex-col flex-grow p-6 space-y-4">
        <div className="h-6 bg-gray-300 w-3/4 rounded"></div>
        <div className="h-4 bg-gray-300 w-full rounded"></div>
        <div className="h-4 bg-gray-300 w-full rounded"></div>
        <div className="h-4 bg-gray-300 w-5/6 rounded"></div>
        <div className="mt-auto h-10 bg-gray-300 w-full rounded"></div>
      </div>
    </div>
  ))

  // Price formatter
  const formatPrice = (price: number) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)

  // Framer Motion variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  }

  return (
    <section className="py-16 px-4 bg-[#dcfae7]" id="newTour">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#007654] mb-12">
          {t("newHoliday")}
        </h2>

        {loading ? (
          <div className={isMobile ? "keen-slider" : "grid md:grid-cols-2 lg:grid-cols-3 gap-8"}>
            {loadingCards}
          </div>
        ) : isMobile ? (
          // Mobile slider
          <div ref={sliderRef} className="keen-slider">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                className="keen-slider__slide flex flex-col bg-[#c8f4ce] shadow-lg overflow-hidden"
                initial="hidden"
                animate="visible"
                custom={index}
                variants={cardVariants}
              >
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url('${destination.image}')` }}
                ></div>

                <div className="flex flex-col flex-grow p-4">
                  <h3 className="text-lg font-bold text-[#007654] mb-2">{destination.title}</h3>
                  <p className="text-gray-700 text-sm mb-2 leading-relaxed">{destination.description}</p>

                  <p className="text-[#007654] font-semibold text-xl mb-3">
                    {formatPrice(destination.price)}
                  </p>

                  <Link href={`/tour/${encodeURIComponent(destination.slug || destination.title)}`}>
                    <Button className="w-full bg-[#007654] text-white font-semibold py-3 shadow-md text-base">
                      {e("explore")}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          // Desktop grid
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                className="flex flex-col bg-[#c8f4ce] shadow-lg overflow-hidden"
                initial="hidden"
                animate="visible"
                custom={index}
                variants={cardVariants}
              >
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url('${destination.image}')` }}
                ></div>

                <div className="flex flex-col flex-grow p-6">
                  <h3 className="text-xl font-bold text-[#007654] mb-2">{destination.title}</h3>
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">{destination.description}</p>

                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-[#007654] font-bold text-3xl">{formatPrice(destination.price)}</p>
                    <Link href={`/tour/${encodeURIComponent(destination.slug || destination.title)}`}>
                      <Button className="bg-[#007654] text-white font-semibold px-6 py-3 shadow-md text-base">
                        {e("explore")}
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
