import { Header } from "@/components/header"
import { TrustBadges } from "@/components/trust-badges"
import { HeroSection } from "@/components/hero-section"
import { ContentSection } from "@/components/content-section"
import { LastMinuteHolidays } from "@/components/last-minute-holidays"
import { ServicesSection } from "@/components/services-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { AboutSection } from "@/components/about-section"
import { DestinationsShowcase } from "@/components/destinations-showcase"
import { FloatingButtons } from "@/components/floating-buttons"
import { TrustpilotReviews } from "@/components/trustpilot-reviews"
import { CustomerTestimonial } from "@/components/customer-testimonial"
import { BlogSection } from "@/components/blog-section"
import { NewTouringHolidays } from "@/components/new-touring-holidays"
import { PopularDestinations } from "@/components/popular-destinations"
import { Footer } from "@/components/footer"
import { TourOverview } from "@/components/tour-overview"
import { TourDetails } from "@/components/tour-details"
import { Itinerary } from "@/components/itenerary"

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
