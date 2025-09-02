import { Header } from "@/src/components/header"
import { TrustBadges } from "@/src/components/trust-badges"
import { HeroSection } from "@/src/components/hero-section"
import { ContentSection } from "@/src/components/content-section"
import LastMinuteHolidays from "@/src/components/last-minute-holidays"
import { ServicesSection } from "@/src/components/services-section"
import { NewsletterSection } from "@/src/components/newsletter-section"
import { AboutSection } from "@/src/components/about-section"
import DestinationsShowcase from "@/src/components/destinations-showcase"
import { FloatingButtons } from "@/src/components/floating-buttons"
import { TrustpilotReviews } from "@/src/components/trustpilot-reviews"
import { CustomerTestimonial } from "@/src/components/customer-testimonial"
import { BlogSection } from "@/src/components/blog-section"
import { NewTouringHolidays } from "@/src/components/new-touring-holidays"
import { PopularDestinations } from "@/src/components/popular-destinations"
import { Footer } from "@/src/components/footer"
import { TourOverview } from "@/src/components/tour-overview"
import { TourDetails } from "@/src/components/tour-details"
import { Itinerary } from "@/src/components/itenerary"


export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <TrustBadges />
      <HeroSection />
      <TourDetails />
      <TourOverview />
      <Itinerary />
      <ContentSection />
      <LastMinuteHolidays />
      <ServicesSection />
      <NewsletterSection />
      <AboutSection />
      <DestinationsShowcase />
      <TrustpilotReviews />
      <CustomerTestimonial />
      <BlogSection />
      <NewTouringHolidays />
      <PopularDestinations />
      <Footer />
      <FloatingButtons />
    </div>
  )
}
