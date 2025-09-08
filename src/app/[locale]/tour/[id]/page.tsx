import Image from "next/image";
import { Header } from "@/src/components/header";
import { TrustBadges } from "@/src/components/trust-badges";
import { PopularDestinations } from "@/src/components/popular-destinations";
import { NewTouringHolidays } from "@/src/components/new-touring-holidays";
import { Footer } from "@/src/components/footer";
import { Itinerary } from "@/src/components/itenerary";
import { TourOverview } from "@/src/components/tour-overview";
import { TourDetails } from "@/src/components/tour-details";
import TourPage from "../TourDetail";

interface TourDetailProps {
  params: {
    id: string;
  };
}

export default function TourDetail({ params }: TourDetailProps) {
  // Demo ma'lumotlar (keyinchalik API'dan olib kelishingiz mumkin)
  const tour = {
    id: params.id,
    title: "Paris Tour",
    description:
      "Parij bo‘ylab 7 kunlik sayohat. Eyfel minorasi, Luvr muzeyi va boshqa mashhur joylarni ko‘rasiz.",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200",
  };

  return (
    <div className="w-full overflow-x-hidden"> {/* Yon scrollni to‘liq yo‘qotadi */}
      {/* Header */}
      <Header />
      <TrustBadges />

      {/* Hero Section */}
      <section className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover absolute inset-0"
          quality={90}
          priority
          sizes="100vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Title */}
        <div className="relative z-20 flex items-center justify-center h-full px-4">
          <h1 className="text-3xl sm:text-5xl font-bold text-white drop-shadow-lg text-center break-words">
            {tour.title}
          </h1>
        </div>

        {/* Custom Banner Info */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/40 text-white py-4 px-2 sm:px-4">
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 max-w-7xl mx-auto text-center">
            <span className="text-sm sm:text-base md:text-lg font-bold tracking-wide">
              EXCLUSIVELY FOR SOLO TRAVELLERS
            </span>
            <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-green-500">
              25
            </span>
            <span className="text-sm sm:text-base md:text-lg">
              Over 25 Years Expertise
            </span>
            <span className="text-sm sm:text-base md:text-lg">
              Your Money is 100% Protected
            </span>
            <span className="text-sm sm:text-base md:text-lg">
              Holiday Assurance Guarantee
            </span>
            <span className="text-sm sm:text-base md:text-lg">
              No Single Supplement
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <TourDetails />
      <TourOverview />
      <TourPage />

      <Itinerary />
      <PopularDestinations />
      <NewTouringHolidays />
      <Footer />
    </div>
  );
}
