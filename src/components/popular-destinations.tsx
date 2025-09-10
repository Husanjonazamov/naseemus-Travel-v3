"use client"

import { useEffect, useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Button } from "./ui/button"
import { useTranslations } from "next-intl"
import Link from "next/link"

export function PopularDestinations() {
  const destinations = [
    {
      id: "balkan-explorer",
      title: "BALKAN EXPLORER",
      image: "/images/croatian-coast.png",
      price: "$1,200",
      description:
        "An in-depth exploration of four countries in an undiscovered corner of Europe. Visit cosmopolitan cities and travel through stunning natural landscapes. You will spend time in some of the most famous cities in Eastern Europe, all of them having lots of historical sites, vibrant bars and restaurants for you to explore.",
      features: [
        "Return flights from London",
        "12 nights in 4-star hotels",
        "20 meals: 12 breakfasts, 2 lunches and 6 dinners, with a welcome drink",
        "Just You Holiday Director",
      ],
    },
    {
      id: "switzerland-railways",
      title: "SWITZERLAND'S SCENIC RAILWAYS AND ALPINE WINTER WONDERS",
      image: "/images/croatian-coast.png",
      price: "$2,500",
      description:
        "Embark on an unforgettable Swiss winter adventure, combining elegant rail journeys with breathtaking Alpine scenery.",
      features: [
        "Return flights from the UK",
        "6 nights in a 4-star hotel",
        "9 included meals: 6 breakfasts, 1 lunch and 2 dinners",
      ],
    },
    {
      id: "turkish-treasures",
      title: "TURKISH TREASURES: FROM ISTANBUL'S PALACES TO CAPPADOCIA'S WONDERS",
      image: "/images/croatian-coast.png",
      price: "$1,800",
      description:
        "Turkey dazzles your senses, from Istanbul's bustling Grand Bazaar with scents of spices to the incredible cave dwellings of Cappadocia and the shimmering tiles of the Blue Mosque – not to mention the delicious cuisine. This tour takes you on a tour of Istanbul and Cappadocia.",
      features: ["Return flights", "6 nights in a 4-star hotel and 12 meals"],
    },
  ]

  // Keen Slider
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

  const t = useTranslations("Popular") // Section title
  const e = useTranslations("last")    // Explore button

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-2xl md:text-4xl font-bold text-center text-[#007654] mb-12">
          {t("popularDestinations")}
        </h2>

        {isMobile ? (
          // 📱 Mobile Slider
          <div ref={sliderRef} className="keen-slider">
            {destinations.map((destination, index) => (
              <div
                key={index}
                className="keen-slider__slide flex flex-col bg-white shadow-lg overflow-hidden rounded-lg"
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

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {destination.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start text-sm text-gray-700"
                      >
                        <span className="w-2 h-2 bg-[#007654] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Price va Button */}
                  <div className="flex flex-col-reverse items-start gap-4 mt-auto">
                    <Link href={`/tour/${destination.id}`} className="w-full">
                      <Button className="w-full bg-[#007654] hover:bg-[#006644] text-white font-bold py-6 rounded-md shadow-md text-xl">
                        {e("explore")}
                      </Button>
                    </Link>
                    <p className="text-[#007654] font-bold text-3xl">
                      {destination.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // 💻 Desktop Grid
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <div
                key={index}
                className="flex flex-col bg-white shadow-lg overflow-hidden rounded-lg"
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

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {destination.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start text-sm text-gray-700"
                      >
                        <span className="w-2 h-2 bg-[#007654] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Price va Button yonma-yon */}
                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-[#007654] font-bold text-4xl">
                      {destination.price}
                    </p>
                    <Link href={`/tour/${destination.id}`}>
                      <Button className="bg-[#007654] hover:bg-[#006644] text-white font-bold px-8 py-6 rounded-md shadow-md text-lg">
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
