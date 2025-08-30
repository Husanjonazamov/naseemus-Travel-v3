import { Button } from "@/components/ui/button"

export function NewsletterSection() {
  return (
    <section className="relative h-96 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RYSCuKKuWQxlMl8EAXfkJKh8CMrTDO.png')",
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 max-w-4xl mx-auto leading-tight">
          GET TRAVEL INSPIRATION & OFFERS TO YOUR INBOX
        </h2>
        <Button className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-3 text-lg font-semibold rounded-md transition-colors">
          Sign up to our newsletter
        </Button>
      </div>
    </section>
  )
}
