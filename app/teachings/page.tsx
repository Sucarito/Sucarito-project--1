import InnerPageLayout from "@/components/inner-page-layout"
import PageHeaderContent from "@/components/page-header-content"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Headphones, Video, Download } from "lucide-react"

export default function TeachingsPage() {
  return (
    <InnerPageLayout
      headerContent={
        <PageHeaderContent
          title="Buddhist Teachings"
          description="Explore the wisdom of Buddha through our collection of texts, talks, and resources"
        />
      }
    >
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-stone-700 mb-8">
            The Burmese Vihar in Bodhgaya is dedicated to preserving and sharing the teachings of Buddha. Our collection
            includes ancient texts, modern interpretations, and practical guides for meditation and mindful living.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="border-none shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-5 w-5 text-amber-600" />
                  <CardTitle className="text-lg">Dhamma Texts</CardTitle>
                </div>
                <CardDescription>Essential Buddhist texts and translations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="border-b pb-2">
                  <h4 className="font-medium text-stone-800">Dhammapada</h4>
                  <p className="text-sm text-stone-600">Ancient collection of Buddha's teachings in verse form</p>
                </div>
                <div className="border-b pb-2">
                  <h4 className="font-medium text-stone-800">Satipatthana Sutta</h4>
                  <p className="text-sm text-stone-600">The Buddha's discourse on the foundations of mindfulness</p>
                </div>
                <div className="border-b pb-2">
                  <h4 className="font-medium text-stone-800">Metta Sutta</h4>
                  <p className="text-sm text-stone-600">The Buddha's words on loving-kindness meditation</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-amber-600 text-amber-700 hover:bg-amber-50">
                  Browse All Texts
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Headphones className="h-5 w-5 text-amber-600" />
                  <CardTitle className="text-lg">Dhamma Talks</CardTitle>
                </div>
                <CardDescription>Audio recordings of Dhamma talks by our teachers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="border-b pb-2">
                  <h4 className="font-medium text-stone-800">The Four Noble Truths</h4>
                  <p className="text-sm text-stone-600">By Sayadaw U Nandisara (45 min)</p>
                </div>
                <div className="border-b pb-2">
                  <h4 className="font-medium text-stone-800">Mindfulness in Daily Life</h4>
                  <p className="text-sm text-stone-600">By Sayadaw U Jotika (38 min)</p>
                </div>
                <div className="border-b pb-2">
                  <h4 className="font-medium text-stone-800">The Path to Liberation</h4>
                  <p className="text-sm text-stone-600">By Sayadaw U Nyaneinda (52 min)</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-amber-600 text-amber-700 hover:bg-amber-50">
                  Listen to Talks
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Download className="h-5 w-5 text-amber-600" />
                  <CardTitle className="text-lg">Downloadable Resources</CardTitle>
                </div>
                <CardDescription>Practice guides and meditation instructions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="border-b pb-2">
                  <h4 className="font-medium text-stone-800">Beginner's Guide to Meditation</h4>
                  <p className="text-sm text-stone-600">PDF guide with step-by-step instructions (12 pages)</p>
                </div>
                <div className="border-b pb-2">
                  <h4 className="font-medium text-stone-800">Pali Chanting Book</h4>
                  <p className="text-sm text-stone-600">Common Buddhist chants with translations (25 pages)</p>
                </div>
                <div className="border-b pb-2">
                  <h4 className="font-medium text-stone-800">Buddhist Calendar 2025</h4>
                  <p className="text-sm text-stone-600">Calendar with Buddhist holy days and moon phases</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-amber-600 text-amber-700 hover:bg-amber-50">
                  Download Resources
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-16 bg-amber-50 rounded-lg p-6 md:p-8">
            <h3 className="text-2xl font-semibold text-stone-800 mb-4">Video Teachings</h3>
            <div className="aspect-video bg-black/5 rounded-lg flex items-center justify-center mb-6">
              <div className="text-center">
                <Video className="h-12 w-12 text-amber-600 mx-auto mb-3" />
                <p className="text-stone-600">Video player will be displayed here</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <Button className="bg-amber-600 hover:bg-amber-700 flex gap-2">
                <Video className="h-4 w-4" />
                <span>Meditation Guide</span>
              </Button>
              <Button className="bg-amber-600 hover:bg-amber-700 flex gap-2">
                <Video className="h-4 w-4" />
                <span>Temple Tour</span>
              </Button>
              <Button className="bg-amber-600 hover:bg-amber-700 flex gap-2">
                <Video className="h-4 w-4" />
                <span>Dhamma Talks</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </InnerPageLayout>
  )
}
