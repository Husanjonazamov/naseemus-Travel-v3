"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Users } from "lucide-react";
import { PopularDestinations } from "./popular-destinations";

interface SearchDropdownProps {
  onClose: () => void;
}

const months = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

export function SearchDropdown({ onClose }: SearchDropdownProps) {
  const currentYear = new Date().getFullYear();

  const [departure, setDeparture] = useState<{ month: string; year: number } | null>(null);
  const [returnDate, setReturnDate] = useState<{ month: string; year: number } | null>(null);
  const [passengers, setPassengers] = useState(1);

  const [showPicker, setShowPicker] = useState<"departure" | "return" | null>(null);
  const [year, setYear] = useState(currentYear);

  const handleSearch = () => {
    console.log({
      departure,
      returnDate,
      passengers,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center">
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/30 transition-opacity"
      />

      {/* Main modal */}
      <div className="relative flex flex-col h-full w-full max-w-lg md:max-w-2xl bg-white z-[2100] rounded-lg overflow-hidden shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Search Tours & Flights</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {/* Departure Date */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">Departure Date</label>
            <div
              className="flex items-center border rounded-lg px-3 py-2 cursor-pointer w-full hover:ring-1 hover:ring-green-500 transition"
              onClick={() => setShowPicker("departure")}
            >
              <span className="text-gray-700 truncate">
                {departure ? `${departure.month} ${departure.year}` : "Select Date"}
              </span>
            </div>
          </div>

          {/* Return Date */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">Return Date</label>
            <div
              className="flex items-center border rounded-lg px-3 py-2 cursor-pointer w-full hover:ring-1 hover:ring-green-500 transition"
              onClick={() => setShowPicker("return")}
            >
              <span className="text-gray-700 truncate">
                {returnDate ? `${returnDate.month} ${returnDate.year}` : "Select Date"}
              </span>
            </div>
          </div>

          {/* Passengers */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">Passengers</label>
            <div className="flex items-center border rounded-lg px-3 py-2 w-full">
              <Users className="h-5 w-5 text-gray-500 mr-2" />
              <input
                type="number"
                min={1}
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                className="w-full outline-none text-gray-700"
              />
            </div>
          </div>

          {/* Popular Destinations */}
          <div className="w-full">
            <PopularDestinations />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t">
          <button
            onClick={handleSearch}
            className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Search Now
          </button>
        </div>
      </div>

      {/* Custom Date Picker */}
      {showPicker && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-[3000] p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xs md:max-w-sm p-4">
            {/* Year Controls */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setYear(year - 1)}
                className="p-2 rounded hover:bg-gray-100 transition"
              >
                <ChevronLeft className="h-5 w-5 text-gray-700" />
              </button>
              <span className="font-semibold text-lg">{year}</span>
              <button
                onClick={() => setYear(year + 1)}
                className="p-2 rounded hover:bg-gray-100 transition"
              >
                <ChevronRight className="h-5 w-5 text-gray-700" />
              </button>
            </div>

            {/* Month Grid */}
            <div className="grid grid-cols-3 gap-3">
              {months.map((month) => (
                <button
                  key={month}
                  onClick={() => {
                    if (showPicker === "departure") setDeparture({ month, year });
                    else setReturnDate({ month, year });
                    setShowPicker(null);
                  }}
                  className="px-3 py-2 rounded-lg border hover:bg-green-50 truncate transition"
                >
                  {month}
                </button>
              ))}
            </div>

            {/* Cancel Button */}
            <div className="mt-4 text-right">
              <button
                onClick={() => setShowPicker(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
