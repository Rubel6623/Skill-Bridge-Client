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
} from "../../../components/ui/carousel"
import { Card, CardContent } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Button } from "../../../components/ui/button"
import { getAllTutorSubjects } from "../../../services/service";
import { ServiceCard } from "../services/ServiceCard";
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=1200",
];

export function HeroCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: true })
  );

  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const result = await getAllTutorSubjects();
        if (result?.success && result?.data?.length > 0) {
          setSubjects(result.data.slice(0, 6));
        }
      } catch (e) {
        console.error("Failed to fetch carousel subjects", e);
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  if (loading) {
    return (
      <div className="relative w-full mx-auto py-10">
        <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-slate-100 dark:bg-white/5 backdrop-blur-xl overflow-hidden animate-pulse">
          <div className="flex flex-col md:flex-row items-center gap-10 p-10">
            <div className="flex-1 space-y-5">
              <div className="h-5 w-24 bg-black/10 dark:bg-white/10 rounded-full" />
              <div className="h-10 w-3/4 bg-black/10 dark:bg-white/10 rounded-xl" />
              <div className="h-4 w-full bg-black/10 dark:bg-white/10 rounded" />
              <div className="h-4 w-2/3 bg-black/10 dark:bg-white/10 rounded" />
              <div className="h-12 w-40 bg-black/10 dark:bg-white/10 rounded-xl" />
            </div>
            <div className="w-full md:w-[280px] h-48 bg-black/10 dark:bg-white/10 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!subjects.length) return null;

  return (
    <div className="relative w-full mx-auto py-10">
      <Carousel plugins={[plugin.current]} className="w-full">
        <CarouselContent>
          {subjects.map((subject: any, index: number) => {
            const image =
              subject.image ||
              subject.thumbnail ||
              FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
            const tutorId = subject.tutorId || subject.tutor?.id;
            const subjectTitle = subject.title || subject.name || "Expert Subject";
            const category = subject.category?.name || "General";
            const price = subject.pricePerHour
              ? `$${subject.pricePerHour}/hr`
              : "Custom Rate";
            const tutorName = subject.tutor?.user?.name || "Expert Tutor";
            const rating = subject.tutor?.rating?.toFixed(1) || "5.0";
            const experience = subject.tutor?.experience
              ? `${subject.tutor.experience}y exp`
              : null;

            return (
              <CarouselItem key={subject.id || index}>
                <Card className="relative overflow-hidden border border-black/5 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-xl rounded-3xl">
                  <CardContent className="relative flex flex-col md:flex-row items-center gap-10 p-10">
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 opacity-5 dark:opacity-15 bg-cover bg-center"
                      style={{ backgroundImage: `url(${image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 dark:from-black/60 dark:via-black/30 to-transparent" />

                    {/* Left Content */}
                    <div className="relative z-10 flex-1 space-y-5">
                      <div className="flex gap-3 flex-wrap">
                        <Badge variant="secondary" className="bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/20 dark:border-orange-500/40 text-[10px] font-black uppercase tracking-widest">
                          {category}
                        </Badge>
                        <Badge className="bg-black/5 dark:bg-white/10 text-gray-600 dark:text-white/60 border border-black/10 dark:border-white/10 text-[10px] font-black uppercase tracking-widest">
                          {index === 0 ? "🔥 Trending" : index === 1 ? "⭐ Top Rated" : "📈 High Demand"}
                        </Badge>
                      </div>

                      <h2 className="text-3xl md:text-4xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white">
                        {subjectTitle}
                      </h2>

                      <p className="text-gray-600 dark:text-white/50 max-w-lg text-sm leading-relaxed font-medium italic">
                        {subject.description ||
                          `Master ${subjectTitle} with personalized one-on-one sessions from ${tutorName}. Achieve your goals faster with expert-guided learning.`}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-white/30 font-black uppercase tracking-widest">
                        <span className="text-yellow-500 dark:text-yellow-400">★ {rating}</span>
                        {experience && <span>{experience}</span>}
                        <span className="text-orange-600 dark:text-orange-400 text-base font-black">{price}</span>
                      </div>

                      <Link href={tutorId ? `/tutors/${tutorId}` : `/tutors?query=${encodeURIComponent(subjectTitle)}`}>
                        <Button
                          size="lg"
                          className="rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 font-black text-sm uppercase tracking-widest shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5 text-white"
                        >
                          Start Learning · {price}
                        </Button>
                      </Link>
                    </div>

                    {/* Right Card */}
                    <div className="relative z-10 w-full md:w-[280px] shrink-0">
                      <Card className="bg-slate-50/80 dark:bg-black/40 border border-black/5 dark:border-white/10 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl dark:shadow-none">
                        <div className="relative h-36 w-full overflow-hidden">
                          <img src={image} alt={subjectTitle} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-white/90 dark:from-black/80 to-transparent" />
                        </div>
                        <CardContent className="p-5 space-y-4">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 dark:text-white/30 mb-1">Your Instructor</p>
                            <p className="text-gray-900 dark:text-white font-black text-base tracking-tight">{tutorName}</p>
                          </div>
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-white/40">
                            <span>★ {rating} Rating</span>
                            {experience && <span>{experience}</span>}
                          </div>
                          <Link
                            href={tutorId ? `/tutors/${tutorId}` : `/tutors?query=${encodeURIComponent(subjectTitle)}`}
                            className="block"
                          >
                            <Button className="w-full rounded-xl bg-gray-200 dark:bg-white/10 hover:bg-orange-500 dark:hover:bg-orange-500 border border-transparent dark:border-white/10 text-gray-900 dark:text-white font-black text-xs uppercase tracking-widest transition-all">
                              Book Session
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious className="left-4 bg-white dark:bg-white/10 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all shadow-md" />
        <CarouselNext className="right-4 bg-white dark:bg-white/10 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all shadow-md" />
      </Carousel>
    </div>
  );
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
    <section className="py-24 bg-slate-50 dark:bg-gradient-to-br dark:from-[#1e293b] dark:via-[#11181c] dark:to-[#0f172a] relative border-t border-black/5 dark:border-white/5 overflow-hidden">
      <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] -z-10 pointer-events-none shadow-[0_0_40px_rgba(var(--primary),0.2)]" />
      <div className="absolute bottom-0 -right-32 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6 shadow-sm shadow-primary/10">
              <Sparkles className="w-4 h-4" />
              <span>Featured Subjects</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-5 tracking-tight">
              Discover Top-Rated <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 drop-shadow-sm">Tutors</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
              Explore our handpicked selection of premium tutoring services. Learn from the best and achieve your goals faster with personalized sessions.
            </p>
          </div>
          <Link href="/services" className="shrink-0 group z-10">
            <Button variant="outline" className="border-black/10 dark:border-white/10 hover:border-primary/50 text-gray-900 dark:text-white hover:text-primary bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 group-hover:shadow-[0_0_20px_rgba(var(--primary),0.25)] transition-all h-12 px-6 rounded-xl font-semibold text-base py-6 shadow-sm dark:shadow-none">
              View All Subjects <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1.5 transition-transform" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[400px] bg-slate-200 dark:bg-white/5 animate-pulse rounded-3xl border border-black/5 dark:border-white/10" />
            ))}
          </div>
        ) : featuredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10">
            {featuredServices.map((service: any) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl backdrop-blur-sm relative z-10 shadow-xl dark:shadow-none">
            <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-4 border border-black/5 dark:border-white/10">
              <Sparkles className="w-8 h-8 text-primary/50" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">No Services Available</h3>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Check back later for new top-tier tutor subjects.</p>
          </div>
        )}
      </div>
    </section>
  );
};