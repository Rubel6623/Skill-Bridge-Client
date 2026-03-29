"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, Users, ArrowRight, GraduationCap } from "lucide-react"
import { Button } from "../../../components/ui/button";

const staticTutors = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    bio: "PhD in Mathematics with 10+ years of teaching experience. Specializes in calculus and linear algebra.",
    subjects: ["Mathematics", "Calculus"],
    rating: 4.9,
    students: 320,
    pricePerHour: 55,
    experience: 10,
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    bio: "Full-stack developer and tech lead at a FAANG company. Passionate about teaching coding to beginners.",
    subjects: ["Python", "JavaScript"],
    rating: 4.8,
    students: 540,
    pricePerHour: 65,
    experience: 8,
  },
  {
    id: "3",
    name: "Emily Parker",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    bio: "IELTS examiner and ESL specialist. Helped 500+ students achieve their target scores.",
    subjects: ["English", "IELTS"],
    rating: 4.7,
    students: 480,
    pricePerHour: 45,
    experience: 12,
  },
  {
    id: "4",
    name: "David Kim",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    bio: "Senior UI/UX Designer with experience at top startups. Expert in Figma and design systems.",
    subjects: ["UI/UX Design", "Figma"],
    rating: 4.9,
    students: 290,
    pricePerHour: 50,
    experience: 7,
  },
]

export const HomeTutors = () => {
  const [tutors, setTutors] = useState<any[]>([])

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tutors`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
        const result = await res.json()
        if (result?.success && result.data?.data?.length > 0) {
          const topTutors = result.data.data
            .sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0))
            .slice(0, 4)
          setTutors(topTutors)
        } else {
          setTutors(staticTutors)
        }
      } catch {
        setTutors(staticTutors)
      }
    }
    fetchTutors()
  }, [])

  const displayTutors = tutors.length > 0 ? tutors : staticTutors

  return (
    <section className="py-24 bg-gradient-to-br from-[#1e293b] via-[#11181c] to-[#0f172a] relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-purple-500/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-orange-500/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-semibold mb-6">
              <GraduationCap className="w-4 h-4" />
              <span>Expert Tutors</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight">
              Meet Our <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Top Tutors</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
              Learn from the best. Our tutors are verified experts with proven track records and thousands of happy students.
            </p>
          </div>
          <Link href="/tutors" className="shrink-0 group">
            <Button variant="outline" className="border-white/10 hover:border-purple-500/50 text-white hover:text-purple-400 bg-white/5 hover:bg-white/10 transition-all h-12 px-6 rounded-xl font-semibold text-base py-6">
              Browse All Tutors <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1.5 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayTutors.map((tutor: any, index: number) => (
            <div
              key={tutor.id || index}
              className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-purple-500/30 hover:bg-white/[0.06] transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-5 border-2 border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.2)] group-hover:border-purple-500/60 transition-all">
                  <Image
                    src={tutor.avatar || tutor.user?.avatar || "https://github.com/shadcn.png"}
                    alt={tutor.name || tutor.user?.name || "Tutor"}
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="text-xl font-bold text-white mb-1">{tutor.name || tutor.user?.name}</h3>
                
                <div className="flex items-center gap-1.5 mb-3">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-semibold text-yellow-400">{tutor.rating?.toFixed(1) || "4.8"}</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Users className="w-3 h-3" /> {tutor.students || "200+"} students
                  </span>
                </div>

                <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                  {(tutor.subjects || tutor.tutorSubjects || []).slice(0, 2).map((sub: any, i: number) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300"
                    >
                      {typeof sub === "string" ? sub : sub?.category?.name || sub?.title || "Subject"}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-gray-400 line-clamp-2 mb-5 leading-relaxed">
                  {tutor.bio || "Experienced tutor dedicated to helping students achieve their goals."}
                </p>

                <div className="flex items-center justify-between w-full pt-4 border-t border-white/10">
                  <div>
                    <span className="text-xl font-bold text-white">${tutor.pricePerHour || "40"}</span>
                    <span className="text-xs text-gray-400">/hr</span>
                  </div>
                  <Link href={`/tutors/${tutor.id}`}>
                    <Button size="sm" className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 hover:text-purple-200 border border-purple-500/30 rounded-lg font-medium text-xs">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
