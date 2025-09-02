"use client";

import Image from "next/image";
import { Search, Phone, FileText, ChevronDown, Menu, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useTranslations } from "next-intl"


export function Header() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("UZ");
  const t = useTranslations("header");

  const languages = ["UZ", "RU", "EN"];

  const toggleLangDropdown = () => setIsLangOpen(!isLangOpen);
  const selectLanguage = (lang: string) => {
    setCurrentLang(lang);
    setIsLangOpen(false);
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
                <span className="whitespace-nowrap text-sm">
                  {t("brochureRequest")}
                </span>
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
                <span className="font-medium whitespace-nowrap text-sm">
                  +998-94-001-47-41
                </span>
              </div>
              <div className="hidden sm:block">
                <span className="font-medium whitespace-nowrap text-sm">
                  123 Main Street, Tashkent
                </span>
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
            <Image
              src="/images/green.png"
              alt="Naseem's Travel Logo"
              width={50}
              height={50}
              className="rounded-full"
            />
            <span className="text-xl sm:text-2xl font-bold text-green-700 leading-none">
              Naseem's Travel
            </span>
          </div>

          {/* Navigation & language */}
          <div className="flex items-center space-x-8">
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#" className="text-gray-900 hover:text-green-700 font-medium transition-colors">
                DESTINATIONS
              </a>
              <a href="#" className="text-gray-900 hover:text-green-700 font-medium transition-colors">
                OFFERS
              </a>
              <a href="#" className="text-gray-900 hover:text-green-700 font-medium transition-colors">
                COMMUNITY
              </a>
               <a href="#" className="text-gray-900 hover:text-green-700 font-medium transition-colors">
              DESTINATIONS
            </a>
            <a href="#" className="text-gray-900 hover:text-green-700 font-medium transition-colors">
              OFFERS
            </a>
            <a href="#" className="text-gray-900 hover:text-green-700 font-medium transition-colors">
              COMMUNITY
            </a>
            </nav>

            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={toggleLangDropdown}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 bg-white shadow-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-300"
              >
                <Globe className="h-5 w-5 text-green-600" />
                <span className="font-semibold">{currentLang}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isLangOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              <div
                className={`absolute right-0 top-full mt-2 w-28 bg-white border border-gray-200 rounded-xl shadow-lg z-10 transition-all duration-200 ${
                  isLangOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => selectLanguage(lang)}
                    className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-colors ${
                      currentLang === lang
                        ? "bg-green-600 text-white font-bold"
                        : "text-gray-700 hover:bg-green-100 hover:text-green-700"
                    }`}
                  >
                    {lang}
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
            <a href="#" className="text-gray-900 hover:text-green-700 font-medium transition-colors">
              DESTINATIONS
            </a>
            <a href="#" className="text-gray-900 hover:text-green-700 font-medium transition-colors">
              OFFERS
            </a>
            <a href="#" className="text-gray-900 hover:text-green-700 font-medium transition-colors">
              COMMUNITY
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
