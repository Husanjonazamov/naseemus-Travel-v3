import { Facebook, Instagram } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useTranslations } from "next-intl"

export function Footer() {
  const t = useTranslations("footer")

  return (
    <footer className="bg-white border-t border-gray-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">{t("customer_support.contact_us")}</h3>
            <div className="space-y-4">
              <p className="text-gray-700">{t("contact.phone")}</p>
              <p className="text-gray-700">{t("contact.email")}</p>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">{t("customer_support.follow_us")}</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-[#007654] transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-[#007654] transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">{t("customer_support.information")}</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-700 hover:text-[#007654] transition-colors">{t("links.booking_conditions")}</a></li>
              <li><a href="#" className="text-gray-700 hover:text-[#007654] transition-colors">{t("links.essential_information")}</a></li>
              <li><a href="#" className="text-gray-700 hover:text-[#007654] transition-colors">{t("links.package_travel")}</a></li>
              <li><a href="#" className="text-gray-700 hover:text-[#007654] transition-colors">{t("links.foreign_travel_advice")}</a></li>
              <li><a href="#" className="text-gray-700 hover:text-[#007654] transition-colors">{t("links.brexit_travel_advice")}</a></li>
              <li><a href="#" className="text-gray-700 hover:text-[#007654] transition-colors">{t("links.modern_slavery_statement")}</a></li>
              <li><a href="#" className="text-gray-700 hover:text-[#007654] transition-colors">{t("links.animal_welfare_policy")}</a></li>
              <li><a href="#" className="text-gray-700 hover:text-[#007654] transition-colors">{t("links.website_disclaimer")}</a></li>
            </ul>

            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">{t("customer_support.corporate_title")}</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-700 hover:text-[#007654] transition-colors">{t("corporate.travelsphere")}</a></li>
                <li><a href="#" className="text-gray-700 hover:text-[#007654] transition-colors">{t("corporate.careers")}</a></li>
                <li><a href="#" className="text-gray-700 hover:text-[#007654] transition-colors">{t("corporate.trade_agent_hub")}</a></li>
              </ul>
            </div>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">{t("customer_support_title")}</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-700 hover:text-[#007654] transition-colors">{t("customer_support.about_us")}</a></li>
              <li><a href="#" className="text-gray-700 hover:text-[#007654] transition-colors">{t("customer_support.contact_us")}</a></li>
              <li><a href="#" className="text-gray-700 hover:text-[#007654] transition-colors">{t("customer_support.community")}</a></li>
              <li><a href="#" className="text-gray-700 hover:text-[#007654] transition-colors">{t("customer_support.faq")}</a></li>
            </ul>
          </div>

          {/* Newsletter Sign Up */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">{t("newsletter.title")}</h3>
            <div className="flex gap-2">
              <Input 
                  type="phone" 
                  placeholder={t("contact.phone_pl")} 
                  className="flex-1" 
                />
              <Button className="bg-[#007654] hover:bg-[#006644] text-white px-6">
                {t("newsletter.cta")}
              </Button>
            </div>
          </div>
        </div>

        {/* Award Badges */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex justify-center items-center space-x-8">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <div className="w-16 h-16 bg-[#007654] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">WINNER</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
