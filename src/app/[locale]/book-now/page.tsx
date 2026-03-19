import { TrustBadges } from "@/src/components/trust-badges"

import { FloatingButtons } from "@/src/components/floating-buttons"

import { Footer } from "@/src/components/footer"
import { Button } from "@/src/components/ui/button"
import { Header } from "@/src/components/header"
import Link from "next/link"

type BookNowPageProps = {
  params: { locale: string };
}

export default function BookNowPage({ params }: BookNowPageProps) {
  const locale = params.locale;

  return (
    <div className="min-h-screen bg-[#dcfae7]">
      <Header />
      <TrustBadges />

      {/* Main Content */}
      <main className="py-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-8">Last minute solo holidays</h1>

          <div className="max-w-4xl mx-auto space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              Discover your perfect last minute solo adventure with Naseem's travel. Browse our range of last minute holidays
              below and discover our best offers on solo escorted package deals.
            </p>

            <p>
              Whether you're planning a spontaneous escape or considering a quick getaway in the coming months, our
              tours offer unparalleled value and unique experiences.
            </p>
          </div>
        </section>

        {/* Holidays by Month Section */}
        <section className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-700 text-center mb-12">Holidays by month</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* August Card */}
            <div className="bg-[#dcfae7] rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-64">
                <img
                  src="/traditional-dancers-lake-mountains.png"
                  alt="August destinations - Traditional dancers with mountain lake backdrop"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <h3 className="text-white text-3xl font-bold">August</h3>
                </div>
              </div>
              <div className="p-6">
                <Link href={`/${locale}/tour`} className="block">
                  <Button className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 text-lg font-semibold">
                    View Tours
                  </Button>
                </Link>
              </div>
            </div>

            {/* September Card */}
            <div className="bg-[#dcfae7] rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-64">
                <img
                  src="/placeholder-qm5lf.png"
                  alt="September destinations - Mediterranean coastal town with blue domes"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <h3 className="text-white text-3xl font-bold">September</h3>
                </div>
              </div>
              <div className="p-6">
                <Link href={`/${locale}/tour`} className="block">
                  <Button className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 text-lg font-semibold">
                    View Tours
                  </Button>
                </Link>
              </div>
            </div>

            {/* October Card */}
            <div className="bg-[#dcfae7] rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-64">
                <img
                  src="/japanese-hillside-town-fuji.png"
                  alt="October destinations - Japanese town with Mount Fuji"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <h3 className="text-white text-3xl font-bold">October</h3>
                </div>
              </div>
              <div className="p-6">
                <Link href={`/${locale}/tour`} className="block">
                  <Button className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 text-lg font-semibold">
                    View Tours
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingButtons />
    </div>
  )
}
