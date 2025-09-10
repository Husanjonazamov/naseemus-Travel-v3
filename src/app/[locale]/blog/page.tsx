"use client";

import Image from "next/image";
import Link from "next/link";
import { Header } from "@/src/components/header";
import { Footer } from "@/src/components/footer";

export default function BlogsPage() {
  const blogs = [
    {
      id: 1,
      title: "Exploring the Beauty of Croatia",
      desc: "Croatia offers breathtaking coastlines, historic cities, and a rich culinary scene. From the ancient walls of Dubrovnik to the serene beaches of Hvar, every corner tells a story. Perfect for travellers seeking both relaxation and adventure.",
      date: "2025-09-05",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
    },
    {
      id: 2,
      title: "Top 10 Destinations in Europe",
      desc: "Europe is filled with iconic cities and hidden gems. Explore the romantic streets of Paris, the historic squares of Prague, and the vibrant culture of Barcelona. Each destination offers unique experiences, from art and history to food and nightlife.",
      date: "2025-09-02",
      image: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?w=600",
    },
    {
      id: 3,
      title: "Why Solo Travel is the Best Gift",
      desc: "Traveling alone can be transformative. It allows you to explore at your own pace, meet new people, and discover yourself. Solo journeys teach independence, confidence, and provide unforgettable memories for those willing to step out of their comfort zone.",
      date: "2025-08-29",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600",
    },
  ];

  return (
    <div className="w-full overflow-x-hidden">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200"
          alt="Blogs Hero"
          fill
          className="object-cover absolute inset-0"
          quality={90}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-20 flex items-center justify-center h-full px-4">
          <h1 className="text-3xl sm:text-5xl font-bold text-white drop-shadow-lg text-center break-words">
            Our Blogs
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/40 text-white py-4 px-2 sm:px-4">
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 max-w-7xl mx-auto text-center">
            <span className="text-sm sm:text-base md:text-lg font-bold tracking-wide">
              EXCLUSIVELY FOR SOLO TRAVELLERS
            </span>
            <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-green-500">
              25
            </span>
            <span className="text-sm sm:text-base md:text-lg">
              Over 25 Years Expertise
            </span>
            <span className="text-sm sm:text-base md:text-lg">
              Your Money is 100% Protected
            </span>
            <span className="text-sm sm:text-base md:text-lg">
              Holiday Assurance Guarantee
            </span>
            <span className="text-sm sm:text-base md:text-lg">
              No Single Supplement
            </span>
          </div>
        </div>
      </section>

      {/* Blog List */}
      <section className="max-w-6xl mx-auto py-12 px-4 space-y-8">
       {blogs.map((blog) => (
      <Link
        key={blog.id}
        href={`/blog/${blog.id}`}
        className="flex flex-col md:flex-row bg-white hover:bg-gray-50 cursor-pointer transition-colors duration-200"
      >
        {/* Left side image */}
        <div className="relative w-full md:w-1/3 h-56 md:h-56">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Right side content */}
        <div className="p-6 flex flex-col justify-center w-full md:w-2/3">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            {blog.title}
          </h2>
          <p className="text-gray-700 mb-4">{blog.desc}</p>
          <span className="text-sm text-gray-500">
            📅 {new Date(blog.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </Link>
    ))}

      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
