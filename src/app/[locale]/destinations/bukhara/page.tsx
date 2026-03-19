import { DestinationGuidePage } from "@/src/components/destination-guide-page";
import { getDestinationBySlug } from "@/src/lib/destinations";

type PageProps = {
  params: Promise<{ locale: "en" | "ru" | "uz" }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const destination = getDestinationBySlug("bukhara");

  return {
    title: `${destination?.title || "Bukhara"} | Naseem's Travel`,
    description: destination?.preview[locale],
  };
}

export default async function BukharaPage({ params }: PageProps) {
  const { locale } = await params;
  const destination = getDestinationBySlug("bukhara");

  if (!destination) {
    throw new Error("Destination content missing for bukhara");
  }

  return <DestinationGuidePage locale={locale} destination={destination} />;
}
