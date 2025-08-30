import { Play } from "lucide-react"

export function AboutSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-700 text-center mb-12">
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

          {/* Video Thumbnail */}
          <div className="relative">
            <div
              className="relative rounded-lg overflow-hidden shadow-lg bg-cover bg-center h-80"
              style={{
                backgroundImage:
                  "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-p0ONHzeczwtfwIecuRo4udvdkl8HI4.png')",
              }}
            >
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-black/70 hover:bg-black/80 rounded-full p-4 transition-colors group">
                  <Play
                    className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform"
                    fill="currentColor"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
