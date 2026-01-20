"use client"

import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { ArrowLeft, ArrowRight, ShieldCheck, Award, Users } from "lucide-react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
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
  author?: string
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
          author: "Travel Expert"
        }))

        // Mix and match but prioritize variety
        const mixed = [...tourCards.slice(0, 3), ...blogCards.slice(0, 3)]
        setCards(mixed)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching cards:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [locale])

  return (
    <section className="py-32 px-4 bg-white relative overflow-hidden" id="experts">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#dcfae7]/30 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#dcfae7]/20 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-12 bg-[#007654]" />
              <span className="text-[#007654] font-black uppercase tracking-[0.3em] text-[10px]">Pioneers in Solo Travel</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-[#1a1a1a] mb-8 tracking-tight leading-[1.05]">
              {t("title")}
            </h2>
            <p className="text-gray-500 text-lg md:text-2xl font-medium leading-relaxed max-w-2xl">
              {t("description")}
            </p>
          </div>

          <div className="flex gap-16 md:mb-4">
            <div className="flex flex-col items-center">
              < ShieldCheck size={32} className="text-[#007654] mb-3" />
              <span className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Certified</span>
            </div>
            <div className="flex flex-col items-center">
              < Award size={32} className="text-[#007654] mb-3" />
              <span className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Awarded</span>
            </div>
            <div className="flex flex-col items-center">
              < Users size={32} className="text-[#007654] mb-3" />
              <span className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Global</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 rounded-[40px] h-[500px] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="content-swiper-container">
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={40}
              slidesPerView={1.1}
              loop
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              breakpoints={{
                768: { slidesPerView: 2, spaceBetween: 30 },
                1024: { slidesPerView: 3, spaceBetween: 50 }
              }}
              className="!overflow-visible"
            >
              {cards.map((card, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="group bg-white rounded-[40px] overflow-hidden flex flex-col h-[650px] shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)] hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.15)] transition-all duration-700 border border-[#f5f5f5]"
                  >
                    <div className="relative h-[340px] w-full overflow-hidden">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/40 to-transparent" />
                      <div className="absolute top-8 left-8">
                        <span className="bg-[#007654] text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full">
                          {card.type === "tour" ? "Exclusive Tour" : "Expert Insight"}
                        </span>
                      </div>
                    </div>

                    <div className="p-10 flex flex-col flex-grow">
                      <h3 className="text-2xl font-black text-[#1a1a1a] mb-5 leading-tight group-hover:text-[#007654] transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-gray-500 font-medium text-sm md:text-base leading-loose mb-10 line-clamp-4">
                        {card.description?.replace(/<[^>]*>?/gm, "") || "Crafted for the discerning traveler looking for authentic experiences."}
                      </p>

                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#dcfae7] flex items-center justify-center text-[#007654] font-black text-xs uppercase">
                            {card.type === "tour" ? "TR" : "EX"}
                          </div>
                          <span className="text-[11px] font-black uppercase tracking-widest text-[#1a1a1a]">{card.author || "Silk Road specialist"}</span>
                        </div>
                        <Button
                          className="bg-transparent hover:bg-[#007654] text-[#007654] hover:text-white border border-[#007654] px-6 h-12 rounded-[18px] font-bold transition-all flex items-center gap-2"
                          onClick={() =>
                            router.push(
                              card.type === "tour"
                                ? `/tour/${encodeURIComponent(card.slug)}`
                                : `/blog/${encodeURIComponent(card.slug)}`
                            )
                          }
                        >
                          Explore
                          <ArrowRight size={18} />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        <div className="mt-24 pt-16 border-t border-[#f5f5f5] flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden bg-gray-200">
                  <Image src={`/images/specialist-${i % 2 === 0 ? '1' : '2'}.png`} alt="Expert" width={48} height={48} className="object-cover" />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-4 border-white bg-[#007654] flex items-center justify-center text-white text-xs font-black">
                +12
              </div>
            </div>
            <p className="text-gray-400 font-bold text-sm">Trusted by <span className="text-[#1a1a1a]">5,000+</span> solo travelers</p>
          </div>

          <Button
            className="bg-[#1a1a1a] hover:bg-[#007654] text-white px-10 h-16 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-2xl"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to Departure
            <ArrowLeft size={16} className="ml-3 rotate-90" />
          </Button>
        </div>
      </div>
    </section>
  )
}
