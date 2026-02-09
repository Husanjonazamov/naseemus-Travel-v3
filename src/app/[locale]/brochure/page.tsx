import { Header } from "@/src/components/header";
import { Footer } from "@/src/components/footer";
import { useTranslations } from "next-intl";

export const dynamic = "force-dynamic";

type BrochurePageProps = {
  params: { locale: string };
};

export default function BrochurePage({ params }: BrochurePageProps) {
  const t = useTranslations("content_section");

  return (
    <div className="min-h-screen bg-[#dcfae7]">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t("tour_title")} {/* из JSON */}
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {t("default_description")}
          </p>
        </div>

        {/* Здесь пока пустой контент */}
      </main>

      <Footer />
    </div>
  );
}

// Загружаем переводы для каждой локали
export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }, { locale: "uz" }];
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const messages = (await import(`../../locales/${params.locale}.json`))
    .default;
  return { title: messages.content_section.tour_title };
}
