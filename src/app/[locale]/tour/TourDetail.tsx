"use client"

import { Button } from "@/src/components/ui/button"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

type Departure = {
  date: string
  airport: string
  originalPrice?: string
  price: string
  availability: string
  status: "available" | "sold-out"
}

type Excursion = {
  title: string
  description: string
  price: string
  image: string
}

export default function TourPage() {
  const [departures, setDepartures] = useState<Departure[]>([
    { date: "Tue 9 Sept 2025", airport: "Edinburgh Airport", price: "£2,598", availability: "Available", status: "available" },
    { date: "Tue 7 Oct 2025", airport: "London Airport - Heathrow", price: "£2,399", availability: "Sold out", status: "sold-out" },
    { date: "Tue 12 May 2026", airport: "London Airport - Heathrow", originalPrice: "£2,449", price: "£2,349", availability: "Available", status: "available" },
    { date: "Tue 23 Jun 2026", airport: "Manchester Airport", price: "£2,520", availability: "Available", status: "available" },
    { date: "Tue 15 Sept 2026", airport: "Birmingham Airport", price: "£2,480", availability: "Few seats left", status: "available" },
    { date: "Tue 20 Oct 2026", airport: "London Gatwick", price: "£2,410", availability: "Available", status: "available" },
  ])

  const excursionsData: Excursion[] = [
    {
      title: "BEAUTIFUL DANUBE CASTLE TOUR",
      description:
        "Discover the charm of Danube castles in autumn with guided tours, breathtaking views, and cultural heritage.",
      price: "£40",
      image: "/images/danube-castle-autumn.png",
    },
    {
      title: "SUNSET CRUISE ON THE ATHENS COAST",
      description:
        "Enjoy a magical sunset cruise along the Athens Riviera with traditional music, drinks, and panoramic views.",
      price: "£55",
      image: "/images/swiss-mountain-train-snowy-landscape.png",
    },
  ]

  // 🔹 Random sanalar generatori
  const randomDates = [
    "Mon 5 May 2025",
    "Fri 20 Jun 2025",
    "Sun 13 Jul 2025",
    "Tue 2 Sept 2025",
    "Sat 18 Oct 2025",
    "Thu 8 Jan 2026",
    "Wed 23 Apr 2026",
  ]

  // 🔹 Price ustuni bosilganda
  const randomizePrice = () => {
    setDepartures((prev) =>
      prev.map((d) => {
        const newPrice = `£${Math.floor(Math.random() * (2700 - 2300 + 1) + 2300)}`
        return { ...d, price: newPrice, originalPrice: d.price }
      })
    )
  }

  // 🔹 Date ustuni bosilganda
  const randomizeDate = () => {
    setDepartures((prev) =>
      prev.map((d) => {
        const newDate = randomDates[Math.floor(Math.random() * randomDates.length)]
        return { ...d, date: newDate }
      })
    )
  }

  return (
    <div className="min-h-screen">

      {/* Dates Section */}
      <section className="py-8 mt-4">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">DATES</h2>
          <p className="text-center text-black mb-8">All our departures are guaranteed</p>

          <div className="overflow-x-auto">
            <table className="w-full text-black border-collapse">
              <thead>
                <tr className="border-b border-green-200">
                  {/* Date header clickable */}
                  <th
                    className="text-left p-4 font-semibold flex items-center gap-2 cursor-pointer select-none"
                    onClick={randomizeDate}
                  >
                    Date <ChevronDown className="w-4 h-4 text-green-700" />
                  </th>
                  <th className="text-left p-4 font-semibold">Airport</th>

                  {/* Price header clickable */}
                  <th
                    className="text-left p-4 font-semibold cursor-pointer select-none"
                    onClick={randomizePrice}
                  >
                    Price <ChevronDown className="w-4 h-4 text-green-700" />
                  </th>

                  <th className="text-left p-4 font-semibold">Availability</th>
                </tr>
              </thead>
              <tbody>
                {departures.map((departure, index) => (
                  <tr
                    key={index}
                    className="border-b border-green-100 hover:bg-green-50 transition-colors"
                  >
                    <td className="p-4">{departure.date}</td>
                    <td className="p-4">{departure.airport}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {departure.originalPrice && (
                          <span className="line-through text-sm">{departure.originalPrice}</span>
                        )}
                        <span className="font-semibold">{departure.price}</span>
                      </div>
                    </td>
                    <td className="p-4">{departure.availability}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Optional Excursions Section */}
      <section className="py-8 mt-4">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-700 mb-6">OPTIONAL EXCURSIONS</h2>
          <p className="text-black leading-relaxed mb-8">
            Experience even more of your destination by adding one or more optional excursions to your holiday before
            you set off.
          </p>

          <div className="space-y-8">
            {excursionsData.map((excursion, index) => (
              <div key={index} className="grid lg:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-48 sm:h-56 md:h-64 lg:h-auto">
                  <img
                    src={excursion.image}
                    alt={excursion.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Content */}
                <div className="p-6 sm:p-8">
                  <h3 className="text-2xl font-bold text-green-700 mb-4">{excursion.title}</h3>
                  <p className="text-black leading-relaxed mb-6">{excursion.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm mb-1 text-black">From</p>
                      <p className="text-3xl font-bold text-black">{excursion.price}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button className="text-black hover:text-green-700 flex items-center gap-1">
                        Read more <ChevronDown className="w-4 h-4" />
                      </button>
                      <Button
                        variant="outline"
                        className="border-green-700 text-green-700 hover:bg-green-50 bg-transparent"
                      >
                        ADD AT CHECKOUT
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  )
}
