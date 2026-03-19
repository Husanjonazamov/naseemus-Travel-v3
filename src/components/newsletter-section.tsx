"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Mail, Send, Sparkles, Gift, Bell } from "lucide-react";
import { SubscribeModal } from "./SubscribeModal";

export function NewsletterSection() {
  const t = useTranslations("newsletter");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      {/* Beautiful gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#007654] via-[#00a572] to-[#00c988]" />

      {/* Decorative elements */}
      <div className="absolute left-0 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute bottom-0 right-0 h-72 w-72 translate-x-1/3 translate-y-1/3 rounded-full bg-white/5 blur-3xl sm:h-[500px] sm:w-[500px]" />
      <div className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/3 blur-[100px] sm:h-[800px] sm:w-[800px]" />

      {/* Floating icons */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[10%] top-16 hidden text-white/20 sm:block md:top-20 md:left-[15%]"
      >
        <Mail size={48} />
      </motion.div>
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[14%] top-24 hidden text-white/15 sm:block md:top-32 md:right-[20%]"
      >
        <Gift size={56} />
      </motion.div>
      <motion.div
        animate={{ y: [-5, 15, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-16 left-[18%] hidden text-white/10 sm:block md:bottom-24 md:left-[25%]"
      >
        <Bell size={40} />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm sm:mb-8 sm:px-5"
        >
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span className="text-white/90 text-sm font-bold">{t("badge") || "Exclusive Offers"}</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-5 text-3xl font-black leading-tight text-white sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl"
        >
          {t("title")}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg md:mb-12 md:text-xl"
        >
          {t("subtitle") || "Get exclusive travel deals, inspiration, and insider tips delivered straight to your inbox."}
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 text-base font-black text-[#007654] shadow-2xl shadow-black/20 transition-all duration-300 hover:shadow-xl sm:w-auto sm:px-10 sm:py-5 sm:text-lg"
        >
          <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
          {t("button")}
          <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </motion.button>

        {/* Trust text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-sm text-white/60 sm:mt-8"
        >
          {t("trust") || "Join 10,000+ travelers. Unsubscribe anytime."}
        </motion.p>
      </div>

      <SubscribeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
