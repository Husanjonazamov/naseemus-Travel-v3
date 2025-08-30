import { Search, Phone, FileText, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-white">
      {/* Top bar with contact info */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 text-sm">
            <div className="flex items-center space-x-6">
              <button className="flex items-center space-x-2 text-gray-700 hover:text-purple-700 transition-colors">
                <FileText className="h-4 w-4" />
                <span>Brochure Request</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-700 hover:text-purple-700 transition-colors">
                <Search className="h-4 w-4" />
                <span>Search</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-700">
                <Phone className="h-4 w-4" />
                <span className="font-medium">03301 737293</span>
              </div>
              <button className="flex items-center space-x-1 text-gray-700 hover:text-purple-700 transition-colors">
                <span>Opening times</span>
                <ChevronDown className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main header with logo and navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-purple-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">jy</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-purple-700">just you</h1>
                <p className="text-xs text-gray-600">solo adventures together</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#" className="text-gray-900 hover:text-purple-700 font-medium transition-colors">
              DESTINATIONS
            </a>
            <a href="#" className="text-gray-900 hover:text-purple-700 font-medium transition-colors">
              EXPERIENCES
            </a>
            <a href="#" className="text-gray-900 hover:text-purple-700 font-medium transition-colors">
              SOLO TRAVEL STORIES
            </a>
            <a href="#" className="text-gray-900 hover:text-purple-700 font-medium transition-colors">
              OFFERS
            </a>
            <a href="#" className="text-gray-900 hover:text-purple-700 font-medium transition-colors">
              WHY JUST YOU ?
            </a>
            <a href="#" className="text-gray-900 hover:text-purple-700 font-medium transition-colors">
              COMMUNITY
            </a>
          </nav>

          {/* My Account Button */}
          <Button className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-md font-medium transition-colors">
            My Account
          </Button>
        </div>
      </div>
    </header>
  )
}
