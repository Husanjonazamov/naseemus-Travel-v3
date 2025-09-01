"use client"

import { useEffect, useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Button } from "./ui/button"

export function BlogSection() {
  const destinations = [
    {
      title: "BALKAN EXPLORER",
      image:"/images/croatian-coast.png",
      price: "$1,200",
      description:
        "An in-depth exploration of four countries in an undiscovered corner of Europe. Visit cosmopolitan cities and travel through stunning natural landscapes. You will spend time in some of the most famous cities in Eastern Europe, all of them having lots of historical sites, vibrant bars and restaurants for you to explore.",
    },
    {
      title: "SWITZERLAND'S SCENIC RAILWAYS AND ALPINE WINTER WONDERS",
      image:"/images/croatian-coast.png",
      price: "$2,500",
      description:
        "Embark on an unforgettable Swiss winter adventure, combining elegant rail journeys with breathtaking Alpine scenery.",
    },
    {
      title: "TURKISH TREASURES",
      image:"/images/croatian-coast.png",
      price: "$1,800",
      description:
        "Turkey dazzles your senses, from Istanbul's bustling Grand Bazaar with scents of spices to the incredible cave dwellings of Cappadocia and the shimmering tiles of the Blue Mosque – not to mention the delicious cuisine.",
    },
  ]

  // Keen-slider sozlamalari (faqat mobil uchun)
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
        <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-600 mb-12">
          Read Our blogs
        </h2>

        {isMobile ? (
          <div ref={sliderRef} className="keen-slider">
            {destinations.map((destination, index) => (
              <div key={index} className="keen-slider__slide flex flex-col bg-white shadow-lg overflow-hidden">
                {/* Image */}
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('${destination.image}')` }}></div>

                {/* Content */}
                <div className="flex flex-col flex-grow p-6">
                  <h3 className="text-xl font-bold text-blue-600 mb-4">{destination.title}</h3>
                  <p className="text-gray-700 text-sm mb-6 leading-relaxed">{destination.description}</p>

                  {/* Price va Button bir chiziqda */}
                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-purple-700 font-bold text-3xl">{destination.price}</p>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-6 rounded-md shadow-md text-xl">
                      Explore →
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
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('${destination.image}')` }}></div>

                <div className="flex flex-col flex-grow p-6">
                  <h3 className="text-xl font-bold text-blue-600 mb-4">{destination.title}</h3>
                  <p className="text-gray-700 text-sm mb-6 leading-relaxed">{destination.description}</p>

                  {/* Price va Button bir chiziqda */}
                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-purple-700 font-bold text-2xl">{destination.price}</p>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-6 rounded-md shadow-md text-lg">
                      Explore →
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
