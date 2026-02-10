import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Play, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

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
    const [activeVideo, setActiveVideo] = useState<string | null>(null);

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
                    <div className="flex flex-col gap-10 mb-16 px-4">
                        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6">
                            <div className="inline-flex items-center gap-3 bg-[#007654]/5 px-5 py-2 rounded-full border border-[#007654]/10">
                                <div className="h-2 w-2 rounded-full bg-[#007654] animate-pulse"></div>
                                <span className="text-[#007654] font-black uppercase tracking-[0.2em] text-[10px]">
                                    {t("medical_wellness")}
                                </span>
                            </div>

                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#1a1a1a] tracking-tight leading-[1.1]">
                                {item.title}
                            </h2>
                        </div>

                        <div className="text-center md:text-left">
                            <div className="text-base md:text-lg text-gray-500 font-medium leading-[1.8] max-w-6xl italic border-l-4 border-[#007654]/20 pl-6 py-2 whitespace-pre-wrap">
                                {item.description.split('\n').map((paragraph, index) => (
                                    <p key={index} className={index > 0 ? "mt-4" : ""}>
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Integrated Media Section */}
                    <div className="px-4 md:px-0">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
                            {/* Large Feature Image */}
                            <div className="lg:col-span-8 relative aspect-[16/10] md:aspect-[16/9] rounded-[48px] overflow-hidden group shadow-2xl">
                                <img
                                    src={item.images[0] || "/images/placeholder.jpg"}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            </div>

                            {/* Side Media Column */}
                            <div className="lg:col-span-4 flex flex-col gap-6 md:gap-8">
                                {item.videos && item.videos.length > 0 ? (
                                    item.videos.slice(0, 2).map((video, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => setActiveVideo(video)}
                                            className="relative flex-grow min-h-[240px] rounded-[40px] overflow-hidden bg-black group cursor-pointer shadow-xl"
                                        >
                                            <video
                                                src={video}
                                                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                                                muted
                                                loop
                                                autoPlay
                                                playsInline
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white transition-all duration-500 group-hover:scale-110 group-hover:bg-[#007654] group-hover:border-[#007654]">
                                                    <Play size={24} fill="white" className="ml-1" />
                                                </div>
                                            </div>
                                            <div className="absolute bottom-6 left-6 right-6">
                                                <p className="text-white font-black text-xs uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                                    Watch Video Tour
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : item.images.length > 1 && (
                                    item.images.slice(1, 3).map((img, idx) => (
                                        <div key={idx} className="relative flex-grow min-h-[240px] rounded-[40px] overflow-hidden group shadow-xl">
                                            <img
                                                src={img}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                alt=""
                                            />
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Facilities Tags */}
                    <div className="mt-16 flex flex-wrap gap-3 px-4 md:px-0">
                        {item.facilities.map((fac, idx) => (
                            <div
                                key={idx}
                                className="bg-white border border-[#f0f0f0] px-6 py-3 rounded-2xl flex items-center gap-3 shadow-sm hover:shadow-md hover:border-[#007654]/20 transition-all"
                            >
                                <CheckCircle2 size={16} className="text-[#007654]" />
                                <span className="text-sm font-bold text-gray-700">{fac}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            ))}

            {/* Video Modal Player */}
            <AnimatePresence>
                {activeVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-4 md:p-12"
                    >
                        <button
                            onClick={() => setActiveVideo(null)}
                            className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors"
                        >
                            <X size={40} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-full max-w-6xl aspect-video rounded-[40px] overflow-hidden shadow-2xl relative bg-black"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <video
                                src={activeVideo}
                                className="w-full h-full object-contain"
                                controls
                                autoPlay
                                playsInline
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
