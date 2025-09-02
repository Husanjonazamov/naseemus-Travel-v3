"use client"

import { ArrowUp, MessageCircle } from "lucide-react"
import { Button } from "./ui/button"


export function FloatingButtons() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      {/* Chat Button */}
      <Button
        size="lg"
        className="bg-[#036044] hover:bg-[#007654] text-white rounded-full w-14 h-14 p-0 shadow-lg"
        aria-label="Chat support"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      {/* Top Button */}
      <Button
        onClick={scrollToTop}
        size="lg"
        className="bg-[#007654] hover:bg-[#007654] text-white rounded-full w-14 h-14 p-0 shadow-lg"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </Button>
    </div>
  )
}
