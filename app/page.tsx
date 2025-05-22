import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, ArrowRight, Calendar, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import NewsletterSignup from "@/components/newsletter-signup"

export const metadata: Metadata = {
  title: "Burmese Vihar Bodhgaya - A Place of Peace and Mindfulness",
  description:
    "A historic Buddhist monastery established in 1936, offering meditation facilities, study resources, and pilgrimage support.",
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
}

const testimonials = [
  {
    quote:
      "The serene atmosphere at Burmese Vihar provided the perfect environment for deep meditation and reflection.",
    author: "Sarah Johnson",
    location: "United States",
    avatar: "/woman-meditating-portrait.png",
  },
  {
    quote:
      "A truly authentic experience learning from the monks. Their wisdom and compassion left a lasting impression.",
    author: "Raj Patel",
    location: "India",
    avatar: "/indian-man-portrait.png",
  },
  {
    quote: "My pilgrimage to Bodhgaya was made complete by my stay at Burmese Vihar. I'll definitely return.",
    author: "Thomas Chen",
    location: "Singapore",
    avatar: "/asian-man-portrait.png",
  },
]

const upcomingEvents = [
  {
    id: "kathina-ceremony",
    title: "Kathina Ceremony",
    date: "October 15, 2025",
    location: "Main Temple Hall",
    attendees: 120,
    image: "/buddhist-ceremony.png",
  },
  {
    id: "vipassana-retreat",
    title: "Vipassana Meditation Retreat",
    date: "November 5-12, 2025",
    location: "Meditation Center",
    attendees: 45,
    image: "/meditation-retreat-group.png",
  },
  {
    id: "buddha-jayanti",
    title: "Buddha Jayanti Celebration",
    date: "May 26, 2025",
    location: "Temple Grounds",
    attendees: 200,
    image: "/buddhist-vesak-lanterns.png",
  },
]

export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section - Redesigned with parallax effect and modern layout */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed transform scale-110"
          style={{
            backgroundImage: "url('/serene-buddha-statue.png')",
            backgroundPosition: "center 30%",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

        <div className="container relative z-10 px-4 md:px-6 py-20 md:py-32 max-w-[1400px] mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="inline-block p-2 bg-amber-600/20 backdrop-blur-sm rounded-full mb-8">
                <span
                  className="text-white/90 text-sm font-medium tracking-wider px-4 py-1"
                  style={{ fontSize: "min(0.875rem, 4vw)" }}
                >
                  ESTABLISHED 1936
                </span>
              </div>

              <h1
                className="text-5xl md:text-7xl font-serif font-light text-white tracking-wide leading-tight mb-8"
                style={{ fontSize: "min(4.5rem, 10vw)" }}
              >
                BURMESE VIHAR
                <br />
                BODHGAYA
              </h1>

              <div className="h-px w-40 bg-amber-500 mx-auto mb-8"></div>

              <p
                className="text-xl md:text-2xl text-white/90 max-w-3xl font-light leading-relaxed mb-16"
                style={{ fontSize: "min(1.5rem, 5vw)" }}
              >
                A sanctuary of peace and mindfulness in the sacred land of Bodhgaya, where ancient wisdom meets
                contemporary practice
              </p>

              <div className="flex flex-col md:flex-row gap-6 items-center mb-16">
                <Button
                  asChild
                  size="lg"
                  className="bg-amber-600 hover:bg-amber-700 rounded-none px-10 py-7 text-lg whitespace-nowrap min-w-[200px]"
                  style={{ fontSize: "min(1.125rem, 4vw)" }}
                >
                  <Link href="/visit">Experience the Temple</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-amber-600 hover:bg-amber-700 rounded-none px-10 py-7 text-lg whitespace-nowrap min-w-[200px]"
                  style={{ fontSize: "min(1.125rem, 4vw)" }}
                >
                  <Link href="/about">Discover Our Story</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center text-white/80">
          <p className="text-lg md:text-xl italic font-serif mb-2" style={{ fontSize: "min(1.25rem, 5vw)" }}>
            "Sabbe sattā sukhi hontu"
          </p>
          <p className="text-sm md:text-base" style={{ fontSize: "min(1rem, 4vw)" }}>
            May all beings be happy
          </p>
          <div className="mt-6 animate-bounce">
            <ChevronRight className="h-8 w-8 rotate-90 mx-auto text-amber-500" />
          </div>
        </div>
      </section>

      {/* Featured Programs Section - New visual card-based layout */}
      <section className="py-24 bg-stone-900 text-white relative">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent"></div>
        <div className="container px-4 md:px-6 max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <span
              className="text-amber-500 text-sm tracking-widest uppercase font-medium"
              style={{ fontSize: "min(0.875rem, 4vw)" }}
            >
              Our Offerings
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-light mt-3 mb-6" style={{ fontSize: "min(3rem, 8vw)" }}>
              Spiritual Journey
            </h2>
            <div className="h-px w-20 bg-amber-500 mx-auto mb-8"></div>
            <p className="text-lg text-white/80 max-w-3xl mx-auto" style={{ fontSize: "min(1.125rem, 4vw)" }}>
              Discover the path to inner peace through our diverse programs and sacred traditions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Program Card 1 */}
            <div className="group relative overflow-hidden min-h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
              <img
                src="/buddhist-meditation.png"
                alt="Meditation Programs"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 absolute inset-0"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
                <h3 className="text-2xl font-serif mb-3" style={{ fontSize: "min(1.5rem, 6vw)" }}>
                  Meditation Programs
                </h3>
                <p className="text-white/80 mb-6 line-clamp-3" style={{ fontSize: "min(1rem, 4vw)" }}>
                  Experience traditional Vipassana and Metta meditation practices guided by experienced monks.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="w-fit border-amber-500 text-amber-400 hover:bg-amber-500/20 rounded-none group whitespace-nowrap"
                  style={{ fontSize: "min(1rem, 4vw)" }}
                >
                  <Link href="/programs" className="flex items-center">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Program Card 2 */}
            <div className="group relative overflow-hidden min-h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
              <img
                src="/buddhist-teaching-ceremony.png"
                alt="Dhamma Teachings"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 absolute inset-0"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
                <h3 className="text-2xl font-serif mb-3" style={{ fontSize: "min(1.5rem, 6vw)" }}>
                  Dhamma Teachings
                </h3>
                <p className="text-white/80 mb-6 line-clamp-3" style={{ fontSize: "min(1rem, 4vw)" }}>
                  Immerse yourself in the Buddha's teachings through regular talks, discussions, and study groups.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="w-fit border-amber-500 text-amber-400 hover:bg-amber-500/20 rounded-none group whitespace-nowrap"
                  style={{ fontSize: "min(1rem, 4vw)" }}
                >
                  <Link href="/teachings" className="flex items-center">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Program Card 3 */}
            <div className="group relative overflow-hidden min-h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
              <img
                src="/buddhist-cultural-ceremony.png"
                alt="Cultural Ceremonies"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 absolute inset-0"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
                <h3 className="text-2xl font-serif mb-3" style={{ fontSize: "min(1.5rem, 6vw)" }}>
                  Cultural Ceremonies
                </h3>
                <p className="text-white/80 mb-6 line-clamp-3" style={{ fontSize: "min(1rem, 4vw)" }}>
                  Participate in traditional Buddhist ceremonies and festivals that connect us to ancient traditions.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="w-fit border-amber-500 text-amber-400 hover:bg-amber-500/20 rounded-none group whitespace-nowrap"
                  style={{ fontSize: "min(1rem, 4vw)" }}
                >
                  <Link href="/ceremonies" className="flex items-center">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview Section - Redesigned with modern layout */}
      <section className="py-24 bg-white relative">
        <div className="container px-4 md:px-6 max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span
                className="text-amber-600 text-sm tracking-widest uppercase font-medium"
                style={{ fontSize: "min(0.875rem, 4vw)" }}
              >
                Our Heritage
              </span>
              <h2
                className="text-4xl md:text-5xl font-serif font-light text-stone-800 mt-3 mb-6"
                style={{ fontSize: "min(3rem, 8vw)" }}
              >
                A Legacy of Wisdom
              </h2>
              <div className="h-px w-20 bg-amber-500 mb-8"></div>

              <p className="text-stone-700 text-lg mb-6 leading-relaxed" style={{ fontSize: "min(1.125rem, 4vw)" }}>
                The Burmese Vihar in Bodhgaya stands as a testament to spiritual dedication since 1936. Founded by
                Venerable U Dhammetsara near the sacred Mahabodhi Temple, our monastery preserves the authentic
                teachings of Theravada Buddhism.
              </p>

              <p className="text-stone-700 text-lg mb-8 leading-relaxed" style={{ fontSize: "min(1.125rem, 4vw)" }}>
                For over 85 years, we have welcomed pilgrims from around the world, offering a sanctuary for meditation,
                study, and cultural exchange in the very place where the Buddha attained enlightenment.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  className="bg-amber-600 hover:bg-amber-700 rounded-none px-8 py-6 whitespace-nowrap min-w-[180px]"
                  style={{ fontSize: "min(1rem, 4vw)" }}
                >
                  <Link href="/about" className="flex items-center">
                    Our Full Story
                    <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="border-amber-600 text-amber-700 hover:bg-amber-50 rounded-none px-8 py-6 whitespace-nowrap min-w-[180px]"
                  style={{ fontSize: "min(1rem, 4vw)" }}
                >
                  <Link href="/gallery">View Gallery</Link>
                </Button>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative min-h-[400px]">
              <div className="relative h-full">
                <div className="absolute -top-6 -left-6 w-full h-full border-2 border-amber-500"></div>
                <img
                  src="/historic-burmese-temple.png"
                  alt="Burmese Vihar Temple Exterior"
                  className="w-full h-auto object-cover relative z-10"
                />
                <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-stone-100 -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section - Redesigned with modern card layout */}
      <section className="py-24 bg-stone-100 relative">
        <div className="container px-4 md:px-6 max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div>
              <span
                className="text-amber-600 text-sm tracking-widest uppercase font-medium"
                style={{ fontSize: "min(0.875rem, 4vw)" }}
              >
                Join Us
              </span>
              <h2
                className="text-4xl md:text-5xl font-serif font-light text-stone-800 mt-3 mb-6"
                style={{ fontSize: "min(3rem, 8vw)" }}
              >
                Upcoming Events
              </h2>
              <div className="h-px w-20 bg-amber-500 mb-4"></div>
              <p className="text-stone-700 max-w-2xl" style={{ fontSize: "min(1.125rem, 4vw)" }}>
                Experience the richness of Buddhist traditions through our ceremonies, retreats, and cultural gatherings
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="mt-6 md:mt-0 border-amber-600 text-amber-700 hover:bg-amber-50 rounded-none group whitespace-nowrap min-w-[150px]"
              style={{ fontSize: "min(1rem, 4vw)" }}
            >
              <Link href="/events" className="flex items-center">
                View All Events
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="group block bg-white overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 min-h-[450px] flex flex-col"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                </div>
                <div className="p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <h3
                      className="text-xl font-medium text-stone-800 mb-4 group-hover:text-amber-600 transition-colors"
                      style={{ fontSize: "min(1.25rem, 5vw)" }}
                    >
                      {event.title}
                    </h3>

                    <div className="space-y-3 text-stone-600">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-3 text-amber-600 flex-shrink-0" />
                        <span style={{ fontSize: "min(1rem, 4vw)" }}>{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 mr-3 text-amber-600 flex-shrink-0" />
                        <span style={{ fontSize: "min(1rem, 4vw)" }}>{event.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-5 w-5 mr-3 text-amber-600 flex-shrink-0" />
                        <span style={{ fontSize: "min(1rem, 4vw)" }}>{event.attendees} expected attendees</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center text-amber-600 font-medium">
                    <span style={{ fontSize: "min(1rem, 4vw)" }}>Learn more</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Redesigned with modern layout */}
      <section className="py-24 bg-white relative">
        <div className="container px-4 md:px-6 max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <span
              className="text-amber-600 text-sm tracking-widest uppercase font-medium"
              style={{ fontSize: "min(0.875rem, 4vw)" }}
            >
              Testimonials
            </span>
            <h2
              className="text-4xl md:text-5xl font-serif font-light text-stone-800 mt-3 mb-6"
              style={{ fontSize: "min(3rem, 8vw)" }}
            >
              Voices of Pilgrims
            </h2>
            <div className="h-px w-20 bg-amber-500 mx-auto mb-8"></div>
            <p className="text-lg text-stone-700 max-w-3xl mx-auto" style={{ fontSize: "min(1.125rem, 4vw)" }}>
              Hear from those who have experienced the transformative atmosphere of Burmese Vihar
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-stone-50 border-none shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 min-h-[350px] flex flex-col"
              >
                <CardContent className="p-0 flex-grow flex flex-col">
                  <div className="p-8 flex-grow flex flex-col">
                    <svg
                      className="text-amber-400 w-12 h-12 mb-6 opacity-50"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                    </svg>

                    <p
                      className="text-stone-700 italic text-lg mb-8 leading-relaxed flex-grow"
                      style={{ fontSize: "min(1.125rem, 4vw)" }}
                    >
                      {testimonial.quote}
                    </p>

                    <div className="flex items-center mt-auto">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.author}
                        className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-amber-500"
                      />
                      <div>
                        <p className="font-medium text-stone-800 text-lg" style={{ fontSize: "min(1.125rem, 4vw)" }}>
                          {testimonial.author}
                        </p>
                        <p className="text-amber-600" style={{ fontSize: "min(1rem, 4vw)" }}>
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Tour Section - New section */}
      <section className="py-24 bg-stone-900 text-white relative">
        <div className="container px-4 md:px-6 max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span
                className="text-amber-500 text-sm tracking-widest uppercase font-medium"
                style={{ fontSize: "min(0.875rem, 4vw)" }}
              >
                Experience
              </span>
              <h2
                className="text-4xl md:text-5xl font-serif font-light mt-3 mb-6"
                style={{ fontSize: "min(3rem, 8vw)" }}
              >
                Virtual Temple Tour
              </h2>
              <div className="h-px w-20 bg-amber-500 mb-8"></div>

              <p className="text-white/80 text-lg mb-6 leading-relaxed" style={{ fontSize: "min(1.125rem, 4vw)" }}>
                Explore the sacred spaces of Burmese Vihar from anywhere in the world. Our virtual tour offers an
                immersive experience of our temple grounds, meditation halls, and sacred artifacts.
              </p>

              <p className="text-white/80 text-lg mb-8 leading-relaxed" style={{ fontSize: "min(1.125rem, 4vw)" }}>
                Walk through our historic buildings, witness the beauty of traditional Burmese Buddhist architecture,
                and feel the tranquil atmosphere that has welcomed pilgrims for generations.
              </p>

              <Button
                asChild
                className="bg-amber-600 hover:bg-amber-700 rounded-none px-8 py-6 whitespace-nowrap min-w-[200px]"
                style={{ fontSize: "min(1rem, 4vw)" }}
              >
                <Link href="/virtual-tour">Begin Virtual Tour</Link>
              </Button>
            </div>

            <div className="relative min-h-[350px]">
              <div className="aspect-video bg-stone-800 rounded-lg overflow-hidden shadow-2xl relative group h-full">
                <img
                  src="/buddhist-temple-interior-panorama.png"
                  alt="Virtual Temple Tour"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-amber-600/90 flex items-center justify-center cursor-pointer transform transition-transform group-hover:scale-110">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-amber-500 -z-10"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-amber-500 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup - Redesigned */}
      <section className="py-24 bg-amber-50 relative">
        <div className="container px-4 md:px-6 max-w-[1400px] mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-12 shadow-xl relative">
              <div className="absolute top-0 left-0 w-24 h-24 bg-amber-100 -translate-x-6 -translate-y-6 -z-10"></div>
              <div className="text-center mb-8">
                <span
                  className="text-amber-600 text-sm tracking-widest uppercase font-medium"
                  style={{ fontSize: "min(0.875rem, 4vw)" }}
                >
                  Stay Connected
                </span>
                <h2
                  className="text-3xl md:text-4xl font-serif font-light text-stone-800 mt-3 mb-6"
                  style={{ fontSize: "min(2.5rem, 7vw)" }}
                >
                  Join Our Community
                </h2>
                <div className="h-px w-20 bg-amber-500 mx-auto mb-6"></div>
                <p className="text-stone-700 max-w-2xl mx-auto" style={{ fontSize: "min(1.125rem, 4vw)" }}>
                  Subscribe to our newsletter to receive updates on upcoming events, Dhamma talks, and special
                  ceremonies at Burmese Vihar.
                </p>
              </div>

              <NewsletterSignup />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - New section */}
      <section className="py-24 bg-stone-900 text-white relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('/buddhist-temple-sunset.png')",
          }}
        />
        <div className="container px-4 md:px-6 relative z-10 max-w-[1400px] mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6" style={{ fontSize: "min(3rem, 8vw)" }}>
              Begin Your Spiritual Journey
            </h2>
            <div className="h-px w-20 bg-amber-500 mx-auto mb-8"></div>
            <p
              className="text-xl text-white/80 mb-12 leading-relaxed max-w-3xl mx-auto"
              style={{ fontSize: "min(1.25rem, 5vw)" }}
            >
              Whether you're seeking meditation guidance, cultural immersion, or a peaceful retreat, Burmese Vihar
              welcomes you to experience the transformative power of Buddhist practice in the sacred land of Bodhgaya.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 rounded-none px-10 py-7 text-lg whitespace-nowrap min-w-[200px]"
                style={{ fontSize: "min(1.125rem, 4vw)" }}
              >
                <Link href="/visit">Plan Your Visit</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-white text-stone-900 hover:bg-white/90 rounded-none px-10 py-7 text-lg whitespace-nowrap min-w-[200px]"
                style={{ fontSize: "min(1.125rem, 4vw)" }}
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 rounded-none px-10 py-7 text-lg whitespace-nowrap min-w-[200px]"
                style={{ fontSize: "min(1.125rem, 4vw)" }}
              >
                <Link href="/donate">Support Our Mission</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
