import { Header } from "@/src/components/header"
import { TrustBadges } from "@/src/components/trust-badges"
import { HeroSection } from "@/src/components/hero-section"
import { ServicesSection } from "@/src/components/services-section"
import { NewsletterSection } from "@/src/components/newsletter-section"
import { DestinationCitiesSection } from "@/src/components/destination-cities-section"
import { UzbekistanVideosSection } from "@/src/components/uzbekistan-videos-section"
import { HomepageToursSection } from "@/src/components/homepage-tours-section"
import SearchTours from "@/src/components/SearchTours"
import { FloatingButtons } from "@/src/components/floating-buttons"
import { CustomerTestimonial } from "@/src/components/customer-testimonial"
import { Footer } from "@/src/components/footer"
import { CompanyInfo } from "@/src/components/company-info"
import { HomepagePhotoGallery } from "@/src/components/homepage-photo-gallery"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#dcfae7]">
      <Header />
      <TrustBadges />
      <HeroSection />
      <CompanyInfo />
      <DestinationCitiesSection />
      <UzbekistanVideosSection />
      <HomepageToursSection />
      <SearchTours />
      <ServicesSection />
      <NewsletterSection />
      <CustomerTestimonial />
      <HomepagePhotoGallery />
      <Footer />
      <FloatingButtons />
    </div>
  )
}
