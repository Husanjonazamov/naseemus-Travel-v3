"use client";

import { useState, useEffect, useRef } from "react";
import { X, Search, ArrowRight, MapPin } from "lucide-react";
import { Card } from "./ui/card";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import config from "../config";
import { motion } from "framer-motion";
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
        setResults(filtered.slice(0, 6));
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
    <div className="fixed inset-0 z-[100] flex items-start justify-center px-3 pt-16 sm:px-4 sm:pt-20 md:px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 cursor-pointer bg-black/40 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div
        initial={{ y: -20, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -20, opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-3xl"
      >
        <Card className="overflow-hidden rounded-[24px] border-white/20 bg-white/90 shadow-[0_32px_128px_-16px_rgba(0,0,0,0.3)] ring-1 ring-black/5 backdrop-blur-2xl">
          <div className="relative border-b border-black/5 p-4 sm:p-6">
            <div className="group relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Where would you like to go?"
                className="w-full rounded-2xl border-0 bg-black/5 py-3 pl-11 pr-11 text-base font-medium outline-none transition-all placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/20 sm:py-4 sm:pl-12 sm:pr-12 sm:text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={onClose}
                className="absolute right-4 top-1/2 rounded-full p-1.5 -translate-y-1/2 transition-colors hover:bg-black/5"
                type="button"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          <div className="max-h-[65vh] overflow-y-auto">
            {loading ? (
              <div className="p-8 text-center sm:p-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <p className="mt-4 font-medium text-muted-foreground">Searching for amazing tours...</p>
              </div>
            ) : searchTerm.length > 0 ? (
              <div className="p-3 sm:p-4">
                {results.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                    {results.map((tour, index) => (
                      <motion.div
                        key={tour.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group flex cursor-pointer items-start rounded-2xl border border-transparent p-3 transition-all hover:border-black/5 hover:bg-white/50"
                        onClick={() => handleResultClick(tour.slug)}
                      >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-20">
                          <Image
                            src={tour.image}
                            alt={tour.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-110"
                          />
                        </div>
                        <div className="ml-3 flex min-w-0 flex-1 flex-col justify-center overflow-hidden text-left sm:ml-4">
                          <h4 className="truncate font-bold leading-tight text-gray-900 transition-colors group-hover:text-primary">
                            {tour.title}
                          </h4>
                          <div className="mt-1.5 flex items-center text-xs font-medium text-muted-foreground">
                            <MapPin className="mr-1 h-3 w-3" />
                            <span className="truncate">Popular destination</span>
                          </div>
                          <div className="mt-2 text-sm font-bold text-primary">From {tour.price}</div>
                        </div>
                        <div className="ml-2 hidden self-center opacity-0 transition-opacity group-hover:opacity-100 sm:block">
                          <div className="rounded-full bg-primary/10 p-2 text-primary">
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center sm:p-12">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-black/5">
                      <Search className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">No results found</h3>
                    <p className="mx-auto mt-2 max-w-xs text-muted-foreground">
                      We couldn't find any tours matching "{searchTerm}". Try different keywords.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8">
                <p className="mb-6 px-2 text-xs font-bold tracking-wider text-muted-foreground">
                  Popular collections
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {["Cultural Tours", "Adventure", "Beach Holidays", "Luxury Stays", "City Breaks", "Nature"].map((cat) => (
                    <button
                      key={cat}
                      className="group flex items-center rounded-xl bg-black/5 p-3 text-left text-sm font-semibold transition-all hover:bg-primary/10 hover:text-primary"
                      type="button"
                    >
                      <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm transition-colors group-hover:bg-primary group-hover:text-white">
                        <MapPin className="h-4 w-4" />
                      </div>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-black/5 bg-muted/30 p-4">
            <div className="flex flex-col gap-3 px-2 text-[11px] font-bold tracking-tighter text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                <span className="flex items-center">
                  <kbd className="mr-1.5 rounded border bg-white px-1.5 py-0.5 text-[10px] shadow-sm">ESC</kbd>
                  to close
                </span>
                <span className="flex items-center">
                  <kbd className="mr-1.5 rounded border bg-white px-1.5 py-0.5 text-[10px] shadow-sm">Enter</kbd>
                  to select
                </span>
              </div>
              <span>Naseemus Travel search</span>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
