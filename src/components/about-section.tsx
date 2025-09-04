import { Play } from "lucide-react";
import { useTranslations } from "next-intl";

export function AboutSection() {
  const t = useTranslations("about");

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#007654] text-center mb-12">
          {t("title")}
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>{t("paragraph1")}</p>
            <p>{t("paragraph2")}</p>
            <p>{t("paragraph3")}</p>
          </div>

          {/* Embedded YouTube Video */}
          <div className="relative rounded-lg overflow-hidden shadow-lg h-80">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/P2eKSeWyfvE"
              title="Travel Inspiration Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
