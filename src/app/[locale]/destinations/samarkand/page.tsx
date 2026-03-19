import { DestinationGuidePage } from "@/src/components/destination-guide-page";
import { getDestinationBySlug } from "@/src/lib/destinations";

type PageProps = {
  params: Promise<{ locale: "en" | "ru" | "uz" }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const destination = getDestinationBySlug("samarkand");

  return {
    title: `${destination?.title || "Samarkand"} | Naseem's Travel`,
    description: destination?.preview[locale],
  };
}

export default async function SamarkandPage({ params }: PageProps) {
  const { locale } = await params;
  const destination = getDestinationBySlug("samarkand");

  if (!destination) {
    throw new Error("Destination content missing for samarkand");
  }

  return <DestinationGuidePage locale={locale} destination={destination} />;
}
