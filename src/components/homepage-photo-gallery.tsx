"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { destinations } from "@/src/lib/destinations";

const galleryItems = [
  ...destinations.slice(0, 4).map((destination) => ({
    src: destination.image,
    title: destination.title,
  })),
  {
    src: "/images/shakhrisabz6.jpg",
    title: "Shakhrisabz",
  },
  {
    src: "/images/urgench.jpg",
    title: "Urgench",
  },
];

export function HomepagePhotoGallery() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8 text-center md:mb-10"
        >
          <h2 className="text-3xl font-black tracking-tight text-[#1a1a1a] md:text-4xl">
            Travel moments in Uzbekistan
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.src}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="group relative overflow-hidden rounded-[28px] bg-[#dcfae7]/40"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.src}
                  alt={`${item.title}, Uzbekistan`}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 flex items-end p-4">
                  <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-white backdrop-blur-sm">
                    {item.title}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
