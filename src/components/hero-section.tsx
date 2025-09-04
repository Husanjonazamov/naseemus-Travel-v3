import Image from "next/image"
import { Search } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useTranslations } from "next-intl"


export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative w-full min-h-[350px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[550px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.webp"
          alt="Hero background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row items-center h-full">
          <div className="flex-1"></div>

          <div className="flex-1 lg:pl-12 mt-6 lg:mt-0 text-center lg:text-left">
            <div className="space-y-3 sm:space-y-4">
              <p className="text-orange-400 text-base sm:text-lg font-medium">
                {t("title")}
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-snug">
                {t("subtitle")}
              </h1>
              <p className="text-white text-sm sm:text-base md:text-lg max-w-md">
                {t("description")}
              </p>

              <Button className="bg-[#007654] hover:bg-[#006145] text-white px-5 sm:px-7 py-2 sm:py-3 rounded-full text-sm sm:text-base font-semibold shadow-lg transition-all duration-200 hover:shadow-xl mt-3">
                {t("cta")}
              </Button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-8 sm:mt-12 flex justify-center">
          <div className="relative w-full max-w-md sm:max-w-2xl">
            <Input
              type="text"
              placeholder={t("placeholder")}
              className="w-full h-12 pl-4 pr-12 text-base sm:text-lg border-none rounded-full shadow-lg focus:ring-2 focus:ring-[#007654] focus:outline-none"
            />
            {/* Search Icon */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#007654]">
              <Search className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
