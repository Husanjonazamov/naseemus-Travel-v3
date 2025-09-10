import Image from "next/image";
import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative w-full h-[280px] sm:h-[350px] md:h-[450px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/hero3.jpg"
        alt="Hero background"
        fill
        className="object-cover absolute inset-0"
        quality={90}
        priority
        sizes="100vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content Section */}
      <div className="relative z-20 w-full h-full flex flex-col justify-between">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center h-full">
          <div className="flex-1"></div>
        </div>

        {/* Custom Banner */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/40 text-white py-4 sm:py-6 md:py-8 px-3 sm:px-6 w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 text-center items-center w-full max-w-7xl mx-auto">
            <span className="text-sm sm:text-base md:text-lg font-bold tracking-wide">
              {t("EXCLUSIVELY_FOR_SOLO_TRAVELLERS")}
            </span>
            <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-green-500">
              25
            </span>
            <span className="text-sm sm:text-base md:text-lg">
              {t("OVER_25_YEARS_EXPERTISE")}
            </span>
            <span className="text-sm sm:text-base md:text-lg">
              {t("YOUR_MONEY_PROTECTED")}
            </span>
            <span className="text-sm sm:text-base md:text-lg">
              {t("HOLIDAY_ASSURANCE_GUARANTEE")}
            </span>
            <span className="text-sm sm:text-base md:text-lg">
              {t("NO_SINGLE_SUPPLEMENT")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
