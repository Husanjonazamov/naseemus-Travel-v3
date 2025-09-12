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

const truncateDescription = (text: string, wordLimit = 20) => {
  const words = text.split(" ").slice(0, wordLimit);
  return words.join(" ") + (words.length < text.split(" ").length ? "..." : "");
};

export default function BlogsPage() {
  const locale = useLocale(); // joriy til
  const t = useTranslations("blog"); // loading, not found matnlar

  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [banner, setBanner] = useState<Banner | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const PAGE_SIZE = 10;

  // Bloglarni olish
  const fetchBlogs = async (pageNumber: number) => {
    setLoading(true);
    try {
      const res = await axios.get<ApiResponse>(`${config.BASE_URL}/api/blog/`, {
        params: { page: pageNumber, page_size: PAGE_SIZE },
        headers: { "Accept-Language": locale }, // <- til header orqali
      });

      if (res.data.status) {
        setBlogs(res.data.data.results);
        setTotalPages(res.data.data.total_pages);
      }
    } catch (err) {
      console.error("API dan malumot olishda xatolik:", err);
    } finally {
      setLoading(false);
    }
  };

  // Bannerni olish
  const fetchBanner = async () => {
    try {
      const res = await axios.get(`${config.BASE_URL}/api/banner/`, {
        headers: { "Accept-Language": locale }, // <- tilga mos banner
      });
      const results = res.data.data.results;
      if (results && results.length > 0) {
        setBanner(results[0]);
      }
    } catch (err) {
      console.error("Banner olishda xatolik:", err);
    }
  };

  useEffect(() => {
    fetchBlogs(page);
    fetchBanner();
  }, [page, locale]); // locale o'zgarganda qayta yuklash

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="w-full overflow-x-hidden">
      <Header locale={locale} />

      {/* Hero / Banner Section */}
      {banner && (
        <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
          <Image
            src={banner.image}
            alt={banner.title}
            fill
            className="object-cover absolute inset-0"
            quality={90}
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-20 flex items-center justify-center h-full px-4">
            <h1 className="text-3xl sm:text-5xl font-bold text-white drop-shadow-lg text-center break-words">
              {banner.title}
            </h1>
          </div>
        </section>
      )}

      {/* Blog List */}
      <section className="max-w-6xl mx-auto py-12 px-4 space-y-8">
        {loading ? (
          <div className="text-center text-gray-500">{t("loading")}</div>
        ) : blogs.length === 0 ? (
          <div className="text-center text-gray-500">{t("no_blogs")}</div>
        ) : (
          blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="flex flex-col md:flex-row cursor-pointer transition-colors duration-200 overflow-hidden "
            >
              {/* Image */}
              <div className="relative w-full md:w-1/3 h-56 md:h-56 flex-shrink-0">
                <Image src={blog.image} alt={blog.title} fill className="object-cover" />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col justify-center w-full md:w-2/3">
                <h2 className="text-2xl font-bold text-green-700 mb-4">{blog.title}</h2>
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {truncateDescription(blog.description, 20)}
                </p>
              </div>
            </Link>
          ))
        )}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 py-8">
          <Button className="px-6 py-2" onClick={handlePrev} disabled={page === 1}>
            {t("prev")}
          </Button>
          <span className="text-gray-700 font-semibold">
            {t("page")} {page} {t("of")} {totalPages}
          </span>
          <Button className="px-6 py-2" onClick={handleNext} disabled={page === totalPages}>
            {t("next")}
          </Button>
        </div>
      )}

      <Footer />
    </div>
  );
}
