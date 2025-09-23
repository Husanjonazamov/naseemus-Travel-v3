import { ChevronDown, ArrowUpDown } from "lucide-react"
import { Button } from "@/src/components/ui/button"

interface DepartureData {
  date: string
  airport: string
  originalPrice?: string
  currentPrice: string
  availability: "Available" | "Sold out"
}

const departureData: DepartureData[] = [
  {
    date: "Tue 6 Oct 2026",
    airport: "London Airport - Heathrow",
    originalPrice: "£3,449",
    currentPrice: "£3,299",
    availability: "Available",
  },
  {
    date: "Tue 1 Sept 2026",
    airport: "London Airport - Heathrow",
    originalPrice: "£3,449",
    currentPrice: "£3,299",
    availability: "Available",
  },
  {
    date: "Tue 12 May 2026",
    airport: "London Airport - Heathrow",
    originalPrice: "£3,449",
    currentPrice: "£3,299",
    availability: "Available",
  },
  {
    date: "Tue 7 Oct 2025",
    airport: "London Airport - Heathrow",
    currentPrice: "£3,299",
    availability: "Sold out",
  },
]

export function DepartureTable() {
  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-purple-600 mb-2 tracking-wide">
          DEPARTURE DATES AND PRICES
        </h1>
        <p className="text-lg text-foreground font-medium">All our departures are guaranteed</p>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-4 gap-4 p-4 bg-muted/30 border-b">
          <Button variant="ghost" className="justify-start text-purple-600 font-semibold hover:bg-transparent p-0">
            Date
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>

          <Button variant="ghost" className="justify-start text-foreground font-semibold hover:bg-transparent p-0">
            Airport
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </Button>

          <Button variant="ghost" className="justify-start text-purple-600 font-semibold hover:bg-transparent p-0">
            Price
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </Button>

          <div className="flex items-center justify-between">
            <span className="text-foreground font-semibold">Availability</span>
            <div className="w-8 h-4 bg-muted rounded-full relative">
              <div className="w-3 h-3 bg-[#dcfae7] rounded-full absolute top-0.5 right-0.5 shadow-sm"></div>
            </div>
          </div>
        </div>

        {/* Table Rows */}
        <div className="divide-y">
          {departureData.map((departure, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 p-4 hover:bg-muted/20 transition-colors">
              {/* Date */}
              <div className="text-foreground font-medium">{departure.date}</div>

              {/* Airport */}
              <div className="text-foreground">{departure.airport}</div>

              {/* Price */}
              <div className="flex items-center gap-2">
                {departure.originalPrice && (
                  <span className="text-muted-foreground line-through text-sm">{departure.originalPrice}</span>
                )}
                <span className="text-foreground font-semibold">{departure.currentPrice}</span>
              </div>

              {/* Availability */}
              <div className="flex items-center justify-between">
                <span
                  className={`font-medium ${
                    departure.availability === "Available" ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {departure.availability}
                </span>
                <ChevronDown className="h-4 w-4 text-purple-600" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
