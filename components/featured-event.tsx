import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react"

interface FeaturedEventProps {
  title: string
  date: string
  description: string
  image: string
  location: string
  time: string
}

export default function FeaturedEvent({ title, date, description, image, location, time }: FeaturedEventProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-8 overflow-hidden bg-white">
      <div className="relative overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover aspect-video lg:aspect-auto lg:h-full transition-transform duration-700 hover:scale-105"
        />
      </div>

      <div className="p-8 flex flex-col">
        <h3 className="text-2xl md:text-3xl font-serif font-light text-stone-800 mb-3">{title}</h3>
        <div className="h-px w-20 bg-amber-500 mb-6"></div>

        <div className="flex items-center text-amber-700 mb-2">
          <Calendar className="h-4 w-4 mr-2" />
          <span className="text-sm">{date}</span>
        </div>

        <div className="flex items-center text-stone-600 mb-2">
          <Clock className="h-4 w-4 mr-2" />
          <span className="text-sm">{time}</span>
        </div>

        <div className="flex items-center text-stone-600 mb-6">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-sm">{location}</span>
        </div>

        <p className="text-stone-700 leading-relaxed mb-8 flex-grow">{description}</p>

        <div className="mt-auto">
          <Button asChild className="bg-amber-600 hover:bg-amber-700 rounded-none">
            <Link href="/events/kathina-ceremony" className="flex items-center">
              Learn More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
