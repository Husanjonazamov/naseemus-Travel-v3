"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const holidays = [
  {
    id: 1,
    title: "CRUISING THE RHONE & PICTURESQUE PROVENCE",
    image: "/placeholder-4k949.png",
    description:
      "Explore the colourful countryside of the South of France as you first travel north from Lyon on the Saone before taking the Rhone towards the Mediterranean Sea.",
    features: [
      "Just You Holiday Director",
      "Return flights from London",
      "20 included meals 7 breakfasts, 6 lunches and 7 dinners",
    ],
  },
  {
    id: 2,
    title: "CRUISING THE DANUBE",
    image: "/danube-castle-autumn.png",
    description:
      "Bustling cities and beautiful countryside where you visit the most unmissable destinations along the Danube, make this river cruise one to remember.",
    features: [
      "Just You Holiday Director",
      "Return flights",
      "20 included meals 7 breakfasts, 6 lunches and 7 dinners",
    ],
  },
  {
    id: 3,
    title: "SECRET SLOVENIA",
    image: "/placeholder-jgyra.png",
    description:
      "Discover Slovenia's hidden gems. Picture-perfect lakes, glorious mountain scenery and enchanting castles are all here, along with local treats and traditions.",
    features: ["Return flights", "7 nights in a 4-star hotel", "15 included meals: 7 breakfasts, lunch, 7 dinners"],
  },
]

export function LastMinuteHolidays() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % holidays.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + holidays.length) % holidays.length)
  }

  return (
    <section className="bg-purple-300 py-16 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12 tracking-wide">
          LAST MINUTE HOLIDAYS
        </h2>

        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors"
            aria-label="Previous holiday"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors"
            aria-label="Next holiday"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Cards Container */}
          <div className="flex gap-6 overflow-hidden px-12">
            <div
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 33.333}%)` }}
            >
              {holidays.map((holiday) => (
                <div
                  key={holiday.id}
                  className="flex-shrink-0 w-full md:w-1/3 bg-white rounded-lg overflow-hidden shadow-lg"
                >
                  <div className="relative h-48">
                    <Image
                      src={holiday.image || "/placeholder.svg"}
                      alt={holiday.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <h3 className="text-white text-xl md:text-2xl font-bold text-center px-4 leading-tight">
                        {holiday.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">{holiday.description}</p>

                    <ul className="space-y-2 mb-6">
                      {holiday.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                          <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-md transition-colors">
                      Explore
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
