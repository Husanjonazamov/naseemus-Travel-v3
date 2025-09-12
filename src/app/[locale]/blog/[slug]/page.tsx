"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useLocale, useTranslations } from "next-intl";
import { Header } from "@/src/components/header";
import { Footer } from "@/src/components/footer";
import { NewTouring } from "@/src/components/new-touring-holidays";
import config from "@/src/config";

interface BlogDetail {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug;

  const locale = useLocale(); // joriy til
  const t = useTranslations("blog"); // umumiy blog tarjimalar (loading, not found)

  const [blog, setBlog] = useState<BlogDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [bannerTitle, setBannerTitle] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) return;
      setLoading(true);

      try {
        const response = await axios.get(`${config.BASE_URL}/api/blog/${slug}/`, {
          headers: {
            "Accept-Language": locale, // <- backend shu tilga mos blog qaytaradi
          },
        });

        const data: BlogDetail = response.data.data;

        // Banner title uchun birinchi jumla
        const firstSentence = data.description.split(".")[0]?.trim() || "";
        const bannerSentence = firstSentence.includes(":")
          ? firstSentence.split(":")[1].trim()
          : firstSentence;
        setBannerTitle(`${data.title}: ${bannerSentence}`);

        // Body description (to‘liq)
        setBlog(data);
      } catch (error) {
        console.error("Blog fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug, locale]);

  if (loading) return <p className="text-center py-16">{t("loading")}</p>;
  if (!blog) return <p className="text-center py-16">{t("blog_not_found")}</p>;

  // Body contentni jumlalarga ajratish
  const bodySentences = blog.description
    .split(".")
    .map(s => s.trim())
    .filter(Boolean);

  return (
    <div className="w-full overflow-x-hidden">
      <Header locale={locale} />

      {/* Hero Section */}
      <section className="relative w-full h-[200px] sm:h-[300px] md:h-[450px] overflow-hidden">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover absolute inset-0"
          quality={90}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </section>

      {/* Banner Title */}
      <section className="relative max-w-7xl mx-auto -mt-16 px-4 sm:px-6 lg:px-12">
        <div className="bg-black/25 backdrop-blur-md rounded-lg p-6 shadow-lg">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center break-words">
            {bannerTitle}
          </h1>
        </div>
      </section>

      {/* Blog Content */}
      <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-12">
        {bodySentences.map((sentence, index) => {
          if (!sentence) return null;
          const isTitleSentence = (index + 1) % 50 === 0;

          if (isTitleSentence) {
            return (
              <h2
                key={index}
                className="text-2xl sm:text-3xl text-green-700 font-bold mb-4 text-left"
              >
                {sentence}.
              </h2>
            );
          }

          return (
            <p
              key={index}
              className="text-gray-700 leading-relaxed text-left whitespace-pre-line text-base sm:text-lg mb-4"
            >
              {sentence}.
            </p>
          );
        })}
      </section>

      <NewTouring />
      <Footer />
    </div>
  );
}
