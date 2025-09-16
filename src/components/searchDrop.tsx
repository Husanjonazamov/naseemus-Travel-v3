"use client";

import { useState, useEffect } from "react";
import { X, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useRouter } from "next/navigation";
import config from "../config";

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
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 🔎 Real-time search with debounce
  useEffect(() => {
    const fetchData = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(
          `${config.BASE_URL}/api/tour/search/?search=${encodeURIComponent(query)}`
        );
        const data = await res.json();

        // Nested data check
        const tours = data?.data?.data || data?.data || [];
        setResults(tours);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(fetchData, 400);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSelect = (slug: string) => {
    onClose();
    router.push(`/tour/${slug}`);
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center">
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Modal */}
      <Card className="relative flex flex-col w-full max-w-lg md:max-w-xl bg-white z-[2100] rounded-2xl shadow-2xl animate-in fade-in zoom-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Search</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5 text-gray-700" />
          </Button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4">
          {/* Search Input */}
          <div className="flex items-center border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-green-500">
            <Search className="h-5 w-5 text-gray-500 mr-3" />
            <input
              type="text"
              placeholder="Enter a destination..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full outline-none text-gray-800 font-medium placeholder-gray-400"
            />
          </div>

          {/* Results */}
          {loading && <p className="text-gray-500 text-sm">Searching...</p>}

          {!loading && results.length > 0 && (
            <ul className="max-h-64 overflow-y-auto space-y-2">
              {results.map((tour) => (
                <li
                  key={tour.id}
                  onClick={() => handleSelect(tour.slug)}
                  className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100 rounded-lg transition"
                >
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex flex-col justify-center">
                    <p className="font-medium text-gray-900 text-xl">{tour.title}</p>
                    <p className="text-md font-bold text-green-700">${tour.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {!loading && query.trim() && results.length === 0 && (
            <p className="text-gray-500 text-sm">No results found.</p>
          )}
        </div>
      </Card>
    </div>
  );
}
