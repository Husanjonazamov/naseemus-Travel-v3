import React, { useState } from "react";

export const TourDrop = () => {
  const categories = [
    {
      title: "O'zbekiston",
      tours: ["Toshkent Safari", "Buxoro Tarixi", "Samarqand Marvarid", "Xiva Sarguzasht"]
    },
    {
      title: "Yevropa",
      tours: ["Paris Sightseeing", "Rome Historical Tour", "London Adventure", "Berlin City Tour"]
    },
    {
      title: "Osiyo",
      tours: ["Bangkok Temples", "Tokyo Highlights", "Seoul Modern Tour", "Bali Paradise"]
    }
  ];

  // Mobil accordion uchun state
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleCategory = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null); // yopish
    } else {
      setOpenIndex(index); // ochish
    }
  };

  return (
    <div className="p-4 w-full max-w-md md:max-w-2xl bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-[400px] overflow-y-auto">
      <div className="flex flex-col md:flex-row md:gap-8">
        {categories.map((cat, index) => (
          <div key={cat.title} className="flex-1 min-w-0 mb-4 md:mb-0">
            {/* Sarlavha */}
            <h3
              className="text-green-700 font-semibold mb-2 border-b border-gray-200 pb-1 cursor-pointer md:cursor-default sticky top-0 bg-white z-10"
              onClick={() => toggleCategory(index)}
            >
              {cat.title}
            </h3>

            {/* Desktopda hamma ochiq, mobilda accordion */}
            <ul
              className={`flex flex-col gap-1 overflow-hidden transition-max-height duration-300 ease-in-out
              ${
                // Desktopda hamma ochiq
                "md:max-h-full md:flex"
              } 
              ${
                // Mobilda faqat ochilgan category
                openIndex === index
                  ? "max-h-[500px]" // ochilgan
                  : "max-h-0" // yopilgan
              }`}
            >
              {cat.tours.map((tour) => (
                <li key={tour}>
                  <a
                    href="#"
                    className="block px-2 py-1 rounded hover:bg-green-100 hover:text-green-700 transition-colors"
                  >
                    {tour}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
