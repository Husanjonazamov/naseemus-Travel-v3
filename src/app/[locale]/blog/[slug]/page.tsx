"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useLocale, useTranslations } from "next-intl";
import { Header } from "@/src/components/header";
import { Footer } from "@/src/components/footer";
import { BlogCard } from "@/src/components/BlogCard";
import config from "@/src/config";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Calendar,
  Share2,
  Bookmark,
  MessageCircle,
  Clock,
  User,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";

interface BlogDetail {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
}

interface BlogListItem {
  id: number;
  title: string;
  description: string;
  image: string;
  created_at?: string;
  author?: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const locale = useLocale();
  const t = useTranslations("blog");

  const [blog, setBlog] = useState<BlogDetail | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const response = await axios.get(`${config.BASE_URL}/api/blog/${slug}/`, {
          headers: { "Accept-Language": locale },
        });
        setBlog(response.data.data);

        // Fetch related blogs
        const blogsResponse = await axios.get(`${config.BASE_URL}/api/blog/`, {
          headers: { "Accept-Language": locale },
        });
        // Filter out the current blog and take first 3
        const otherBlogs = blogsResponse.data.data
          .filter((b: BlogListItem) => b.id !== response.data.data.id)
          .slice(0, 3);
        setRelatedBlogs(otherBlogs);
      } catch (error) {
        console.error("Blog fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug, locale]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fbfbf9]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#007654]/20 border-t-[#007654] rounded-full animate-spin" />
        <p className="font-bold text-[#007654] animate-pulse">{t("loading")}</p>
      </div>
    </div>
  );

  if (!blog) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <p className="text-3xl font-black text-gray-300 uppercase tracking-widest">{t("not_found")}</p>
      <Link href="/blog">
        <Button variant="outline" className="h-14 px-8 border-[#007654] text-[#007654] rounded-2xl font-bold">
          {t("back_to_blog")}
        </Button>
      </Link>
    </div>
  );

  // Split content for premium layout
  const contentParagraphs = blog.description.split('.').filter(p => p.trim());

  return (
    <div className="w-full bg-[#fbfbf9] overflow-x-hidden">
      <Header />

      {/* Reading Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-[#007654] z-[60] origin-left"
        style={{ scaleX }}
      />

      <article className="relative">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-[#dcfae7] px-4 py-2 rounded-full mb-8">
              <Sparkles size={16} className="text-[#007654]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#007654]">{t("badge")}</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#1a1a1a] mb-8 tracking-tighter leading-[1.1]">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                  <User size={18} />
                </div>
                <span className="text-sm font-bold text-gray-900">{t("author")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-[#007654]" />
                <span className="text-sm font-bold">{t("date")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-[#007654]" />
                <span className="text-sm font-bold">{t("read_time")}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Epic Hero Image */}
        <div className="max-w-[1400px] mx-auto px-4 mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="relative aspect-[21/9] rounded-[48px] overflow-hidden shadow-2xl"
          >
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>
        </div>

        {/* Content Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Share Sidebar - Desktop */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-40 flex flex-col gap-4">
                <button className="w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 hover:text-[#007654] hover:border-[#007654] transition-all">
                  <Share2 size={24} />
                </button>
                <button className="w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 hover:text-[#007654] hover:border-[#007654] transition-all">
                  <Bookmark size={24} />
                </button>
                <button className="w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 hover:text-[#007654] hover:border-[#007654] transition-all">
                  <MessageCircle size={24} />
                </button>
              </div>
            </div>

            {/* Main Article Body */}
            <div className="lg:col-span-8 lg:col-start-3 prose prose-xl prose-p:text-gray-500 prose-p:leading-[1.8] prose-p:font-medium prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-[#1a1a1a] prose-img:rounded-[32px] max-w-none">
              <div className="space-y-10">
                {contentParagraphs.map((para, idx) => (
                  <p key={idx}>{para.trim()}.</p>
                ))}
              </div>

              {/* Author Box */}
              <div className="mt-20 p-10 bg-white rounded-[40px] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8 not-prose">
                <div className="w-32 h-32 bg-[#dcfae7] rounded-[32px] overflow-hidden flex-shrink-0 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <User size={64} className="text-[#007654]/20" />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h4 className="text-2xl font-black text-[#1a1a1a] mb-2 tracking-tight">{t("written_by")}</h4>
                  <p className="text-gray-500 font-medium mb-4">{t("author_bio")}</p>
                  <div className="flex items-center justify-center md:justify-start gap-4">
                    <Link href="/contact" className="text-[#007654] font-black uppercase tracking-widest text-xs hover:underline">{t("contact_author")}</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Blogs Section */}
      {relatedBlogs.length > 0 && (
        <div className="bg-gradient-to-b from-white to-[#dcfae7]/30 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-[#007654]/10 px-4 py-2 rounded-full mb-6 border border-[#007654]/20">
                <span className="w-2 h-2 bg-[#007654] rounded-full animate-pulse" />
                <span className="text-[#007654] text-sm font-bold uppercase tracking-wider">{t("related_badge")}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-4">
                {t("related_title")}
              </h2>
              <p className="text-gray-600 font-medium max-w-2xl mx-auto">
                {t("related_subtitle")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedBlogs.map((relatedBlog) => (
                <BlogCard key={relatedBlog.id} post={relatedBlog} />
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

