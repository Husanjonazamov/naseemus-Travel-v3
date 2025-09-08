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
    description: `# Enjoy the Flavours of Croatia

For a small country, Croatia offers a vast range of cuisine, with dishes varying from region to region. Wherever your travels take you, local and seasonal specialties are sure to form a memorable part of your holiday, so here are some must-tries.

## From the Land & Sea

Meat dishes usually consist of a grilled or pan-fried chop or escalope of pork or veal. Lamb is prepared as a spit-roast and it's quite common to see a whole animal being roasted over an open fire outside a restaurant to lure in customers. A typical way to prepare meat in Istria and the Adriatic islands is to slow bake it under a *peka* – a metal lid that's covered with hot embers.

## Meat Specialties

Stewed meat is less common, although goulash is sometimes served as a sauce with pasta, and the Dalmatian dish of *pasticada* – beef cooked in wine and prunes – is popular. Occupying a great position along the Adriatic coastline, expect a huge choice of seafood dishes with through grilled, baked or pan-fried. Maybe try *gregada*, a peasant stew made with whitebait, potatoes and onions, or *riblja plata* – a sharing platter of fish and shellfish.

Croatian cuisine is a delightful mosaic shaped by its diverse regions, each offering a unique culinary identity. From the hearty mainland to the sun-kissed coast, Croatia’s food scene is a blend of ancient traditions and vibrant influences, perfect for food-loving travelers. Meat lovers will adore the grilled specialties like *ražnjiči* (skewers) and *janjetina* (roasted lamb, notably from Pag and Dalmatia), often slow-cooked *pod pekom* for that juicy, tender perfection. Veal shines in dishes like *Zagrebački odrezak* – veal steaks stuffed with ham and cheese, breaded and fried – while roasted suckling pig (*odojak*) is a mainland favorite, paired with *mlinci*, a flat pasta soaked in roast juices.

## Seafood Delights

Seafood steals the show on the coast, with grilled squid (*lignje na žaru*), fresh octopus salad, and the iconic *crni rižot* (cuttlefish risotto, inked black for dramatic flair). Don't miss fish stews like *brudet* (a flavorful mix of multiple fish types) or salted cod (*bakalar*) prepared white or red for festive feasts. Scampi, mussels, and clams sautéed in *buzara* – a garlicky, olive oil, parsley, and white wine broth – are coastal staples that capture the essence of the Adriatic.

## From the Vineyards

You may not have seen much of it here in the UK, but Croatian wine has a long history. It was the Greek settlers who first introduced vineyards to the country in the 5th century BC, and the delicious complex wines produced today probably rarely.

## Wine Heritage

Croatia’s wine heritage dates back centuries, divided into three main regions: Continental, Coastal (including islands), and Slavonia, boasting over 300 wine-producing areas. Istria, Konavle, and Pelješac are globally renowned, with events like Vinistra celebrating the craft. Famous varieties include the elegant whites like Malvazija Istarska from Istria and Pošip from Korčula, alongside robust reds such as Plavac Mali from Dalmatia – often compared to Zinfandel, its distant cousin. In Slavonia, try Graševina (Welschriesling) or the historic Ilok Traminac, once ordered for Queen Elizabeth II’s coronation.

Locals love mixing wines with water: *gemišt* (white wine and mineral water) in Hrvatsko Zagorje and Međimurje, or *bevanda* (wine and still water) in Dalmatia for a refreshing sip. Whether truffle-hunting in Istria's vineyards or toasting with a glass in Slavonia's cellars, pairing these wines with local dishes elevates every meal.

## Conclusion

Whether you’re savoring a lamb roast in Dalmatia, diving into a seafood *buzara* on the islands, or sipping a crisp Istrian white, Croatian cuisine offers a feast for the senses, rooted in tradition and ripe for exploration. Plan your trip to taste it all!`,
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

      {/* Tour Description Section - Markdown formatida ko'rsatish uchun */}
      <section className="max-w-4xl mx-auto py-8 px-4">
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: tour.description.replace(/<grok:.*?\/>/g, '') }} // Citationlarni olib tashlash
        />
      </section>

      {/* Qolgan komponentlar, masalan TourOverview, TourDetails va h.k. */}
      {/* <TourOverview tour={tour} /> */}
      {/* <TourDetails tour={tour} /> */}
      {/* <Itinerary /> */}
      {/* <Footer /> */}

      <Footer />
    </div>
  );
}