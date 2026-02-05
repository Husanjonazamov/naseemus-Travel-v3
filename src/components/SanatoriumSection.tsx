"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";


interface Sanatorium {
    id: number;
    title: string;
    description: string;
    facilities: string[];
    images: string[];
    videos?: string[];
}

interface SanatoriumSectionProps {
    sanatoriums: Sanatorium[];
}

export function SanatoriumSection({ sanatoriums }: SanatoriumSectionProps) {
    const t = useTranslations("sanatorium");

    if (!sanatoriums || sanatoriums.length === 0) return null;

    return (
        <div className="space-y-40 py-24 relative">
            {sanatoriums.map((item) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative"
                >
                    <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6 mb-16 px-4">
                        <div className="inline-flex items-center gap-3 bg-[#007654]/5 px-5 py-2 rounded-full border border-[#007654]/10">
                            <div className="h-2 w-2 rounded-full bg-[#007654] animate-pulse"></div>
                            <span className="text-[#007654] font-black uppercase tracking-[0.2em] text-[10px]">
                                {t("medical_wellness")}
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-[#1a1a1a] tracking-tight max-w-4xl leading-[1.1] md:leading-[1.1]">
                            {item.title}
                        </h2>

                        <p className="text-base md:text-lg lg:text-xl text-gray-500 font-medium leading-relaxed max-w-3xl">
                            {item.description}
                        </p>
                    </div>

                    {/* Images Section - Structured Symmetric Grid */}
                    {item.images && item.images.length > 0 && (
                        <div className="mb-24">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#007654] mb-8 px-4 flex items-center gap-3">
                                <div className="h-px w-8 bg-[#007654]/30" />
                                Gallery & Atmosphere
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
                                {item.images.map((img, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1, duration: 0.6 }}
                                        className="relative aspect-square rounded-[32px] overflow-hidden group bg-gray-50"
                                    >
                                        <img
                                            src={img}
                                            alt={`Gallery ${idx + 1}`}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Videos Section - Balanced View */}
                    {item.videos && item.videos.length > 0 && (
                        <div className="">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#007654] mb-8 px-4 flex items-center gap-3">
                                <div className="h-px w-8 bg-[#007654]/30" />
                                Video Experience
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-4 md:px-0">
                                {item.videos.map((video, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.2, duration: 0.8 }}
                                        className="relative aspect-[16/10] rounded-[40px] overflow-hidden bg-black group"
                                    >
                                        <video
                                            src={video}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                        />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            ))}
        </div>
    );
}
