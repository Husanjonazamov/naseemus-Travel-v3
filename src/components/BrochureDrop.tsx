"use client";

import React from "react";
import { FileText, Download, Map, Heart, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useLocale } from "next-intl";
import Link from "next/link";

const brochures = [
    {
        id: 1,
        category: "Tours",
        title: "European Grand Tour",
        icon: <Map className="w-5 h-5 text-[#007654]" />,
        pdfUrl: "/brochures/european-grand-tour.pdf",
    },
    {
        id: 2,
        category: "Tours",
        title: "Exotic Asia Discovery",
        icon: <Map className="w-5 h-5 text-[#007654]" />,
        pdfUrl: "/brochures/exotic-asia.pdf",
    },
    {
        id: 3,
        category: "Sanatoriums",
        title: "Wellness & Spa Retreats",
        icon: <Heart className="w-5 h-5 text-[#007654]" />,
        pdfUrl: "/brochures/wellness-retreats.pdf",
    },
];

export const BrochureDrop = ({ onClose }: { onClose: () => void }) => {
    const locale = useLocale();

    return (
        <div className="p-6 w-[400px]">
            <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col">
                    <h3 className="text-lg font-bold text-gray-900 leading-none">Quick download</h3>
                    <p className="text-xs text-gray-500 mt-1 font-medium">Select a brochure to download</p>
                </div>
                <Link
                    href={`/${locale}/brochure`}
                    onClick={onClose}
                    className="text-[10px] font-black tracking-widest text-[#007654] hover:underline flex items-center gap-1"
                >
                    View all <ChevronRight size={12} />
                </Link>
            </div>

            <div className="space-y-3">
                {brochures.map((brochure, index) => (
                    <motion.div
                        key={brochure.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <a
                            href={brochure.pdfUrl}
                            download
                            className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-[#dcfae7]/40 border border-transparent hover:border-[#007654]/10 transition-all duration-300"
                        >
                            <div className="p-3 bg-gray-50 group-hover:bg-white rounded-xl shadow-sm transition-colors">
                                {brochure.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] font-black tracking-widest text-gray-400 group-hover:text-[#007654]/60 transition-colors">
                                    {brochure.category}
                                </p>
                                <p className="text-sm font-bold text-gray-900 truncate">
                                    {brochure.title}
                                </p>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                <div className="bg-[#007654] text-white p-2 rounded-lg shadow-lg">
                                    <Download size={14} />
                                </div>
                            </div>
                        </a>
                    </motion.div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-center">
                <Link href={`/${locale}/brochure`} onClick={onClose} className="w-full">
                    <Button className="w-full bg-[#dcfae7] hover:bg-[#c7f4d7] text-[#007654] font-bold rounded-xl shadow-none border-none">
                        All brochures
                    </Button>
                </Link>
            </div>
        </div>
    );
};
