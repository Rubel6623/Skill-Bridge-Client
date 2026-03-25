"use client"

import { useState, useEffect } from "react"
import { getAllCategories } from "@/services/service"
import Link from "next/link"
import { BookOpen, Code, FlaskConical, Globe, Palette, BarChart3, Music, Calculator, ArrowRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

const categoryIcons: Record<string, any> = {
  programming: Code,
  mathematics: Calculator,
  science: FlaskConical,
  languages: Globe,
  design: Palette,
  marketing: BarChart3,
  music: Music,
}

const categoryColors: string[] = [
  "from-blue-500/20 to-blue-600/10 border-blue-500/20 hover:border-blue-500/40",
  "from-red-500/20 to-red-600/10 border-red-500/20 hover:border-red-500/40",
  "from-emerald-500/20 to-emerald-600/10 border-emerald-500/20 hover:border-emerald-500/40",
  "from-purple-500/20 to-purple-600/10 border-purple-500/20 hover:border-purple-500/40",
  "from-amber-500/20 to-amber-600/10 border-amber-500/20 hover:border-amber-500/40",
  "from-pink-500/20 to-pink-600/10 border-pink-500/20 hover:border-pink-500/40",
  "from-cyan-500/20 to-cyan-600/10 border-cyan-500/20 hover:border-cyan-500/40",
  "from-orange-500/20 to-orange-600/10 border-orange-500/20 hover:border-orange-500/40",
]

const iconColors: string[] = [
  "text-blue-400", "text-red-400", "text-emerald-400", "text-purple-400",
  "text-amber-400", "text-pink-400", "text-cyan-400", "text-orange-400",
]

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getAllCategories()
        if (result?.data) {
          setCategories(Array.isArray(result.data) ? result.data : [])
        }
      } catch (error) {
        console.error("Failed to fetch categories", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  const filteredCategories = categories.filter((cat: any) =>
    cat.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1e293b] via-[#11181c] to-[#0f172a]">
      {/* Hero Header */}
      <section className="pt-12 pb-16 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-semibold mb-6">
              <BookOpen className="w-4 h-4" />
              <span>All Categories</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight font-serif">
              Explore <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Categories</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed">
              Browse through our wide range of subjects and find the perfect tutor for your learning goals.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-xl mx-auto mb-12">
            <div className="flex items-center rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg px-4">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search categories..."
                className="flex-1 bg-transparent outline-none text-white placeholder:text-white/40 py-4 px-3 text-sm font-serif"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="pb-24 pt-12">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="h-[200px] bg-white/5 animate-pulse rounded-2xl border border-white/10" />
              ))}
            </div>
          ) : filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredCategories.map((cat: any, index: number) => {
                const slug = cat.slug?.toLowerCase() || ""
                const IconComponent = categoryIcons[slug] || BookOpen
                const colorClass = categoryColors[index % categoryColors.length]
                const iconColor = iconColors[index % iconColors.length]

                return (
                  <Link href={`/categories/${cat.slug}`} key={cat.id} className="no-underline group">
                    <div className={`relative p-6 rounded-2xl bg-gradient-to-br ${colorClass} border backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-xl h-full`}>
                      <div className={`w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${iconColor}`}>
                        <IconComponent className="w-7 h-7" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{cat.name}</h3>
                      <p className="text-sm text-gray-400 mb-4">
                        {cat._count?.tutorSubjects || 0} Tutors Available
                      </p>
                      <div className="flex items-center text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                        Browse Tutors <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-3xl">
              <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                {searchTerm ? "No matching categories" : "No Categories Yet"}
              </h3>
              <p className="text-gray-400 mb-6">
                {searchTerm ? "Try a different search term." : "Categories will appear here once available."}
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
