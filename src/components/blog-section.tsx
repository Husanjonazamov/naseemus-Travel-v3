"use client"

import { useEffect, useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Button } from "./ui/button"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import axios from "axios"
import config from "../config"

// Helper: title ni URL-friendly qilish
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

interface BlogPost {
  id: number
  title: string
  description: string
  image: string
}

interface ApiResponse {
  status: boolean
  data: {
    links: { previous: string | null; next: string | null }
    total_items: number
    total_pages: number
    page_size: number
    current_page: number
    results: BlogPost[]
  }
}

export function BlogSection() {
  const t = useTranslations("blog")
  const router = useRouter()

  const [destinations, setDestinations] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

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

      // API dan ma'lumot olish
    useEffect(() => {
      const fetchBlogPosts = async () => {
        try {
          const response = await axios.get<ApiResponse>(`${config.BASE_URL}/api/blog/`)
          // faqat 6 ta postni oling
          setDestinations(response.data.data.results.slice(0, 6))
        } catch (error) {
          console.error("Blog API error:", error)
        } finally {
          setLoading(false)
        }
      }
      fetchBlogPosts()
    }, [])




  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-[#007654] mb-12">
          {t("title")}
        </h2>

        {isMobile ? (
          <div ref={sliderRef} className="keen-slider">
            {destinations.map((destination) => (
              <div key={destination.id} className="keen-slider__slide flex flex-col bg-white shadow-lg overflow-hidden">
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url('${destination.image}')` }}
                ></div>

                <div className="flex flex-col flex-grow p-6">
                  <h3 className="text-xl font-bold text-[#007654] mb-4">
                    {destination.title}
                  </h3>
                  <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                    {destination.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <Button
                      className="bg-[#007654] text-white font-bold px-8 py-6 rounded-md shadow-md text-lg"
                      onClick={() => router.push(`/blog/${slugify(destination.title)}`)}
                    >
                      {t("explore_button")}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <div key={destination.id} className="flex flex-col bg-white shadow-lg overflow-hidden">
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url('${destination.image}')` }}
                ></div>

                <div className="flex flex-col flex-grow p-6">
                  <h3 className="text-xl font-bold text-[#007654] mb-4">
                    {destination.title}
                  </h3>
                  <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                    {destination.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <Button
                      className="bg-[#007654] text-white font-bold px-8 py-6 rounded-md shadow-md text-lg"
                      onClick={() => router.push(`/blog/${slugify(destination.title)}`)}
                    >
                      {t("explore_button")}
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
