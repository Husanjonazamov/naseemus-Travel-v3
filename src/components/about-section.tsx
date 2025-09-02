import { Play } from "lucide-react"

export function AboutSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#007654] text-center mb-12">
          HOLIDAYS THAT LET YOU BE JUST YOU
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              On a Just You holiday, you're free to enjoy the experience. We're dedicated solo travel experts so we'll
              take care of everything else.
            </p>
            <p>
              No worrying about where you have to be in the morning, or buying the right train ticket. It's time to just
              enjoy your chosen destination, relax and make friends with like-minded people.
            </p>
            <p>
              With 25 years of experience in escorted touring specifically for solo travellers, and a Holiday Director
              on hand to craft your perfect trip, you will be free to do whatever feels... Just You.
            </p>
          </div>

          {/* Embedded YouTube Video */}
          <div className="relative rounded-lg overflow-hidden shadow-lg h-80">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/P2eKSeWyfvE"
              title="Travel Inspiration Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
