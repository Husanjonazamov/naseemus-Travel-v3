import { Bed, Star } from "lucide-react"

export function TrustBadges() {
  return (
    <div className="bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-4 space-y-4 md:space-y-0">
          {/* Room guarantee */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-pink-100 rounded flex items-center justify-center">
              <Bed className="h-5 w-5 text-pink-600" />
            </div>
            <span className="text-sm font-medium text-gray-900">ROOM OF YOUR OWN GUARANTEED</span>
          </div>

          {/* Trustpilot rating */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-pink-100 rounded flex items-center justify-center">
              <Star className="h-5 w-5 text-pink-600 fill-current" />
            </div>
            <span className="text-sm font-medium text-gray-900">RATED EXCELLENT ON TRUSTPILOT</span>
          </div>

          {/* Experience */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
              <span className="text-lg font-bold text-purple-700">25</span>
            </div>
            <span className="text-sm font-medium text-gray-900">OVER 25 YEARS EXPERTISE</span>
          </div>
        </div>
      </div>
    </div>
  )
}
