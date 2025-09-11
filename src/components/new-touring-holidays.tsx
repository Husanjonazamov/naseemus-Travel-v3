"use client"

import { useEffect, useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Button } from "./ui/button"
import { useTranslations } from "next-intl"
import Link from "next/link"
import axios from "axios"
import config from "../config"

export function NewTouring() {
  const [destinations, setDestinations] = useState([])
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
        const res = await axios.get(`${config.BASE_URL}/api/tour/`)
        // Faqat 6 ta tourni olamiz
        setDestinations(res.data.data.results.slice(0, 6))
      } catch (error) {
        console.error("API dan malumot olishda xatolik:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchTours()
  }, [])

  const t = useTranslations("newHoliday") // Title
  const e = useTranslations("last")       // Explore button text

  // Default loading card
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

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#007654] mb-12">
          {t("newHoliday")}
        </h2>

        {loading ? (
          // Loading holatidagi kartalar
          <div className={isMobile ? "keen-slider" : "grid md:grid-cols-2 lg:grid-cols-3 gap-8"}>
            {loadingCards}
          </div>
        ) : isMobile ? (
          // 📱 Mobile slider
          <div ref={sliderRef} className="keen-slider">
            {destinations.map((destination) => (
              <div
                key={destination.id}
                className="keen-slider__slide flex flex-col bg-[#f0faf7] shadow-lg overflow-hidden "
              >
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url('${destination.image}')` }}
                ></div>

                <div className="flex flex-col flex-grow p-6">
                  <h3 className="text-xl font-bold text-[#007654] mb-2">{destination.title}</h3>
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">{destination.description}</p>

                  <p className="text-[#007654] font-bold text-3xl mb-4">{destination.price}$</p>

                  <Link href={`/tour/${encodeURIComponent(destination.title)}`}>
                    <Button className="w-full bg-[#007654] text-white font-bold py-4  shadow-md text-lg">
                      {e("explore")}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // 💻 Desktop grid
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <div
                key={destination.id}
                className="flex flex-col bg-[#f0faf7] shadow-lg overflow-hidden"
              >
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url('${destination.image}')` }}
                ></div>

                <div className="flex flex-col flex-grow p-6">
                  <h3 className="text-xl font-bold text-[#007654] mb-2">{destination.title}</h3>
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">{destination.description}</p>

                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-[#007654] font-bold text-4xl">{destination.price}$</p>
                    <Link href={`/tour/${encodeURIComponent(destination.title)}`}>
                      <Button className="bg-[#007654] text-white font-bold px-8 py-6  shadow-md text-lg">
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
