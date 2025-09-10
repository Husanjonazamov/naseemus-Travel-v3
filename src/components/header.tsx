"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Phone,
  FileText,
  ChevronDown,
  Menu,
  Globe,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { TourDrop } from "./Navbar/Navbar";
import { SearchDropdown } from "./searchDrop";

export function Header() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const t = useTranslations("header");
  const languages = ["UZ", "RU", "EN"];
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLangDropdown = () => setIsLangOpen(!isLangOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleTourDropdown = () => setIsTourOpen(!isTourOpen);
  const toggleBrochure = () => setIsBrochureOpen(!isBrochureOpen);

  const selectLanguage = (lang: string) => {
    setIsLangOpen(false);
    const segments = pathname.split("/");
    segments[1] = lang;
    router.push(segments.join("/"));
  };

  // Demo search data
  const allData = [
    "Toshkent Safari",
    "Buxoro Tarixi",
    "Samarqand Marvarid",
    "Xiva Sarguzasht",
    "Paris Tour",
    "Rome Tour",
  ];

  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = allData.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <header className="bg-white shadow-sm">
      {/* Top bar (desktop only) */}
      <div className="hidden lg:block border-b border-gray-200 bg-gray-50 text-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 relative">
            {/* Left: brochure & search */}
            <div className="flex items-center gap-8 text-gray-700 text-lg">
              <div className="relative">
                <button
                  onClick={toggleBrochure}
                  className="flex items-center gap-3 hover:text-green-700 transition-colors"
                >
                  <FileText className="h-5 w-5" />
                  <span className="font-semibold">{t("brochureRequest")}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isBrochureOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                {/* Brochure dropdown */}
                {isBrochureOpen && (
                  <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-4 animate-fadeIn">
                    <p className="text-gray-800 font-semibold mb-2">
                      {t("working_hours")}
                    </p>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>Dushanba - Juma: 09:00 - 18:00</li>
                      <li>Shanba: 10:00 - 16:00</li>
                      <li>Yakshanba: Yopiq</li>
                    </ul>
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="flex items-center gap-3 hover:text-green-700 transition-colors"
              >
                <Search className="h-5 w-5" />
                <span className="font-semibold">{t("search")}</span>
              </button>
            </div>

            {/* Right: phone & address */}
            <div className="flex items-center gap-8 text-gray-700 text-lg">
              <a
                href="tel:+998901234567"
                className="flex items-center gap-3 hover:text-green-700 transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span className="font-semibold">{t("phone")}</span>
              </a>
              <span className="font-semibold">{t("address")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo + icons (mobile) */}
          <div className="flex items-center gap-4">
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
                Naseem's Travel
              </span>
            </Link>

            {/* Mobile: phone + search */}
            <div className="flex lg:hidden items-center gap-3 ml-2">
              <a
                href="tel:+998901234567"
                className="text-gray-700 hover:text-green-700 transition-colors"
              >
                <Phone className="h-5 w-5" />
              </a>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-gray-700 hover:text-green-700 transition-colors"
              >
                {isSearchOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="flex items-center space-x-8">
            <nav className="hidden lg:flex items-center space-x-8 relative">
              {/* Tours dropdown */}
              <div className="relative">
                <button
                  onClick={toggleTourDropdown}
                  className="flex items-center gap-1 text-gray-900 hover:text-green-700 font-medium"
                >
                  {t("tours")}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isTourOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                {isTourOpen && (
                  <div className="absolute left-0 top-full mt-2 z-[1000]">
                    <TourDrop />
                  </div>
                )}
              </div>

              <Link
                href="/blog"
                className="text-gray-900 hover:text-green-700 font-medium"
              >
                {t("blog")}
              </Link>
              <Link
                href="/sanatory"
                className="text-gray-900 uppercase hover:text-green-700 font-medium"
              >
                {t("sanatories")}
              </Link>
              <Link
                href="#"
                className="text-gray-900 hover:text-green-700 font-medium"
              >
                {t("community")}
              </Link>
            </nav>

            {/* Desktop lang switcher */}
            <div className="hidden lg:block relative">
              <button
                onClick={toggleLangDropdown}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white shadow-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
              >
                <Globe className="h-5 w-5 text-green-600" />
                <span className="font-semibold">{locale.toUpperCase()}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isLangOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              {isLangOpen && (
                <div className="absolute right-0 top-full mt-2 w-32 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => selectLanguage(lang)}
                      className={`w-full text-left px-4 py-2 text-sm font-medium ${
                        locale === lang
                          ? "bg-green-600 text-white font-bold"
                          : "text-gray-700 hover:bg-green-100 hover:text-green-700"
                      }`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
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

        {/* SearchDropdown ochilishi (mobil va desktop uchun bir xil) */}
        {isSearchOpen && (
          <SearchDropdown
            query={query}
            setQuery={setQuery}
            results={results}
          />
        )}

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col space-y-4 py-4">
            {/* Mobile tours dropdown */}
            <div className="flex flex-col">
              <button
                onClick={toggleTourDropdown}
                className="flex items-center justify-between text-gray-900 hover:text-green-700 font-medium"
              >
                {t("tours")}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isTourOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              {isTourOpen && <TourDrop />}
            </div>

            <Link
              href="/blog"
              className="text-gray-900 hover:text-green-700 font-medium"
            >
              {t("blog")}
            </Link>
            <Link
              href="/sanatory"
              className="text-gray-900 uppercase hover:text-green-700 font-medium"
            >
              {t("sanatories")}
            </Link>
            <Link
              href="#"
              className="text-gray-900 hover:text-green-700 font-medium"
            >
              {t("community")}
            </Link>

            {/* Mobile lang switcher */}
            <div className="flex flex-col">
              <button
                onClick={toggleLangDropdown}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-green-50 hover:text-green-700"
              >
                <Globe className="h-5 w-5 text-green-600" />
                <span className="font-semibold">{locale.toUpperCase()}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isLangOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              {isLangOpen && (
                <div className="flex flex-col mt-2 border border-gray-200 rounded-lg shadow-md">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => selectLanguage(lang)}
                      className={`px-4 py-2 text-left text-sm font-medium ${
                        locale === lang
                          ? "bg-green-600 text-white font-bold"
                          : "text-gray-700 hover:bg-green-100 hover:text-green-700"
                      }`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
