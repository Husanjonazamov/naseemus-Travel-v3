import { Plane, Bed, Coffee, Headphones, Globe } from "lucide-react"

export function ServicesSection() {
  const services = [
    {
      icon: Plane,
      title: "Flights",
      description: "Return flights",
    },
    {
      icon: Bed,
      title: "Hotels",
      description: "Hand-picked hotels",
    },
    {
      icon: Coffee,
      title: "Breakfasts",
      description: "Breakfast together every day",
    },
    {
      icon: Headphones,
      title: "Holiday Directors",
      description: "Experienced tour guide accompanying you",
    },
    {
      icon: Globe,
      title: "Holiday Assurance",
      description: "Here to support you every step of the way",
    },
  ]

  return (
    <section className="bg-purple-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-700 text-center mb-12">WE TAKE CARE OF</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <IconComponent className="w-16 h-16 text-purple-600 stroke-[1.5]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
