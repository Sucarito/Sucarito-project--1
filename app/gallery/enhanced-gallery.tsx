"use client"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, X, Download, Share, Info, Heart, MapPin } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Define image categories
const categories = [
  { id: "all", label: "All Images" },
  { id: "architecture", label: "Architecture" },
  { id: "ceremonies", label: "Ceremonies" },
  { id: "meditation", label: "Meditation" },
  { id: "nature", label: "Temple Gardens" },
  { id: "artifacts", label: "Sacred Artifacts" },
]

// Enhanced gallery images with categories and detailed information
const galleryImages = [
  {
    id: 1,
    src: "/buddhist-temple-golden-roof.png",
    alt: "Temple exterior with traditional Burmese architecture",
    caption: "The historic Burmese Vihar facade showcases traditional architectural elements",
    category: "architecture",
    description:
      "Built in 1936, the main temple building features distinctive Burmese architectural elements including tiered roofs, intricate woodcarvings, and gold accents that reflect the cultural heritage of Myanmar.",
    location: "Main Temple Entrance",
  },
  {
    id: 2,
    src: "/buddhist-meditation-hall.png",
    alt: "Meditation hall with Buddha statue",
    caption: "Our peaceful meditation hall centered around a serene Buddha statue",
    category: "architecture",
    description:
      "The main meditation hall provides a tranquil space for practitioners, featuring a hand-carved Buddha statue imported from Myanmar in the 1950s. The hall can accommodate up to 100 meditators.",
    location: "Main Meditation Hall",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=800&width=1200&query=buddhist%20monks%20in%20maroon%20robes%20walking%20in%20line",
    alt: "Monks during morning alms round",
    caption: "Resident monks participate in the daily alms round, a tradition dating back to the Buddha's time",
    category: "ceremonies",
    description:
      "Every morning at dawn, the resident monks walk through the nearby village collecting alms - a practice that creates a sacred connection between the monastic and lay communities.",
    location: "Bodhgaya Village",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=800&width=1200&query=buddhist%20temple%20garden%20with%20lotus%20pond%20and%20pagoda",
    alt: "Temple gardens with lotus pond",
    caption: "Tranquil gardens featuring a lotus pond for quiet contemplation",
    category: "nature",
    description:
      "The temple gardens were designed to create an atmosphere of peace and reflection. The lotus pond symbolizes purity and enlightenment, with blooming lotus flowers representing the Buddha's teaching.",
    location: "Eastern Temple Grounds",
  },
  {
    id: 5,
    src: "/placeholder.svg?height=800&width=1200&query=buddhist%20kathina%20ceremony%20with%20monks%20and%20offerings",
    alt: "Kathina ceremony celebration",
    caption: "Annual Kathina ceremony with traditional offerings to the Sangha",
    category: "ceremonies",
    description:
      "The Kathina ceremony marks the end of the Buddhist Lent (Vassa) and is a time when laypeople offer new robes and supplies to the monastic community. This important tradition strengthens the bond between monks and supporters.",
    location: "Main Temple Hall",
  },
  {
    id: 6,
    src: "/placeholder.svg?height=800&width=1200&query=people%20meditating%20under%20bodhi%20tree",
    alt: "Bodhi tree meditation area",
    caption: "Devotees meditating under the sacred Bodhi tree, reminiscent of the Buddha's enlightenment",
    category: "meditation",
    description:
      "Our Bodhi tree was grown from a cutting of the sacred Bodhi tree in Anuradhapura, Sri Lanka, which itself was grown from a cutting of the original tree under which the Buddha attained enlightenment.",
    location: "Bodhi Tree Sanctuary",
  },
  {
    id: 7,
    src: "/placeholder.svg?height=800&width=1200&query=ornate%20buddhist%20altar%20with%20offerings%20and%20candles",
    alt: "Main temple altar with offerings",
    caption: "The ornate main altar adorned with traditional offerings and ritual items",
    category: "artifacts",
    description:
      "The main altar features a 19th-century Buddha image from Myanmar, surrounded by traditional offerings including flowers, incense, candles, water, and food representing the five sensory pleasures.",
    location: "Main Temple Hall",
  },
  {
    id: 8,
    src: "/placeholder.svg?height=800&width=1200&query=group%20meditation%20session%20in%20buddhist%20hall",
    alt: "Group meditation session",
    caption: "Daily group meditation sessions bring practitioners together in mindful practice",
    category: "meditation",
    description:
      "Group meditation sessions are held three times daily, guided by experienced meditation teachers. These sessions are open to visitors of all levels of experience.",
    location: "Meditation Hall",
  },
  {
    id: 9,
    src: "/placeholder.svg?height=800&width=1200&query=ancient%20buddhist%20manuscripts%20and%20texts",
    alt: "Ancient Buddhist manuscripts",
    caption: "Preserved ancient texts and manuscripts in the temple library",
    category: "artifacts",
    description:
      "Our library houses a collection of rare Buddhist manuscripts, including palm leaf texts from the 18th and 19th centuries. These texts contain important commentaries on the Pali Canon and traditional Burmese Buddhist teachings.",
    location: "Temple Library",
  },
  {
    id: 10,
    src: "/placeholder.svg?height=800&width=1200&query=buddhist%20temple%20at%20sunset%20with%20golden%20light",
    alt: "Temple at sunset",
    caption: "The temple bathed in golden light during sunset, creating a magical atmosphere",
    category: "architecture",
    description:
      "As the sun sets, the temple's gold accents catch the light, creating a warm glow that highlights the building's distinctive silhouette against the evening sky.",
    location: "Main Temple",
  },
  {
    id: 11,
    src: "/placeholder.svg?height=800&width=1200&query=buddhist%20monk%20teaching%20children",
    alt: "Monk teaching young students",
    caption: "Knowledge transmission as a senior monk teaches young novices and students",
    category: "ceremonies",
    description:
      "Education has always been central to our monastery's mission. Senior monks regularly teach both religious and secular subjects to novice monks and local children.",
    location: "Temple School Room",
  },
  {
    id: 12,
    src: "/placeholder.svg?height=800&width=1200&query=zen%20rock%20garden%20with%20raked%20sand",
    alt: "Zen rock garden",
    caption: "The contemplative rock garden offers another space for mindful reflection",
    category: "nature",
    description:
      "Inspired by Japanese Zen traditions, our rock garden was added in 1985 as a space for walking meditation and contemplation. The patterns in the sand are raked daily by monks as a mindfulness practice.",
    location: "Western Temple Grounds",
  },
]

export default function EnhancedGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState("all")
  const [filteredImages, setFilteredImages] = useState(galleryImages)
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  // Filter images when category changes
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredImages(galleryImages)
    } else {
      setFilteredImages(galleryImages.filter((img) => img.category === activeCategory))
    }
  }, [activeCategory])

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const openLightbox = (index: number) => {
    setSelectedImage(index)
    setIsInfoOpen(false)
    setIsFavorited(false)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null || filteredImages.length === 0) return

    if (direction === "prev") {
      setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1)
    } else {
      setSelectedImage(selectedImage === filteredImages.length - 1 ? 0 : selectedImage + 1)
    }
    setIsInfoOpen(false)
    setIsFavorited(false)
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return

      if (e.key === "ArrowLeft") {
        navigateImage("prev")
      } else if (e.key === "ArrowRight") {
        navigateImage("next")
      } else if (e.key === "Escape") {
        closeLightbox()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImage, filteredImages])

  return (
    <section className="py-16 bg-stone-100">
      <div className="container px-4 md:px-6">
        {/* Category Filters */}
        <div className="mb-8 sm:mb-12 overflow-x-auto pb-2">
          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="w-full max-w-4xl mx-auto flex flex-nowrap justify-start sm:justify-center bg-white/80 backdrop-blur-sm p-1 rounded-full">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="rounded-full whitespace-nowrap data-[state=active]:bg-amber-600 data-[state=active]:text-white px-3 sm:px-6"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Gallery Grid */}
        <div ref={containerRef} className="relative min-h-[400px]">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border-4 border-amber-200 border-t-amber-600 animate-spin"></div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
              >
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative overflow-hidden rounded-lg aspect-[4/3] cursor-pointer shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2"
                    onClick={() => openLightbox(index)}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 z-10"></div>
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-6 z-20">
                      <h3 className="text-white text-base sm:text-lg font-medium mb-1 sm:mb-2">{image.alt}</h3>
                      <p className="text-white/80 text-xs sm:text-sm">{image.caption}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {filteredImages.length === 0 && !isLoading && (
            <div className="text-center py-20">
              <p className="text-stone-500 text-lg">No images found in this category.</p>
            </div>
          )}
        </div>

        {/* Lightbox */}
        <Dialog open={selectedImage !== null} onOpenChange={closeLightbox}>
          <DialogContent className="max-w-[95vw] sm:max-w-6xl p-0 bg-black/95 border-none overflow-hidden">
            {selectedImage !== null && filteredImages[selectedImage] && (
              <div className="relative h-[80vh] sm:h-[85vh] flex flex-col">
                {/* Top toolbar */}
                <div className="absolute top-0 left-0 right-0 z-30 p-2 sm:p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
                  <div className="text-white/90">
                    <span className="text-xs sm:text-sm font-medium">
                      {selectedImage + 1} / {filteredImages.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsFavorited(!isFavorited)}
                      className="text-white hover:bg-white/10 rounded-full h-8 w-8 sm:h-10 sm:w-10"
                    >
                      <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsInfoOpen(!isInfoOpen)}
                      className="text-white hover:bg-white/10 rounded-full h-8 w-8 sm:h-10 sm:w-10"
                    >
                      <Info className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/10 rounded-full h-8 w-8 sm:h-10 sm:w-10"
                    >
                      <Share className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/10 rounded-full h-8 w-8 sm:h-10 sm:w-10"
                    >
                      <Download className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={closeLightbox}
                      className="text-white hover:bg-white/10 rounded-full h-8 w-8 sm:h-10 sm:w-10"
                    >
                      <X className="h-5 w-5 sm:h-6 sm:w-6" />
                    </Button>
                  </div>
                </div>

                {/* Main image area */}
                <div className="flex-1 flex items-center justify-center p-4 sm:p-10">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedImage}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      src={filteredImages[selectedImage].src}
                      alt={filteredImages[selectedImage].alt}
                      className="max-h-full max-w-full object-contain"
                    />
                  </AnimatePresence>
                </div>

                {/* Navigation buttons */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigateImage("prev")}
                  className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 rounded-full h-8 w-8 sm:h-12 sm:w-12 z-20"
                >
                  <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigateImage("next")}
                  className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 rounded-full h-8 w-8 sm:h-12 sm:w-12 z-20"
                >
                  <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
                </Button>

                {/* Bottom caption area */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3 sm:p-6 z-20">
                  <AnimatePresence>
                    {isInfoOpen ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="text-white space-y-1 sm:space-y-2"
                      >
                        <h3 className="text-base sm:text-xl font-medium">{filteredImages[selectedImage].alt}</h3>
                        <p className="text-white/80 text-xs sm:text-base">
                          {filteredImages[selectedImage].description}
                        </p>
                        <div className="flex items-center text-amber-400 text-xs sm:text-sm mt-1 sm:mt-2">
                          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          <span>{filteredImages[selectedImage].location}</span>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-white"
                      >
                        <h3 className="text-base sm:text-lg font-medium">{filteredImages[selectedImage].alt}</h3>
                        <p className="text-white/80 text-xs sm:text-sm">{filteredImages[selectedImage].caption}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
