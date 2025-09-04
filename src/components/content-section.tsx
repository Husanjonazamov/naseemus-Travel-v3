"use client"

import { Button } from "./ui/button"
import { ArrowUp } from "lucide-react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { useTranslations } from "next-intl"

// Helper function to limit text to ~50 words
const formatDescription = (text: string, wordLimit = 50) => {
  const words = text.trim().split(/\s+/)
  if (words.length >= wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "..."
  } else {
    return words.join(" ") + " " + "\u00A0".repeat((wordLimit - words.length) * 3)
  }
}

const cards = [
  {
    title: "SOLO TRAVEL TIPS",
    description:
      "Take a look at our top ten tips to make sure your solo adventure is one to remember. From planning ahead to staying connected, these tips are designed to help you feel safe and confident while exploring the world on your own. Travel smart and enjoy the journey.",
    image: "/images/solo-travel-tips.png",
    button: "Learn More",
  },
  {
    title: "LAST-MINUTE TRIPS",
    description:
      "Looking for a spontaneous getaway? Explore our exciting last-minute trips to Europe and worldwide. Whether you're chasing sunshine, culture, or adventure, our curated packages ensure you make the most out of your time, even on short notice. Book today and start packing for an unforgettable experience.",
    image: "/images/last-minute-trips.png",
    button: "Book Now",
  },
  {
    title: "INSPIRATIONAL INDIA",
    description:
      "Experience the magic of India with our special anniversary tour. From the Taj Mahal to vibrant markets, immerse yourself in the rich history, culture, and colors of this fascinating country. Limited spaces remain—don’t miss your chance to join this unforgettable journey designed for solo travelers.",
    image: "/images/inspirational-india.png",
    button: "Book Now",
  },
  {
    title: "BEACH ESCAPES",
    description:
      "Relax on sandy shores with our exclusive beach escapes tailored for solo travelers. Enjoy breathtaking views, comfortable stays, and curated itineraries that balance relaxation with cultural experiences. Whether it's the Maldives, Bali, or the Mediterranean, let the waves be your ultimate retreat.",
    image: "/images/danube-castle-autumn.png",
    button: "Discover",
  },
  {
    title: "CITY ADVENTURES",
    description:
      "Explore vibrant cities worldwide with expert-guided tours designed for solo travelers. From Paris to Tokyo, uncover hidden gems, enjoy delicious cuisine, and make new friends along the way. Perfect for travelers looking for a mix of culture, exploration, and social connection in iconic destinations.",
    image: "/images/danube-castle-autumn.png",
    button: "Explore",
  },
  {
    title: "WILDLIFE SAFARIS",
    description:
      "Get closer to nature with our guided wildlife safaris tailored for solo adventurers. Witness incredible landscapes, spot exotic animals, and learn from expert guides. These trips are crafted to create unforgettable moments and allow you to share the wonder of the wild with like-minded travelers.",
    image: "/images/danube-castle-autumn.png",
    button: "Join Now",
  },
]

export function ContentSection() {
  const t = useTranslations("solo_travel");
  return (
    <section className="py-16 px-4 bg-gray-50 mt-20 mb-20">
      <div className="max-w-6xl mx-auto">
        {/* Main heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-[#007654] mb-10">
          {t("title")}
        </h2>

        {/* Description paragraph */}
        <p className="text-gray-700 text-center max-w-4xl mx-auto mb-16 text-lg leading-relaxed">
          {t("description")}
        </p>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mb-16">
          {cards.map((card, index) => (
            <div key={index} className="bg-white shadow-lg  overflow-hidden h-[580px] flex flex-col">
              <div className="relative h-64 w-full">
                <Image src={card.image} alt={card.title} fill className="object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-[#007654] mb-3">{card.title}</h3>
                <p className="text-gray-700 mb-4 h-[110px] overflow-hidden leading-relaxed">
                  {formatDescription(card.description)}
                </p>
                <div className="flex justify-end mt-auto">
                  <Button className="bg-[#007654] hover:bg-[#006148] text-white px-8 py-6 text-lg font-bold">
                    {card.button}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden mb-20">
         <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            navigation
            autoplay={{ delay: 3000 }}
            loop
            className="pb-12"
          >
            {cards.map((card, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white shadow-lg overflow-hidden 
                                h-[620px] w-[90%] mx-auto flex flex-col rounded-lg">
                  {/* Image */}
                  <div className="relative h-72 w-full">
                    <Image src={card.image} alt={card.title} fill className="object-cover" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-[#007654] mb-3">{card.title}</h3>
                    <p className="text-gray-700 mb-4 h-[110px] overflow-hidden leading-relaxed">
                      {formatDescription(card.description)}
                    </p>
                    <div className="flex justify-end mt-auto">
                      <Button className="bg-[#007654] hover:bg-[#006148] text-white px-12 py-6 text-lg font-bold">
                        {card.button}
                      </Button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Back to top button */}
        <div className="flex justify-end">
          <Button
            className="bg-[#007654] hover:bg-[#006148] text-white shadow-lg rounded-full p-3"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ArrowUp className="h-5 w-5" />
            <span className="ml-2 font-semibold">TOP</span>
          </Button>
        </div>
      </div>
    </section>
  )
}
