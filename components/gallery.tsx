"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

const images = [
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Temple exterior with traditional Burmese architecture",
    caption: "Temple exterior with traditional Burmese architecture",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Meditation hall with Buddha statue",
    caption: "Meditation hall with Buddha statue",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Monks during morning alms round",
    caption: "Monks during morning alms round",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Temple gardens with lotus pond",
    caption: "Temple gardens with lotus pond",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Kathina ceremony celebration",
    caption: "Kathina ceremony celebration",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Bodhi tree meditation area",
    caption: "Bodhi tree meditation area",
  },
]

export default function Gallery() {
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
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1)
    } else {
      setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1)
    }
  }

  return (
    <section id="gallery" className="py-20 bg-stone-50">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-stone-800">Photo Gallery</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg aspect-[4/3] cursor-pointer group"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-sm">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={selectedImage !== null} onOpenChange={closeLightbox}>
          <DialogContent className="max-w-4xl p-0 bg-black/90 border-none">
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
                    src={images[selectedImage].src || "/placeholder.svg"}
                    alt={images[selectedImage].alt}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 text-white text-center">
                  {images[selectedImage].caption}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigateImage("prev")}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 rounded-full"
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigateImage("next")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 rounded-full"
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
