"use client";

import { useTranslations } from "next-intl";
import { Star, Quote, User } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Adventure Enthusiast",
    content: "Naseem Travel made our European tour absolutely seamless. The attention to detail and premium service was beyond our expectations.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    name: "Michael Chen",
    role: "Business Traveler",
    content: "The wellness retreat in Switzerland was exactly what I needed. Highly professional staff and breathtaking locations.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=michael"
  },
  {
    name: "Elena Rodriguez",
    role: "Solo Traveler",
    content: "Safety was my main concern, and Naseem Travel delivered. Their 24/7 support gave me complete peace of mind during my Asian trip.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=elena"
  },
  {
    name: "David Smith",
    role: "Family Traveler",
    content: "Fantastic experience for the whole family. The kids loved the activities, and we enjoyed the cultural depth of the tours.",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?u=david"
  },
  {
    name: "Aisha Khan",
    role: "Luxury Traveler",
    content: "The Samarkand tour was a masterclass in history and luxury. Everything from the hotels to the guides was top-notch.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=aisha"
  },
  {
    name: "Robert Wilson",
    role: "Nature Lover",
    content: "Unforgettable landscapes and perfectly organized logistics. Can't wait for my next booking with Naseem.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=robert"
  }
];

export function CustomerTestimonial() {
  const t = useTranslations("testimonials");
  return (
    <section className="py-24 bg-[#dcfae7]/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("title")}</h2>
          <div className="w-24 h-1 bg-[#007654] mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow duration-300 bg-white group">
                <CardContent className="p-8 relative">
                  <Quote className="absolute top-6 right-8 w-10 h-10 text-[#007654]/10 group-hover:text-[#007654]/20 transition-colors" />

                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                      />
                    ))}
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-8 relative z-10">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12 border-2 border-[#007654]/10">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="bg-[#007654] text-white">
                        <User className="w-6 h-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
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

