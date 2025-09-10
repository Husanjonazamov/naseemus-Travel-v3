import { Plane, Bed, Coffee, Headphones, Globe } from "lucide-react";
import { useTranslations } from "next-intl";

export function ServicesSection() {
  const t = useTranslations("service");

  const services = [
    {
      icon: Plane,
      title: t("flights"), // Parvozlar
      description: t("return_flights"), // Qaytish parvozi
    },
    {
      icon: Bed,
      title: t("hotels"), // Mehmonxonalar
      description: t("hand_picked_hotels"), // Tanlab olingan mehmonxonalar
    },
    {
      icon: Coffee,
      title: t("breakfasts"), // Nonushtalar
      description: t("breakfast_together"), // Birgalikda nonushta
    },
    {
      icon: Headphones,
      title: t("holiday_directors"), // Yo‘lboshchilar
      description: t("experienced_tour_guide"), // Tajribali yo‘lboshchi
    },
    {
      icon: Globe,
      title: t("holiday_assurance"), // Sayohat kafolati
      description: t("support_every_step"), // Har bosqichda yordam
    },
  ];

  return (
    <section className="bg-[#CCE9DF] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Sarlavha */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#007654] text-center mb-12">
          {t("we_take_care_of")} {/* Biz g‘amxo‘rlik qilamiz */}
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <IconComponent className="w-16 h-16 text-[#007654] stroke-[1.5]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
