"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useLocale, useTranslations } from "next-intl";
import { Header } from "@/src/components/header";
import { Footer } from "@/src/components/footer";
import { Button } from "@/src/components/ui/button";
import config from "@/src/config";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  Sparkles,
  BookOpen
} from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
}

interface Banner {
  id: number;
  title: string;
  image: string;
}

interface ApiResponse {
  status: boolean;
  data: {
    links: { previous: string | null; next: string | null };
    total_items: number;
    total_pages: number;
    page_size: number;
    current_page: number;
    results: BlogPost[];
  };
}

const truncateDescription = (text: string, wordLimit = 25) => {
  const words = text.split(" ").slice(0, wordLimit);
  return words.join(" ") + (words.length < text.split(" ").length ? "..." : "");
};

export default function BlogsPage() {
  const locale = useLocale();
  const t = useTranslations("blog");

  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [banner, setBanner] = useState<Banner | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const PAGE_SIZE = 9;

  const fetchBlogs = async (pageNumber: number) => {
    setLoading(true);
    try {
      const res = await axios.get<ApiResponse>(`${config.BASE_URL}/api/blog/`, {
        params: { page: pageNumber, page_size: PAGE_SIZE },
        headers: { "Accept-Language": locale },
      });

      if (res.data.status) {
        setBlogs(res.data.data.results);
        setTotalPages(res.data.data.total_pages);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBanner = async () => {
    try {
      const res = await axios.get(`${config.BASE_URL}/api/banner/`, {
        headers: { "Accept-Language": locale },
      });
      const results = res.data.data.results;
      if (results && results.length > 0) {
        setBanner(results[0]);
      }
    } catch (err) {
      console.error("Banner error:", err);
    }
  };

  useEffect(() => {
    fetchBlogs(page);
    fetchBanner();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, locale]);

  return (
    <div className="w-full bg-[#fbfbf9] overflow-x-hidden font-plus-jakarta">
      <Header />

      {/* Premium Blog Hero */}
      <section className="relative min-h-[360px] w-full overflow-hidden lg:h-[60vh] sm:min-h-[400px]">
        {banner ? (
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#fbfbf9]" />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        ) : (
          <div className="absolute inset-0 bg-[#007654]" />
        )}

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 sm:space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-full">
              <Sparkles size={16} className="text-yellow-400" />
              <span className="text-[10px] font-black tracking-widest text-white">Naseem's Travel Journal</span>
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-white drop-shadow-2xl sm:text-5xl md:text-6xl lg:text-7xl">
              {banner ? banner.title : "Stories & Guides"}
            </h1>
            <p className="mx-auto max-w-2xl text-base font-medium text-white/80 sm:text-lg">
              Discover hidden gems, cultural insights, and expert travel tips from our specialists in Central Asia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:gap-10"
            >
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="aspect-[4/5] animate-pulse rounded-[24px] border border-gray-100 bg-white sm:rounded-[32px]" />
              ))}
            </motion.div>
          ) : blogs.length === 0 ? (
            <div className="space-y-4 py-16 text-center sm:py-20">
              <BookOpen size={64} className="mx-auto text-gray-200" />
              <p className="text-2xl font-black text-gray-300 tracking-widest">{t("no_blogs")}</p>
            </div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:gap-10"
            >
              {blogs.map((blog, idx) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group overflow-hidden rounded-[28px] border border-gray-100 bg-white transition-all duration-500 hover:border-[#007654]/20 hover:shadow-[0_32px_80px_-16px_rgba(0,118,84,0.08)] sm:rounded-[40px]"
                >
                  <Link href={`/${locale}/blog/${blog.slug}`}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
                        <div className="flex items-center gap-2 rounded-2xl bg-white/80 px-3 py-2 shadow-sm backdrop-blur-md sm:px-4">
                          <Calendar size={14} className="text-[#007654]" />
                          <span className="text-[10px] font-black text-gray-600">March 2026</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8">
                      <h2 className="mb-4 line-clamp-2 text-xl font-black leading-tight text-[#1a1a1a] transition-colors group-hover:text-[#007654] sm:text-2xl">
                        {blog.title}
                      </h2>
                      <p className="mb-6 line-clamp-3 font-medium leading-relaxed text-gray-400 sm:mb-8">
                        {truncateDescription(blog.description)}
                      </p>

                      <div className="flex items-center justify-between pt-6 border-t border-gray-50 text-[10px] font-black tracking-widest">
                        <div className="flex items-center gap-2 text-gray-400">
                          <User size={14} className="text-[#007654]" />
                          <span>Expert Journal</span>
                        </div>
                        <div className="flex items-center gap-1 text-[#007654]">
                          Read Story
                          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Premium Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 pt-12 sm:gap-4 sm:pt-20">
            <Button
              variant="outline"
              className="w-14 h-14 rounded-2xl border-gray-100 text-gray-400 hover:text-[#007654] hover:border-[#007654] transition-all p-0"
              onClick={() => setPage(p => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              <ChevronLeft size={24} />
            </Button>

            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-2xl bg-[#007654] text-white flex items-center justify-center font-black text-lg">
                {page}
              </span>
              <span className="text-gray-300 font-bold">/</span>
              <span className="text-gray-400 font-bold">{totalPages}</span>
            </div>

            <Button
              variant="outline"
              className="w-14 h-14 rounded-2xl border-gray-100 text-gray-400 hover:text-[#007654] hover:border-[#007654] transition-all p-0"
              onClick={() => setPage(p => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
            >
              <ChevronRight size={24} />
            </Button>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
