import type { Metadata, Viewport } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Clock, Calendar, Phone, Mail, Info, ArrowRight, CheckCircle } from "lucide-react"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: "Visit Us - Burmese Vihar Bodhgaya",
  description:
    "Plan your visit to Burmese Vihar in Bodhgaya. Information on location, opening hours, guided tours, and accommodation.",
}

export default function VisitPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('/placeholder-hy0ci.png')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

        <div className="container relative z-10 px-4 md:px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-light text-white tracking-wide leading-tight mb-6">
              Experience the Sacred
            </h1>
            <div className="h-px w-32 bg-amber-500 mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed mb-12">
              Immerse yourself in the tranquil atmosphere of Burmese Vihar, where ancient wisdom meets modern serenity
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 rounded-none px-8 py-6">
                <a href="#plan-your-visit">Plan Your Visit</a>
              </Button>
              <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 rounded-none px-8 py-6">
                <a href="#virtual-tour">Virtual Tour</a>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
      </section>

      {/* Quick Info Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-amber-600 p-6 text-white flex items-center justify-center">
                  <Clock className="h-10 w-10" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium text-stone-800 mb-4">Opening Hours</h3>
                  <ul className="space-y-2 text-stone-600">
                    <li className="flex justify-between">
                      <span>Temple Grounds</span>
                      <span className="font-medium">6:00 AM - 6:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Meditation Hall</span>
                      <span className="font-medium">5:30 AM - 8:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Office Hours</span>
                      <span className="font-medium">9:00 AM - 4:00 PM</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-amber-600 p-6 text-white flex items-center justify-center">
                  <MapPin className="h-10 w-10" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium text-stone-800 mb-4">Location</h3>
                  <address className="not-italic text-stone-600 space-y-1">
                    <p>Burmese Vihar</p>
                    <p>Near Mahabodhi Temple</p>
                    <p>Bodhgaya, Gaya District</p>
                    <p>Bihar, India - 824231</p>
                  </address>
                  <Button asChild variant="link" className="mt-4 p-0 text-amber-600 hover:text-amber-700">
                    <a href="#map" className="flex items-center">
                      View on Map
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-amber-600 p-6 text-white flex items-center justify-center">
                  <Phone className="h-10 w-10" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium text-stone-800 mb-4">Contact</h3>
                  <ul className="space-y-2 text-stone-600">
                    <li className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-amber-600" />
                      <span>+91 123 456 7890</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-amber-600" />
                      <span>info@burmesevihar.org</span>
                    </li>
                  </ul>
                  <Button asChild className="mt-4 bg-amber-600 hover:bg-amber-700 w-full">
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Plan Your Visit Section */}
      <section id="plan-your-visit" className="py-20 bg-stone-50">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-amber-600 text-sm tracking-widest uppercase font-medium">Visitor Information</span>
            <h2 className="text-4xl font-serif font-light text-stone-800 mt-3 mb-6">Plan Your Visit</h2>
            <div className="h-px w-20 bg-amber-500 mx-auto mb-8"></div>
            <p className="text-lg text-stone-700">
              Whether you're coming for meditation, pilgrimage, or cultural exploration, we welcome visitors from all
              backgrounds and traditions.
            </p>
          </div>

          <Tabs defaultValue="general" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="general" className="data-[state=active]:bg-amber-600 data-[state=active]:text-white">
                General Info
              </TabsTrigger>
              <TabsTrigger value="tours" className="data-[state=active]:bg-amber-600 data-[state=active]:text-white">
                Guided Tours
              </TabsTrigger>
              <TabsTrigger
                value="accommodation"
                className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
              >
                Accommodation
              </TabsTrigger>
              <TabsTrigger
                value="etiquette"
                className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
              >
                Etiquette
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="border-none p-0 mt-0">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-medium text-stone-800 mb-6">Visitor Information</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <CheckCircle className="h-6 w-6 text-amber-600 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-stone-800">No Entrance Fee</p>
                        <p className="text-stone-600">
                          The temple is open to all visitors free of charge, though donations are appreciated.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle className="h-6 w-6 text-amber-600 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-stone-800">Best Time to Visit</p>
                        <p className="text-stone-600">
                          October to March offers the most pleasant weather. Early morning and late afternoon are less
                          crowded.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle className="h-6 w-6 text-amber-600 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-stone-800">Photography</p>
                        <p className="text-stone-600">
                          Photography is permitted in most areas except during meditation sessions. No flash photography
                          inside the temple.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle className="h-6 w-6 text-amber-600 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-stone-800">Accessibility</p>
                        <p className="text-stone-600">
                          Most areas are wheelchair accessible. Please contact us in advance for specific accessibility
                          needs.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="relative">
                  <img
                    src="/placeholder.svg?height=600&width=800&query=buddhist%20temple%20visitors%20information%20desk"
                    alt="Visitor information desk"
                    className="rounded-lg shadow-lg"
                  />
                  <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-amber-500 rounded-lg -z-10"></div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tours" className="border-none p-0 mt-0">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1 relative">
                  <img
                    src="/placeholder.svg?height=600&width=800&query=buddhist%20monk%20giving%20temple%20tour"
                    alt="Guided tour with a monk"
                    className="rounded-lg shadow-lg"
                  />
                  <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-amber-500 rounded-lg -z-10"></div>
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="text-2xl font-medium text-stone-800 mb-6">Guided Tours</h3>
                  <p className="text-stone-700 mb-6">
                    Enhance your visit with a guided tour led by knowledgeable monks or staff who can provide deeper
                    insights into the temple's history, architecture, and spiritual significance.
                  </p>
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                      <span className="font-medium">Daily General Tours</span>
                      <span>10:00 AM & 2:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                      <span className="font-medium">Historical & Cultural Tour</span>
                      <span>11:30 AM</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                      <span className="font-medium">Meditation Introduction</span>
                      <span>9:00 AM & 4:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                      <span className="font-medium">Group Tours (10+ people)</span>
                      <span>By appointment</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-amber-600 mb-4">
                    <Info className="h-5 w-5" />
                    <p className="text-sm">Tours are available in English, Hindi, Burmese, and Thai</p>
                  </div>
                  <Button className="bg-amber-600 hover:bg-amber-700">Reserve a Tour</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="accommodation" className="border-none p-0 mt-0">
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-2xl font-medium text-stone-800 mb-6">Stay at the Monastery</h3>
                    <p className="text-stone-700 mb-6">
                      Experience the authentic monastery lifestyle by staying in our guest accommodations. We offer
                      simple, clean rooms for pilgrims and spiritual seekers.
                    </p>
                    <ul className="space-y-4 mb-6">
                      <li className="flex gap-3">
                        <CheckCircle className="h-6 w-6 text-amber-600 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-stone-800">Dormitory Rooms</p>
                          <p className="text-stone-600">
                            Shared accommodations with 4-6 beds per room. Suitable for groups and budget travelers.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <CheckCircle className="h-6 w-6 text-amber-600 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-stone-800">Private Rooms</p>
                          <p className="text-stone-600">
                            Single and double rooms with basic amenities for those seeking more privacy.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <CheckCircle className="h-6 w-6 text-amber-600 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-stone-800">Facilities</p>
                          <p className="text-stone-600">
                            Shared bathrooms, meditation hall access, and vegetarian meals included.
                          </p>
                        </div>
                      </li>
                    </ul>
                    <Button className="bg-amber-600 hover:bg-amber-700">Check Availability</Button>
                  </div>
                  <div className="relative">
                    <img
                      src="/placeholder.svg?height=600&width=800&query=simple%20buddhist%20monastery%20guest%20room"
                      alt="Monastery guest accommodation"
                      className="rounded-lg shadow-lg"
                    />
                    <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-amber-500 rounded-lg -z-10"></div>
                  </div>
                </div>

                <div className="bg-stone-100 p-8 rounded-lg mt-12">
                  <h4 className="text-xl font-medium text-stone-800 mb-4">Nearby Accommodations</h4>
                  <p className="text-stone-700 mb-6">
                    If our monastery accommodations are full or you prefer alternative lodging, there are several
                    options nearby:
                  </p>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded shadow-md">
                      <h5 className="font-medium text-stone-800 mb-2">Budget Hotels</h5>
                      <p className="text-sm text-stone-600">Several affordable hotels within 1km of the temple</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow-md">
                      <h5 className="font-medium text-stone-800 mb-2">Mid-range Hotels</h5>
                      <p className="text-sm text-stone-600">Comfortable accommodations with modern amenities</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow-md">
                      <h5 className="font-medium text-stone-800 mb-2">Luxury Resorts</h5>
                      <p className="text-sm text-stone-600">Premium options available in Bodhgaya town</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="etiquette" className="border-none p-0 mt-0">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1 relative">
                  <img
                    src="/placeholder.svg?height=600&width=800&query=respectful%20visitors%20at%20buddhist%20temple"
                    alt="Visitors respectfully entering temple"
                    className="rounded-lg shadow-lg"
                  />
                  <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-amber-500 rounded-lg -z-10"></div>
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="text-2xl font-medium text-stone-800 mb-6">Temple Etiquette</h3>
                  <p className="text-stone-700 mb-6">
                    To ensure a respectful and harmonious environment for all visitors and residents, please observe the
                    following guidelines:
                  </p>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <CheckCircle className="h-6 w-6 text-amber-600 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-stone-800">Dress Code</p>
                        <p className="text-stone-600">
                          Please dress modestly. Shoulders and knees should be covered. Remove shoes before entering
                          temple buildings.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle className="h-6 w-6 text-amber-600 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-stone-800">Respectful Behavior</p>
                        <p className="text-stone-600">
                          Speak quietly, avoid pointing feet at Buddha images, and ask permission before photographing
                          monks.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle className="h-6 w-6 text-amber-600 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-stone-800">Meditation Halls</p>
                        <p className="text-stone-600">
                          Maintain silence in meditation areas. Follow the guidance of monastery staff regarding seating
                          and participation.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle className="h-6 w-6 text-amber-600 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-stone-800">Offerings</p>
                        <p className="text-stone-600">
                          If making offerings to monks or Buddha images, use both hands as a sign of respect.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Map Section */}
      <section id="map" className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-amber-600 text-sm tracking-widest uppercase font-medium">Find Us</span>
            <h2 className="text-4xl font-serif font-light text-stone-800 mt-3 mb-6">Location & Directions</h2>
            <div className="h-px w-20 bg-amber-500 mx-auto mb-8"></div>
            <p className="text-lg text-stone-700">
              Burmese Vihar is conveniently located near the sacred Mahabodhi Temple in Bodhgaya, making it easily
              accessible for pilgrims and visitors.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-stone-100 rounded-lg overflow-hidden shadow-lg h-[500px] flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                <p className="text-stone-600">Interactive map will be displayed here</p>
                <p className="text-sm text-stone-500 mt-2">Google Maps integration</p>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="border-none shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-medium text-stone-800 mb-4 flex items-center">
                    <MapPin className="h-5 w-5 text-amber-600 mr-2" />
                    Getting Here
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-stone-800">By Air</h4>
                      <p className="text-stone-600 text-sm">
                        Gaya International Airport (GAY) is 12km away. Taxis are available.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-stone-800">By Train</h4>
                      <p className="text-stone-600 text-sm">
                        Gaya Junction Railway Station is 16km away. Auto-rickshaws and taxis available.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-stone-800">By Bus</h4>
                      <p className="text-stone-600 text-sm">
                        Regular buses connect Bodhgaya to Gaya, Patna, and other major cities.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-medium text-stone-800 mb-4 flex items-center">
                    <Info className="h-5 w-5 text-amber-600 mr-2" />
                    Local Transportation
                  </h3>
                  <ul className="space-y-2 text-stone-600 text-sm">
                    <li>Auto-rickshaws are readily available for local travel</li>
                    <li>Bicycle rentals are popular for exploring the area</li>
                    <li>Walking is convenient as most sites are within 2km</li>
                    <li>Taxi services can be arranged through your hotel</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md bg-amber-50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-medium text-stone-800 mb-4 flex items-center">
                    <Calendar className="h-5 w-5 text-amber-600 mr-2" />
                    Nearby Attractions
                  </h3>
                  <ul className="space-y-2 text-stone-600 text-sm">
                    <li>Mahabodhi Temple (0.5km) - UNESCO World Heritage Site</li>
                    <li>Bodhi Tree (0.6km) - Where Buddha attained enlightenment</li>
                    <li>Thai Temple (1.2km) - Beautiful Thai architecture</li>
                    <li>Japanese Temple (1.5km) - Peaceful gardens and pagoda</li>
                    <li>Archaeological Museum (1.8km) - Buddhist artifacts</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Tour Section */}
      <section id="virtual-tour" className="py-20 bg-stone-900 text-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-amber-500 text-sm tracking-widest uppercase font-medium">Experience</span>
            <h2 className="text-4xl font-serif font-light mt-3 mb-6">Virtual Temple Tour</h2>
            <div className="h-px w-20 bg-amber-500 mx-auto mb-8"></div>
            <p className="text-lg text-white/80">
              Can't visit in person? Explore our temple virtually through our immersive 360° tour.
            </p>
          </div>

          <div className="aspect-video bg-stone-800 rounded-lg overflow-hidden shadow-2xl relative group max-w-5xl mx-auto">
            <img
              src="/placeholder.svg?height=600&width=1000&query=buddhist%20temple%20interior%20panorama"
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

          <div className="grid md:grid-cols-4 gap-6 mt-12">
            <div className="bg-stone-800/50 p-6 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer">
              <h3 className="text-lg font-medium text-white mb-2">Main Temple Hall</h3>
              <p className="text-white/70 text-sm">
                Explore our beautiful main hall with its traditional Burmese architecture
              </p>
            </div>
            <div className="bg-stone-800/50 p-6 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer">
              <h3 className="text-lg font-medium text-white mb-2">Meditation Center</h3>
              <p className="text-white/70 text-sm">
                Visit the peaceful meditation halls where practitioners gather daily
              </p>
            </div>
            <div className="bg-stone-800/50 p-6 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer">
              <h3 className="text-lg font-medium text-white mb-2">Buddha Shrine</h3>
              <p className="text-white/70 text-sm">View our sacred Buddha images and traditional offerings</p>
            </div>
            <div className="bg-stone-800/50 p-6 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer">
              <h3 className="text-lg font-medium text-white mb-2">Temple Gardens</h3>
              <p className="text-white/70 text-sm">
                Stroll through our tranquil gardens with lotus ponds and Bodhi trees
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-stone-50">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-amber-600 text-sm tracking-widest uppercase font-medium">Questions</span>
            <h2 className="text-4xl font-serif font-light text-stone-800 mt-3 mb-6">Frequently Asked Questions</h2>
            <div className="h-px w-20 bg-amber-500 mx-auto mb-8"></div>
            <p className="text-lg text-stone-700">Find answers to common questions about visiting Burmese Vihar</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-stone-800 mb-2">Do I need to be Buddhist to visit?</h3>
              <p className="text-stone-700">
                No, we welcome visitors of all faiths and backgrounds. We ask only that all visitors respect our
                traditions and practices during their visit.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-stone-800 mb-2">Can I join meditation sessions as a visitor?</h3>
              <p className="text-stone-700">
                Yes, visitors are welcome to join our daily meditation sessions. Beginners can attend introduction
                sessions at 9:00 AM and 4:00 PM. For longer retreats, please register in advance.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-stone-800 mb-2">Is photography allowed inside the temple?</h3>
              <p className="text-stone-700">
                Photography is permitted in most areas except during meditation sessions. Please refrain from using
                flash inside temple buildings and always ask permission before photographing monks or other visitors.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-stone-800 mb-2">How long should I plan for my visit?</h3>
              <p className="text-stone-700">
                A basic visit to see the main temple and grounds takes about 1-2 hours. If you wish to join a guided
                tour or meditation session, plan for 3-4 hours. Many visitors choose to spend a full day or even several
                days to fully experience the peaceful atmosphere.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-stone-800 mb-2">
                Are there food options available at the temple?
              </h3>
              <p className="text-stone-700">
                The monastery offers a simple vegetarian lunch to visitors at 11:30 AM (donation-based). There is also a
                small tea shop on the grounds. Several restaurants serving vegetarian and non-vegetarian food are
                available within walking distance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-amber-50">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-stone-800 mb-6">Ready to Visit?</h2>
            <div className="h-px w-20 bg-amber-500 mx-auto mb-8"></div>
            <p className="text-xl text-stone-700 mb-10 max-w-3xl mx-auto">
              We look forward to welcoming you to Burmese Vihar. For group visits, special arrangements, or any
              questions, please don't hesitate to contact us.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 rounded-none px-8 py-6">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 rounded-none px-8 py-6">
                <a href="#plan-your-visit">Plan Your Visit</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-amber-600 text-amber-700 hover:bg-amber-50 rounded-none px-8 py-6"
              >
                <Link href="/events">Upcoming Events</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
