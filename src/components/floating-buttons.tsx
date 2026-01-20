"use client"

import { useState } from "react"
import { ArrowUp, MessageCircle } from "lucide-react"
import { Button } from "./ui/button"
import { ChatBot } from "./ChatBot"

export function FloatingButtons() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      {/* Chat Bot Modal */}
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Chat Button */}
      <Button
        onClick={() => setIsChatOpen(!isChatOpen)}
        size="lg"
        className="bg-[#036044] hover:bg-[#007654] text-white rounded-full w-14 h-14 p-0 shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Chat support"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      {/* Top Button */}
      <Button
        onClick={scrollToTop}
        size="lg"
        className="bg-[#007654] hover:bg-[#007654] text-white rounded-full w-14 h-14 p-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px]"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </Button>
    </div>
  )
}
