import { Button } from "./ui/button"

export function TourDetails() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#007654] mb-4">UZBEKISTAN & THE SILK ROAD</h1>
        <div className="flex items-center justify-center gap-8 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#007654]">£2399</div>
            <div className="text-sm text-gray-600">per person</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#007654]">11 Days</div>
            <div className="text-sm text-gray-600">duration</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-[#007654]">Sept 2025 - Oct 2026</div>
            <div className="text-sm text-gray-600">departure dates</div>
          </div>
          <Button className="bg-[#007654] hover:bg-[#006148] text-white px-8 py-3">
            Book now
          </Button>
        </div>

        <div className="flex justify-center gap-8 border-b">
          <button className="pb-2 border-b-2 border-[#007654] text-[#007654] font-semibold">
            DISCOVER
          </button>
          <button className="pb-2 text-gray-600 hover:text-[#007654]">
            ITINERARY
          </button>
          <button className="pb-2 text-gray-600 hover:text-[#007654]">
            ACCOMMODATION
          </button>
          <button className="pb-2 text-gray-600 hover:text-[#007654]">
            REVIEWS
          </button>
          <button className="pb-2 text-gray-600 hover:text-[#007654]">
            OPTIONAL EXCURSIONS
          </button>
          <button className="pb-2 text-gray-600 hover:text-[#007654]">
            DATES
          </button>
        </div>
      </div>
    </div>
  )
}
