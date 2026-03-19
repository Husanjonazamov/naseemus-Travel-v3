"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Button } from "./ui/button";
import { useLocale, useTranslations } from "next-intl";

interface BlogCardProps {
    post: {
        id: number;
        title: string;
        description: string;
        image: string;
        slug?: string;
        created_at?: string;
        author?: string;
    };
}

const slugify = (text: string) =>
    text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

export function BlogCard({ post }: BlogCardProps) {
    const t = useTranslations("blog");
    const locale = useLocale();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
        >
            <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-3 text-[10px] font-bold tracking-widest text-[#007654]">
                    <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {post.created_at || t("date")}
                    </span>
                    <span className="flex items-center gap-1">
                        <User size={12} />
                        {post.author || t("author")}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#007654] transition-colors leading-tight">
                    {post.title}
                </h3>

                <p className="text-gray-500 text-sm line-clamp-3 mb-6 leading-relaxed">
                    {post.description.replace(/<[^>]*>?/gm, "")}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-50">
                    <Link href={`/${locale}/blog/${post.slug || slugify(post.title)}`}>
                        <Button
                            variant="ghost"
                            className="p-0 h-auto text-[#007654] font-bold text-sm hover:bg-transparent group/btn whitespace-nowrap"
                        >
                            {t("read_article")}
                            <ArrowRight size={16} className="ml-2 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

