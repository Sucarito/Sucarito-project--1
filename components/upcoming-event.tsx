import Link from "next/link"
import { CalendarDays } from "lucide-react"

interface UpcomingEventProps {
  title: string
  date: string
  image: string
}

export default function UpcomingEvent({ title, date, image }: UpcomingEventProps) {
  return (
    <Link
      href="/events"
      className="group block overflow-hidden relative bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h4 className="text-lg font-medium text-stone-800 mb-2 group-hover:text-amber-700 transition-colors">
          {title}
        </h4>
        <div className="flex items-center text-stone-600">
          <CalendarDays className="h-4 w-4 mr-2 text-amber-600" />
          <span className="text-sm">{date}</span>
        </div>
      </div>
    </Link>
  )
}
