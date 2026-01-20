"use client";

import { ShieldCheck, Headphones, Award, BadgePercent, Globe } from "lucide-react";
import { motion } from "framer-motion";

const advantages = [
    {
        icon: <ShieldCheck className="w-8 h-8 text-[#007654]" />,
        title: "Trusted Security",
        description: "Your safety and security are our top priorities. We use industry-leading standards to protect your data and bookings."
    },
    {
        icon: <Headphones className="w-8 h-8 text-[#007654]" />,
        title: "24/7 Support",
        description: "Our dedicated travel experts are available around the clock to assist you with any questions or emergencies."
    },
    {
        icon: <Award className="w-8 h-8 text-[#007654]" />,
        title: "Premium Quality",
        description: "We curate only the best tours and sanatoriums to ensure you have a truly premium and memorable experience."
    },
    {
        icon: <BadgePercent className="w-8 h-8 text-[#007654]" />,
        title: "Best Price Guarantee",
        description: "Enjoy competitive pricing and exclusive deals without compromising on the quality of your travel experience."
    },
    {
        icon: <Globe className="w-8 h-8 text-[#007654]" />,
        title: "Global Expertise",
        description: "With years of experience in the travel industry, we provide expert guidance and local insights for your destinations."
    }
];

export function WhyChooseUs() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Naseem Travel?</h2>
                    <div className="w-24 h-1 bg-[#007654] mx-auto rounded-full mb-6"></div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        We are committed to providing exceptional service and unforgettable experiences that exceed your expectations.
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
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{advantage.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {advantage.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
