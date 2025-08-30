const holidays = [
  {
    id: 1,
    title: "BALKAN EXPLORER",
    description:
      "An in-depth exploration of four countries in an undiscovered corner of Europe. Visit cosmopolitan cities and travel through stunning natural landscapes. You will spend time in some of the most famous cities in Eastern Europe, all of them having lots of historical sites, vibrant bars and restaurants for you to explore.",
    image: "/classical-european-columns.png",
    features: [
      "Return flights from London",
      "12 nights in 4-star hotels",
      "20 meals: 12 breakfasts, 2 Lunches and 6 dinners, with a welcome drink",
      "Just You Holiday Director",
      "Overseas transfers, other transportation and porterage",
    ],
    duration: "13 days from",
    price: "£2,999",
  },
  {
    id: 2,
    title: "SWITZERLAND'S SCENIC RAILWAYS AND ALPINE WINTER WONDERS",
    description:
      "Embark on an unforgettable Swiss winter adventure, combining elegant rail journeys with breathtaking Alpine scenery.",
    image: "/swiss-mountain-train-snowy-landscape.png",
    features: [
      "Return flights from the UK",
      "6 nights in a 4-star hotel",
      "9 included meals: 6 breakfasts, 1 lunch and 2 dinners",
    ],
    duration: "7 days from",
    price: "£3,099",
  },
  {
    id: 3,
    title: "TURKISH TREASURES: FROM ISTANBUL'S PALACES TO CAPPADOCIA'S WONDERS",
    description:
      "Turkey dazzles your senses, from Istanbul's bustling Grand Bazaar with scents of spices to the incredible cave dwellings of Cappadocia and the shimmering tiles of the Blue Mosque – not to mention the delicious cuisine. This tour takes you on a tour of Istanbul and Cappadocia.",
    image: "/cappadocia-balloons.png",
    features: ["Return flights", "6 nights in 4-star hotels and 12 meals", "12 meals: 6 breakfasts and 6 dinners"],
    duration: "7 days from",
    price: "£1,899",
  },
]

export function NewTouringHolidays() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-600 mb-12">NEW SOLO TOURING HOLIDAYS</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {holidays.map((holiday) => (
            <div key={holiday.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-video">
                <img
                  src={holiday.image || "/placeholder.svg"}
                  alt={holiday.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-500 mb-4">{holiday.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-6">{holiday.description}</p>
                <ul className="space-y-2 mb-6">
                  {holiday.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-purple-600 font-medium">{holiday.duration}</p>
                      <p className="text-2xl font-bold text-gray-900">{holiday.price}</p>
                    </div>
                  </div>
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md font-medium transition-colors">
                    Explore
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
