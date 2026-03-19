"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Play, PlayCircle } from "lucide-react";

const videos = [
  {
    title: "The Silk Road Cities of Uzbekistan",
    embedUrl: "https://www.youtube.com/embed/7i7miqyB8wY",
    videoId: "7i7miqyB8wY",
  },
  {
    title: "Samarkand Travel Inspiration",
    embedUrl: "https://www.youtube.com/embed/_nD24x07dqk",
    videoId: "_nD24x07dqk",
  },
  {
    title: "Discover Khiva Old City",
    embedUrl: "https://www.youtube.com/embed/KrL6B40wBok",
    videoId: "KrL6B40wBok",
  },
  {
    title: "Uzbekistan Culture and Traditions",
    embedUrl: "https://www.youtube.com/embed/oeRTyfAbA7c",
    videoId: "oeRTyfAbA7c",
  },
];

export function UzbekistanVideosSection() {
  return (
    <section className="bg-[#fbfbf9] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl sm:mb-12 md:mb-14">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#007654]/20 bg-[#007654]/10 px-3 py-2 sm:mb-6 sm:px-4">
            <PlayCircle className="h-4 w-4 text-[#007654]" />
            <span className="text-xs font-bold tracking-wider text-[#007654] sm:text-sm">
              Video Preview
            </span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-[#1a1a1a] sm:text-4xl md:text-5xl">
            Experience Uzbekistan Before You Travel
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:mt-5 sm:text-lg">
            Watch a few hand-picked videos to get a feel for Uzbekistan&apos;s architecture,
            culture, and timeless Silk Road atmosphere before you go.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="overflow-hidden rounded-[24px] border border-gray-100 bg-white p-3 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.08)] sm:rounded-[32px] sm:p-4"
            >
              <VideoPreview
                title={video.title}
                embedUrl={video.embedUrl}
                videoId={video.videoId}
              />
              <div className="px-1 pb-1 pt-4 sm:px-2 sm:pb-2 sm:pt-5">
                <h3 className="text-lg font-black tracking-tight text-[#1a1a1a] sm:text-xl">{video.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  A short visual introduction to the places, colors, and stories that make
                  Uzbekistan unforgettable.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoPreview({
  title,
  embedUrl,
  videoId,
}: {
  title: string;
  embedUrl: string;
  videoId: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="overflow-hidden rounded-[20px] sm:rounded-[24px]">
      <div className="relative aspect-video bg-black">
        {isPlaying ? (
          <motion.iframe
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full"
            src={`${embedUrl}?autoplay=1&rel=0`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            className="group absolute inset-0 block h-full w-full"
            aria-label={`Play ${title}`}
          >
            <Image
              src={thumbnailUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/10 transition-opacity duration-300 group-hover:opacity-90" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur-md transition-transform duration-300 group-hover:scale-105 sm:h-20 sm:w-20">
                <Play className="ml-1 h-7 w-7 fill-white text-white sm:h-9 sm:w-9" />
              </div>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
