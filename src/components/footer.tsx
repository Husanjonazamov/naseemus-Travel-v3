"use client"

import { Facebook, Instagram } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import { useEffect, useState } from "react"
import axios from "axios"
import config from "../config"


interface Tour {
  id: number
  title: string
  slug: string
}

export function Footer() {
  const t = useTranslations("footer")
  const locale = useLocale() || "en"

  const [tours, setTours] = useState<Tour[]>([])

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axios.get(`${config.BASE_URL}/api/tour/`, {
          headers: { "Accept-Language": locale },
        })
        if (res.data.status && res.data.data.results) {
          setTours(res.data.data.results.slice(0, 6))
        }
      } catch (error) {
        console.error("API dan tur ma'lumotlarini olishda xatolik:", error)
      }
    }
    fetchTours()
  }, [locale])

  return (
    <footer className="bg-white border-t border-gray-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">{t("customer_support.contact_us")}</h3>
            <div className="space-y-4">
              <p className="text-gray-700">+998 97 424 10 15</p>
              <p className="text-gray-700">naseemus@gmail.com</p>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">{t("customer_support.follow_us")}</h4>
              <div className="flex space-x-4">
                <a  href="https://www.facebook.com/nasimjonkodirov/" target="_blank" className="text-gray-600 hover:text-[#007654] transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="https://www.instagram.com/reel/DMhqbiiqAmn/" target="_blank" className="text-gray-600 hover:text-[#007654] transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Turlar */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">{t("sections.tours")}</h3>
            <ul className="space-y-3">
              {tours.map((tour) => (
                <li key={tour.id}>
                  <Link href={`/tour/${encodeURIComponent(tour.slug)}`} className="text-gray-700 hover:text-[#007654] transition-colors">
                    {tour.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">{t("customer_support_title")}</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-gray-700 hover:text-[#007654] transition-colors">{t("customer_support.about_us")}</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-[#007654] transition-colors">{t("customer_support.contact_us")}</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-[#007654] transition-colors">{t("customer_support.community")}</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-[#007654] transition-colors">{t("customer_support.faq")}</Link></li>
            </ul>
          </div>

          {/* Newsletter Sign Up */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">{t("newsletter.title")}</h3>
            <div className="flex gap-2">
              <Input 
                type="phone" 
                placeholder={t("contact.phone_pl")} 
                className="flex-1" 
              />
              <Button className="bg-[#007654] hover:bg-[#006644] text-white px-6">
                {t("newsletter.cta")}
              </Button>
            </div>
          </div>
        </div>

        {/* Award Badges */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex justify-center items-center space-x-8">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <div className="w-16 h-16 bg-[#007654] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">WINNER</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
