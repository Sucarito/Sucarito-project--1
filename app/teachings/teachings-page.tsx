"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import {
  FileText,
  Headphones,
  Video,
  Download,
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  BookOpen,
  Search,
  ChevronRight,
  Heart,
  Share,
  Clock,
  Calendar,
  User,
} from "lucide-react"

// Featured teaching
const featuredTeaching = {
  title: "The Four Noble Truths: Foundation of Buddhist Practice",
  teacher: "Sayadaw U Nandisara",
  description:
    "An in-depth exploration of the Four Noble Truths, the Buddha's first and most essential teaching that forms the foundation of Buddhist practice and understanding.",
  image: "/buddhist-monk-meditation.png",
  type: "video",
  duration: "45 minutes",
  date: "March 15, 2025",
}

// Dhamma talks
const dhammaTalks = [
  {
    id: "talk1",
    title: "The Four Noble Truths",
    teacher: "Sayadaw U Nandisara",
    description: "An exploration of the Buddha's first and most essential teaching.",
    audioSrc: "#",
    duration: "45 min",
    image: "/buddhist-monk-teaching.png",
    featured: true,
  },
  {
    id: "talk2",
    title: "Mindfulness in Daily Life",
    teacher: "Sayadaw U Jotika",
    description: "Practical guidance on integrating mindfulness into everyday activities.",
    audioSrc: "#",
    duration: "38 min",
    image: "/placeholder.svg?height=400&width=600&query=mindfulness%20meditation%20practice",
  },
  {
    id: "talk3",
    title: "The Path to Liberation",
    teacher: "Sayadaw U Nyaneinda",
    description: "Understanding the Noble Eightfold Path as the way to freedom from suffering.",
    audioSrc: "#",
    duration: "52 min",
    image: "/placeholder.svg?height=400&width=600&query=buddhist%20monk%20meditating",
  },
  {
    id: "talk4",
    title: "Loving-Kindness Meditation",
    teacher: "Sayadaw U Nandisara",
    description: "Developing boundless goodwill through Metta meditation practice.",
    audioSrc: "#",
    duration: "41 min",
    image: "/placeholder.svg?height=400&width=600&query=loving%20kindness%20meditation",
  },
  {
    id: "talk5",
    title: "Understanding Impermanence",
    teacher: "Sayadaw U Jotika",
    description: "Exploring the nature of change and impermanence in our lives.",
    audioSrc: "#",
    duration: "47 min",
    image: "/placeholder.svg?height=400&width=600&query=impermanence%20buddhist%20teaching",
  },
]

// Sacred texts
const sacredTexts = [
  {
    id: "text1",
    title: "Dhammapada",
    description: "Ancient collection of Buddha's teachings in verse form",
    image: "/placeholder.svg?height=400&width=600&query=ancient%20buddhist%20text%20dhammapada",
    chapters: 26,
    verses: 423,
    language: "Pali with English translation",
  },
  {
    id: "text2",
    title: "Satipatthana Sutta",
    description: "The Buddha's discourse on the foundations of mindfulness",
    image: "/placeholder.svg?height=400&width=600&query=buddhist%20satipatthana%20sutta%20text",
    chapters: 1,
    verses: null,
    language: "Pali with English translation",
  },
  {
    id: "text3",
    title: "Metta Sutta",
    description: "The Buddha's words on loving-kindness meditation",
    image: "/placeholder.svg?height=400&width=600&query=metta%20sutta%20buddhist%20text",
    chapters: 1,
    verses: 10,
    language: "Pali with English translation",
  },
  {
    id: "text4",
    title: "Mangala Sutta",
    description: "Discourse on blessings and auspicious signs",
    image: "/placeholder.svg?height=400&width=600&query=mangala%20sutta%20buddhist%20text",
    chapters: 1,
    verses: 12,
    language: "Pali with English translation",
  },
]

// Video teachings
const videoTeachings = [
  {
    id: "video1",
    title: "Introduction to Meditation",
    teacher: "Sayadaw U Nandisara",
    description: "A beginner's guide to Buddhist meditation practices.",
    thumbnail: "/placeholder.svg?height=400&width=600&query=meditation%20instruction%20buddhist",
    duration: "28 min",
    views: 12500,
  },
  {
    id: "video2",
    title: "Temple Tour",
    teacher: "Sayadaw U Jotika",
    description: "Explore the sacred spaces of Burmese Vihar.",
    thumbnail: "/placeholder.svg?height=400&width=600&query=buddhist%20temple%20tour",
    duration: "15 min",
    views: 8700,
  },
  {
    id: "video3",
    title: "The Life of the Buddha",
    teacher: "Sayadaw U Nyaneinda",
    description: "The inspiring story of Siddhartha Gautama's journey to enlightenment.",
    thumbnail: "/placeholder.svg?height=400&width=600&query=life%20of%20buddha%20teaching",
    duration: "42 min",
    views: 15300,
  },
]

// Practice guides
const practiceGuides = [
  {
    id: "guide1",
    title: "Beginner's Guide to Meditation",
    description: "Step-by-step instructions for starting a meditation practice",
    pages: 12,
    format: "PDF",
    image: "/placeholder.svg?height=400&width=600&query=meditation%20guide%20book",
  },
  {
    id: "guide2",
    title: "Pali Chanting Book",
    description: "Common Buddhist chants with translations",
    pages: 25,
    format: "PDF",
    image: "/placeholder.svg?height=400&width=600&query=buddhist%20chanting%20book",
  },
  {
    id: "guide3",
    title: "Buddhist Calendar 2025",
    description: "Calendar with Buddhist holy days and moon phases",
    pages: 12,
    format: "PDF",
    image: "/placeholder.svg?height=400&width=600&query=buddhist%20calendar",
  },
]

export default function TeachingsPage() {
  const [activeTab, setActiveTab] = useState("talks")
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [selectedTalk, setSelectedTalk] = useState<(typeof dhammaTalks)[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressRef = useRef<HTMLDivElement | null>(null)

  // Handle audio player controls
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && audioRef.current) {
      const rect = progressRef.current.getBoundingClientRect()
      const pos = (e.clientX - rect.left) / rect.width
      audioRef.current.currentTime = pos * audioRef.current.duration
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const openTalkDialog = (talk: (typeof dhammaTalks)[0]) => {
    setSelectedTalk(talk)
    setIsDialogOpen(true)
  }

  // Reset audio player when dialog closes
  useEffect(() => {
    if (!isDialogOpen) {
      setIsPlaying(false)
      setCurrentTime(0)
    }
  }, [isDialogOpen])

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-stone-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('/buddhist-teaching-ceremony.png')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/90 via-stone-900/80 to-stone-900/90" />

        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block py-1 px-3 bg-amber-600/30 backdrop-blur-sm rounded-full text-amber-200 text-sm font-medium tracking-wider mb-6">
              WISDOM TEACHINGS
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-light text-white tracking-wide leading-tight mb-6">
              Explore the Buddha's Teachings
            </h1>
            <div className="h-px w-32 bg-amber-500 mx-auto mb-8"></div>
            <p className="text-xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed mb-12">
              Discover ancient wisdom for modern life through our collection of Dhamma talks, sacred texts, and
              meditation guides
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 rounded-none px-8 py-6">
                <a href="#featured">Featured Teachings</a>
              </Button>
              <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 rounded-none px-8 py-6">
                <a href="#resources">Browse Resources</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Teaching Section */}
      <section id="featured" className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <span className="text-amber-600 text-sm tracking-widest uppercase font-medium">Featured Teaching</span>
                <h2 className="text-3xl md:text-4xl font-serif font-light text-stone-800 mt-3 mb-6">
                  {featuredTeaching.title}
                </h2>
                <div className="h-px w-20 bg-amber-500 mb-6"></div>

                <div className="flex items-center gap-3 text-stone-600 mb-6">
                  <User className="h-5 w-5 text-amber-600" />
                  <span>{featuredTeaching.teacher}</span>
                </div>

                <div className="flex items-center gap-6 text-stone-600 mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-600" />
                    <span className="text-sm">{featuredTeaching.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-amber-600" />
                    <span className="text-sm">{featuredTeaching.date}</span>
                  </div>
                </div>

                <p className="text-stone-700 mb-8 leading-relaxed">{featuredTeaching.description}</p>

                <div className="flex flex-wrap gap-4">
                  <Button className="bg-amber-600 hover:bg-amber-700 rounded-none flex gap-2">
                    <Video className="h-5 w-5" />
                    <span>Watch Video</span>
                  </Button>
                  <Button variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-50 rounded-none">
                    Download Audio
                  </Button>
                </div>
              </div>

              <div className="md:w-1/2 relative">
                <div className="aspect-video bg-stone-100 rounded-lg overflow-hidden shadow-xl relative group">
                  <img
                    src={featuredTeaching.image || "/placeholder.svg"}
                    alt={featuredTeaching.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-20 h-20 rounded-full bg-amber-600/90 flex items-center justify-center cursor-pointer transform transition-transform group-hover:scale-110">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-amber-500 rounded-lg -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Resources Section */}
      <section id="resources" className="py-20 bg-stone-50">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-amber-600 text-sm tracking-widest uppercase font-medium">Resources</span>
            <h2 className="text-3xl md:text-4xl font-serif font-light text-stone-800 mt-3 mb-6">
              Dhamma Resources & Teachings
            </h2>
            <div className="h-px w-20 bg-amber-500 mx-auto mb-8"></div>
            <p className="text-lg text-stone-700">
              Explore our collection of Dhamma talks, sacred texts, videos, and practice guides to deepen your
              understanding and practice
            </p>
          </div>

          <Tabs defaultValue="talks" value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 mb-12">
              <TabsTrigger
                value="talks"
                className="data-[state=active]:bg-amber-600 data-[state=active]:text-white py-3"
              >
                <Headphones className="h-5 w-5 mr-2" />
                Dhamma Talks
              </TabsTrigger>
              <TabsTrigger
                value="texts"
                className="data-[state=active]:bg-amber-600 data-[state=active]:text-white py-3"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Sacred Texts
              </TabsTrigger>
              <TabsTrigger
                value="videos"
                className="data-[state=active]:bg-amber-600 data-[state=active]:text-white py-3"
              >
                <Video className="h-5 w-5 mr-2" />
                Video Teachings
              </TabsTrigger>
              <TabsTrigger
                value="guides"
                className="data-[state=active]:bg-amber-600 data-[state=active]:text-white py-3"
              >
                <FileText className="h-5 w-5 mr-2" />
                Practice Guides
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="talks" className="mt-0">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {dhammaTalks.map((talk, index) => (
                      <motion.div
                        key={talk.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={talk.image || "/placeholder.svg"}
                              alt={talk.title}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            />
                            <div className="absolute top-3 right-3 bg-amber-600 text-white text-xs uppercase tracking-wider py-1 px-2 rounded">
                              {talk.duration}
                            </div>
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-xl">{talk.title}</CardTitle>
                            <CardDescription>By {talk.teacher}</CardDescription>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <p className="text-stone-700">{talk.description}</p>
                          </CardContent>
                          <CardFooter className="border-t pt-4">
                            <Button
                              onClick={() => openTalkDialog(talk)}
                              className="w-full bg-amber-600 hover:bg-amber-700 flex gap-2 items-center"
                            >
                              <Headphones className="h-4 w-4" />
                              <span>Listen Now</span>
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="texts" className="mt-0">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {sacredTexts.map((text, index) => (
                      <motion.div
                        key={text.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={text.image || "/placeholder.svg"}
                              alt={text.title}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            />
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-xl">{text.title}</CardTitle>
                            <CardDescription>{text.language}</CardDescription>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <p className="text-stone-700 mb-4">{text.description}</p>
                            <div className="flex justify-between text-sm text-stone-500">
                              <span>
                                {text.chapters} chapter{text.chapters !== 1 ? "s" : ""}
                              </span>
                              {text.verses && <span>{text.verses} verses</span>}
                            </div>
                          </CardContent>
                          <CardFooter className="border-t pt-4">
                            <Button className="w-full bg-amber-600 hover:bg-amber-700 flex gap-2 items-center">
                              <BookOpen className="h-4 w-4" />
                              <span>Read Text</span>
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="videos" className="mt-0">
                  <div className="grid md:grid-cols-3 gap-8">
                    {videoTeachings.map((video, index) => (
                      <motion.div
                        key={video.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
                          <div className="relative aspect-video overflow-hidden group">
                            <img
                              src={video.thumbnail || "/placeholder.svg"}
                              alt={video.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="w-16 h-16 rounded-full bg-amber-600/90 flex items-center justify-center cursor-pointer transform transition-transform group-hover:scale-110">
                                <Play className="h-6 w-6 text-white" />
                              </div>
                            </div>
                            <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs py-1 px-2 rounded">
                              {video.duration}
                            </div>
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-xl">{video.title}</CardTitle>
                            <CardDescription>By {video.teacher}</CardDescription>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <p className="text-stone-700 mb-2">{video.description}</p>
                            <p className="text-sm text-stone-500">{video.views.toLocaleString()} views</p>
                          </CardContent>
                          <CardFooter className="border-t pt-4">
                            <Button className="w-full bg-amber-600 hover:bg-amber-700 flex gap-2 items-center">
                              <Video className="h-4 w-4" />
                              <span>Watch Video</span>
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="guides" className="mt-0">
                  <div className="grid md:grid-cols-3 gap-8">
                    {practiceGuides.map((guide, index) => (
                      <motion.div
                        key={guide.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={guide.image || "/placeholder.svg"}
                              alt={guide.title}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            />
                            <div className="absolute top-3 right-3 bg-amber-600 text-white text-xs uppercase tracking-wider py-1 px-2 rounded">
                              {guide.format}
                            </div>
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-xl">{guide.title}</CardTitle>
                            <CardDescription>{guide.pages} pages</CardDescription>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <p className="text-stone-700">{guide.description}</p>
                          </CardContent>
                          <CardFooter className="border-t pt-4">
                            <Button className="w-full bg-amber-600 hover:bg-amber-700 flex gap-2 items-center">
                              <Download className="h-4 w-4" />
                              <span>Download Guide</span>
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </div>
      </section>

      {/* Search and Browse Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-stone-50 p-8 md:p-12 rounded-lg shadow-md">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-serif font-light text-stone-800 mb-4">
                  Search Our Teaching Archive
                </h2>
                <p className="text-stone-600">
                  Find specific teachings by topic, teacher, or keyword from our extensive collection
                </p>
              </div>

              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search for teachings, topics, or teachers..."
                  className="w-full pl-12 pr-4 py-4 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-50 rounded-lg">
                  Meditation
                </Button>
                <Button variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-50 rounded-lg">
                  Mindfulness
                </Button>
                <Button variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-50 rounded-lg">
                  Four Noble Truths
                </Button>
                <Button variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-50 rounded-lg">
                  Loving-Kindness
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Featured Series */}
      <section className="py-20 bg-amber-50">
        <div className="container px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <span className="text-amber-600 text-sm tracking-widest uppercase font-medium">Monthly Series</span>
                <h2 className="text-3xl md:text-4xl font-serif font-light text-stone-800 mt-3 mb-6">
                  The Noble Eightfold Path
                </h2>
                <div className="h-px w-20 bg-amber-500 mb-8"></div>

                <p className="text-stone-700 mb-6 leading-relaxed">
                  Join us for our monthly teaching series exploring the Noble Eightfold Path - the Buddha's practical
                  guide to ethical and mental development leading to liberation from suffering.
                </p>

                <p className="text-stone-700 mb-8 leading-relaxed">
                  Each month, we focus on one aspect of the path with in-depth teachings, guided meditations, and
                  practical exercises for daily life.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-700 font-medium">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-stone-800">Right Understanding</h3>
                      <p className="text-stone-600 text-sm">January 2025 - Understanding the Four Noble Truths</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-700 font-medium">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-stone-800">Right Intention</h3>
                      <p className="text-stone-600 text-sm">February 2025 - Cultivating wholesome intentions</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-700 font-medium">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-stone-800">Current: Right Speech</h3>
                      <p className="text-stone-600 text-sm">
                        March 2025 - The power of truthful and compassionate speech
                      </p>
                    </div>
                  </div>
                </div>

                <Button className="bg-amber-600 hover:bg-amber-700 rounded-none flex gap-2 items-center">
                  <span>Join Current Series</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="md:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square bg-white p-3 shadow-md">
                    <img
                      src="/placeholder.svg?height=400&width=400&query=buddhist%20right%20understanding%20teaching"
                      alt="Right Understanding"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square bg-white p-3 shadow-md">
                    <img
                      src="/placeholder.svg?height=400&width=400&query=buddhist%20right%20intention%20teaching"
                      alt="Right Intention"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square bg-white p-3 shadow-md">
                    <img
                      src="/placeholder.svg?height=400&width=400&query=buddhist%20right%20speech%20teaching"
                      alt="Right Speech"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square bg-white p-3 shadow-md">
                    <img
                      src="/placeholder.svg?height=400&width=400&query=buddhist%20noble%20eightfold%20path%20wheel"
                      alt="Noble Eightfold Path"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-6">Join Our Meditation Community</h2>
            <div className="h-px w-20 bg-amber-500 mx-auto mb-8"></div>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              Deepen your practice by joining our weekly online meditation sessions and Dhamma discussions led by our
              resident monks
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 rounded-none px-8 py-6">
                <Link href="/events">View Schedule</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 rounded-none px-8 py-6"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Audio Player Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedTalk?.title}</DialogTitle>
            <DialogDescription>By {selectedTalk?.teacher}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="aspect-video bg-stone-100 rounded overflow-hidden">
              <img
                src={selectedTalk?.image || "/placeholder.svg"}
                alt={selectedTalk?.title || "Dhamma Talk"}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={togglePlay}
                    className="h-10 w-10 rounded-full bg-amber-600 text-white hover:bg-amber-700"
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-stone-700 hover:text-amber-600">
                      <SkipBack className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-stone-700 hover:text-amber-600">
                      <SkipForward className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                  className="text-stone-700 hover:text-amber-600"
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
              </div>

              <div
                ref={progressRef}
                onClick={handleProgressClick}
                className="h-2 bg-stone-200 rounded-full overflow-hidden cursor-pointer"
              >
                <div className="h-full bg-amber-600" style={{ width: `${(currentTime / duration) * 100}%` }}></div>
              </div>

              <div className="flex justify-between text-xs text-stone-500">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700 flex gap-1">
                <Heart className="h-4 w-4" />
                <span>Favorite</span>
              </Button>
              <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700 flex gap-1">
                <Share className="h-4 w-4" />
                <span>Share</span>
              </Button>
              <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700 flex gap-1">
                <Download className="h-4 w-4" />
                <span>Download</span>
              </Button>
            </div>
          </div>

          {/* Hidden audio element */}
          <audio
            ref={audioRef}
            src={selectedTalk?.audioSrc || "#"}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />
        </DialogContent>
      </Dialog>
    </main>
  )
}
