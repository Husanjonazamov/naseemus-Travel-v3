"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/src/components/header";
import { Footer } from "@/src/components/footer";
import { useTranslations, useLocale } from "next-intl";
import axios from "axios";
import config from "@/src/config";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeartPulse,
  MapPin,
  ArrowRight,
  Play,
  X,
  Clock
} from "lucide-react";
import { Button } from "@/src/components/ui/button";

interface VideoItem {
  id: number;
  video: string;
}

interface Sanatory {
  id: number;
  title: string;
  slug: string;
  price: string;
  description: string;
  image: string;
  date?: number;
  videos: VideoItem[];
}

export default function SanatoryPage() {
  const locale = useLocale();
  const [sanatories, setSanatories] = useState<Sanatory[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSanatories = async () => {
      try {
        const res = await axios.get(`${config.BASE_URL}/api/sanatory/`, {
          headers: { "Accept-Language": locale }
        });
        setSanatories(res.data.data.results || []);
      } catch (error) {
        console.error("Error fetching sanatories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSanatories();
  }, [locale]);

  return (
    <div className="w-full bg-[#fbfbf9] overflow-x-hidden">
      <Header />

      {/* Compact Hero */}
      <section className="relative w-full h-[40vh] min-h-[280px] overflow-hidden">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={sanatories[0]?.image || "/images/uzbekistan-tour-map.png"}
            alt="Wellness Resorts"
            fill
            className="object-cover"
            quality={90}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#fbfbf9]" />
        </motion.div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 bg-[#007654] px-4 py-1.5 rounded-full">
              <HeartPulse size={14} className="text-white" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">Wellness Retreats</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Sanatoriums
            </h1>
            <p className="text-white/70 font-medium max-w-md mx-auto text-sm">
              Medical spa retreats in Uzbekistan's most pristine landscapes
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resort Listing Grid */}
      <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            [1, 2, 3].map(i => (
              <div key={i} className="aspect-[4/5] bg-gray-100 rounded-2xl animate-pulse" />
            ))
          ) : sanatories.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-400 text-lg">No sanatoriums available</p>
            </div>
          ) : (
            sanatories.map((resort, idx) => (
              <motion.div
                key={resort.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-500"
              >
                <Link href={`/${locale}/sanatory/${resort.slug}`}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={resort.image}
                      alt={resort.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5">
                        <Clock size={12} className="text-[#007654]" />
                        <span className="text-[10px] font-bold text-gray-700">{resort.date || 7} Days</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-[#1a1a1a] mb-2 group-hover:text-[#007654] transition-colors">
                      {resort.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {resort.description}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                      <div>
                        <p className="text-[9px] font-bold uppercase text-gray-400">From</p>
                        <p className="text-xl font-black text-[#007654]">${resort.price}</p>
                      </div>
                      <div className="flex items-center gap-1 text-[#007654] text-xs font-bold">
                        View Details
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* Video Gallery - Compact */}
      {sanatories.some(s => s.videos && s.videos.length > 0) && (
        <section className="bg-[#1a1a1a] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Video Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {sanatories.flatMap(s => s.videos?.map(v => ({ ...v, title: s.title })) || []).slice(0, 4).map((video, idx) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => setSelectedVideo(video)}
                >
                  <video
                    src={video.video}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    autoPlay
                    playsInline
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all flex items-center justify-center">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                      <Play size={18} fill="white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 px-4"
            onClick={() => setSelectedVideo(null)}
          >
            <button className="absolute top-6 right-6 text-white hover:text-[#007654] transition-colors">
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <video
                src={selectedVideo.video}
                controls
                autoPlay
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
