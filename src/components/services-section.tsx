"use client";

import { Plane, Bed, Coffee, Headphones, Shield } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function ServicesSection() {
  const t = useTranslations("service");

  const services = [
    {
      icon: Plane,
      titleKey: "flights",
      descKey: "return_flights",
      gradient: "from-blue-500 to-cyan-400",
      bgColor: "bg-blue-50",
    },
    {
      icon: Bed,
      titleKey: "hotels",
      descKey: "hand_picked_hotels",
      gradient: "from-purple-500 to-pink-400",
      bgColor: "bg-purple-50",
    },
    {
      icon: Coffee,
      titleKey: "breakfasts",
      descKey: "breakfast_together",
      gradient: "from-orange-500 to-amber-400",
      bgColor: "bg-orange-50",
    },
    {
      icon: Headphones,
      titleKey: "holiday_directors",
      descKey: "experienced_tour_guide",
      gradient: "from-emerald-500 to-teal-400",
      bgColor: "bg-emerald-50",
    },
    {
      icon: Shield,
      titleKey: "holiday_assurance",
      descKey: "support_every_step",
      gradient: "from-indigo-500 to-violet-400",
      bgColor: "bg-indigo-50",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white to-[#dcfae7]/30 py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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
              {t("we_take_care_of")}
            </span>
            <div className="h-[1px] w-12 bg-[#007654]" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1a1a1a] tracking-tight">
            {t("we_take_care_of")}
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-3xl p-8 h-full shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#007654]/20 relative overflow-hidden">
                  {/* Decorative background gradient */}
                  <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${service.gradient} rounded-full opacity-0 group-hover:opacity-10 blur-3xl transition-all duration-500`} />

                  {/* Icon */}
                  <div className={`w-16 h-16 ${service.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center`}>
                      <IconComponent className="w-5 h-5 text-white" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-black text-[#1a1a1a] mb-3 group-hover:text-[#007654] transition-colors">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {t(service.descKey)}
                  </p>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#007654]/0 to-transparent group-hover:via-[#007654] transition-all duration-500" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 h-[2px] bg-gradient-to-r from-transparent via-[#007654]/20 to-transparent"
        />
      </div>
    </section>
  );
}
