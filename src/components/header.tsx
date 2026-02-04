"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  BookOpen,
  User,
  Search,
  ChevronDown,
  Menu,
  X,
  Globe,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { SearchDropdown } from "./searchDrop";
import { TourDrop } from "./Navbar/Navbar";
import { Button } from "./ui/button";

export function Header() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  const languages = ["UZ", "RU", "EN"];
  const daysByLocale: Record<string, string[]> = {
    uz: ["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma"],
    ru: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница"],
    en: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  };
  const locale = useLocale();
  const workingDays = daysByLocale[locale] || daysByLocale["en"];

  const router = useRouter();
  const pathname = usePathname();

  const t = useTranslations("header");
  const authT = useTranslations("auth");

  // Check auth state
  useEffect(() => {
    setIsMounted(true);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsUserOpen(false);
    window.location.href = "/";
  };

  const toggleLangDropdown = () => setIsLangOpen(!isLangOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearchDropdown = () => setIsSearchOpen(!isSearchOpen);
  const toggleTourDropdown = () => setIsTourOpen(!isTourOpen);
  const toggleUserDropdown = () => setIsUserOpen(!isUserOpen);

  const selectLanguage = (lang: string) => {
    setIsLangOpen(false);
    const segments = pathname.split("/");
    segments[1] = lang.toLowerCase();
    router.push(segments.join("/"));
  };

  // Scroll event
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className="w-full sticky top-0 z-50 bg-[#007654] shadow-md border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Top bar */}
      <div
        className={`text-white transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 h-[70px] transition-transform hover:scale-[1.02]"
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
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+447985269296"
              className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-white font-bold hover:bg-white/20 transition-all text-sm border border-white/10"
            >
              <Phone className="h-4 w-4" />
              +44 79 8526 9296
            </a>

            {/* Brochure */}
            <Link
              href={`/${locale}/brochure`}
              className="flex items-center gap-2 border border-white/20 px-4 py-2 rounded-xl hover:bg-white hover:text-[#007654] transition-all duration-300 text-sm font-bold h-11"
            >
              <BookOpen className="h-4 w-4" /> {t("brochureRequest")}
            </Link>

            {/* Auth section */}
            <div className="relative">
              {user ? (
                <div className="flex items-center gap-2 h-full">
                  <button
                    onClick={toggleUserDropdown}
                    className="flex items-center gap-2 bg-white text-[#007654] px-4 py-2 rounded-xl font-bold hover:bg-[#dcfae7] transition-all text-sm shadow-lg shadow-black/5 border border-[#dcfae7]"
                  >
                    <User className="h-4 w-4" />
                    <span className="max-w-[120px] truncate">{user.name.split(' ')[0]}</span>
                    <ChevronDown size={14} className={`transition-transform duration-300 ${isUserOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isUserOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full mt-3 right-0 w-56 bg-white rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden text-[#1a1a1a] p-2 z-[60]"
                      >
                        <div className="p-3 border-b border-gray-50 mb-2">
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Authenticated as</p>
                          <p className="text-sm font-black text-[#007654] truncate">{user.email}</p>
                        </div>
                        <Link
                          href="/my-bookings"
                          onClick={() => setIsUserOpen(false)}
                          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-[#dcfae7] hover:text-[#007654] transition-all text-sm font-bold group"
                        >
                          <LayoutDashboard size={18} className="text-gray-400 group-hover:text-[#007654]" />
                          {authT("account")}
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 transition-all text-sm font-bold group"
                        >
                          <LogOut size={18} />
                          {authT("logout")}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login">
                    <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white font-bold rounded-xl px-5 border border-white/10">
                      {authT("login.submit")}
                    </Button>
                  </Link>
                  <Link href="/signup" className="hidden lg:block">
                    <Button className="bg-white text-[#007654] hover:bg-[#dcfae7] font-black rounded-xl px-6 shadow-xl shadow-black/10 border border-[#dcfae7]">
                      {authT("signup.submit")}
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Language - Beautiful Switcher */}
            <div className="relative">
              <button
                onClick={toggleLangDropdown}
                className="flex items-center gap-3 bg-white/10 hover:bg-white hover:text-[#007654] px-4 py-2.5 rounded-2xl transition-all duration-300 text-sm font-bold border border-white/20 group"
              >
                <span className="text-lg">
                  {locale === 'uz' ? '🇺🇿' : locale === 'ru' ? '🇷🇺' : '🇬🇧'}
                </span>
                <span className="hidden sm:inline">{locale === 'uz' ? "O'zbek" : locale === 'ru' ? 'Русский' : 'English'}</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: 20 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full mt-3 right-0 bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] border border-gray-100 overflow-hidden z-50 p-2 min-w-[200px]"
                  >
                    <div className="px-3 py-2 mb-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        Select Language
                      </p>
                    </div>
                    {[
                      { code: 'uz', flag: '🇺🇿', name: "O'zbekcha", nativeName: 'Uzbek' },
                      { code: 'ru', flag: '🇷🇺', name: 'Русский', nativeName: 'Russian' },
                      { code: 'en', flag: '🇬🇧', name: 'English', nativeName: 'English' },
                    ].map((lang, index) => (
                      <motion.button
                        key={lang.code}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => selectLanguage(lang.code)}
                        className={`flex items-center gap-4 w-full px-4 py-3.5 rounded-2xl text-left transition-all duration-200 group ${locale === lang.code
                          ? 'bg-gradient-to-r from-[#007654] to-[#00a572] text-white shadow-lg'
                          : 'hover:bg-[#dcfae7] text-gray-700'
                          }`}
                      >
                        <span className="text-2xl">{lang.flag}</span>
                        <div className="flex-1">
                          <p className={`text-sm font-black ${locale === lang.code ? 'text-white' : 'text-[#1a1a1a]'}`}>
                            {lang.name}
                          </p>
                          <p className={`text-xs ${locale === lang.code ? 'text-white/70' : 'text-gray-400'}`}>
                            {lang.nativeName}
                          </p>
                        </div>
                        {locale === lang.code && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"
                          >
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search */}
            <div className="relative">
              <button
                onClick={toggleSearchDropdown}
                className="flex items-center justify-center border border-white/20 w-11 h-11 rounded-xl hover:bg-white hover:text-[#007654] transition-all duration-300"
              >
                <Search className="h-5 w-5" />
              </button>
              {isSearchOpen && (
                <div className="absolute top-full right-0 mt-3 z-50">
                  <SearchDropdown onClose={toggleSearchDropdown} />
                </div>
              )}
            </div>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={toggleSearchDropdown}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 transition-all border border-white/10"
            >
              <Search className="h-5 w-5" />
            </button>

            <button
              onClick={toggleMenu}
              className="flex items-center gap-2 bg-white text-[#007654] px-4 py-2 rounded-xl font-black text-sm border border-[#dcfae7]"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
              Menu
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#007654] text-white flex flex-col gap-2 p-4 pt-2 z-40 overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-2 mb-4">
                {user ? (
                  <Link href="/my-bookings" className="col-span-2">
                    <Button className="w-full bg-white text-[#007654] h-12 rounded-xl font-bold flex items-center gap-2">
                      <User size={18} />
                      {user.name}
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/login">
                      <Button variant="outline" className="w-full border-white/20 text-white h-12 rounded-xl font-bold hover:bg-white/10">
                        Login
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button className="w-full bg-white text-[#007654] h-12 rounded-xl font-bold">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>

              <Link href={`/${locale}/brochure`} className="flex items-center gap-3 px-4 py-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all">
                <BookOpen size={20} />
                <span className="font-bold text-sm">Brochures</span>
              </Link>

              {/* Mobile Language Switcher */}
              <div className="flex gap-2 mt-2">
                {[
                  { code: 'uz', flag: '🇺🇿', name: "O'zbek" },
                  { code: 'ru', flag: '🇷🇺', name: 'Рус' },
                  { code: 'en', flag: '🇬🇧', name: 'Eng' },
                ].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      selectLanguage(lang.code);
                      setIsMenuOpen(false);
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm transition-all ${locale === lang.code
                        ? 'bg-white text-[#007654] shadow-lg'
                        : 'bg-white/10 hover:bg-white/20'
                      }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>

              {user && (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-4 bg-red-500/10 text-red-100 rounded-2xl hover:bg-red-500/20 transition-all"
                >
                  <LogOut size={20} />
                  <span className="font-bold text-sm">{authT("logout")}</span>
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main navigation */}
      <nav className="bg-[#007654] text-white border-t border-white/5 py-1">
        <div className="max-w-7xl mx-auto flex justify-center gap-2 md:gap-8 py-2 px-4">
          {/* Tours dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setIsTourOpen(true)}
            onMouseLeave={() => setIsTourOpen(false)}
          >
            <button
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl hover:bg-white/10 transition-all duration-300 whitespace-nowrap text-xs font-black uppercase tracking-widest outline-none"
            >
              {t("tours")}
              <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${isTourOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {isTourOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-[100] w-screen max-w-5xl px-4"
                >
                  <div className="bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] border border-gray-100 overflow-hidden backdrop-blur-xl">
                    <TourDrop />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {[
            { href: "/sanatory", label: t("sanatories") },
            { href: "/blog", label: t("blog") },
            { href: "/contact", label: t("contact_us") },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl hover:bg-white/10 transition-all duration-300 whitespace-nowrap text-xs font-black uppercase tracking-widest"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </motion.header>
  );
}
