"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Phone,
  Search,
  User,
  X,
} from "lucide-react";

import { useAuth } from "@/src/context/AuthContext";
import { localizeHref } from "@/src/lib/localize-href";
import { TourDrop } from "./Navbar/Navbar";
import { SearchDropdown } from "./searchDrop";
import { Button } from "./ui/button";

export function Header() {
  const SHOW_BROCHURE = false;
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const t = useTranslations("header");
  const authT = useTranslations("auth");

  const [scrolled, setScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  const localizedHref = (href: string) => localizeHref(locale, href);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;

    const element = headerRef.current;
    const updateHeight = () => setHeaderHeight(element.offsetHeight);

    updateHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    resizeObserver.observe(element);
    window.addEventListener("resize", updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, [isMenuOpen, isSearchOpen, isTourOpen, isUserOpen, isLangOpen, scrolled]);

  const selectLanguage = (nextLocale: string) => {
    setIsLangOpen(false);
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    router.push(segments.join("/") || `/${nextLocale}`);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    setIsUserOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen || isSearchOpen || isLangOpen || isUserOpen) {
      setIsTourOpen(false);
    }
  }, [isMenuOpen, isSearchOpen, isLangOpen, isUserOpen]);

  const navLinks = [
    { href: "/blog", label: t("blog") },
    { href: "/contact", label: t("contact_us") },
    { href: "/#about", label: t("about_us") },
  ];

  const languages = [
    { code: "uz", name: "O'zbek", nativeName: "Uzbek" },
    { code: "ru", name: "Русский", nativeName: "Russian" },
    { code: "en", name: "English", nativeName: "English" },
  ];

  return (
    <>
      <motion.header
        ref={headerRef}
        className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#007654] shadow-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className={`text-white transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}>
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
            <Link href={localizedHref("/")} className="flex h-[52px] shrink-0 items-center sm:h-[70px]">
              <Image
                src="/images/logo1.png"
                alt="Naseem Travel"
                width={140}
                height={300}
                className="h-full w-auto max-w-[130px] object-contain sm:max-w-[140px]"
                priority
              />
            </Link>

            <div className="hidden items-center gap-3 lg:flex xl:gap-4">
              <a
                href="tel:+447985269296"
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-base font-bold text-white transition-all hover:bg-white/20"
              >
                <Phone className="h-4 w-4" />
                +44 79 8526 9296
              </a>

              {SHOW_BROCHURE && (
                <Link
                  href={localizedHref("/brochure")}
                  className="flex h-11 items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-base font-bold transition-all duration-300 hover:bg-white hover:text-[#007654]"
                >
                  <BookOpen className="h-4 w-4" />
                  {t("brochureRequest")}
                </Link>
              )}

              <div className="relative">
                {user ? (
                  <>
                    <button
                      onClick={() => setIsUserOpen((prev) => !prev)}
                      className="flex items-center gap-2 rounded-xl border border-[#dcfae7] bg-white px-4 py-2 text-sm font-bold text-[#007654] shadow-lg shadow-black/5"
                    >
                      <User className="h-4 w-4" />
                      <span className="max-w-[120px] truncate">
                        {user.first_name || user.email.split("@")[0]}
                      </span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${isUserOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    <AnimatePresence>
                      {isUserOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 top-full z-[60] mt-3 w-56 overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 text-[#1a1a1a] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)]"
                        >
                          <div className="mb-2 border-b border-gray-50 p-3">
                            <p className="mb-1 text-[10px] font-black tracking-widest text-gray-400">
                              Authenticated as
                            </p>
                            <p className="truncate text-sm font-black text-[#007654]">{user.email}</p>
                          </div>

                          <Link
                            href={localizedHref("/my-bookings")}
                            onClick={() => setIsUserOpen(false)}
                            className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all hover:bg-[#dcfae7] hover:text-[#007654]"
                          >
                            <LayoutDashboard size={18} className="text-gray-400 group-hover:text-[#007654]" />
                            {authT("account")}
                          </Link>

                          <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-red-600 transition-all hover:bg-red-50"
                          >
                            <LogOut size={18} />
                            {authT("logout")}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link href={localizedHref("/login")}>
                      <Button
                        variant="ghost"
                        className="rounded-xl border border-white/10 px-5 font-bold text-white hover:bg-white/10 hover:text-white"
                      >
                        {authT("login.submit")}
                      </Button>
                    </Link>
                    <Link href={localizedHref("/signup")} className="hidden lg:block">
                      <Button className="rounded-xl border border-[#dcfae7] bg-white px-6 font-black text-[#007654] shadow-xl shadow-black/10 hover:bg-[#dcfae7]">
                        {authT("signup.submit")}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => setIsLangOpen((prev) => !prev)}
                  className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-2.5 text-base font-bold transition-all duration-300 hover:bg-white hover:text-[#007654]"
                >
                  <span className="hidden sm:inline">
                    {locale === "uz" ? "O'zbek" : locale === "ru" ? "Русский" : "English"}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${isLangOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 12 }}
                      className="absolute right-0 top-full z-50 mt-3 min-w-[200px] overflow-hidden rounded-3xl border border-gray-100 bg-white p-2 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)]"
                    >
                      <div className="mb-1 px-3 py-2">
                        <p className="text-[10px] font-black tracking-widest text-gray-400">
                          Select Language
                        </p>
                      </div>

                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => selectLanguage(lang.code)}
                          className={`flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-left transition-all ${
                            locale === lang.code
                              ? "bg-gradient-to-r from-[#007654] to-[#00a572] text-white shadow-lg"
                              : "text-gray-700 hover:bg-[#dcfae7]"
                          }`}
                        >
                          <div className="flex-1">
                            <p className={`text-sm font-black ${locale === lang.code ? "text-white" : "text-[#1a1a1a]"}`}>
                              {lang.name}
                            </p>
                            <p className={`text-xs ${locale === lang.code ? "text-white/70" : "text-gray-400"}`}>
                              {lang.nativeName}
                            </p>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => setIsSearchOpen((prev) => !prev)}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 transition-all duration-300 hover:bg-white hover:text-[#007654]"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 lg:hidden">
              <button
                onClick={() => setIsSearchOpen((prev) => !prev)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10"
              >
                <Search className="h-5 w-5" />
              </button>

              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-xl border border-[#dcfae7] bg-white px-3 py-2 text-sm font-black text-[#007654] sm:px-4"
              >
                {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
                Menu
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden bg-[#007654] p-4 pt-2 text-white lg:hidden"
              >
                <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {user ? (
                    <Link href={localizedHref("/my-bookings")} className="col-span-2">
                      <Button className="h-12 w-full rounded-xl bg-white font-bold text-[#007654]">
                        <User size={18} />
                        {user.first_name || user.email}
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link href={localizedHref("/login")}>
                        <Button variant="outline" className="h-12 w-full rounded-xl border-white/20 text-white hover:bg-white/10">
                          Login
                        </Button>
                      </Link>
                      <Link href={localizedHref("/signup")}>
                        <Button className="h-12 w-full rounded-xl bg-white font-bold text-[#007654]">
                          Sign Up
                        </Button>
                      </Link>
                    </>
                  )}
                </div>

                <div className="space-y-2">
                  <Link href={localizedHref("/brochure")} className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-4">
                    <BookOpen size={20} />
                    <span className="text-sm font-bold">{t("brochureRequest")}</span>
                  </Link>

                  {navLinks.map((link) => (
                    <Link key={link.href} href={localizedHref(link.href)} className="flex items-center rounded-2xl bg-white/10 px-4 py-4 text-sm font-bold">
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        selectLanguage(lang.code);
                        setIsMenuOpen(false);
                      }}
                      className={`rounded-2xl px-2 py-3 text-sm font-bold transition-all ${
                        locale === lang.code ? "bg-white text-[#007654]" : "bg-white/10 hover:bg-white/20"
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>

                {user && (
                  <button
                    onClick={handleLogout}
                    className="mt-3 flex w-full items-center gap-3 rounded-2xl bg-red-500/10 px-4 py-4 text-sm font-bold text-red-100 transition-all hover:bg-red-500/20"
                  >
                    <LogOut size={20} />
                    {authT("logout")}
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <nav className="hidden border-t border-white/5 bg-[#007654] py-1 text-white lg:block">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-4 py-2 xl:gap-5">
            <div
              className="group relative"
              onMouseEnter={() => setIsTourOpen(true)}
              onMouseLeave={() => setIsTourOpen(false)}
            >
              <button
                onClick={() => router.push(localizedHref("/tour"))}
                className="flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-black tracking-wide transition-all duration-300 hover:bg-white/10"
              >
                {t("tours")}
                <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${isTourOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isTourOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-1/2 top-full z-[100] w-[min(100vw-2rem,860px)] -translate-x-1/2 pt-1.5"
                  >
                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_18px_40px_-12px_rgba(0,0,0,0.22)]">
                      <TourDrop />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={localizedHref(link.href)}
                className="flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-black tracking-wide transition-all duration-300 hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        {isSearchOpen && <SearchDropdown onClose={() => setIsSearchOpen(false)} />}
      </motion.header>

      <div
        aria-hidden="true"
        className="w-full shrink-0"
        style={{ height: headerHeight ? `${headerHeight}px` : "140px" }}
      />
    </>
  );
}
