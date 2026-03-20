// ...existing code...
// removed stray string: "@/components/ui/badge"
"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const slides = [
  {
    title: "Master Python Programming",
    subtitle:
      "Build real-world projects with industry mentors and level up your career.",
    tag: "Programming",
    badge: "Trending",
    rating: 4.8,
    reviews: 1689,
    students: "9.2k+",
    duration: "75 min",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
    price: "$45/hr",
  },
  {
    title: "Spoken English Fluency",
    subtitle:
      "Improve pronunciation, grammar and confidence with expert tutors.",
    tag: "Languages",
    badge: "Top Rated",
    rating: 4.2,
    reviews: 1689,
    students: "9.2k+",
    duration: "75 min",
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1200&auto=format&fit=crop",
    price: "$35/hr",
  },
  {
    title: "SAT Math Score 800",
    subtitle:
      "Strategic practice sessions to maximize your SAT math performance.",
    tag: "Mathematics",
    badge: "High Demand",
    rating: 4.8,
    reviews: 1689,
    students: "9.2k+",
    duration: "75 min",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&auto=format&fit=crop",
    price: "$60/hr",
  },
  {
  id: 5,
  badge: "💼 Career Boost",
  title: "Master Digital Marketing",
  subtitle:
    "Learn SEO, Meta Ads, Google Ads, and real-world growth strategies from a marketing consultant who has scaled 50+ brands globally.",
  tutor: "Olivia Martinez",
  rating: 4.9,
  reviews: 1420,
  students: "7.8k+",
  duration: "60 min",
  price: "$48/hr",
  tag: "Marketing",
  image:
    "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=1200",
  href: "/tutors?category=marketing",
  avatarText: "OM",
},

{
  id: 6,
  badge: "🎨 Creative",
  title: "UI/UX Design From Scratch",
  subtitle:
    "Design beautiful, user-friendly interfaces using Figma and real product case studies. Build a strong portfolio for tech jobs.",
  tutor: "Daniel Brooks",
  rating: 4.8,
  reviews: 1689,
  students: "9.2k+",
  duration: "75 min",
  price: "$52/hr",
  tag: "Design",
  image:
    "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=1200",
  href: "/tutors?category=design",
  avatarText: "DB",
}
]

export function HeroCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  return (
    <div className="relative w-full mx-auto py-10">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <Card className="relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl">
                <CardContent className="relative flex flex-col md:flex-row items-center gap-10 p-10">
                  
                  {/* Background image */}
                  <div
                    className="absolute inset-0 opacity-20 bg-cover bg-center"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  />

                  {/* Left Content */}
                  <div className="relative z-10 flex-1 space-y-6">
                    <div className="flex gap-3 flex-wrap">
                      <Badge variant="secondary" className="bg-orange-500/20 text-orange-400 border border-orange-500/40">
                        {slide.tag}
                      </Badge>
                      <Badge className="bg-muted text-muted-foreground">
                        {slide.badge}
                      </Badge>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                      {slide.title}
                    </h2>

                    <p className="text-muted-foreground max-w-lg">
                      {slide.subtitle}
                    </p>

                    <Button size="lg" className="rounded-xl bg-amber-400">
                      Start Learning · {slide.price}
                    </Button>
                  </div>

                  {/* Right preview card */}
                  <div className="relative z-10 w-full md:w-[320px]">
                    <Card className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl">
                      <CardContent className="p-6 space-y-4">
                        <div className="text-lg font-semibold">
                          Expert Tutor
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {slide.reviews} ★ Rating
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {slide.students} Students
                        </p>
                        <Button className="w-full bg-amber-400">
                          Book Session
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  )
}