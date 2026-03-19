import { DestinationGuidePage } from "@/src/components/destination-guide-page";
import { getDestinationBySlug } from "@/src/lib/destinations";

type PageProps = {
  params: Promise<{ locale: "en" | "ru" | "uz" }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const destination = getDestinationBySlug("tashkent");

  return {
    title: `${destination?.title || "Tashkent"} | Naseem's Travel`,
    description: destination?.preview[locale],
  };
}

export default async function TashkentPage({ params }: PageProps) {
  const { locale } = await params;
  const destination = getDestinationBySlug("tashkent");

  if (!destination) {
    throw new Error("Destination content missing for tashkent");
  }

  return <DestinationGuidePage locale={locale} destination={destination} />;
}
