// app/[locale]/sanatory/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/src/components/header";
import { Footer } from "@/src/components/footer";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useTranslations } from "next-intl";
import axios from "axios";
import config from "@/src/config";

interface VideoItem {
  id: number;
  video: string;
}

interface Sanatory {
  id: number;
  title: string;
  slug: string;
  price: string;
  description: string;
  image: string;
  videos: VideoItem[];
}

interface SanatoryPageProps {
  params: {
    locale: string;
  };
}

export default function SanatoryPage({ params }: SanatoryPageProps) {
  const [sanatories, setSanatories] = useState<Sanatory[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("hero");

  // PDF fayllari
  const pdfs = [
    "/pdfs/1.pdf",
    "/pdfs/2.pdf",
    "/pdfs/3.pdf",
    "/pdfs/4.pdf",
    "/pdfs/5.pdf",
  ];

  // API dan ma'lumot olish
  useEffect(() => {
    const fetchSanatories = async () => {
      try {
        const res = await axios.get(`${config.BASE_URL}/api/sanatory/`);
        setSanatories(res.data.data.results || []);
      } catch (error) {
        console.error("Error fetching sanatories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSanatories();
  }, []);

  const handleDownloadPDFs = async () => {
    const zip = new JSZip();

    for (const pdfPath of pdfs) {
      const response = await fetch(pdfPath);
      const blob = await response.blob();
      zip.file(pdfPath.split("/").pop() || "file.pdf", blob);
    }

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "all-pdfs.zip");
  };

  return (
    <div className="w-full overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden">
        {/* Background Image */}
        <Image
          src={sanatories[0]?.image || "/contents/1.jpg"}
          alt="Hero background"
          fill
          className="object-cover absolute inset-0"
          quality={90}
          priority
          sizes="100vw"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content Section */}
        <div className="relative z-20 w-full h-full flex flex-col justify-end">
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white py-8 px-4 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center items-center w-full max-w-7xl mx-auto">
              <span className="text-lg font-bold tracking-wide">
                EXCLUSIVELY FOR SOLO TRAVELLERS
              </span>
              <span className="text-4xl font-extrabold text-green-400">25</span>
              <span className="text-lg">Over 25 Years Expertise</span>
              <span className="text-lg">Your Money is 100% Protected</span>
              <span className="text-lg">Holiday Assurance Guarantee</span>
              <span className="text-lg">No Single Supplement</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-12 px-4 space-y-16">
        {/* Video Section */}
        <section>
          <h1 className="text-4xl md:text-5xl font-bold text-green-700 text-center mb-4">
            Video Gallery ({params.locale})
          </h1>
          <p className="text-center text-gray-700 mb-8">
            Click on any video to view it fullscreen.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-64 w-full bg-gray-200 rounded-lg animate-pulse"
                  ></div>
                ))
              : sanatories.map((sanatory) =>
                  sanatory.videos.map((video) => (
                    <div
                      key={video.id}
                      className="relative cursor-pointer rounded-lg overflow-hidden shadow-lg h-64 group"
                      onClick={() => setSelectedVideo(video)}
                    >
                      <video
                        src={video.video}
                        muted
                        autoPlay
                        loop
                        playsInline
                        className="w-full h-full object-cover group-hover:brightness-75 transition-all duration-300"
                      />

                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-bold text-lg sm:text-xl">
                        <span className="text-2xl mb-2">▶</span>
                        <span className="text-center">{sanatory.title}</span>
                      </div>
                    </div>
                  ))
                )}
          </div>
        </section>

        {/* Images Section */}
        <section>
          <h2 className="text-3xl font-bold text-green-700 text-center mb-8">
            Amazing Images
          </h2>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            {loading
              ? Array.from({ length: 2 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-full md:w-1/2 h-80 md:h-96 bg-gray-200 rounded-xl animate-pulse"
                  ></div>
                ))
              : sanatories.map((sanatory) => (
                  <div
                    key={sanatory.id}
                    className="relative w-full md:w-1/2 h-80 md:h-96 rounded-xl overflow-hidden shadow-2xl group"
                  >
                    <Image
                      src={sanatory.image}
                      alt={sanatory.title}
                      fill
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Link
                        href={`/${params.locale}/sanatory/${sanatory.slug}`}
                        className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
          </div>
        </section>

        {/* Download PDFs Button */}
        <section className="text-center">
          <button
            onClick={handleDownloadPDFs}
            className="px-6 py-3 bg-green-700 text-white font-bold rounded-lg shadow-lg hover:bg-green-800 transition-colors duration-300"
          >
            Download All PDFs
          </button>
        </section>

        {/* Modal Video */}
        {selectedVideo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            onClick={() => setSelectedVideo(null)}
          >
            <div
              className="relative w-full max-w-3xl rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 text-white text-2xl font-bold z-50"
                onClick={() => setSelectedVideo(null)}
              >
                ×
              </button>
              <video
                src={selectedVideo.video}
                controls
                autoPlay
                className="w-full h-auto"
              />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
