"use client"

import * as React from "react"
import { useState, useEffect } from "react"
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
import { getAllTutorSubjects } from "@/services/service"
import { ServiceCard } from "../services/ServiceCard"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

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

                  <div
                    className="absolute inset-0 opacity-20 bg-cover bg-center"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  />

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

export const HomeServices = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const result = await getAllTutorSubjects();
        if (result?.success) {
          setServices(result.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch services", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const featuredServices = services.slice(0, 4);

  return (
    <section className="py-24 bg-gradient-to-br from-[#1e293b] via-[#11181c] to-[#0f172a] relative border-t border-white/5 overflow-hidden">
      <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] -z-10 pointer-events-none shadow-[0_0_40px_rgba(var(--primary),0.2)]" />
      <div className="absolute bottom-0 -right-32 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6 shadow-sm shadow-primary/10">
              <Sparkles className="w-4 h-4" />
              <span>Featured Subjects</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight">
              Discover Top-Rated <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 drop-shadow-sm">Tutors</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
              Explore our handpicked selection of premium tutoring services. Learn from the best and achieve your goals faster with personalized sessions.
            </p>
          </div>
          <Link href="/services" className="shrink-0 group z-10">
            <Button variant="outline" className="border-white/10 hover:border-primary/50 text-white hover:text-primary bg-white/5 hover:bg-white/10 group-hover:shadow-[0_0_20px_rgba(var(--primary),0.25)] transition-all h-12 px-6 rounded-xl font-semibold text-base py-6">
              View All Subjects <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1.5 transition-transform" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[400px] bg-white/5 animate-pulse rounded-3xl border border-white/10" />
            ))}
          </div>
        ) : featuredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10">
            {featuredServices.map((service: any) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-sm relative z-10">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4 border border-white/10">
              <Sparkles className="w-8 h-8 text-primary/50" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">No Services Available</h3>
            <p className="text-gray-400 font-medium">Check back later for new top-tier tutor subjects.</p>
          </div>
        )}
      </div>
    </section>
  );
};