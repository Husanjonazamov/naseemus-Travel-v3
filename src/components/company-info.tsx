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
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#dcfae7]/30 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#007654]/10 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-12 bg-[#007654]" />
            <span className="text-[#007654] font-black uppercase tracking-[0.2em] text-[10px]">
              {t("subtitle")}
            </span>
            <div className="h-[1px] w-12 bg-[#007654]" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1a1a1a] tracking-tight mb-2">
            {t("title")}
          </h2>

          <p className="text-sm font-black uppercase tracking-[0.3em] text-[#007654] mb-6">
            {t("slogan")}
          </p>

          <p className="text-xl text-gray-500 font-medium max-w-3xl mx-auto leading-relaxed">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                {t("paragraph1")}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t("paragraph2")}
              </p>
            </div>

            <div className="bg-gradient-to-r from-[#007654] to-[#00a572] p-8 rounded-3xl text-white">
              <div className="flex items-center gap-4 mb-4">
                <Users size={32} className="flex-shrink-0" />
                <h3 className="text-2xl font-black">{t("highlight.title")}</h3>
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
            className="grid grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#fafafa] p-8 rounded-3xl hover:shadow-xl transition-all duration-500 group border border-gray-100"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#dcfae7] flex items-center justify-center text-[#007654] mb-6 group-hover:bg-[#007654] group-hover:text-white transition-colors duration-300">
                  <feature.icon size={28} />
                </div>
                <h4 className="text-lg font-black text-[#1a1a1a] mb-3">
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
          className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-gray-100"
        >
          {["tours", "travelers", "countries", "years"].map((stat) => (
            <div key={stat} className="text-center">
              <div className="text-4xl md:text-5xl font-black text-[#007654] mb-2">
                {t(`stats.${stat}.value`)}
              </div>
              <div className="text-gray-500 font-medium text-sm uppercase tracking-wider">
                {t(`stats.${stat}.label`)}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
