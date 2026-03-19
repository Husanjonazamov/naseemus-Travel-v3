import { Footer } from "@/src/components/footer";
import { Header } from "@/src/components/header";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#fbfbf9]">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-4xl font-black text-[#1a1a1a]">Privacy policy</h1>
        <div className="space-y-6 text-gray-600">
          <p>
            We collect the contact details you submit through this website so we can respond to
            enquiries, manage bookings, and provide travel support.
          </p>
          <p>
            We do not sell your personal data. Information may be shared with trusted travel
            suppliers only when it is necessary to arrange your trip.
          </p>
          <p>
            To request access to or removal of your data, contact{" "}
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
