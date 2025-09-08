// app/[locale]/sanatory/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Header } from "@/src/components/header";
import { Footer } from "@/src/components/footer";
import JSZip from "jszip";
import { saveAs } from "file-saver";

interface VideoItem {
  id: number;
  title: string;
  videoSrc: string;
}

interface ImageItem {
  id: number;
  src: string;
  alt: string;
}

interface SanatoryPageProps {
  params: {
    locale: string;
  };
}

export default function SanatoryPage({ params }: SanatoryPageProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const videos: VideoItem[] = [
    { id: 1, title: "Amazing Nature", videoSrc: "/contents/1.mp4" },
    { id: 2, title: "Ocean Waves", videoSrc: "/contents/2.mp4" },
    { id: 3, title: "Mountain Adventure", videoSrc: "/contents/3.mp4" },
    { id: 4, title: "Forest Walk", videoSrc: "/contents/4.mp4" },
    { id: 5, title: "River Stream", videoSrc: "/contents/5.mp4" },
    { id: 6, title: "Sunset View", videoSrc: "/contents/6.MOV" },
  ];

  const images: ImageItem[] = [
    { id: 1, src: "/contents/1.jpg", alt: "Nature Image" },
    { id: 2, src: "/contents/2.jpg", alt: "Ocean Image" },
  ];

  // PDF fayllari
  const pdfs = [
    "/pdfs/1.pdf",
    "/pdfs/2.pdf",
    "/pdfs/3.pdf",
    "/pdfs/4.pdf",
    "/pdfs/5.pdf",
  ];

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
            {videos.map((video) => (
              <div
                key={video.id}
                className="relative cursor-pointer rounded-lg overflow-hidden shadow-lg h-64 group"
                onClick={() => setSelectedVideo(video)}
              >
                <video
                  src={video.videoSrc}
                  muted
                  autoPlay
                  loop
                  playsInline
                  className="w-full h-full object-cover group-hover:brightness-75 transition-all duration-300"
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-bold text-lg sm:text-xl">
                  <span className="text-2xl mb-2">▶</span>
                  <span className="text-center">{video.title}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WOW Images Section */}
        <section>
          <h2 className="text-3xl font-bold text-green-700 text-center mb-8">
            Amazing Images
          </h2>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            {images.map((img) => (
              <div
                key={img.id}
                className="relative w-full md:w-1/2 h-80 md:h-96 rounded-xl overflow-hidden shadow-2xl"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover w-full h-full"
                />

                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-10 transition-opacity"></div>
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
                src={selectedVideo.videoSrc}
                controls
                autoPlay
                className="w-full h-auto"
              />
              <div className="p-4 text-white font-semibold bg-green-700">
                {selectedVideo.title}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
