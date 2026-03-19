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
    <section className="overflow-hidden bg-gradient-to-b from-white to-[#dcfae7]/30 px-4 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
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
              {t("we_take_care_of")}
            </span>
            <div className="h-[1px] w-8 bg-[#007654] sm:w-12" />
          </div>
          <h2 className="text-3xl font-black tracking-tight text-[#1a1a1a] sm:text-4xl md:text-5xl lg:text-6xl">
            {t("we_take_care_of")}
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-5">
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
                <div className="relative h-full overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-500 hover:border-[#007654]/20 hover:shadow-2xl sm:p-8">
                  {/* Decorative background gradient */}
                  <div className={`absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br ${service.gradient} opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-10`} />

                  {/* Icon */}
                  <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${service.bgColor} transition-transform duration-300 group-hover:scale-110 sm:mb-6 sm:h-16 sm:w-16`}>
                    <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${service.gradient} sm:h-10 sm:w-10`}>
                      <IconComponent className="h-5 w-5 text-white" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="mb-3 text-base font-black text-[#1a1a1a] transition-colors group-hover:text-[#007654] sm:text-lg">
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
          className="mt-16 h-[2px] bg-gradient-to-r from-transparent via-[#007654]/20 to-transparent sm:mt-20"
        />
      </div>
    </section>
  );
}
