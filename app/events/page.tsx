import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Events - Burmese Vihar Bodhgaya",
  description:
    "Explore upcoming Buddhist ceremonies, meditation retreats, and cultural events at Burmese Vihar Bodhgaya.",
}

const upcomingEvents = [
  {
    id: "kathina-ceremony",
    title: "Kathina Ceremony",
    date: "October 15, 2025",
    time: "7:00 AM - 2:00 PM",
    location: "Main Temple Hall",
    attendees: 120,
    category: "ceremony",
    description:
      "Annual robe offering ceremony to the monastic community after the end of the rainy season retreat. This auspicious event features traditional chanting, almsgiving, and a shared communal meal.",
    image: "/placeholder.svg?height=600&width=800&query=buddhist%20ceremony%20with%20monks%20and%20offerings",
  },
  {
    id: "vipassana-retreat",
    title: "Vipassana Meditation Retreat",
    date: "November 5-12, 2025",
    time: "Full day, 7 days",
    location: "Meditation Center",
    attendees: 45,
    category: "retreat",
    description:
      "7-day silent meditation retreat guided by Venerable Sayadaw U Nandisara. This intensive retreat will focus on the practice of Vipassana (insight) meditation, with daily instruction, group sittings, and personal guidance.",
    image: "/placeholder.svg?height=600&width=800&query=meditation%20retreat%20group%20session",
  },
  {
    id: "buddha-jayanti",
    title: "Buddha Jayanti Celebration",
    date: "May 26, 2025",
    time: "5:00 AM - 9:00 PM",
    location: "Temple Grounds",
    attendees: 200,
    category: "ceremony",
    description:
      "Celebration of Buddha's birth, enlightenment, and passing away with special ceremonies and offerings. The day includes dawn circumambulation of the Bodhi tree, special puja ceremonies, Dhamma talks, and a candlelight procession.",
    image: "/placeholder.svg?height=600&width=800&query=buddhist%20vesak%20celebration%20with%20lanterns",
  },
  {
    id: "dhamma-talks",
    title: "Dhamma Talk Series",
    date: "Every Sunday, 10:00 AM",
    time: "10:00 AM - 11:30 AM",
    location: "Dhamma Hall",
    attendees: 60,
    category: "teaching",
    description:
      "Weekly Dhamma talks by resident monks and visiting teachers on Buddhist philosophy and practice. Each session includes a 45-minute talk followed by Q&A and guided meditation.",
    image: "/placeholder.svg?height=600&width=800&query=buddhist%20monk%20giving%20teaching",
  },
  {
    id: "pali-language",
    title: "Introduction to Pali Language",
    date: "June 1-30, 2025",
    time: "3:00 PM - 4:30 PM (Mon, Wed, Fri)",
    location: "Library",
    attendees: 25,
    category: "course",
    description:
      "A month-long introduction to the Pali language, the original language of the Theravada Buddhist scriptures. This course will cover basic grammar, vocabulary, and simple translations relevant to meditation practice.",
    image: "/placeholder.svg?height=600&width=800&query=ancient%20pali%20buddhist%20texts%20study",
  },
  {
    id: "full-moon-ceremony",
    title: "Full Moon Observance Day",
    date: "Monthly on Full Moon Days",
    time: "6:00 AM - 8:00 PM",
    location: "Main Temple",
    attendees: 80,
    category: "ceremony",
    description:
      "Monthly observance of the Uposatha (Buddhist sabbath) on full moon days. Activities include taking the Eight Precepts, meditation, Dhamma discussions, and a communal vegetarian meal at midday.",
    image: "/placeholder.svg?height=600&width=800&query=buddhist%20full%20moon%20ceremony",
  },
  {
    id: "meditation-workshop",
    title: "Metta Meditation Workshop",
    date: "July 15-16, 2025",
    time: "9:00 AM - 4:00 PM",
    location: "Meditation Hall",
    attendees: 35,
    category: "workshop",
    description:
      "A weekend workshop on loving-kindness (Metta) meditation, teaching techniques to develop compassion and goodwill toward all beings. Suitable for beginners and experienced meditators alike.",
    image: "/placeholder.svg?height=600&width=800&query=metta%20meditation%20workshop",
  },
  {
    id: "cultural-exchange",
    title: "Burmese-Indian Cultural Exchange",
    date: "August 10, 2025",
    time: "2:00 PM - 8:00 PM",
    location: "Community Hall",
    attendees: 150,
    category: "cultural",
    description:
      "A day celebrating the cultural ties between Burma (Myanmar) and India through traditional music, dance, food, and art. Features performances by local artists and visiting performers from Myanmar.",
    image: "/placeholder.svg?height=600&width=800&query=burmese%20indian%20cultural%20performance",
  },
]

export default function EventsPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pb-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center brightness-[0.85] z-0"
          style={{
            backgroundImage:
              "url('/placeholder.svg?height=800&width=1600&query=buddhist%20ceremony%20with%20lanterns%20at%20night')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/40" />

        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white mb-6 tracking-wide">
              Events & Programs
            </h1>
            <div className="h-px w-32 bg-amber-500 mb-8"></div>
            <p className="text-xl text-white/80 max-w-2xl">
              Join us for ceremonies, retreats, and educational programs that connect you with Buddhist traditions and
              practice.
            </p>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="all" className="mb-12">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <h2 className="text-3xl md:text-4xl font-serif font-light text-stone-800">Upcoming Events</h2>

              <TabsList className="bg-stone-100">
                <TabsTrigger value="all" className="data-[state=active]:bg-amber-600 data-[state=active]:text-white">
                  All Events
                </TabsTrigger>
                <TabsTrigger
                  value="ceremony"
                  className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                >
                  Ceremonies
                </TabsTrigger>
                <TabsTrigger
                  value="retreat"
                  className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                >
                  Retreats
                </TabsTrigger>
                <TabsTrigger
                  value="teaching"
                  className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                >
                  Teachings
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ceremony" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8">
                {upcomingEvents
                  .filter((event) => event.category === "ceremony")
                  .map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="retreat" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8">
                {upcomingEvents
                  .filter((event) => event.category === "retreat")
                  .map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="teaching" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8">
                {upcomingEvents
                  .filter((event) => event.category === "teaching")
                  .map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-20 bg-stone-50">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-stone-800 mb-6">Annual Calendar</h2>
            <div className="h-px w-20 bg-amber-500 mx-auto mb-8"></div>
            <p className="text-stone-700">
              Our monastery follows the traditional Buddhist calendar, with regular ceremonies on full moon and new moon
              days, as well as special annual events.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Annual Calendar Items */}
            <div className="bg-white p-6 shadow-md">
              <h3 className="text-xl font-medium text-stone-800 mb-4">January-February (Tabodwe)</h3>
              <ul className="space-y-3">
                <li className="flex">
                  <div className="w-3 h-3 bg-amber-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                  <div>
                    <span className="font-medium">Htamane Festival</span> - Special offering of sticky rice with coconut
                  </div>
                </li>
                <li className="flex">
                  <div className="w-3 h-3 bg-amber-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                  <div>
                    <span className="font-medium">Full Moon Observance Days</span> - Special meditation sessions and
                    Dhamma talks
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 shadow-md">
              <h3 className="text-xl font-medium text-stone-800 mb-4">March-April (Tabaung-Tagu)</h3>
              <ul className="space-y-3">
                <li className="flex">
                  <div className="w-3 h-3 bg-amber-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                  <div>
                    <span className="font-medium">Water Festival & Burmese New Year</span> - Traditional celebrations
                    with water blessings
                  </div>
                </li>
                <li className="flex">
                  <div className="w-3 h-3 bg-amber-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                  <div>
                    <span className="font-medium">Special Dana offerings</span> - Community almsgiving to monks
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 shadow-md">
              <h3 className="text-xl font-medium text-stone-800 mb-4">May (Kason)</h3>
              <ul className="space-y-3">
                <li className="flex">
                  <div className="w-3 h-3 bg-amber-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                  <div>
                    <span className="font-medium">Buddha Jayanti (Vesak)</span> - Celebration of Buddha's birth,
                    enlightenment, and passing
                  </div>
                </li>
                <li className="flex">
                  <div className="w-3 h-3 bg-amber-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                  <div>
                    <span className="font-medium">Bodhi Tree watering ceremony</span> - Special ritual honoring the
                    sacred Bodhi tree
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 shadow-md">
              <h3 className="text-xl font-medium text-stone-800 mb-4">July-October (Waso-Thadingyut)</h3>
              <ul className="space-y-3">
                <li className="flex">
                  <div className="w-3 h-3 bg-amber-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                  <div>
                    <span className="font-medium">Buddhist Lent (Vassa)</span> - Three-month rainy season retreat for
                    monks
                  </div>
                </li>
                <li className="flex">
                  <div className="w-3 h-3 bg-amber-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                  <div>
                    <span className="font-medium">End of Buddhist Lent</span> - Festival of Lights celebration
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 shadow-md">
              <h3 className="text-xl font-medium text-stone-800 mb-4">October-November (Tazaungmon)</h3>
              <ul className="space-y-3">
                <li className="flex">
                  <div className="w-3 h-3 bg-amber-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                  <div>
                    <span className="font-medium">Kathina Ceremony</span> - Annual robe offering to monks after the
                    rainy season retreat
                  </div>
                </li>
                <li className="flex">
                  <div className="w-3 h-3 bg-amber-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                  <div>
                    <span className="font-medium">Tazaungdaing Festival</span> - Festival of lights with special
                    offerings
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 shadow-md">
              <h3 className="text-xl font-medium text-stone-800 mb-4">December (Nadaw)</h3>
              <ul className="space-y-3">
                <li className="flex">
                  <div className="w-3 h-3 bg-amber-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                  <div>
                    <span className="font-medium">Year-end Meditation Retreat</span> - Special intensive meditation
                    program
                  </div>
                </li>
                <li className="flex">
                  <div className="w-3 h-3 bg-amber-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                  <div>
                    <span className="font-medium">New Year's Eve Blessing</span> - Special ceremony for the coming year
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-amber-50">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-stone-800 mb-6">Join Our Events</h2>
            <div className="h-px w-20 bg-amber-500 mx-auto mb-8"></div>
            <p className="text-stone-700 mb-10">
              Interested in attending our events or retreats? Contact us for registration information or to learn about
              accommodation options for extended programs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 rounded-none px-8">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-amber-600 text-amber-700 hover:bg-amber-50 rounded-none px-8"
              >
                <Link href="/visit">Plan Your Visit</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  attendees: number
  category: string
  description: string
  image: string
}

function EventCard({ event }: { event: Event }) {
  return (
    <div className="bg-white border border-stone-100 shadow-md overflow-hidden flex flex-col">
      <div className="relative h-60 overflow-hidden">
        <img
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-amber-600 text-white text-xs uppercase tracking-wider py-1 px-3">
          {event.category}
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col">
        <h3 className="text-xl font-medium text-stone-800 mb-3">{event.title}</h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-stone-600">
            <Calendar className="h-4 w-4 mr-2 text-amber-600 flex-shrink-0" />
            <span className="text-sm">{event.date}</span>
          </div>

          <div className="flex items-center text-stone-600">
            <Clock className="h-4 w-4 mr-2 text-amber-600 flex-shrink-0" />
            <span className="text-sm">{event.time}</span>
          </div>

          <div className="flex items-center text-stone-600">
            <MapPin className="h-4 w-4 mr-2 text-amber-600 flex-shrink-0" />
            <span className="text-sm">{event.location}</span>
          </div>

          <div className="flex items-center text-stone-600">
            <Users className="h-4 w-4 mr-2 text-amber-600 flex-shrink-0" />
            <span className="text-sm">{event.attendees} expected attendees</span>
          </div>
        </div>

        <p className="text-stone-700 text-sm line-clamp-3 mb-6">{event.description}</p>

        <div className="mt-auto">
          <Button asChild variant="outline" className="w-full border-amber-600 text-amber-700 hover:bg-amber-50 group">
            <Link href={`/events/${event.id}`} className="flex items-center justify-center">
              View Details
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
