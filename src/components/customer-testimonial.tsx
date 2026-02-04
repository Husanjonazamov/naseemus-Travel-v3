"use client";

import { useTranslations } from "next-intl";
import { Star, Quote, User } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


export function CustomerTestimonial() {
  const t = useTranslations("testimonials");

  const testimonials = [
    {
      nameKey: "review1.name",
      roleKey: "review1.role",
      contentKey: "review1.content",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=sarah",
    },
    {
      nameKey: "review2.name",
      roleKey: "review2.role",
      contentKey: "review2.content",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=michael",
    },
    {
      nameKey: "review3.name",
      roleKey: "review3.role",
      contentKey: "review3.content",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=elena",
    },
    {
      nameKey: "review4.name",
      roleKey: "review4.role",
      contentKey: "review4.content",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=david",
    },
    {
      nameKey: "review5.name",
      roleKey: "review5.role",
      contentKey: "review5.content",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=aisha",
    },
    {
      nameKey: "review6.name",
      roleKey: "review6.role",
      contentKey: "review6.content",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=robert",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#dcfae7]/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#007654]/10 px-4 py-2 rounded-full mb-6 border border-[#007654]/20">
            <span className="w-2 h-2 bg-[#007654] rounded-full animate-pulse" />
            <span className="text-[#007654] text-sm font-bold uppercase tracking-wider">
              {t("badge")}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-6">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white group rounded-3xl overflow-hidden">
                <CardContent className="p-8 relative">
                  {/* Quote icon */}
                  <Quote className="absolute top-6 right-8 w-12 h-12 text-[#007654]/10 group-hover:text-[#007654]/20 transition-colors" />

                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < testimonial.rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-200"
                          }`}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-gray-700 leading-relaxed mb-8 relative z-10 text-base">
                    "{t(testimonial.contentKey)}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <Avatar className="w-14 h-14 border-2 border-[#007654]/20">
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={t(testimonial.nameKey)}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-[#007654] to-[#00a572] text-white">
                        <User className="w-6 h-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-[#1a1a1a] text-lg">
                        {t(testimonial.nameKey)}
                      </h4>
                      <p className="text-sm text-[#007654] font-medium">
                        {t(testimonial.roleKey)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
