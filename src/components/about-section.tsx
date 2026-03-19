"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Play, Heart, MapPin, Users, Star } from "lucide-react";

export function AboutSection() {
  const t = useTranslations("about");

  const highlights = [
    { icon: Heart, labelKey: "passion", color: "from-rose-500 to-pink-500" },
    { icon: MapPin, labelKey: "expertise", color: "from-blue-500 to-cyan-500" },
    { icon: Users, labelKey: "community", color: "from-purple-500 to-violet-500" },
    { icon: Star, labelKey: "quality", color: "from-amber-500 to-orange-500" },
  ];

  return (
    <section id="about" className="relative py-24 overflow-hidden bg-gradient-to-b from-[#dcfae7]/30 to-white">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#007654]/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#007654]/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Video */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Video container with glow */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#007654]/20">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#007654] via-[#00a572] to-[#007654] rounded-3xl blur-lg opacity-50" />

              <div className="relative aspect-video rounded-3xl overflow-hidden border-2 border-[#007654]/20">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/7i7miqyB8wY"
                  title="Travel Inspiration Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-12 -right-4 bg-white rounded-2xl p-4 shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-gradient-to-br from-[#007654] to-[#00a572] rounded-xl flex items-center justify-center">
                  <Play className="w-5 h-5 text-white fill-white" />
                </div>
                <div>
                  <p className="text-xl font-black text-[#1a1a1a]">25+</p>
                  <p className="text-gray-500 text-sm font-medium">Years experience</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className=""
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#007654]/10 px-4 py-2 rounded-full mb-6 border border-[#007654]/20">
              <span className="w-2 h-2 bg-[#007654] rounded-full animate-pulse" />
              <span className="text-[#007654] text-sm font-bold tracking-wider">{t("badge")}</span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight text-[#1a1a1a]">
              {t("title")}
            </h2>

            {/* Paragraphs */}
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed mb-10">
              <p>{t("paragraph1")}</p>
              <p>{t("paragraph2")}</p>
              <p className="text-[#007654] font-medium">{t("paragraph3")}</p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.labelKey}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-white rounded-2xl p-4 border border-gray-100 hover:border-[#007654]/30 transition-all group shadow-sm hover:shadow-lg"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-gray-700 text-sm font-bold">{t(item.labelKey)}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
