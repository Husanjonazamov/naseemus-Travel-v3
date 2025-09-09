"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, Phone, FileText, ChevronDown, Menu, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export function Header() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations("header");

  const languages = ["UZ", "RU", "EN"];
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLangDropdown = () => setIsLangOpen(!isLangOpen);

  const selectLanguage = (lang: string) => {
    setIsLangOpen(false);
    const segments = pathname.split("/");
    segments[1] = lang; // birinchi segment locale
    router.push(segments.join("/"));
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-sm">
      {/* Top bar */}
      <div className="border-b border-gray-200 bg-gray-50 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between py-2 gap-2">
            {/* Left: brochure & search */}
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-gray-700 hover:text-green-700 transition-colors">
                <FileText className="h-4 w-4" />
                <span className="whitespace-nowrap text-sm">{t("brochureRequest")}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-700 hover:text-green-700 transition-colors">
                <Search className="h-4 w-4" />
                <span className="whitespace-nowrap text-sm">{t("search")}</span>
              </button>
            </div>

            {/* Right: phone & address */}
            <div className="flex items-center gap-4 text-gray-700">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="font-medium whitespace-nowrap text-sm">{t("phone")}</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-medium whitespace-nowrap text-sm">{t("address")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 whitespace-nowrap">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/images/green.png"
                alt={t("company_name")}
                width={50}
                height={50}
                className="rounded-full"
                priority
              />
              <span className="text-xl sm:text-2xl font-bold text-green-700 leading-none">
                {t("company_name")}
              </span>
            </Link>
          </div>

          {/* Navigation & language */}
          <div className="flex items-center space-x-8">
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="#" className="text-gray-900 hover:text-green-700 font-medium transition-colors">
                {t("tours")}
              </Link>
              <Link href="#" className="text-gray-900 hover:text-green-700 font-medium transition-colors">
                {t("blog")}
              </Link>
              <Link href="/sanatory" className="text-gray-900 uppercase hover:text-green-700 font-medium transition-colors">
                {t("sanatories")}
              </Link>
              <Link href="#" className="text-gray-900 hover:text-green-700 font-medium transition-colors">
                {t("community")}
              </Link>
            </nav>

            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={toggleLangDropdown}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white shadow-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-300"
              >
                <Globe className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-base">{locale.toUpperCase()}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isLangOpen ? "rotate-180" : "rotate-0"}`} />
              </button>
              <div
                className={`absolute right-0 top-full mt-2 w-32 bg-white border border-gray-200 rounded-xl shadow-lg z-10 transition-all duration-200 ${
                  isLangOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => selectLanguage(lang)}
                    className={`w-full text-left px-4 py-2.5 text-base font-medium rounded-lg transition-colors ${
                      locale === lang
                        ? "bg-green-600 text-white font-bold"
                        : "text-gray-700 hover:bg-green-100 hover:text-green-700"
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu toggle */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                className="text-gray-700 hover:text-green-700"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col space-y-4 py-4">
            <Link href="#" className="text-gray-900 hover:text-green-700 font-medium transition-colors">
              {t("tours")}
            </Link>
            <Link href="#" className="text-gray-900 hover:text-green-700 font-medium transition-colors">
              {t("blog")}
            </Link>
            <Link
              href="/sanatory"
              className="text-gray-900 uppercase hover:text-green-700 font-medium transition-colors"
            >
              {t("sanatories")}
            </Link>
            <Link href="#" className="text-gray-900 hover:text-green-700 font-medium transition-colors">
              {t("community")}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}