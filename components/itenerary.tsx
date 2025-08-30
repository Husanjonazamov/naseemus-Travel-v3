"use client"

import { Button } from "@/components/ui/button"
import { Printer, Download } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

export function Itinerary() {
  const [selectedDay, setSelectedDay] = useState(1)

  const days = [
    { day: 1, title: "UK To Tashkent", description: "Flight to Tashkent and overnight stay.", image: "/images/african-elephant-safari.png" },
    { day: 2, title: "Tashkent", description: "Explore Tashkent city tour.", image: "/images/boat-trip-fun.png" },
    { day: 3, title: "Tashkent - Khiva", description: "Morning flight and explore Khiva’s old town.", image: "/images/cappadocia-balloons.png" },
    { day: 4, title: "Khiva - Bukhara", description: "Drive through the desert to Bukhara.", image: "/images/classical-european-columns.png" },
    { day: 5, title: "Bukhara", description: "Full day exploring Bukhara’s historical sites.", image: "/images/colorful-street-art-mural-people.png" },
    { day: 6, title: "Bukhara", description: "Free day to explore Bukhara at your pace.", image: "/images/croatian-coast.png" },
    { day: 7, title: "Bukhara - Samarkand", description: "Transfer to Samarkand via train.", image: "/images/danube-castle-autumn.png" },
    { day: 8, title: "Samarkand", description: "Discover Registan Square and ancient sites.", image: "/images/japanese-hillside-town-fuji.png" },
    { day: 9, title: "Samarkand", description: "Free exploration day in Samarkand.", image: "/images/swiss-mountain-train-snowy-landscape.png" },
    { day: 10, title: "Samarkand - Tashkent", description: "Return to Tashkent and evening farewell.", image: "/images/traditional-dancers-lake-mountains.png" },
  ]

  const currentDay = days.find((day) => day.day === selectedDay) || days[0]

  const handleNextDay = () => {
    if (selectedDay < days.length) {
      setSelectedDay(selectedDay + 1)
    }
  }

  return (
    <div className="py-8 mt-4">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h2 className="text-3xl font-bold text-purple-700">ITINERARY</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Printer className="w-4 h-4 mr-2" />
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
            </Button>
            <Button className="bg-purple-700 hover:bg-purple-800 text-white">
              PRINT ITINERARY
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Scrollable List */}
          <div className="h-[28rem] overflow-y-auto border-r pr-2 lg:block hidden">
            {days.map((day) => (
              <div
                key={day.day}
                className={`py-3 px-2 cursor-pointer border-b transition-colors ${
                  selectedDay === day.day
                    ? "text-purple-700 font-semibold"
                    : "text-gray-700 hover:text-purple-600"
                }`}
                onClick={() => setSelectedDay(day.day)}
              >
                Day {day.day} - {day.title}
              </div>
            ))}
          </div>

          {/* Mobile Dropdown */}
          <div className="lg:hidden mb-4">
            <select
              className="w-full border rounded-lg p-2 text-gray-700"
              value={selectedDay}
              onChange={(e) => setSelectedDay(Number(e.target.value))}
            >
              {days.map((day) => (
                <option key={day.day} value={day.day}>
                  Day {day.day} - {day.title}
                </option>
              ))}
            </select>
          </div>

          {/* Right Panel - Image and Content */}
          <div className="flex flex-col h-[28rem]">
            <motion.img
              key={currentDay.image}
              src={currentDay.image || "/placeholder.svg"}
              alt={`Day ${currentDay.day} - ${currentDay.title}`}
              className="w-full h-64 object-cover rounded-lg shadow-md"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />

            <div className="mt-3 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-purple-700 mb-2">
                DAY {currentDay.day}: {currentDay.title.toUpperCase()}
              </h3>
              <p className="text-gray-700 leading-relaxed flex-grow">
                {currentDay.description}
              </p>
              <div className="flex justify-end mt-4">
                <Button
                  className="bg-purple-700 hover:bg-purple-800 text-white"
                  onClick={handleNextDay}
                  disabled={selectedDay >= days.length}
                >
                  {selectedDay >= days.length ? "End of Journey" : "Next Day"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
