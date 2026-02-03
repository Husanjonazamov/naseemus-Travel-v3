"use client";

import { Header } from "@/src/components/header";
import { Footer } from "@/src/components/footer";
import { FileText, Download, Map, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { motion } from "framer-motion";

const brochures = [
    {
        id: 1,
        category: "Tours",
        title: "European Grand Tour",
        description: "Explore the most iconic cities of Europe in this 14-day premium tour.",
        icon: <Map className="w-10 h-10 text-[#007654]" />,
        pdfUrl: "/brochures/european-grand-tour.pdf",
    },
    {
        id: 2,
        category: "Tours",
        title: "Exotic Asia Discovery",
        description: "Experience the vibrant cultures and landscapes of Southeast Asia.",
        icon: <Map className="w-10 h-10 text-[#007654]" />,
        pdfUrl: "/brochures/exotic-asia.pdf",
    },
    {
        id: 3,
        category: "Sanatoriums",
        title: "Wellness & Spa Retreats",
        description: "Discover the best sanatoriums for health and relaxation.",
        icon: <Heart className="w-10 h-10 text-[#007654]" />,
        pdfUrl: "/brochures/wellness-retreats.pdf",
    },
    {
        id: 4,
        category: "Sanatoriums",
        title: "Mineral Water Springs",
        description: "A comprehensive guide to therapeutic mineral water springs.",
        icon: <Heart className="w-10 h-10 text-[#007654]" />,
        pdfUrl: "/brochures/mineral-water.pdf",
    },
];

export default function BrochurePage() {
    const toursBrochures = brochures.filter(b => b.category === "Tours");
    const sanatoriumsBrochures = brochures.filter(b => b.category === "Sanatoriums");

    return (
        <div className="min-h-screen bg-[#dcfae7]">
            <Header />

            <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Brochures</h1>
                    <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                        Download our latest brochures to explore our premium tours and health retreats in detail.
                    </p>
                </div>

                <section className="mb-16">
                    <div className="flex items-center gap-3 mb-8 border-b border-[#007654]/20 pb-4">
                        <h2 className="text-3xl font-bold text-[#007654]">Tours</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {toursBrochures.map((brochure, index) => (
                            <BrochureCard key={brochure.id} brochure={brochure} index={index} />
                        ))}
                    </div>
                </section>

                <section>
                    <div className="flex items-center gap-3 mb-8 border-b border-[#007654]/20 pb-4">
                        <h2 className="text-3xl font-bold text-[#007654]">Sanatoriums</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sanatoriumsBrochures.map((brochure, index) => (
                            <BrochureCard key={brochure.id} brochure={brochure} index={index} />
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

function BrochureCard({ brochure, index }: { brochure: typeof brochures[0], index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            <Card className="h-full flex flex-col hover:shadow-xl transition-shadow duration-300 border-none bg-white">
                <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-3 bg-[#dcfae7] rounded-xl">
                        {brochure.icon}
                    </div>
                    <div>
                        <CardTitle className="text-xl">{brochure.title}</CardTitle>
                        <CardDescription className="text-sm font-medium text-[#007654]/70 uppercase tracking-widest mt-1">
                            {brochure.category}
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-gray-600 line-clamp-3">
                        {brochure.description}
                    </p>
                </CardContent>
                <CardFooter>
                    <a
                        href={brochure.pdfUrl}
                        download
                        className="w-full bg-[#007654] hover:bg-[#005c42] text-white py-4 text-lg font-bold rounded-md transition-colors flex items-center justify-center gap-2"
                    >
                        <Download className="w-5 h-5" />
                        Download PDF
                    </a>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
