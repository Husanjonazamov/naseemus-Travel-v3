"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Maximize2 } from "lucide-react";
import Image from "next/image";

interface MediaSliderProps {
    images: string[];
    videos?: string[];
}

export function MediaSlider({ images, videos = [] }: MediaSliderProps) {
    const allMedia = [
        ...videos.map(v => ({ type: 'video' as const, url: v })),
        ...images.map(i => ({ type: 'image' as const, url: i }))
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prev) => (prev + newDirection + allMedia.length) % allMedia.length);
    };

    if (allMedia.length === 0) return null;

    const current = allMedia[currentIndex];

    return (
        <div className="relative group aspect-[21/9] w-full bg-black">
            <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 200, damping: 25 },
                        opacity: { duration: 0.3 }
                    }}
                    className="absolute inset-0"
                >
                    {current.type === 'video' ? (
                        <div className="relative w-full h-full">
                            <video
                                src={current.url}
                                className="w-full h-full object-cover"
                                autoPlay
                                muted
                                loop
                                playsInline
                                key={current.url}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
                            <div className="absolute top-12 left-12 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full flex items-center gap-3 border border-white/20">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <span className="text-white text-[10px] font-black uppercase tracking-[0.3em]">Cinematic Tour</span>
                            </div>
                        </div>
                    ) : (
                        <div className="relative w-full h-full">
                            <Image
                                src={current.url}
                                alt="Sanatorium Media"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-black/10" />
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Premium Navigation Controls */}
            <div className="absolute inset-x-0 bottom-12 px-12 z-20 flex items-center justify-between">
                <div className="flex items-center gap-4 bg-black/20 backdrop-blur-2xl px-6 py-4 rounded-[32px] border border-white/10">
                    <button
                        onClick={() => paginate(-1)}
                        className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <div className="flex gap-2.5 px-2">
                        {allMedia.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? "w-10 bg-white" : "w-1.5 bg-white/30"
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => paginate(1)}
                        className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>

                <div className="hidden md:flex items-center gap-3 bg-white px-6 py-4 rounded-full shadow-2xl">
                    <Maximize2 size={16} className="text-[#007654]" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                        {currentIndex + 1} / {allMedia.length} Media Assets
                    </span>
                </div>
            </div>
        </div>
    );
}
