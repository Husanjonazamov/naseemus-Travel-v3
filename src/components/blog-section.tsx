"use client"

import { useEffect, useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Button } from "./ui/button"
import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import axios from "axios"
import config from "../config"
import { BlogCard } from "./BlogCard"

export function BlogSection() {
  const t = useTranslations("blog")
  const locale = useLocale()

  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1.2, spacing: 16 },
    breakpoints: {
      "(min-width: 768px)": { slides: { perView: 2, spacing: 20 }, drag: false },
      "(min-width: 1024px)": { slides: { perView: 3, spacing: 24 }, drag: false },
    },
  })

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const lang = locale || "en"
        const response = await axios.get(`${config.BASE_URL}/api/blog/`, {
          headers: { "Accept-Language": lang },
        })
        setPosts(response.data.data.results.slice(0, 6))
      } catch (error) {
        console.error("Blog API error:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogPosts()
  }, [locale])

  return (
    <section className="py-24 px-4 bg-gray-50/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              {t("title")}
            </h2>
            <p className="text-gray-500 text-lg">
              Insights, stories, and guides from the heart of the Silk Road.
            </p>
          </div>
          <Link href="/blog">
            <Button variant="outline" className="border-[#007654] text-[#007654] hover:bg-[#dcfae7] rounded-full px-8">
              View All Stories
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 animate-pulse rounded-2xl h-[450px]" />
            ))}
          </div>
        ) : (
          <div className="relative">
            {/* Desktop Grid */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {/* Mobile Slider */}
            <div ref={sliderRef} className="keen-slider lg:hidden">
              {posts.map((post) => (
                <div key={post.id} className="keen-slider__slide pb-4">
                  <BlogCard post={post} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
