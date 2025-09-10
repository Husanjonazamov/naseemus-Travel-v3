"use client";

import { useState } from "react";
import { X, Users, ChevronLeft, ChevronRight } from "lucide-react";
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
        className="absolute inset-0 bg-black/30"
      />

      {/* Main modal */}
      <div className="relative flex flex-col h-full w-full bg-white z-[2100]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Search Tours & Flights</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition relative z-[2200]"
          >
            <X className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Departure date */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Departure Date
            </label>
            <div
              className="flex items-center border rounded-lg px-3 py-2 cursor-pointer"
              onClick={() => setShowPicker("departure")}
            >
              <span className="text-gray-700">
                {departure ? `${departure.month} ${departure.year}` : "Select Date"}
              </span>
            </div>
          </div>

          {/* Return date */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Return Date
            </label>
            <div
              className="flex items-center border rounded-lg px-3 py-2 cursor-pointer"
              onClick={() => setShowPicker("return")}
            >
              <span className="text-gray-700">
                {returnDate ? `${returnDate.month} ${returnDate.year}` : "Select Date"}
              </span>
            </div>
          </div>

          {/* Passengers */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Passengers
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <Users className="h-5 w-5 text-gray-500 mr-2" />
              <input
                type="number"
                min={1}
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                className="flex-1 outline-none"
              />
            </div>
          </div>

          <PopularDestinations />
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
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-[3000]">
          <div className="bg-white rounded-xl shadow-xl w-80 p-4">
            {/* Header Year Controls */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setYear(year - 1)}
                className="p-2 rounded hover:bg-gray-100"
              >
                <ChevronLeft className="h-5 w-5 text-gray-700" />
              </button>
              <span className="font-semibold text-lg">{year}</span>
              <button
                onClick={() => setYear(year + 1)}
                className="p-2 rounded hover:bg-gray-100"
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
                    if (showPicker === "departure") {
                      setDeparture({ month, year });
                    } else {
                      setReturnDate({ month, year });
                    }
                    setShowPicker(null);
                  }}
                  className="px-3 py-2 rounded-lg border hover:bg-green-50"
                >
                  {month}
                </button>
              ))}
            </div>

            {/* Cancel Button */}
            <div className="mt-4 text-right">
              <button
                onClick={() => setShowPicker(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
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
