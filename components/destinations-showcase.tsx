export function DestinationsShowcase() {
  const destinations = [
    {
      title: "BALKAN EXPLORER",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FlBDU5J7tdystnoa07MCKsYxgtfkxM.png",
      description:
        "An in-depth exploration of four countries in an undiscovered corner of Europe. Visit cosmopolitan cities and travel through stunning natural landscapes. You will spend time in some of the most famous cities in Eastern Europe, all of them having lots of historical sites, vibrant bars and restaurants for you to explore.",
      features: [
        "Return flights from London",
        "12 nights in 4-star hotels",
        "20 meals: 12 breakfasts, 2 Lunches and 6 dinners, with a welcome drink",
        "Just You Holiday Director",
      ],
    },
    {
      title: "SWITZERLAND'S SCENIC RAILWAYS AND ALPINE WINTER WONDERS",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FlBDU5J7tdystnoa07MCKsYxgtfkxM.png",
      description:
        "Embark on an unforgettable Swiss winter adventure, combining elegant rail journeys with breathtaking Alpine scenery.",
      features: [
        "Return flights from the UK",
        "6 nights in a 4-star hotel",
        "9 included meals: 6 breakfasts, 1 lunch and 2 dinners",
      ],
    },
    {
      title: "TURKISH TREASURES: FROM ISTANBUL'S PALACES TO CAPPADOCIA'S WONDERS",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FlBDU5J7tdystnoa07MCKsYxgtfkxM.png",
      description:
        "Turkey dazzles your senses, from Istanbul's bustling Grand Bazaar with scents of spices to the incredible cave dwellings of Cappadocia and the shimmering tiles of the Blue Mosque – not to mention the delicious cuisine. This tour takes you on a tour of Istanbul and Cappadocia.",
      features: ["Return flights", "6 nights in a 4-star hotel and 12 meals"],
    },
  ]

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Image */}
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('${destination.image}')` }}></div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-600 mb-4">{destination.title}</h3>

                <p className="text-gray-700 text-sm mb-4 leading-relaxed">{destination.description}</p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {destination.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-sm text-gray-700">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
