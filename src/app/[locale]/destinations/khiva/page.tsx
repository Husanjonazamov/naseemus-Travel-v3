import { DestinationGuidePage } from "@/src/components/destination-guide-page";
import { getDestinationBySlug } from "@/src/lib/destinations";

type PageProps = {
  params: Promise<{ locale: "en" | "ru" | "uz" }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const destination = getDestinationBySlug("khiva");

  return {
    title: `${destination?.title || "Khiva"} | Naseem's Travel`,
    description: destination?.preview[locale],
  };
}

export default async function KhivaPage({ params }: PageProps) {
  const { locale } = await params;
  const destination = getDestinationBySlug("khiva");

  if (!destination) {
    throw new Error("Destination content missing for khiva");
  }

  return <DestinationGuidePage locale={locale} destination={destination} />;
}
