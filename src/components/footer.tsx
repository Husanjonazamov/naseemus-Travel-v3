"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import { Send, Phone, Mail, Instagram, Facebook } from "lucide-react";
import { SubscribeModal } from "./SubscribeModal";

interface Tour {
  id: number;
  title: string;
  slug: string;
}

export function Footer() {
  const t = useTranslations("footer");
  const tHero = useTranslations("header");
  const locale = useLocale() || "en";

  const [tours, setTours] = useState<Tour[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axios.get(`${config.BASE_URL}/api/tour/`, {
          headers: { "Accept-Language": locale },
        });
        if (res.data.status && res.data.data.results) {
          setTours(res.data.data.results.slice(0, 6));
        }
      } catch (error) {
        console.error("API dan tur ma'lumotlarini olishda xatolik:", error);
      }
    };
    fetchTours();
  }, [locale]);
  return (
    <footer className="bg-[#121212] py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand & Social */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {tHero("company_name")}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                {t("brand_description")}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">
                {t("customer_support.follow_us")}
              </h4>
              <div className="flex gap-4">
                {[
                  { icon: Send, href: "https://t.me/naseemstravel" },
                  {
                    icon: Instagram,
                    href: "https://www.instagram.com/naseemstravel",
                  },
                  { icon: Facebook, href: "#" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#007654] hover:text-white transition-all duration-300 ring-1 ring-white/10 hover:ring-transparent"
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-8">
              {t("customer_support.contact_us")}
            </h4>
            <div className="space-y-6">
              <div className="flex items-start gap-3 group cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-[#007654]/10 flex items-center justify-center text-[#007654] group-hover:bg-[#007654] group-hover:text-white transition-colors">
                  <Phone size={16} />
                </div>
                <div>
                  {/* <p className="text-xs text-gray-500 font-bold uppercase mb-1">{t("contact.phone_pl")}</p> */}
                  <a
                    href="tel:+447985269296"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    +44 79 8526 9296
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 group cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-[#007654]/10 flex items-center justify-center text-[#007654] group-hover:bg-[#007654] group-hover:text-white transition-colors">
                  <Mail size={16} />
                </div>
                <div>
                  {/* <p className="text-xs text-gray-500 font-bold uppercase mb-1">{t("contact.email")}</p> */}
                  <a
                    href="mailto:naseemstravel@gmail.com"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    naseemstravel@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-1">
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-8">
                {t("sections.tours")}
              </h4>
              <ul className="space-y-3">
                {tours.map((tour) => (
                  <li key={tour.id}>
                    <Link
                      href={`/${locale}/tour/${tour.slug}`}
                      className="text-sm text-gray-400 hover:text-white transition-colors block py-0.5"
                    >
                      {tour.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-8">
                {t("sections.company")}
              </h4>
              <ul className="space-y-3">
                {[
                  { label: t("customer_support.about_us"), href: "#" },
                  { label: t("customer_support.community"), href: "#" },
                  { label: t("customer_support.faq"), href: "#" },
                ].map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors block py-0.5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-8">
              {t("newsletter.title")}
            </h4>
            <p className="text-gray-400 text-sm">
              {t("newsletter.description")}
            </p>
            <div className="flex flex-col gap-3">
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-[#007654] transition-colors" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 pl-10 h-12 rounded-xl focus:ring-[#007654] focus:border-[#007654] transition-all"
                />
              </div>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-[#007654] hover:bg-[#008c64] text-white h-12 rounded-xl font-bold uppercase tracking-wider text-xs transition-all transform hover:translate-y-[-2px] shadow-lg shadow-[#007654]/20"
              >
                {t("newsletter.cta")}
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Naseem's Travel. All rights reserved. Registered in the UK.
          </p> */}
          <p className="text-gray-500 text-xs">
            © 2025 Naseem's Travel. All rights reserved. Registered in the UK.
          </p>

          <div className="flex gap-8">
            <Link
              href="#"
              className="text-xs text-gray-500 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs text-gray-500 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>

        <SubscribeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </footer>
  );
}
