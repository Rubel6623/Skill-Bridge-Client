"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, Users, Search, GraduationCap, Filter, ArrowRight, Clock } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"


import { useSearchParams } from "next/navigation"

function TutorsContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("query") || ""
  
  const [tutors, setTutors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState(initialQuery)
  const [sortBy, setSortBy] = useState("rating")

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tutors`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
        const result = await res.json()
        if (result?.success && result.data?.data) {
          setTutors(result.data.data || [])
        }
      } catch (error) {
        console.error("Failed to fetch tutors", error)
      } finally {
        setLoading(false)
      }
    }
    fetchTutors()
  }, [])

  const filteredTutors = tutors
    .filter((t: any) => {
      const name = t.user?.name?.toLowerCase() || ""
      const bio = t.bio?.toLowerCase() || ""
      const subjects = (t.subjects || []).map((s: any) => s.title?.toLowerCase() || "")
      const categories = (t.subjects || []).map((s: any) => s.category?.name?.toLowerCase() || "")
      const q = searchTerm.toLowerCase()
      
      return (
        name.includes(q) || 
        bio.includes(q) || 
        subjects.some((s: string) => s.includes(q)) ||
        categories.some((c: string) => c.includes(q))
      )
    })
    .sort((a: any, b: any) => {
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0)
      if (sortBy === "price-low") return (a.pricePerHour || 0) - (b.pricePerHour || 0)
      if (sortBy === "price-high") return (b.pricePerHour || 0) - (a.pricePerHour || 0)
      if (sortBy === "experience") return (b.experience || 0) - (a.experience || 0)
      return 0
    })

  return (
    <>
      {/* Search & Filter Section */}
      <section className="pt-12 pb-16 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-semibold mb-6">
              <GraduationCap className="w-4 h-4" />
              <span>Expert Tutors</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight font-serif">
              Browse <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Tutors</span>
            </h1>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex items-center rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg px-4">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tutors by name or expertise..."
                className="flex-1 bg-transparent outline-none text-white placeholder:text-white/40 py-4 px-3 text-sm font-serif"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[200px] bg-white/5 border-white/10 text-white rounded-xl h-[52px]">
                <Filter className="w-4 h-4 mr-2 text-gray-400" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/10 text-white">
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="experience">Most Experienced</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Tutors Grid */}
      <section className="pb-24 pt-12">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-[360px] bg-white/5 animate-pulse rounded-2xl border border-white/10" />
              ))}
            </div>
          ) : filteredTutors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTutors.map((tutor: any, index: number) => (
                <div key={tutor.id || index} className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-purple-500/30 hover:bg-white/[0.06] transition-all duration-300">
                  <div className="flex items-start gap-5 mb-5">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-purple-500/20">
                      <Image
                        src={tutor.avatar || tutor.user?.avatar || "https://github.com/shadcn.png"}
                        alt={tutor.user?.name || "Tutor"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-white mb-1 truncate">{tutor.user?.name || "Tutor"}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-semibold text-yellow-400">{tutor.rating?.toFixed(1) || "0.0"}</span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {tutor.experience || 0}y exp
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                      <span className="text-2xl font-bold text-white">${tutor.pricePerHour || "0"}</span>
                      <span className="text-sm text-gray-400">/hr</span>
                    </div>
                    <Link href={`/tutors/${tutor.id}`}>
                      <Button size="sm" className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 rounded-xl">
                        View Profile <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-3xl text-white">
              <h3>No matching tutors</h3>
              <Button variant="outline" onClick={() => setSearchTerm("")}>Clear Search</Button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default function TutorsPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("query") || ""
  
  const [tutors, setTutors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState(initialQuery)
  const [sortBy, setSortBy] = useState("rating")

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tutors`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
        const result = await res.json()
        if (result?.success && result.data?.data) {
          setTutors(result.data.data || [])
        }
      } catch (error) {
        console.error("Failed to fetch tutors", error)
      } finally {
        setLoading(false)
      }
    }
    fetchTutors()
  }, [])

  const filteredTutors = tutors
    .filter((t: any) => {
      const name = t.user?.name?.toLowerCase() || ""
      const bio = t.bio?.toLowerCase() || ""
      const subjects = (t.subjects || []).map((s: any) => s.title?.toLowerCase() || "")
      const categories = (t.subjects || []).map((s: any) => s.category?.name?.toLowerCase() || "")
      
      const q = searchTerm.toLowerCase()
      
      return (
        name.includes(q) || 
        bio.includes(q) || 
        subjects.some((s: string) => s.includes(q)) ||
        categories.some((c: string) => c.includes(q))
      )
    })
    .sort((a: any, b: any) => {
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0)
      if (sortBy === "price-low") return (a.pricePerHour || 0) - (b.pricePerHour || 0)
      if (sortBy === "price-high") return (b.pricePerHour || 0) - (a.pricePerHour || 0)
      if (sortBy === "experience") return (b.experience || 0) - (a.experience || 0)
      return 0
    })

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1e293b] via-[#11181c] to-[#0f172a]">
    <Suspense fallback={<div>Loading tutors...</div>}></Suspense>
      {/* Hero Header */}
      <section className="pt-12 pb-16 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-semibold mb-6">
              <GraduationCap className="w-4 h-4" />
              <span>Expert Tutors</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight font-serif">
              Browse <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Tutors</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed">
              Discover verified expert tutors and book personalized one-on-one sessions that fit your schedule.
            </p>
          </div>

          {/* Search & Filter */}
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex items-center rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg px-4">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tutors by name or expertise..."
                className="flex-1 bg-transparent outline-none text-white placeholder:text-white/40 py-4 px-3 text-sm font-serif"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[200px] bg-white/5 border-white/10 text-white rounded-xl h-[52px]">
                <Filter className="w-4 h-4 mr-2 text-gray-400" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/10 text-white">
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="experience">Most Experienced</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Tutors Grid */}
      <section className="pb-24 pt-12">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-[360px] bg-white/5 animate-pulse rounded-2xl border border-white/10" />
              ))}
            </div>
          ) : filteredTutors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTutors.map((tutor: any, index: number) => (
                <div
                  key={tutor.id || index}
                  className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-purple-500/30 hover:bg-white/[0.06] transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]"
                >
                  <div className="flex items-start gap-5 mb-5">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-purple-500/20 group-hover:border-purple-500/50 transition-all">
                      <Image
                        src={tutor.avatar || tutor.user?.avatar || "https://github.com/shadcn.png"}
                        alt={tutor.user?.name || "Tutor"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-white mb-1 truncate">{tutor.user?.name || "Tutor"}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-semibold text-yellow-400">{tutor.rating?.toFixed(1) || "0.0"}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {tutor.experience || 0}y exp
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {(tutor.subjects || []).slice(0, 3).map((sub: any, i: number) => (
                          <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300">
                            {sub?.category?.name || sub?.title || "Subject"}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 line-clamp-2 mb-5 leading-relaxed">
                    {tutor.bio || "Experienced tutor dedicated to helping students succeed."}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                      <span className="text-2xl font-bold text-white">${tutor.pricePerHour || "0"}</span>
                      <span className="text-sm text-gray-400">/hr</span>
                    </div>
                    <Link href={`/tutors/${tutor.id}`}>
                      <Button size="sm" className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 hover:text-purple-200 border border-purple-500/30 rounded-xl font-medium">
                        View Profile <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-3xl">
              <GraduationCap className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                {searchTerm ? "No matching tutors" : "No Tutors Available"}
              </h3>
              <p className="text-gray-400 mb-6">
                {searchTerm ? "Try adjusting your search or filters." : "Check back later for new tutors."}
              </p>
              {searchTerm && (
                <Button variant="outline" className="border-white/10 text-white" onClick={() => setSearchTerm("")}>
                  Clear Search
                </Button>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
