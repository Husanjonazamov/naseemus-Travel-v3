import { Button } from "@/components/ui/button"

const destinations = [
  {
    id: 1,
    title: "SOLO HOLIDAYS TO CROATIA",
    description:
      "Croatia has that little bit of everything. From fascinating historical stories to age-old culture traditions and the picturesque coastal cities of Split and Dubrovnik to the elegant islands of Hvar, Brac, and Zlarin. For a solo holiday that ticks so many boxes, Croatia never fails to delight.",
    image: "/croatian-coast.png",
    buttonText: "Explore Now",
  },
  {
    id: 2,
    title: "SOLO HOLIDAYS TO ITALY",
    description:
      "Italy is renowned for its beauty and charm and it offers the perfect setting for singles holidays and solo tours. Those fortunate enough to visit this captivating country receive a warm welcome and are instantly enamoured by its magnificent cities, historical sites, and breathtaking natural landmarks.",
    image: "/placeholder-s144y.png",
    buttonText: "Explore More",
  },
  {
    id: 3,
    title: "SOLO HOLIDAYS TO SOUTH AFRICA",
    description:
      "Explore and experience everything South Africa has to offer to solo travellers. With its diverse landscapes, iconic sights, scenic routes and thrilling wildlife encounters, South Africa provides an unforgettable destination for a solo adventure.",
    image: "/african-elephant-safari.png",
    buttonText: "Explore More",
  },
]

export function PopularDestinations() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-600 mb-12">
          MOST POPULAR SOLO TRAVEL DESTINATIONS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <div key={destination.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-video">
                <img
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-500 mb-4">{destination.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-6">{destination.description}</p>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md">
                  {destination.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
