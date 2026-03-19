"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import axios from "axios";
import { Facebook, Instagram, Mail, Phone, Send } from "lucide-react";

import config from "../config";
import { localizeHref } from "@/src/lib/localize-href";
import { SubscribeModal } from "./SubscribeModal";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Tour {
  id: number;
  title: string;
  slug: string;
}

export function Footer() {
  const t = useTranslations("footer");
  const tHero = useTranslations("header");
  const locale = useLocale() || "en";
  const localizedHref = (href: string) => localizeHref(locale, href);

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
        console.error("Failed to load tours for footer:", error);
      }
    };

    fetchTours();
  }, [locale]);

  return (
    <footer className="border-t border-white/5 bg-[#121212] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-16">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-white">{tHero("company_name")}</h2>
              <p className="max-w-xs text-sm leading-relaxed text-gray-400">{t("brand_description")}</p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold tracking-widest text-white">
                {t("customer_support.follow_us")}
              </h4>
              <div className="flex gap-4">
                {[
                  { icon: Send, href: "https://t.me/naseemstravel" },
                  { icon: Instagram, href: "https://www.instagram.com/naseemstravel" },
                  { icon: Facebook, href: localizedHref("/contact") },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-gray-400 ring-1 ring-white/10 transition-all duration-300 hover:bg-[#007654] hover:text-white hover:ring-transparent"
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-8 text-xs font-bold tracking-widest text-white">
              {t("customer_support.contact_us")}
            </h4>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#007654]/10 text-[#007654]">
                  <Phone size={16} />
                </div>
                <a href="tel:+447985269296" className="text-gray-300 transition-colors hover:text-white">
                  +44 79 8526 9296
                </a>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#007654]/10 text-[#007654]">
                  <Mail size={16} />
                </div>
                <a
                  href="mailto:naseemstravel@gmail.com"
                  className="text-gray-300 transition-colors hover:text-white"
                >
                  naseemstravel@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-1">
            <div>
              <h4 className="mb-8 text-xs font-bold tracking-widest text-white">
                {t("sections.tours")}
              </h4>
              <ul className="space-y-3">
                {tours.map((tour) => (
                  <li key={tour.id}>
                    <Link
                      href={`/${locale}/tour/${tour.slug}`}
                      className="block py-0.5 text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      {tour.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-8 text-xs font-bold tracking-widest text-white">
                {t("sections.company")}
              </h4>
              <ul className="space-y-3">
                {[
                  { label: t("customer_support.about_us"), href: localizedHref("/#about") },
                  { label: t("customer_support.community"), href: localizedHref("/blog") },
                  { label: t("customer_support.faq"), href: localizedHref("/contact#faq") },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="block py-0.5 text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="mb-8 text-xs font-bold tracking-widest text-white">
              {t("newsletter.title")}
            </h4>
            <p className="text-sm text-gray-400">{t("newsletter.description")}</p>
            <div className="flex flex-col gap-3">
              <div className="group relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-[#007654]" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 rounded-xl border-white/10 bg-white/5 pl-10 text-white placeholder:text-gray-600 focus:border-[#007654] focus:ring-[#007654]"
                />
              </div>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="h-12 w-full rounded-xl bg-[#007654] text-xs font-bold tracking-wider text-white shadow-lg shadow-[#007654]/20 transition-all hover:translate-y-[-2px] hover:bg-[#008c64]"
              >
                {t("newsletter.cta")}
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Naseem's Travel. All rights reserved. Registered in the UK.
          </p>

          <div className="flex gap-8">
            <Link href={localizedHref("/privacy-policy")} className="text-xs text-gray-500 transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href={localizedHref("/terms-of-service")} className="text-xs text-gray-500 transition-colors hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>

        <SubscribeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </footer>
  );
}
