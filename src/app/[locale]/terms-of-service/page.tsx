import { Footer } from "@/src/components/footer";
import { Header } from "@/src/components/header";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#fbfbf9]">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-4xl font-black text-[#1a1a1a]">Terms of service</h1>
        <div className="space-y-6 text-gray-600">
          <p>
            All travel arrangements are subject to availability, confirmation, supplier rules, and
            the final booking details provided to you by Naseem&apos;s Travel.
          </p>
          <p>
            Prices, itineraries, and inclusions may change before a booking is confirmed. Any
            cancellation or amendment request will be handled according to the terms shared for
            your package.
          </p>
          <p>
            For support with an existing booking, contact{" "}
            <a className="font-bold text-[#007654]" href="mailto:naseemstravel@gmail.com">
              naseemstravel@gmail.com
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
