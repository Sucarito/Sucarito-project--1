"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

const galleryImages = [
  {
    src: "/placeholder.svg?height=600&width=800&query=buddhist%20temple%20architecture",
    alt: "Temple exterior with traditional Burmese architecture",
    caption: "The historic Burmese Vihar facade showcases traditional architectural elements",
  },
  {
    src: "/placeholder.svg?height=600&width=800&query=meditation%20hall%20with%20buddha%20statue",
    alt: "Meditation hall with Buddha statue",
    caption: "Our peaceful meditation hall centered around a serene Buddha statue",
  },
  {
    src: "/placeholder.svg?height=600&width=800&query=Buddhist%20monks%20in%20maroon%20robes",
    alt: "Monks during morning alms round",
    caption: "Resident monks participate in the daily alms round, a tradition dating back to the Buddha's time",
  },
  {
    src: "/placeholder.svg?height=600&width=800&query=buddhist%20garden%20with%20lotus%20pond",
    alt: "Temple gardens with lotus pond",
    caption: "Tranquil gardens featuring a lotus pond for quiet contemplation",
  },
  {
    src: "/placeholder.svg?height=600&width=800&query=buddhist%20ceremony%20with%20offerings",
    alt: "Kathina ceremony celebration",
    caption: "Annual Kathina ceremony with traditional offerings to the Sangha",
  },
  {
    src: "/placeholder.svg?height=600&width=800&query=bodhi%20tree%20meditation%20area%20with%20people",
    alt: "Bodhi tree meditation area",
    caption: "Devotees meditating under the sacred Bodhi tree, reminiscent of the Buddha's enlightenment",
  },
]

export default function GalleryPreview() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return

    if (direction === "prev") {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1)
    } else {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1)
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className="relative overflow-hidden shadow-md cursor-pointer group"
            onClick={() => openLightbox(index)}
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <p className="text-white text-sm">{image.caption}</p>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={selectedImage !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-5xl p-0 bg-black/95 border-none">
          <Button
            variant="ghost"
            size="icon"
            onClick={closeLightbox}
            className="absolute right-2 top-2 z-10 text-white hover:bg-white/10 rounded-full"
          >
            <X className="h-6 w-6" />
          </Button>

          {selectedImage !== null && (
            <div className="relative">
              <div className="flex items-center justify-center h-[80vh]">
                <img
                  src={galleryImages[selectedImage].src || "/placeholder.svg"}
                  alt={galleryImages[selectedImage].alt}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 text-white text-center">
                {galleryImages[selectedImage].caption}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateImage("prev")}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 rounded-full h-12 w-12"
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateImage("next")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 rounded-full h-12 w-12"
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
