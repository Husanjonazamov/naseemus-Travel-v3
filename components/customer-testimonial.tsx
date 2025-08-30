import { Button } from "@/components/ui/button"

export function CustomerTestimonial() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-md mb-12">
          Explore More
        </Button>
      </div>

      <div className="bg-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-white">
            <p className="text-2xl md:text-3xl font-light leading-relaxed mb-8">
              "It was my first tour with Just you and I most certainly recommend them. From start to finish I felt I was
              well looked after and the itinerary was excellent."
            </p>
            <div className="w-16 h-0.5 bg-white mx-auto mb-6"></div>
            <cite className="text-xl font-medium">Anne</cite>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
