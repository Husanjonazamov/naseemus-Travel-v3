"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Star, MessageSquare, PenLine, User, Sparkles, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface Review {
    id: number;
    name: string;
    rating: number;
    comment: string;
    date: string;
}

export function TourReviews({ tourId }: { tourId: number }) {
    const t = useTranslations("tour_reviews");
    const locale = useLocale();
    const [activeTab, setActiveTab] = useState("view");
    const [rating, setRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");
    const [name, setName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    // Mock initial reviews
    const [reviews, setReviews] = useState<Review[]>([
        {
            id: 1,
            name: locale === "uz" ? "Ali Valiyev" : locale === "ru" ? "Али Валиев" : "Ali Valiyev",
            rating: 5,
            comment: locale === "uz" ? "Ajoyib sayohat bo'ldi! Hammasi oliy darajada." : locale === "ru" ? "Это было отличное путешествие! Все на высшем уровне." : "It was an amazing trip! Everything was top-notch.",
            date: "2024-01-15",
        },
        {
            id: 2,
            name: locale === "uz" ? "Elena" : locale === "ru" ? "Елена" : "Elena",
            rating: 4,
            comment: locale === "uz" ? "Mehmondo'stlik uchun rahmat. Manzaralar juda chiroyli ekan." : locale === "ru" ? "Спасибо за гостеприимство. Пейзажи очень красивые." : "Thank you for the hospitality. The landscapes were beautiful.",
            date: "2024-01-20",
        },
    ]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newReview: Review = {
            id: Date.now(),
            name: name || t("anonymous"),
            rating,
            comment,
            date: new Date().toISOString().split("T")[0],
        };

        setReviews([newReview, ...reviews]);
        setIsSubmitting(false);
        setSuccess(true);
        setComment("");
        setName("");
        setRating(5);

        setTimeout(() => {
            setSuccess(false);
            setActiveTab("view");
        }, 2000);
    };

    return (
        <section className="mt-24 w-full max-w-[1400px] mx-auto px-4" id="reviews-section">
            <div className="bg-white/60 backdrop-blur-2xl rounded-[60px] shadow-[0_40px_100px_-20px_rgba(0,118,84,0.1)] border border-white p-8 md:p-16">
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* Left Column: Title & Overall Rating */}
                    <div className="lg:w-1/3 space-y-8">
                        <div>
                            <span className="bg-[#E8F5E9] text-[#007654] px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-4 inline-block">
                                {t("view_reviews")}
                            </span>
                            <h2 className="text-4xl md:text-6xl font-black text-[#1a1a1a] tracking-tight leading-[1.05]">
                                Sayohatchilar <br /> nima deydi
                            </h2>
                        </div>

                        <div className="flex items-center gap-6 p-6 bg-white rounded-[32px] border border-gray-100 shadow-sm w-fit">
                            <div className="text-5xl font-black text-[#007654]">4.9</div>
                            <div className="h-10 w-[1px] bg-gray-100"></div>
                            <div>
                                <div className="flex gap-1 mb-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                    Average Rating
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Reviews List */}
                    <div className="flex-1">
                        <div className="space-y-6 max-h-[700px] overflow-y-auto pr-4 custom-scrollbar">
                            <AnimatePresence>
                                {reviews.length > 0 ? (
                                    reviews.map((review) => (
                                        <motion.div
                                            key={review.id}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            className="bg-white p-8 rounded-[40px] border border-gray-100/50 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                                        >
                                            <div className="flex items-start justify-between mb-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-14 h-14 rounded-full bg-[#f0f9f4] flex items-center justify-center p-1.5 border border-green-50 shadow-inner">
                                                        <div className="w-full h-full bg-[#007654] rounded-full flex items-center justify-center text-white font-black text-lg">
                                                            {review.name.charAt(0)}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-black text-[#1a1a1a] text-xl leading-tight group-hover:text-[#007654] transition-colors">
                                                            {review.name}
                                                        </h4>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                                                            {review.date}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="bg-[#FFF8E1] px-3 py-1.5 rounded-full flex gap-1.5 items-center border border-[#FFE082]/30">
                                                    <Star size={14} className="text-[#FFC107] fill-[#FFC107]" />
                                                    <span className="font-black text-[#FFC107] text-sm">{review.rating}.0</span>
                                                </div>
                                            </div>
                                            <p className="text-gray-600 text-lg font-medium leading-relaxed italic pr-4">
                                                "{review.comment}"
                                            </p>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="text-center py-20 bg-gray-50/50 rounded-[50px] border border-dashed border-gray-200">
                                        <MessageSquare size={48} className="mx-auto text-gray-200 mb-6" />
                                        <p className="text-gray-400 font-black text-xl">{t("no_reviews")}</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
