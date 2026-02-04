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
        <section className="mt-16 w-full">
            <Card className="border-0 shadow-2xl overflow-hidden bg-white/80 backdrop-blur-xl rounded-[40px] border-b-8 border-[#007654]">
                <CardContent className="p-0">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <div className="flex items-center justify-center p-8 border-b border-gray-100">
                            <TabsList className="bg-gray-100/50 p-2 h-16 rounded-full w-full max-w-md">
                                <TabsTrigger
                                    value="view"
                                    className="rounded-full h-full data-[state=active]:bg-[#007654] data-[state=active]:text-white font-bold text-lg flex gap-2 transition-all duration-300"
                                >
                                    <MessageSquare size={20} />
                                    {t("view_reviews")}
                                </TabsTrigger>
                                <TabsTrigger
                                    value="leave"
                                    className="rounded-full h-full data-[state=active]:bg-[#007654] data-[state=active]:text-white font-bold text-lg flex gap-2 transition-all duration-300"
                                >
                                    <PenLine size={20} />
                                    {t("leave_review")}
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <div className="p-8 md:p-12">
                            <AnimatePresence mode="wait">
                                <TabsContent value="view" key="view">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-8"
                                    >
                                        {reviews.length > 0 ? (
                                            <div className="grid gap-6">
                                                {reviews.map((review) => (
                                                    <div key={review.id} className="p-8 bg-gray-50/50 rounded-3xl border border-gray-100 transition-all hover:shadow-lg">
                                                        <div className="flex items-center justify-between mb-4">
                                                            <div className="flex items-center gap-4">
                                                                <Avatar className="w-12 h-12 border-2 border-[#007654]/10">
                                                                    <AvatarFallback className="bg-gradient-to-br from-[#007654] to-[#00a572] text-white">
                                                                        <User size={20} />
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <h4 className="font-black text-[#1a1a1a] text-lg">{review.name}</h4>
                                                                    <p className="text-sm text-gray-400 font-medium">{review.date}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex gap-1">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <Star
                                                                        key={i}
                                                                        size={16}
                                                                        className={`${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <p className="text-gray-600 leading-relaxed font-medium">"{review.comment}"</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-20">
                                                <MessageSquare size={48} className="mx-auto text-gray-200 mb-4" />
                                                <p className="text-gray-400 font-bold">{t("no_reviews")}</p>
                                            </div>
                                        )}
                                    </motion.div>
                                </TabsContent>

                                <TabsContent value="leave" key="leave">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="max-w-2xl mx-auto"
                                    >
                                        {success ? (
                                            <div className="text-center py-12">
                                                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/20">
                                                    <Sparkles size={40} className="text-white" />
                                                </div>
                                                <h3 className="text-2xl font-black text-[#1a1a1a] mb-2">{t("thank_you")}</h3>
                                                <p className="text-gray-500 font-medium">{t("review_submitted")}</p>
                                            </div>
                                        ) : (
                                            <form onSubmit={handleSubmit} className="space-y-8">
                                                <div className="text-center space-y-4">
                                                    <h3 className="text-3xl font-black text-[#1a1a1a] tracking-tight">{t("how_was_it")}</h3>
                                                    <p className="text-gray-500 font-medium">{t("share_experience")}</p>

                                                    <div className="flex items-center justify-center gap-2 py-4">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <button
                                                                key={star}
                                                                type="button"
                                                                onClick={() => setRating(star)}
                                                                onMouseEnter={() => setHoverRating(star)}
                                                                onMouseLeave={() => setHoverRating(0)}
                                                                className="transition-transform hover:scale-125 focus:outline-none"
                                                            >
                                                                <Star
                                                                    size={40}
                                                                    className={`${star <= (hoverRating || rating)
                                                                            ? "text-yellow-400 fill-yellow-400"
                                                                            : "text-gray-200"
                                                                        } transition-colors duration-200`}
                                                                />
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="space-y-6">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{t("your_name")}</label>
                                                        <input
                                                            type="text"
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                            className="w-full h-16 px-6 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:bg-white focus:ring-4 focus:ring-[#007654]/5 transition-all outline-none"
                                                            placeholder={t("name_placeholder")}
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{t("your_comment")}</label>
                                                        <textarea
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                            required
                                                            rows={5}
                                                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:bg-white focus:ring-4 focus:ring-[#007654]/5 transition-all outline-none resize-none"
                                                            placeholder={t("comment_placeholder")}
                                                        />
                                                    </div>
                                                </div>

                                                <Button
                                                    type="submit"
                                                    disabled={isSubmitting || !comment}
                                                    className="w-full h-20 bg-[#007654] hover:bg-[#008c64] text-white rounded-[24px] text-xl font-black transition-all duration-300 shadow-xl shadow-[#007654]/20 hover:scale-[1.02] active:scale-[0.98]"
                                                >
                                                    {isSubmitting ? (
                                                        <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                                                    ) : (
                                                        <>
                                                            {t("submit_review")}
                                                            <Send size={24} className="ml-3" />
                                                        </>
                                                    )}
                                                </Button>
                                            </form>
                                        )}
                                    </motion.div>
                                </TabsContent>
                            </AnimatePresence>
                        </div>
                    </Tabs>
                </CardContent>
            </Card>
        </section>
    );
}
