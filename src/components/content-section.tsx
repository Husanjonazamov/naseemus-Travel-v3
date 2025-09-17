"use client"

import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { ArrowUp } from "lucide-react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import "swiper/css"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import config from "../config"
import { useLocale } from "next-intl"
import { motion } from "framer-motion"

type CardData = {
  id: number
  title: string
  slug: string
  description?: string | null
  image: string
  type: "tour" | "blog"
  price?: string
}

// Helper: text limit
const formatDescription = (text: string | null | undefined, wordLimit = 50) => {
  if (!text) return ""
  const words = text.trim().split(/\s+/)
  if (words.length >= wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "..."
  } else {
    return words.join(" ") + " " + "\u00A0".repeat((wordLimit - words.length) * 3)
  }
}

// Shuffle array
const shuffleArray = <T,>(array: T[]) => {
  return array.sort(() => Math.random() - 0.5)
}

export function ContentSection() {
  const t = useTranslations("solo_travel")
  const router = useRouter()
  const [cards, setCards] = useState<CardData[]>([])
  const [loading, setLoading] = useState(true)
  const locale = useLocale()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lang = locale

        const [tourRes, blogRes] = await Promise.all([
          fetch(`${config.BASE_URL}/api/tour/`, {
            headers: { "Accept-Language": lang },
          }),
          fetch(`${config.BASE_URL}/api/blog/`, {
            headers: { "Accept-Language": lang },
          }),
        ])

        const tourJson = await tourRes.json()
        const blogJson = await blogRes.json()

        const tourCards: CardData[] = tourJson.data.results.map((item: any) => ({
          id: item.id,
          title: item.title,
          slug: item.slug,
          description: item.description,
          image: item.image,
          type: "tour",
          price: item.price,
        }))

        const blogCards: CardData[] = blogJson.data.results.map((item: any) => ({
          id: item.id,
          title: item.title,
          slug: item.slug,
          description: item.description,
          image: item.image,
          type: "blog",
        }))

        const mixed = shuffleArray([...tourCards, ...blogCards]).slice(0, 6)

        setCards(mixed)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching cards:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [locale])

  // Framer Motion variant
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6 },
    }),
  }

  return (
    <section className="py-16 px-4 bg-gray-50 mb-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center text-[#007654] mb-10">
          {t("title")}
        </h2>

        <p className="text-gray-700 text-center max-w-4xl mx-auto mb-16 text-sm leading-relaxed">
          {t("description")}
        </p>

        {/* Desktop Carousel */}
        <div className="hidden md:block mb-16">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            slidesPerView={3}
            loop
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: false, // hover bilan to‘xtamaydi
            }}
          >
            {cards.map((card, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className={`bg-[#f0faf7] shadow-lg overflow-hidden h-[580px] flex flex-col transition-opacity duration-300 ${
                    loading ? "opacity-30" : "opacity-100"
                  }`}
                  style={{ minWidth: "380px", maxWidth: "420px" }}
                >
                  <div className="relative h-64 w-full">
                    <Image src={card.image} alt={card.title} fill className="object-cover" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-[#007654] mb-3">{card.title}</h3>
                    <p className="text-gray-700 mb-4 h-[110px] overflow-hidden leading-relaxed">
                      {formatDescription(card.description)}
                    </p>
                    <div className="flex justify-end mt-auto">
                      <Button
                        className="bg-[#007654] hover:bg-[#006148] text-white px-8 py-6 text-lg font-bold"
                        onClick={() =>
                          router.push(
                            card.type === "tour"
                              ? `/tour/${encodeURIComponent(card.slug)}`
                              : `/blog/${encodeURIComponent(card.slug)}`
                          )
                        }
                      >
                        {card.type === "tour" ? "View Tour" : "Read Blog"}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden mb-20">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            loop
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
          >
            {cards.map((card, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className={`bg-white shadow-lg overflow-hidden h-[620px] flex flex-col transition-opacity duration-300 ${
                    loading ? "opacity-30" : "opacity-100"
                  }`}
                  style={{ width: "95%", maxWidth: "400px", margin: "0 auto" }}
                >
                  <div className="relative h-72 w-full">
                    <Image src={card.image} alt={card.title} fill className="object-cover" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-[#007654] mb-3">{card.title}</h3>
                    <p className="text-gray-700 mb-4 h-[110px] overflow-hidden leading-relaxed">
                      {formatDescription(card.description)}
                    </p>
                    <div className="flex justify-end mt-auto">
                      <Button
                        className="bg-[#007654] hover:bg-[#006148] text-white px-12 py-6 text-lg font-bold"
                        onClick={() =>
                          router.push(
                            card.type === "tour"
                              ? `/tour/${encodeURIComponent(card.slug)}`
                              : `/blog/${encodeURIComponent(card.slug)}`
                          )
                        }
                      >
                        {card.type === "tour" ? "View Tour" : "Read Blog"}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Back to top button */}
        <div className="flex justify-end">
          <Button
            className="bg-[#007654] hover:bg-[#006148] text-white shadow-lg p-3"
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
