import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "About Us - Burmese Vihar Bodhgaya",
  description:
    "Learn about the history, mission, and traditions of Burmese Vihar, a historic Buddhist monastery in Bodhgaya.",
}

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pb-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center brightness-[0.85] z-0"
          style={{
            backgroundImage:
              "url('/placeholder.svg?height=800&width=1600&query=buddhist%20temple%20architecture%20panorama')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/40" />

        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white mb-6 tracking-wide">
              Our Story
            </h1>
            <div className="h-px w-32 bg-amber-500 mb-8"></div>
            <p className="text-xl text-white/80 max-w-2xl">
              A historic sanctuary of Burmese Buddhist traditions in the sacred land where the Buddha attained
              enlightenment.
            </p>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-light text-stone-800 mb-6">Our Heritage</h2>
              <div className="h-px w-20 bg-amber-500 mb-8"></div>

              <p className="text-stone-700 mb-6 leading-relaxed">
                The Burmese Vihar in Bodhgaya is a historic Buddhist monastery established in 1936 under the leadership
                of Venerable U Dhammetsara, the first abbot appointed by Burmese Buddhist authorities. Located near the
                Mahabodhi Temple, it is one of the earliest monasteries on the original road from Gaya to Bodhgaya,
                serving as a spiritual hub for Burmese pilgrims and international visitors.
              </p>

              <p className="text-stone-700 mb-6 leading-relaxed">
                For decades, our monastery has been a sanctuary for those seeking to deepen their practice in the sacred
                land where the Buddha attained enlightenment. The temple's architecture reflects traditional Burmese
                design elements, creating a space that connects visitors to the rich cultural heritage of Myanmar.
              </p>

              <p className="text-stone-700 leading-relaxed">
                Throughout its history, Burmese Vihar has maintained close ties with the Burmese Buddhist community
                while welcoming practitioners from all traditions and backgrounds, embodying the universal values of
                compassion, wisdom, and peace that lie at the heart of the Buddha's teachings.
              </p>
            </div>

            <div className="relative">
              <div className="bg-white p-3 shadow-lg">
                <img
                  src="/placeholder.svg?height=600&width=800&query=historic%20burmese%20buddhist%20monastery%20vintage%20photo"
                  alt="Historic photo of Burmese Vihar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-amber-50 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-stone-50">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-stone-800 mb-6">Our Mission</h2>
            <div className="h-px w-20 bg-amber-500 mx-auto mb-8"></div>
            <p className="text-stone-700 leading-relaxed">
              Burmese Vihar is committed to preserving and sharing the ancient wisdom of Theravada Buddhism, providing a
              sanctuary for meditation and study, and serving as a cultural bridge between Myanmar and the global
              community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-stone-800 mb-4">Preserve Tradition</h3>
              <p className="text-stone-700">
                Maintain and share the authentic teachings of Theravada Buddhism through meditation facilities, study
                resources, and pilgrimage support.
              </p>
            </div>

            <div className="bg-white p-8 shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-stone-800 mb-4">Foster Global Exchange</h3>
              <p className="text-stone-700">
                Provide hospitality to pilgrims, scholars, and practitioners from Myanmar, the West, and beyond to
                promote intercultural understanding.
              </p>
            </div>

            <div className="bg-white p-8 shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-stone-800 mb-4">Advocate Equality</h3>
              <p className="text-stone-700">
                Continue the legacy of supporting Bhikkhuni ordinations and women's spiritual leadership in the Buddhist
                tradition.
              </p>
            </div>

            <div className="bg-white p-8 shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-stone-800 mb-4">Serve the Community</h3>
              <p className="text-stone-700">
                Support interfaith initiatives and social programs like the Prajna Vihar School and relief efforts for
                local families.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-stone-800 mb-6">
              Historical Timeline and Leadership
            </h2>
            <div className="h-px w-20 bg-amber-500 mx-auto mb-8"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-amber-200 transform md:translate-x-0.5"></div>

              {/* Timeline entries */}
              <div className="space-y-12">
                <div className="relative grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                  <div className="md:text-right order-2 md:order-1">
                    <h3 className="text-xl font-medium text-stone-800 mb-2">1936–1943</h3>
                    <p className="text-stone-700">
                      Founded by Abbot U Dhammetsara, marking the vihar's early years as a pilgrimage rest house for
                      Burmese devotees.
                    </p>
                  </div>
                  <div className="relative order-1 md:order-2">
                    <div className="absolute top-0 left-0 md:left-0 w-8 h-8 bg-amber-500 rounded-full transform -translate-x-1/2 md:-translate-x-full"></div>
                    <img
                      src="/placeholder.svg?height=300&width=400&query=1930s%20buddhist%20monk%20portrait%20vintage"
                      alt="Abbot U Dhammetsara"
                      className="rounded md:ml-8"
                    />
                  </div>
                </div>

                <div className="relative grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                  <div className="relative">
                    <div className="absolute top-0 left-0 md:right-0 w-8 h-8 bg-amber-500 rounded-full transform -translate-x-1/2 md:translate-x-1/2"></div>
                    <img
                      src="/placeholder.svg?height=300&width=400&query=1950s%20buddhist%20monastery%20burmese%20vintage"
                      alt="Burmese Vihar in the 1950s"
                      className="rounded md:mr-8"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-stone-800 mb-2">1943–1966</h3>
                    <p className="text-stone-700">
                      Abbot U Otiama oversaw the monastery through challenging times, maintaining its role in supporting
                      Theravada practice and expanding its facilities.
                    </p>
                  </div>
                </div>

                <div className="relative grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                  <div className="md:text-right order-2 md:order-1">
                    <h3 className="text-xl font-medium text-stone-800 mb-2">1966–1976</h3>
                    <p className="text-stone-700">
                      Under Abbot U Tilaka's guidance, the monastery expanded its accommodations for pilgrims and began
                      welcoming more international visitors seeking Buddhist teachings.
                    </p>
                  </div>
                  <div className="relative order-1 md:order-2">
                    <div className="absolute top-0 left-0 md:left-0 w-8 h-8 bg-amber-500 rounded-full transform -translate-x-1/2 md:-translate-x-full"></div>
                    <img
                      src="/placeholder.svg?height=300&width=400&query=1970s%20buddhist%20temple%20expansion%20vintage"
                      alt="Temple expansion in the 1970s"
                      className="rounded md:ml-8"
                    />
                  </div>
                </div>

                <div className="relative grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                  <div className="relative">
                    <div className="absolute top-0 left-0 md:right-0 w-8 h-8 bg-amber-500 rounded-full transform -translate-x-1/2 md:translate-x-1/2"></div>
                    <img
                      src="/placeholder.svg?height=300&width=400&query=modern%20buddhist%20meditation%20center"
                      alt="Modern meditation center"
                      className="rounded md:mr-8"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-stone-800 mb-2">1976–2021</h3>
                    <p className="text-stone-700">
                      Venerable Sayadaw U Nyaneinda transformed the vihar into a global meditation and study center,
                      introducing comprehensive meditation programs and establishing cultural exchange initiatives.
                    </p>
                  </div>
                </div>

                <div className="relative grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                  <div className="md:text-right order-2 md:order-1">
                    <h3 className="text-xl font-medium text-stone-800 mb-2">Present Day</h3>
                    <p className="text-stone-700">
                      Today, Burmese Vihar continues to honor its legacy while adapting to contemporary needs, offering
                      meditation retreats, educational programs, and cultural activities for visitors from around the
                      world.
                    </p>
                  </div>
                  <div className="relative order-1 md:order-2">
                    <div className="absolute top-0 left-0 md:left-0 w-8 h-8 bg-amber-500 rounded-full transform -translate-x-1/2 md:-translate-x-full"></div>
                    <img
                      src="/placeholder.svg?height=300&width=400&query=contemporary%20buddhist%20temple%20community"
                      alt="Contemporary temple community"
                      className="rounded md:ml-8"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-amber-50">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-stone-800 mb-6">Visit Burmese Vihar</h2>
            <div className="h-px w-20 bg-amber-500 mx-auto mb-8"></div>
            <p className="text-stone-700 mb-10">
              Experience the peace and serenity of our monastery in person. Visit us for daily meditation, ceremonies,
              or retreat programs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 rounded-none px-8">
                <Link href="/visit">Plan Your Visit</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-amber-600 text-amber-700 hover:bg-amber-50 rounded-none px-8"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
