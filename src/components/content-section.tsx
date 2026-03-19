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
  const t = useTranslations("content_section")
  const router = useRouter()
  const [tourCards, setTourCards] = useState<CardData[]>([])
  const [blogCards, setBlogCards] = useState<CardData[]>([])
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

        const tours: CardData[] = tourJson.data.results.map((item: any) => ({
          id: item.id,
          title: item.title,
          slug: item.slug,
          description: item.description,
          image: item.image,
          type: "tour",
          price: item.price,
        }))

        const blogs: CardData[] = blogJson.data.results.map((item: any) => ({
          id: item.id,
          title: item.title,
          slug: item.slug,
          description: item.description,
          image: item.image,
          type: "blog",
          author: "Travel Expert"
        }))

        setTourCards(tours)
        setBlogCards(blogs)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching cards:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [locale])

  const renderCardSlider = (cards: CardData[], type: "tour" | "blog") => (
    <Swiper
      modules={[Autoplay, Navigation]}
      spaceBetween={40}
      slidesPerView={1.1}
      loop={cards.length > 3}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      breakpoints={{
        768: { slidesPerView: 2, spaceBetween: 30 },
        1024: { slidesPerView: 3, spaceBetween: 40 }
      }}
      className="!overflow-visible"
    >
      {cards.map((card, index) => (
        <SwiperSlide key={card.id}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="group bg-white rounded-[32px] overflow-hidden flex flex-col h-[550px] shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)] hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.15)] transition-all duration-700 border border-[#f5f5f5]"
          >
            <div className="relative h-[280px] w-full overflow-hidden">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/40 to-transparent" />
              <div className="absolute top-6 left-6">
                <span className="bg-[#007654] text-white text-[10px] font-black tracking-widest px-4 py-2 rounded-full">
                  {type === "tour" ? t("tour_badge") : t("blog_badge")}
                </span>
              </div>
            </div>

            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-xl font-black text-[#1a1a1a] mb-4 leading-tight group-hover:text-[#007654] transition-colors line-clamp-2">
                {card.title}
              </h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed mb-6 line-clamp-3">
                {card.description?.replace(/<[^>]*>?/gm, "") || t("default_description")}
              </p>

              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 flex-shrink-0 rounded-full bg-[#dcfae7] flex items-center justify-center text-[#007654] font-black text-xs">
                    {type === "tour" ? "TR" : "BL"}
                  </div>
                  <span className="text-[10px] font-black tracking-widest text-gray-400 truncate">
                    {card.author || t("specialist")}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  className="p-0 h-auto bg-transparent hover:bg-transparent text-[#007654] hover:text-[#008c64] font-bold transition-all flex items-center gap-2 text-sm whitespace-nowrap flex-shrink-0 group/btn"
                  onClick={() =>
                    router.push(
                      type === "tour"
                        ? `/${locale}/tour/${encodeURIComponent(card.slug)}`
                        : `/${locale}/blog/${encodeURIComponent(card.slug)}`
                    )
                  }
                >
                  {t("explore_button")}
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </div>
          </motion.div>
        </SwiperSlide>
      ))}
    </Swiper>
  )

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-gray-50 rounded-[32px] h-[550px] animate-pulse" />
      ))}
    </div>
  )

  return (
    <div className="bg-white">
      {/* Blogs Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-[#dcfae7]/20 blur-[100px] rounded-full" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-10 bg-[#007654]" />
              <span className="text-[#007654] font-black tracking-[0.2em] text-[10px]">{t("blog_subtitle")}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] tracking-tight">
              {t("blog_title")}
            </h2>
          </div>

          {loading ? <LoadingSkeleton /> : renderCardSlider(blogCards, "blog")}
        </div>
      </section>

      {/* Tours Section */}
      <section className="py-24 px-4 bg-[#fafafa] relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-[#dcfae7]/30 blur-[120px] rounded-full" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-10 bg-[#007654]" />
              <span className="text-[#007654] font-black tracking-[0.2em] text-[10px]">{t("tour_subtitle")}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] tracking-tight">
              {t("tour_title")}
            </h2>
          </div>

          {loading ? <LoadingSkeleton /> : renderCardSlider(tourCards, "tour")}

          {/* Trust badges */}
          <div className="mt-20 pt-12 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-3 border-white overflow-hidden bg-gray-200">
                    <Image src={`/images/specialist-${i % 2 === 0 ? '1' : '2'}.png`} alt="Expert" width={40} height={40} className="object-cover" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-3 border-white bg-[#007654] flex items-center justify-center text-white text-xs font-black">
                  +12
                </div>
              </div>
              <p className="text-gray-400 font-bold text-sm">
                {t("trusted_by")} <span className="text-[#1a1a1a]">5,000+</span> {t("travelers")}
              </p>
            </div>

            <div className="flex gap-10">
              <div className="flex flex-col items-center">
                <ShieldCheck size={28} className="text-[#007654] mb-2" />
                <span className="text-[10px] font-black text-gray-400 tracking-widest">{t("certified")}</span>
              </div>
              <div className="flex flex-col items-center">
                <Award size={28} className="text-[#007654] mb-2" />
                <span className="text-[10px] font-black text-gray-400 tracking-widest">{t("awarded")}</span>
              </div>
              <div className="flex flex-col items-center">
                <Users size={28} className="text-[#007654] mb-2" />
                <span className="text-[10px] font-black text-gray-400 tracking-widest">{t("global")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
