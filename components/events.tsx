"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, MapPin } from "lucide-react"

const events = [
  {
    id: 1,
    title: "Kathina Ceremony",
    date: "October 15, 2025",
    description: "Annual robe offering ceremony to the monastic community after the end of the rainy season retreat.",
    location: "Main Temple Hall",
    attendees: 120,
  },
  {
    id: 2,
    title: "Vipassana Meditation Retreat",
    date: "November 5-12, 2025",
    description: "7-day silent meditation retreat guided by Venerable Sayadaw U Nandisara.",
    location: "Meditation Center",
    attendees: 45,
  },
  {
    id: 3,
    title: "Buddha Jayanti Celebration",
    date: "May 26, 2025",
    description:
      "Celebration of Buddha's birth, enlightenment, and passing away with special ceremonies and offerings.",
    location: "Temple Grounds",
    attendees: 200,
  },
  {
    id: 4,
    title: "Dhamma Talk Series",
    date: "Every Sunday, 10:00 AM",
    description: "Weekly Dhamma talks by resident monks and visiting teachers on Buddhist philosophy and practice.",
    location: "Dhamma Hall",
    attendees: 60,
  },
]

export default function Events() {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)

  const toggleExpand = (id: number) => {
    setExpandedEvent(expandedEvent === id ? null : id)
  }

  return (
    <section id="events" className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-stone-800">Upcoming Events</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 pb-3">
                <CardTitle className="text-xl text-stone-800">{event.title}</CardTitle>
                <CardDescription className="flex items-center gap-1 text-amber-700">
                  <Calendar className="h-4 w-4" />
                  <span>{event.date}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <p className={`text-stone-700 ${expandedEvent === event.id ? "" : "line-clamp-2"}`}>
                  {event.description}
                </p>
                <div className="flex flex-wrap gap-4 mt-4 text-sm text-stone-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-amber-600" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-amber-600" />
                    <span>{event.attendees} expected attendees</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-3 flex justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpand(event.id)}
                  className="text-amber-700 hover:text-amber-800 hover:bg-amber-50 p-0"
                >
                  {expandedEvent === event.id ? "Show Less" : "Read More"}
                </Button>
                <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                  Register
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-50">
            View All Events
          </Button>
        </div>
      </div>
    </section>
  )
}
