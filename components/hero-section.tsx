import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[400px] sm:min-h-[500px]">
      {/* Background Image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      ></div>
      <div className="absolute inset-0 bg-black/30 z-0"></div> {/* gradient overlay, matn oson o‘qiladi */}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row items-center h-full">
          {/* Left side can be removed */}
          <div className="flex-1"></div>

          {/* Right side - Content */}
          <div className="flex-1 lg:pl-12 mt-8 lg:mt-0 text-center lg:text-left">
            <div className="space-y-6">
              <div>
                <p className="text-orange-400 text-lg font-medium mb-2">Even more</p>
                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Summer
                  <br />
                  Savings
                </h1>
                <p className="text-white text-base mt-2">Book before end August 2025</p>
              </div>

              <div className="relative inline-block">
                <Button className="bg-[#007654] hover:bg-[#007654] text-white px-6 py-2 rounded-full text-lg font-semibold shadow-lg transition-all duration-200 hover:shadow-xl">
                  SAVE NOW
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 max-w-2xl mx-auto relative z-10">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Where would you like to go?"
                  className="w-full h-10 sm:h-12 text-base sm:text-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <Button className="bg-[#007654] hover:bg-[#007654] text-white px-6 sm:px-8 h-10 sm:h-12 rounded-md transition-colors">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
