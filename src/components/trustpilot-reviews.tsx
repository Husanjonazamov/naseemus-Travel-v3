"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "./ui/button"
import { useTranslations } from "next-intl"

const reviews = [
  {
    id: 1,
    rating: 5,
    title: "We were very well looked after ...",
    content: "We were very well looked after by lodge staff & guides so Naseemus travel rep on this one",
    author: "customer",
    date: "1 day ago",
    verified: true,
  },
  {
    id: 2,
    rating: 5,
    title: "A fantastic holiday with beautif...",
    content: "A fantastic holiday with beautiful country Croatia and extremely friendly people and...",
    author: "Nigel Wood",
    date: "5 days ago",
    verified: true,
  },
  {
    id: 3,
    rating: 5,
    title: "Excellent tour",
    content: "Excellent tour. Ship amazing & crew so friendly. Every port was worth visiting. Great...",
    author: "Sandra",
    date: "August 11",
    verified: true,
  },
  {
    id: 4,
    rating: 5,
    title: "More Than Once in a Lifetime!",
    content: "The entire experience, from booking to picking my luggage at the end of the trip, was...",
    author: "Maggie",
    date: "August 8",
    verified: true,
  },
]

export function TrustpilotReviews() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const visibleReviews = [
    reviews[currentIndex],
    reviews[(currentIndex + 1) % reviews.length],
    reviews[(currentIndex + 2) % reviews.length],
    reviews[(currentIndex + 3) % reviews.length],
  ]

  return (
    <section className="py-16 bg-[#dcfae7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevReview}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#dcfae7] shadow-md hover:bg-[#dcfae7]"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-12">
            {visibleReviews.map((review, index) => (
              <div key={`${review.id}-${index}`} className="bg-[#dcfae7] p-6 rounded-lg shadow-sm border">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                     <Star
                      key={i}
                      className="h-4 w-4 text-[#007654]" // text-color SVG ichida fill rangini oladi
                    />
                    ))}
                  </div>
                  {review.verified && (
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <div className="w-4 h-4 bg-[#007654] rounded-full flex items-center justify-center">
                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span>Verified</span>
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{review.title}</h3>
                <p className="text-gray-700 text-sm mb-4">{review.content}</p>
                <div className="text-sm text-gray-500">
                  <span className="font-medium">{review.author}</span>, {review.date}
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextReview}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#dcfae7] shadow-md hover:bg-[#dcfae7]"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <div className="text-center mt-8">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <span>
              Rated <strong>4.6 / 5</strong> based on <strong>2,390 reviews</strong>. Showing our 5 star reviews.
            </span>
          </div>
          <div className="flex items-center justify-center mt-2">
            <Star className="h-5 w-5 fill-green-500 text-[#007654] mr-2" />
            <span className="font-semibold text-[#007654]">Trustpilot</span>
          </div>
        </div>
      </div>
    </section>
  )
}
