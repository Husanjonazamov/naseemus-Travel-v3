import { Facebook, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">CONTACT US</h3>
            <div className="space-y-4">
              <p className="text-gray-700">03301 737293</p>
              <p className="text-gray-700">enquiries@justyou.co.uk</p>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">FOLLOW US</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">INFORMATION</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">
                  Booking Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">
                  Essential Information
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">
                  Package Travel Information
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">
                  Foreign Travel Advice
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">
                  Brexit Travel Advice
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">
                  Modern Slavery Statement
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">
                  Animal Welfare Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">
                  Website Disclaimer
                </a>
              </li>
            </ul>

            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">CORPORATE</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">
                    Travelsphere
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">
                    Trade Agent Hub
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">CUSTOMER SUPPORT</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Sign Up */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">NEWSLETTER SIGN UP</h3>
            <div className="flex gap-2">
              <Input type="email" placeholder="Email address" className="flex-1" />
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6">Sign Up</Button>
            </div>
          </div>
        </div>

        {/* Award Badges */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex justify-center items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">WINNER</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">WINNER</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">WINNER</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">WINNER</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
