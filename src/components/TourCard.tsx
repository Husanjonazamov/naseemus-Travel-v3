"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { MapPin, Clock, Star, ArrowRight, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import { useAuth } from "@/src/context/AuthContext";
import tourService, { Tour } from "@/src/services/tour.service";
import { useRouter } from "next/navigation";

interface TourCardProps {
    tour: Partial<Tour> & { slug: string; title: string; image: string; price: string };
}

export function TourCard({ tour }: TourCardProps) {
    const [isLiked, setIsLiked] = useState(tour.is_liked || false);
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations("tour_card");

    useEffect(() => {
        setIsLiked(tour.is_liked || false);
    }, [tour.is_liked]);

    const toggleLike = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isAuthenticated) {
            toast.info(t("login_to_save"));
            router.push(`/${locale}/login`);
            return;
        }

        try {
            const prevState = isLiked;
            setIsLiked(!prevState); // Optimistic update

            const response = await tourService.toggleLike(tour.slug);
            setIsLiked(response.data.liked);

            if (response.data.liked) {
                toast.success(t("added_to_saved"));
            } else {
                toast.info(t("removed_from_saved"));
            }
        } catch (error: any) {
            console.error("Toggle like error:", error);
            setIsLiked(isLiked); // Rollback
            toast.error("Something went wrong");
        }
    };

    const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(parseFloat(tour.price || "0"));

    const duration = tour.count_day || tour.date || 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative bg-[#ffffff] rounded-[32px] overflow-hidden hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] transition-all duration-700 border border-[#f0f0f0] h-full flex flex-col"
        >
            {/* Visual Header */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-110"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                    <div className="flex flex-col gap-2">
                        {tour.category && (
                            <span className="bg-white/95 backdrop-blur-xl px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.1em] text-[#007654] shadow-sm">
                                {tour.category.title}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={toggleLike}
                        className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 border ${isLiked ? 'bg-[#ff4d4d] text-white border-[#ff4d4d]' : 'bg-white/20 text-white border-white/30 hover:bg-[#007654] hover:text-white'}`}
                    >
                        <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
                    </button>
                </div>

                {/* Floating Info */}
                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                    <div className="bg-white/95 backdrop-blur-xl px-4 py-2.5 rounded-2xl shadow-xl border border-white/20 flex flex-col">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none mb-1">{t("duration")}</span>
                        <div className="flex items-center gap-1.5">
                            <Clock size={12} className="text-[#007654]" />
                            <span className="text-sm font-bold text-gray-900">{duration} {t("days")}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={14} className="fill-[#FFD700] text-[#FFD700]" />
                        ))}
                    </div>
                    <span className="text-xs font-bold text-gray-400 mt-0.5">4.9 / 5.0</span>
                </div>

                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-3 leading-[1.2] tracking-tight group-hover:text-[#007654] transition-colors duration-300">
                    {tour.title}
                </h3>

                {tour.description && (
                    <p className="text-gray-500 text-sm line-clamp-2 mb-8 leading-relaxed font-medium">
                        {tour.description.replace(/<[^>]*>?/gm, "").split(' ').slice(0, 15).join(' ')}...
                    </p>
                )}

                {/* Footer info */}
                <div className="mt-auto pt-6 flex items-end justify-between border-t border-[#f5f5f5]">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-gray-400 mb-2">
                            <MapPin size={14} className="text-[#007654]" />
                            <span className="text-[11px] font-bold uppercase tracking-wider">{t("uzbekistan")}</span>
                        </div>
                        <div>
                            <span className="text-[10px] block text-gray-400 font-bold uppercase tracking-wider mb-0.5">{t("starting_from")}</span>
                            <span className="text-2xl font-black text-[#1a1a1a]">{formattedPrice}</span>
                        </div>
                    </div>

                    <Link href={`/${locale}/tour/${tour.slug}`} className="mt-auto">
                        <Button
                            variant="ghost"
                            className="p-0 h-auto bg-transparent hover:bg-transparent text-[#007654] hover:text-[#008c64] font-bold transition-all flex items-center gap-2 text-sm whitespace-nowrap flex-shrink-0 group/btn"
                        >
                            {t("details")}
                            <ArrowRight size={18} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
