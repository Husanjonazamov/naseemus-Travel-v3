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
    tour: Omit<Partial<Tour>, "category"> & {
        slug: string;
        title: string;
        image: string;
        price: string;
        category?: Tour["category"] | null;
    };
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
            className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-[#f0f0f0] bg-[#ffffff] transition-all duration-700 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] sm:rounded-[32px]"
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

                <div className="absolute left-4 right-4 top-4 flex items-start justify-between sm:left-6 sm:right-6 sm:top-6">
                    <div className="flex flex-col gap-2">
                        {tour.category && (
                            <span className="rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold tracking-[0.1em] text-[#007654] shadow-sm backdrop-blur-xl sm:px-4">
                                {tour.category.title}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={toggleLike}
                        className={`flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 sm:h-10 sm:w-10 ${isLiked ? 'border-[#ff4d4d] bg-[#ff4d4d] text-white' : 'border-white/30 bg-white/20 text-white hover:bg-[#007654] hover:text-white'}`}
                    >
                        <Heart size={16} fill={isLiked ? "currentColor" : "none"} className="sm:h-[18px] sm:w-[18px]" />
                    </button>
                </div>

                {/* Floating Info */}
                <div className="absolute bottom-4 left-4 flex items-center gap-3 sm:bottom-6 sm:left-6">
                    <div className="flex flex-col rounded-2xl border border-white/20 bg-white/95 px-3 py-2 shadow-xl backdrop-blur-xl sm:px-4 sm:py-2.5">
                        <span className="text-[10px] text-gray-400 font-bold tracking-wider leading-none mb-1">{t("duration")}</span>
                        <div className="flex items-center gap-1.5">
                            <Clock size={12} className="text-[#007654]" />
                            <span className="text-sm font-bold text-gray-900">{duration} {t("days")}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="flex flex-grow flex-col p-5 sm:p-8">
                <div className="mb-3 flex items-center gap-2 sm:mb-4">
                    <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={14} className="fill-[#FFD700] text-[#FFD700]" />
                        ))}
                    </div>
                    <span className="text-xs font-bold text-gray-400 mt-0.5">4.9 / 5.0</span>
                </div>

                <h3 className="mb-3 text-xl font-bold leading-[1.2] tracking-tight text-[#1a1a1a] transition-colors duration-300 group-hover:text-[#007654] sm:text-2xl">
                    {tour.title}
                </h3>

                {tour.description && (
                    <p className="mb-6 line-clamp-2 text-sm font-medium leading-relaxed text-gray-500 sm:mb-8">
                        {tour.description.replace(/<[^>]*>?/gm, "").split(' ').slice(0, 15).join(' ')}...
                    </p>
                )}

                {/* Footer info */}
                <div className="mt-auto flex flex-col gap-4 border-t border-[#f5f5f5] pt-5 sm:flex-row sm:items-end sm:justify-between sm:pt-6">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-gray-400 mb-2">
                            <MapPin size={14} className="text-[#007654]" />
                            <span className="text-[11px] font-bold tracking-wider">{t("uzbekistan")}</span>
                        </div>
                        <div>
                            <span className="text-[10px] block text-gray-400 font-bold tracking-wider mb-0.5">{t("starting_from")}</span>
                            <span className="text-xl font-black text-[#1a1a1a] sm:text-2xl">{formattedPrice}</span>
                        </div>
                    </div>

                    <Link href={`/${locale}/tour/${tour.slug}`} className="mt-auto w-full sm:w-auto">
                        <Button
                            variant="ghost"
                            className="flex h-auto w-full items-center justify-between gap-2 whitespace-nowrap bg-transparent p-0 text-sm font-bold text-[#007654] transition-all hover:bg-transparent hover:text-[#008c64] sm:w-auto sm:justify-start group/btn"
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
