import Image from "next/image";
import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] overflow-hidden">
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
       <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/40 text-white py-8 px-4 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center items-center w-full max-w-7xl mx-auto">
          <span className="text-lg font-bold tracking-wide">
            {t("EXCLUSIVELY_FOR_SOLO_TRAVELLERS")}
          </span>
          <span className="text-4xl font-extrabold text-green-500">25</span>
          <span className="text-lg">{t("OVER_25_YEARS_EXPERTISE")}</span>
          <span className="text-lg">{t("YOUR_MONEY_PROTECTED")}</span>
          <span className="text-lg">{t("HOLIDAY_ASSURANCE_GUARANTEE")}</span>
          <span className="text-lg">{t("NO_SINGLE_SUPPLEMENT")}</span>
        </div>
      </div>
      </div>
    </section>
  );
}
