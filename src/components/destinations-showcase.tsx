"use client"

import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from "keen-slider/react"
import { useEffect } from "react"
import Image from "next/image"
import { Button } from "./ui/button"


const holidays = [
  {
    id: 1,
    title: "CRUISING THE RHONE & PICTURESQUE PROVENCE",
    description:
      "Explore the colourful countryside of the South of France as you travel from Lyon on the Saone before taking the Rhone towards the Mediterranean Sea.",
    features: [
      "Just You Holiday Director",
      "Return flights from London",
      "20 included meals: 7 breakfasts, 6 lunches, 7 dinners",
    ],
    image: "/images/boat-trip-fun.png",
  },
  {
    id: 2,
    title: "CRUISING THE DANUBE",
    description:
      "Bustling cities and beautiful countryside along the Danube, with unforgettable sights and experiences on every stop.",
    features: [
      "Just You Holiday Director",
      "Return flights",
      "20 included meals: 7 breakfasts, 6 lunches, 7 dinners",
    ],
    image: "/images/boat-trip-fun.png",
  },
  {
    id: 3,
    title: "SECRET SLOVENIA",
    description:
      "Discover Slovenia's hidden gems, with stunning lakes, mountain scenery, and enchanting castles all around.",
    features: [
      "Return flights",
      "7 nights in a 4-star hotel",
      "15 included meals: 7 breakfasts, lunch, 7 dinners",
    ],
    image: "/images/boat-trip-fun.png",
  },
  {
    id: 4,
    title: "ITALIAN LAKES",
    description:
      "Experience the charm of the Italian lakes with scenic boat trips, breathtaking landscapes, and delicious cuisine.",
    features: ["Return flights", "4-star hotel stay", "Daily breakfasts and dinners"],
    image: "/images/boat-trip-fun.png",
  },
]

export default function LastMinuteHolidays() {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 3,
      spacing: 16,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: { perView: 2, spacing: 12 },
      },
      "(max-width: 768px)": {
        slides: { perView: 1, spacing: 8 },
      },
    },
  })

  // Avtomatik aylanish
  useEffect(() => {
    const timer = setInterval(() => {
      instanceRef.current?.next()
    }, 3000)
    return () => clearInterval(timer)
  }, [instanceRef])

  return (
    <section className="bg-[#E6F4EF] py-16 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-[#007654] text-center mb-12 tracking-wide">
          LAST MINUTE HOLIDAYS
        </h2>

        <div ref={sliderRef} className="keen-slider">
          {holidays.map((holiday) => (
            <div
              key={holiday.id}
              className="keen-slider__slide flex flex-col bg-white overflow-hidden shadow-lg"
            >
              {/* Rasm */}
              <div className="relative h-64 md:h-80">
                <Image
                  src={holiday.image}
                  alt={holiday.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <h3 className="text-white text-lg md:text-2xl font-bold text-center px-4 leading-tight">
                    {holiday.title}
                  </h3>
                </div>
              </div>

              {/* Kontent */}
              <div className="p-6 flex flex-col flex-1">
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  {holiday.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {holiday.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <div className="w-2 h-2 bg-[#007654] rounded-full mt-2 flex-shrink-0"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex justify-end">
                  <Button className="bg-[#007654] hover:bg-[#006148] font-bold text-lg text-white px-8 py-6 rounded-md shadow-md transition-all">
                    Explore →
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
