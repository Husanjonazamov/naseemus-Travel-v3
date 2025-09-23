import { Button } from "./ui/button"
import { useTranslations } from "next-intl"

export function CustomerTestimonial() {
  const t = useTranslations("last")
  return (
    <section className="py-16 bg-[#dcfae7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Button className="bg-[#007654] text-xl font-bold hover:bg-[#007654] text-white px-8 py-6 rounded-md mb-12">
          {t("explore")}
        </Button>
      </div>

      <div className="bg-[#007654] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-white">
            <p className="text-2xl md:text-3xl font-light leading-relaxed mb-8">
             {t("testimonial")}
            </p>
            <div className="w-16 h-0.5 bg-[#dcfae7] mx-auto mb-6"></div>
            <cite className="text-xl font-medium">{t("author")}</cite>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
