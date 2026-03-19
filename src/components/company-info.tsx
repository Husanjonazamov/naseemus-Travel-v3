"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Users, Globe, Award, Shield } from "lucide-react";

export function CompanyInfo() {
  const t = useTranslations("companyInfo");

  const features = [
    { icon: Users, key: "groupTours" },
    { icon: Globe, key: "silkRoad" },
    { icon: Award, key: "experience" },
    { icon: Shield, key: "safety" },
  ];

  return (
    <section id="about" className="relative overflow-hidden bg-white pb-16 pt-12 md:pb-20 md:pt-14">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#dcfae7]/30 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#007654]/10 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center sm:mb-16 md:mb-20"
        >
          <div className="mb-5 flex items-center justify-center gap-3 sm:mb-6">
            <div className="h-[1px] w-8 bg-[#007654] sm:w-12" />
            <span className="text-[#007654] font-black tracking-[0.2em] text-[10px]">
              {t("subtitle")}
            </span>
            <div className="h-[1px] w-8 bg-[#007654] sm:w-12" />
          </div>

          <h2 className="mb-2 text-3xl font-black tracking-tight text-[#1a1a1a] sm:text-4xl md:text-5xl lg:text-6xl">
            {t("title")}
          </h2>

          <p className="mb-5 text-xs font-black tracking-[0.24em] text-[#007654] sm:mb-6 sm:text-sm sm:tracking-[0.3em]">
            {t("slogan")}
          </p>

          <p className="mx-auto max-w-3xl text-base font-medium leading-relaxed text-gray-500 sm:text-lg md:text-xl">
            {t("description")}
          </p>
        </motion.div>

        <div className="mb-16 grid items-center gap-10 lg:grid-cols-2 lg:gap-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="space-y-5 sm:space-y-6">
              <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
                {t("paragraph1")}
              </p>
              <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
                {t("paragraph2")}
              </p>
            </div>

            <div className="rounded-3xl bg-gradient-to-r from-[#007654] to-[#00a572] p-6 text-white sm:p-8">
              <div className="mb-4 flex items-center gap-3 sm:gap-4">
                <Users size={28} className="shrink-0 sm:h-8 sm:w-8" />
                <h3 className="text-xl font-black sm:text-2xl">{t("highlight.title")}</h3>
              </div>
              <p className="text-white/90 leading-relaxed">
                {t("highlight.description")}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group rounded-3xl border border-gray-100 bg-[#fafafa] p-6 transition-all duration-500 hover:shadow-xl sm:p-8"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#dcfae7] text-[#007654] transition-colors duration-300 group-hover:bg-[#007654] group-hover:text-white sm:mb-6 sm:h-14 sm:w-14">
                  <feature.icon size={24} />
                </div>
                <h4 className="mb-3 text-base font-black text-[#1a1a1a] sm:text-lg">
                  {t(`features.${feature.key}.title`)}
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {t(`features.${feature.key}.description`)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 gap-6 border-t border-gray-100 pt-10 sm:gap-8 sm:pt-12 md:grid-cols-4"
        >
          {["tours", "travelers", "countries", "years"].map((stat) => (
            <div key={stat} className="text-center">
              <div className="mb-2 text-3xl font-black text-[#007654] sm:text-4xl md:text-5xl">
                {t(`stats.${stat}.value`)}
              </div>
              <div className="text-gray-500 font-medium text-sm tracking-wider">
                {t(`stats.${stat}.label`)}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
