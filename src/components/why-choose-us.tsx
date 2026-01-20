"use client";

import { ShieldCheck, Headphones, Award, BadgePercent, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function WhyChooseUs() {
    const t = useTranslations("whyChooseUs");

    const advantages = [
        {
            icon: <ShieldCheck className="w-8 h-8 text-[#007654]" />,
            titleKey: "trustedSecurity"
        },
        {
            icon: <Headphones className="w-8 h-8 text-[#007654]" />,
            titleKey: "support247"
        },
        {
            icon: <Award className="w-8 h-8 text-[#007654]" />,
            titleKey: "premiumQuality"
        },
        {
            icon: <BadgePercent className="w-8 h-8 text-[#007654]" />,
            titleKey: "bestPrice"
        },
        {
            icon: <Globe className="w-8 h-8 text-[#007654]" />,
            titleKey: "globalExpertise"
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("title")}</h2>
                    <div className="w-24 h-1 bg-[#007654] mx-auto rounded-full mb-6"></div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {t("subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {advantages.map((advantage, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-[#dcfae7]/30 transition-colors duration-300"
                        >
                            <div className="p-4 bg-[#dcfae7] rounded-2xl mb-6 shadow-sm">
                                {advantage.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{t(`${advantage.titleKey}.title`)}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {t(`${advantage.titleKey}.description`)}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
