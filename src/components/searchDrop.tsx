"use client";

import { useState, useEffect, useRef } from "react";
import { X, Search, ArrowRight, MapPin } from "lucide-react";
import { Card } from "./ui/card";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import config from "../config";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface SearchDropdownProps {
  onClose: () => void;
}

interface Tour {
  id: number;
  title: string;
  slug: string;
  image: string;
  price: string;
}

export function SearchDropdown({ onClose }: SearchDropdownProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    const fetchTours = async () => {
      if (searchTerm.length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`${config.BASE_URL}/api/tour/`);
        const data = await response.json();
        const tours = data?.data?.results || data?.data || data || [];
        const filtered = tours.filter((tour: Tour) =>
          tour.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setResults(filtered.slice(0, 6)); // Show top 6 results
      } catch (error) {
        console.error("Error fetching tours:", error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchTours();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleResultClick = (slug: string) => {
    router.push(`/${locale}/tour/${slug}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 md:px-6">
      {/* Glassmorphic Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      />

      <motion.div
        initial={{ y: -20, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -20, opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-3xl"
      >
        <Card className="overflow-hidden border-white/20 bg-white/90 backdrop-blur-2xl shadow-[0_32px_128px_-16px_rgba(0,0,0,0.3)] ring-1 ring-black/5 rounded-[24px]">
          {/* Search Input Section */}
          <div className="relative p-6 border-b border-black/5">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary h-5 w-5" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Where would you like to go?"
                className="w-full bg-black/5 border-0 focus:ring-2 focus:ring-primary/20 rounded-2xl py-4 pl-12 pr-12 text-lg font-medium outline-none transition-all placeholder:text-muted-foreground/60"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={onClose}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-black/5 transition-colors"
                type="button"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="max-h-[60vh] overflow-y-auto">
            {loading ? (
              <div className="p-12 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
                <p className="mt-4 text-muted-foreground font-medium">Searching for amazing tours...</p>
              </div>
            ) : searchTerm.length > 0 ? (
              <div className="p-4">
                {results.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.map((tour, index) => (
                      <motion.div
                        key={tour.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group flex p-3 rounded-2xl border border-transparent hover:border-black/5 hover:bg-white/50 transition-all cursor-pointer"
                        onClick={() => handleResultClick(tour.slug)}
                      >
                        <div className="relative h-20 w-20 rounded-xl overflow-hidden flex-shrink-0">
                          <Image
                            src={tour.image}
                            alt={tour.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-110"
                          />
                        </div>
                        <div className="ml-4 flex flex-col justify-center overflow-hidden text-left">
                          <h4 className="font-bold text-gray-900 leading-tight truncate group-hover:text-primary transition-colors">
                            {tour.title}
                          </h4>
                          <div className="flex items-center mt-1.5 text-xs text-muted-foreground font-medium">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span className="truncate">Popular Destination</span>
                          </div>
                          <div className="mt-2 text-sm font-bold text-primary">
                            From {tour.price}
                          </div>
                        </div>
                        <div className="ml-auto self-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="p-2 rounded-full bg-primary/10 text-primary">
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <div className="bg-black/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">No results found</h3>
                    <p className="text-muted-foreground max-w-xs mx-auto mt-2">
                      We couldn't find any tours matching "{searchTerm}". Try different keywords.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-6 px-2">Popular Collections</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {["Cultural Tours", "Adventure", "Beach Holidays", "Luxury Stays", "City Breaks", "Nature"].map((cat) => (
                    <button
                      key={cat}
                      className="flex items-center p-3 rounded-xl bg-black/5 hover:bg-primary/10 hover:text-primary transition-all text-sm font-semibold text-left group"
                      type="button"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center mr-3 group-hover:bg-primary group-hover:text-white transition-colors">
                        <MapPin className="h-4 w-4" />
                      </div>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-muted/30 border-t border-black/5">
            <div className="flex items-center justify-between text-[11px] font-bold text-muted-foreground uppercase tracking-tighter px-2">
              <div className="flex gap-4">
                <span className="flex items-center"><kbd className="bg-white border text-[10px] px-1.5 py-0.5 rounded mr-1.5 shadow-sm">ESC</kbd> to close</span>
                <span className="flex items-center"><kbd className="bg-white border text-[10px] px-1.5 py-0.5 rounded mr-1.5 shadow-sm">↵</kbd> to select</span>
              </div>
              <span>Naseemus Travel Search</span>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
