import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sunrise, Sun, Sunset, Moon } from "lucide-react"

export default function Schedule() {
  return (
    <section id="schedule" className="pt-24 pb-20 bg-stone-100">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-stone-800">Daily Schedule</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="backdrop-blur-sm bg-white/80 border-none shadow-md">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Sunrise className="h-5 w-5 text-amber-600" />
                <CardTitle className="text-lg">Morning</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-stone-700">Morning Chanting</span>
                  <span className="text-amber-700 font-medium">5:30 AM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-stone-700">Meditation</span>
                  <span className="text-amber-700 font-medium">6:00 AM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-stone-700">Breakfast</span>
                  <span className="text-amber-700 font-medium">7:00 AM</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/80 border-none shadow-md">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Sun className="h-5 w-5 text-amber-600" />
                <CardTitle className="text-lg">Midday</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-stone-700">Dhamma Talk</span>
                  <span className="text-amber-700 font-medium">10:00 AM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-stone-700">Lunch Offering</span>
                  <span className="text-amber-700 font-medium">11:00 AM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-stone-700">Rest Period</span>
                  <span className="text-amber-700 font-medium">12:00 PM</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/80 border-none shadow-md">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Sunset className="h-5 w-5 text-amber-600" />
                <CardTitle className="text-lg">Afternoon</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-stone-700">Study Period</span>
                  <span className="text-amber-700 font-medium">2:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-stone-700">Tea Time</span>
                  <span className="text-amber-700 font-medium">3:30 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-stone-700">Walking Meditation</span>
                  <span className="text-amber-700 font-medium">4:30 PM</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/80 border-none shadow-md">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Moon className="h-5 w-5 text-amber-600" />
                <CardTitle className="text-lg">Evening</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-stone-700">Evening Chanting</span>
                  <span className="text-amber-700 font-medium">6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-stone-700">Group Meditation</span>
                  <span className="text-amber-700 font-medium">7:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-stone-700">Rest</span>
                  <span className="text-amber-700 font-medium">9:00 PM</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
