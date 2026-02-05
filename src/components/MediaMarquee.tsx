"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface MediaMarqueeProps {
    images: string[];
    speed?: number;
}

export function MediaMarquee({ images, speed = 40 }: MediaMarqueeProps) {
    // Triple the images to ensure seamless loop
    const duplicatedImages = [...images, ...images, ...images];

    return (
        <div className="relative w-full overflow-hidden bg-black/5 py-12">
            <div className="absolute inset-0 bg-gradient-to-r from-[#fbfbf9] via-transparent to-[#fbfbf9] z-10 pointer-events-none" />

            <motion.div
                className="flex gap-4 px-4"
                animate={{
                    x: [0, -1032], // Adjust based on item width + gap
                }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{ width: "fit-content" }}
            >
                {duplicatedImages.map((src, idx) => (
                    <div
                        key={idx}
                        className="relative flex-shrink-0 w-80 h-52 md:w-96 md:h-64 rounded-3xl overflow-hidden bg-gray-100"
                    >
                        <Image
                            src={src}
                            alt={`Gallery Image ${idx}`}
                            fill
                            className="object-cover transition-transform duration-700 hover:scale-105"
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
