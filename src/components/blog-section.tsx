"use client"

import { useEffect, useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Button } from "./ui/button"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"

// Helper: title ni URL-friendly qilish
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

export function BlogSection() {
  const t = useTranslations("blog")
  const router = useRouter()

  const destinations = [
    {
      title: t("balkan_explorer.title"),
      image: "/images/croatian-coast.png",
      price: "$1,200",
      description: t("balkan_explorer.description"),
    },
    {
      title: t("switzerland_railways.title"),
      image: "/images/croatian-coast.png",
      price: "$2,500",
      description: t("switzerland_railways.description"),
    },
    {
      title: t("turkish_treasures.title"),
      image: "/images/croatian-coast.png",
      price: "$1,800",
      description: t("turkish_treasures.description"),
    },
  ]

  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1.1, spacing: 10 },
    breakpoints: {
      "(min-width: 768px)": { slides: { perView: 3, spacing: 16 }, drag: false },
    },
  })

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-2xl md:text-4xl font-bold text-center text-[#007654] mb-12">
          {t("title")}
        </h2>

        {isMobile ? (
          <div ref={sliderRef} className="keen-slider">
            {destinations.map((destination, index) => (
              <div key={index} className="keen-slider__slide flex flex-col bg-white shadow-lg overflow-hidden">
                {/* Image */}
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url('${destination.image}')` }}
                ></div>

                {/* Content */}
                <div className="flex flex-col flex-grow p-6">
                  <h3 className="text-xl font-bold text-[#007654] mb-4">
                    {destination.title}
                  </h3>
                  <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                    {destination.description}
                  </p>

                  {/* Price va Button bir chiziqda */}
                  <div className="flex items-center justify-between mt-auto">
                    <Button
                      className="bg-[#007654] hover:bg-[#006644] text-white font-bold px-8 py-6 rounded-md shadow-md text-lg"
                      onClick={() => router.push(`/blog/${slugify(destination.title)}`)}
                    >
                      {t("explore_button")}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <div key={index} className="flex flex-col bg-white shadow-lg overflow-hidden">
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url('${destination.image}')` }}
                ></div>

                <div className="flex flex-col flex-grow p-6">
                  <h3 className="text-xl font-bold text-[#007654] mb-4">
                    {destination.title}
                  </h3>
                  <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                    {destination.description}
                  </p>

                  {/* Price va Button bir chiziqda */}
                  <div className="flex items-center justify-between mt-auto">
                    <Button
                      className="bg-[#007654] hover:bg-[#006644] text-white font-bold px-8 py-6 rounded-md shadow-md text-lg"
                      onClick={() => router.push(`/blog/${slugify(destination.title)}`)}
                    >
                      {t("explore_button")}
                    </Button>
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
