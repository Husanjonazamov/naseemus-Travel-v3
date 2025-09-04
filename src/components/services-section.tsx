import { Plane, Bed, Coffee, Headphones, Globe } from "lucide-react";
import { useTranslations } from "next-intl";

export function ServicesSection() {
  const t = useTranslations("service");

  const services = [
    {
      icon: Plane,
      title: t("flights"),
      description: t("return_flights"),
    },
    {
      icon: Bed,
      title: t("hotels"),
      description: t("hand_picked_hotels"),
    },
    {
      icon: Coffee,
      title: t("breakfasts"),
      description: t("breakfast_together"),
    },
    {
      icon: Headphones,
      title: t("holiday_directors"),
      description: t("experienced_tour_guide"),
    },
    {
      icon: Globe,
      title: t("holiday_assurance"),
      description: t("support_every_step"),
    },
  ];

  return (
    <section className="bg-[#CCE9DF] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#007654] text-center mb-12">
          {t("we_take_care_of")}
        </h2>

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
