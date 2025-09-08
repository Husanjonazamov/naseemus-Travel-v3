import Image from "next/image";
import { Header } from "@/src/components/header";
import { TrustBadges } from "@/src/components/trust-badges";
import { PopularDestinations } from "@/src/components/popular-destinations";
import { NewTouringHolidays } from "@/src/components/new-touring-holidays";
import { Footer } from "@/src/components/footer";
import { Itinerary } from "@/src/components/itenerary";
import { TourOverview } from "@/src/components/tour-overview";
import { TourDetails } from "@/src/components/tour-details";

interface TourDetailProps {
  params: {
    id: string;
  };
}

export default function TourDetail({ params }: TourDetailProps) {
  // Demo ma'lumotlar (keyinchalik API'dan olib kelishingiz mumkin)
  const tour = {
    id: params.id,
    title: "Enjoy the Flavours of Croatia",
    sections: [
      {
        heading: "From the Land & Sea",
        content: `Meat dishes usually consist of a grilled or pan-fried chop or escalope of pork or veal.
        Lamb is prepared as a spit-roast and it's quite common to see a whole animal being roasted over an open fire
        outside a restaurant to lure in customers. A typical way to prepare meat in Istria and the Adriatic islands
        is to slow bake it under a *peka* – a metal lid that's covered with hot embers.`,
      },
      {
        heading: "Meat Specialties",
        content: `Stewed meat is less common, although goulash is sometimes served as a sauce with pasta,
        and the Dalmatian dish of *pasticada* – beef cooked in wine and prunes – is popular.
        Expect a huge choice of seafood dishes too, maybe try *gregada*, a peasant stew made with whitebait,
        potatoes and onions, or *riblja plata* – a sharing platter of fish and shellfish.`,
      },
      {
        heading: "Seafood Delights",
        content: `Seafood steals the show on the coast, with grilled squid (*lignje na žaru*),
        fresh octopus salad, and the iconic *crni rižot* (cuttlefish risotto).
        Don’t miss fish stews like *brudet* or salted cod (*bakalar*),
        and scampi, mussels, and clams sautéed in *buzara* – a garlicky, olive oil, parsley, and white wine broth.`,
      },
      {
        heading: "From the Vineyards",
        content: `Croatian wine has a long history dating back to Greek settlers in the 5th century BC.
        Today, the country produces delicious and complex wines across three main regions: Continental, Coastal, and Slavonia.`,
      },
      {
        heading: "Wine Heritage",
        content: `Famous varieties include whites like Malvazija Istarska and Pošip, alongside reds like Plavac Mali.
        Locals enjoy *gemišt* (white wine and mineral water) or *bevanda* (wine with still water).`,
      },
      {
        heading: "Conclusion",
        content: `Whether you’re savoring a lamb roast in Dalmatia, diving into a seafood *buzara* on the islands,
        or sipping a crisp Istrian white, Croatian cuisine offers a feast for the senses, rooted in tradition and ripe for exploration.`,
      },
    ],
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

      {/* Tour Description Section */}
      <section className="max-w-4xl mx-auto py-8 px-4">
        {tour.sections.map((section, index) => (
          <div key={index} className="mb-10">
            <h2 className="text-2xl text-green-700 font-bold mb-3">{section.heading}</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {section.content}
            </p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
