"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  BookOpen,
  User,
  LogIn,
  Search,
  ChevronDown,
  Menu,
  X,
  Globe,
} from "lucide-react";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

import { SearchDropdown } from "./searchDrop";
import { TourDrop } from "./Navbar/Navbar";

export function Header() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);

  const languages = ["UZ", "RU", "EN"];
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLangDropdown = () => setIsLangOpen(!isLangOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearchDropdown = () => setIsSearchOpen(!isSearchOpen);
  const toggleTourDropdown = () => setIsTourOpen(!isTourOpen);

  const selectLanguage = (lang: string) => {
    setIsLangOpen(false);
    const segments = pathname.split("/");
    segments[1] = lang.toLowerCase();
    router.push(segments.join("/"));
  };

  const t = useTranslations("header");

  return (
    <header className="w-full">
      {/* Top bar */}
      <div className="bg-green-700 text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 overflow-hidden h-[80px]"
          >
            <Image
              src="/images/logo1.png"
              alt="Naseem Travel"
              width={140}
              height={300}
              className="object-contain w-auto h-full"
              priority
            />
          </Link>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+998901234567"
              className="flex items-center gap-2 bg-green-500 px-3 py-1.5 rounded-md text-white font-semibold hover:bg-green-600 transition text-md"
            >
              <Phone className="h-5 w-5" />
              +998 90 123 45 67
            </a>

            <button className="flex items-center gap-2 border border-white px-4 py-2 rounded-md hover:bg-green-600 transition text-base">
              <BookOpen className="h-5 w-5" /> {t("brochureRequest")}
            </button>
            <button className="flex items-center gap-2 border border-white px-4 py-2 rounded-md hover:bg-green-600 transition text-base">
              <User className="h-5 w-5" /> My Booking
            </button>
            <button
              onClick={toggleLangDropdown}
              className="flex items-center gap-2 border border-white px-4 py-2 rounded-md hover:bg-green-600 transition text-base relative"
            >
              <Globe className="h-5 w-5" /> {locale.toUpperCase()}
              {isLangOpen && (
                <div className="absolute top-full mt-2 right-0 bg-white text-black rounded-md shadow-md">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => selectLanguage(lang)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </button>
            <button
              onClick={toggleSearchDropdown}
              className="flex items-center gap-2 border border-white px-4 py-2 rounded-md hover:bg-green-600 transition text-base relative"
            >
              <Search className="h-5 w-5" /> Search
              {isSearchOpen && (
                <div className="absolute top-full right-0 mt-2 z-50">
                  <SearchDropdown />
                </div>
              )}
            </button>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-3 md:hidden">
            <a
              href="tel:+998901234567"
              className="p-2 rounded-md hover:bg-green-600 transition"
            >
              <Phone className="h-6 w-6" />
            </a>

            <button
              onClick={toggleSearchDropdown}
              className="p-2 rounded-md hover:bg-green-600 transition relative"
            >
              <Search className="h-6 w-6" />
              {isSearchOpen && (
                <div className="absolute top-full right-0 mt-2 z-50">
                  <SearchDropdown />
                </div>
              )}
            </button>

            <button
              onClick={toggleMenu}
              className="flex items-center gap-1 border border-white px-2 py-1 rounded-md hover:bg-green-600 transition"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
              Menu
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-green-800 text-white flex flex-col gap-2 p-4">
            <button
              onClick={toggleTourDropdown}
              className="flex items-center gap-2 px-2 py-2 hover:bg-green-600 rounded-md relative"
            >
              <BookOpen className="h-5 w-5" /> Brochures
              {isTourOpen && (
                <div className="absolute top-full left-0 mt-1 z-50">
                  <TourDrop />
                </div>
              )}
            </button>
            <button className="flex items-center gap-2 px-2 py-2 hover:bg-green-600 rounded-md">
              <User className="h-5 w-5" /> My Booking
            </button>
            <button
              onClick={toggleLangDropdown}
              className="flex items-center gap-2 px-2 py-2 hover:bg-green-600 rounded-md relative"
            >
              <Globe className="h-5 w-5" /> Language: {locale.toUpperCase()}
            </button>
            {isLangOpen && (
              <div className="bg-white text-black rounded-md shadow-md mt-1">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => selectLanguage(lang)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>


      <nav className="bg-green-600 text-white">
        <div className="max-w-7xl mx-auto flex justify-center gap-4 py-2 px-2 text-sm font-semibold">
          
          {/* Tours dropdown */}
          <button
            onClick={toggleTourDropdown}
            className="flex items-center justify-center gap-1 px-3 py-1 rounded-md hover:bg-green-700 transition whitespace-nowrap relative"
          >
            {t("tours")}
            {isTourOpen && (
              <div className="absolute top-full left-0 mt-1 z-50">
                <TourDrop />
              </div>
            )}
          </button>

          {/* Sanatories */}
          <Link
            href="/sanatory"
            className="flex items-center justify-center gap-1 px-3 py-1 rounded-md hover:bg-green-700 transition whitespace-nowrap"
          >
            {t("sanatories")}
          </Link>

          {/* Blog */}
          <Link
            href="/blog"
            className="flex items-center justify-center gap-1 px-3 py-1 rounded-md hover:bg-green-700 transition whitespace-nowrap"
          >
            {t("blog")}
          </Link>

          {/* Contact Us */}
          <Link
            href="/contact"
            className="flex items-center justify-center gap-1 px-3 py-1 rounded-md hover:bg-green-700 transition whitespace-nowrap"
          >
            {t("contact_us")}
          </Link>

        </div>
      </nav>

    </header>
  );
}
