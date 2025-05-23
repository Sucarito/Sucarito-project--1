"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Users, BookOpen, Heart, Home, Utensils, GraduationCap } from "lucide-react"

export default function DonationImpact() {
  const impactStats = [
    {
      icon: Users,
      title: "Community Members Served",
      current: 4250,
      target: 5000,
      description: "Monthly active participants in our programs",
    },
    {
      icon: BookOpen,
      title: "Educational Programs",
      current: 42,
      target: 50,
      description: "Active learning and meditation programs",
    },
    {
      icon: Utensils,
      title: "Meals Provided",
      current: 15000,
      target: 20000,
      description: "Free meals served to visitors and community",
    },
  ]

  const donationImpacts = [
    {
      amount: "₹2,000",
      icon: Heart,
      title: "Sponsor a Meditation Session",
      description: "Provides materials and guidance for 20 people to learn meditation techniques",
      color: "from-pink-500 to-rose-500",
    },
    {
      amount: "₹5,000",
      icon: BookOpen,
      title: "Support Educational Programs",
      description: "Funds teaching materials and resources for our Buddhist education initiatives",
      color: "from-blue-500 to-indigo-500",
    },
    {
      amount: "₹10,000",
      icon: Home,
      title: "Temple Maintenance",
      description: "Helps maintain our sacred spaces and facilities for future generations",
      color: "from-amber-500 to-orange-500",
    },
    {
      amount: "₹25,000",
      icon: GraduationCap,
      title: "Scholarship Program",
      description: "Provides full educational support for underprivileged students",
      color: "from-green-500 to-emerald-500",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Your Impact in Action</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See how your generous contributions are making a real difference in our community and beyond. Together,
            we're building a more compassionate world.
          </p>
        </div>

        {/* Progress Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {impactStats.map((stat, index) => {
            const Icon = stat.icon
            const percentage = (stat.current / stat.target) * 100

            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <Icon className="h-6 w-6 text-amber-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{stat.title}</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">
                        {stat.current.toLocaleString()} / {stat.target.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                    <p className="text-sm text-gray-500">{stat.description}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Donation Impact Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {donationImpacts.map((impact, index) => {
            const Icon = impact.icon

            return (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
              >
                <div className={`h-2 bg-gradient-to-r ${impact.color}`}></div>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${impact.color} mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">{impact.amount}</div>
                    <h3 className="font-semibold text-gray-900 mb-3">{impact.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{impact.description}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
