import { Header } from "@/src/components/header"
import { TrustBadges } from "@/src/components/trust-badges"
import { HeroSection } from "@/src/components/hero-section"
import { ContentSection } from "@/src/components/content-section"
import LastMinuteHolidays from "@/src/components/last-minute-holidays"
import { ServicesSection } from "@/src/components/services-section"
import { NewsletterSection } from "@/src/components/newsletter-section"
import { AboutSection } from "@/src/components/about-section"
import NewHolidays from "@/src/components/destinations-showcase"
import { FloatingButtons } from "@/src/components/floating-buttons"
import { TrustpilotReviews } from "@/src/components/trustpilot-reviews"
import { CustomerTestimonial } from "@/src/components/customer-testimonial"
import { BlogSection } from "@/src/components/blog-section"
import { NewTouring } from "@/src/components/new-touring-holidays"
import { PopularDestinations } from "@/src/components/popular-destinations"
import { Footer } from "@/src/components/footer"
import { TourOverview } from "@/src/components/tour-overview"
import { Itinerary } from "@/src/components/itenerary"
import TabsHotel from "@/src/components/TabsHotel"
import SearchTours from "@/src/components/SearchTours"


export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <TrustBadges />
      <HeroSection />
      <SearchTours />
      <ContentSection />
      <LastMinuteHolidays />
      <ServicesSection />
      <NewsletterSection />
      <AboutSection />
      <NewHolidays />
      {/* <TrustpilotReviews /> */}
      <CustomerTestimonial />
      <BlogSection />
      <NewTouring />
      <PopularDestinations />
      <Footer />
      <FloatingButtons />
    </div>
  )
}
