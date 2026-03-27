"use client"

import { useState, useEffect } from "react"
import { getAllCategories } from "../../../services/service";
import Link from "next/link"
import { ArrowRight, BookOpen, Code, FlaskConical, Globe, Palette, BarChart3, Music, Calculator } from "lucide-react"

const categoryIcons: Record<string, any> = {
  "programming": Code,
  "mathematics": Calculator,
  "science": FlaskConical,
  "languages": Globe,
  "design": Palette,
  "marketing": BarChart3,
  "music": Music,
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
  "text-blue-400",
  "text-red-400",
  "text-emerald-400",
  "text-purple-400",
  "text-amber-400",
  "text-pink-400",
  "text-cyan-400",
  "text-orange-400",
]

export const HomeCategories = () => {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

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

  return (
    <section className="py-24 bg-gradient-to-br from-[#1e293b] via-[#11181c] to-[#0f172a] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-semibold mb-6">
            <BookOpen className="w-4 h-4" />
            <span>Popular Categories</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight">
            Explore by <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Category</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
            Find the perfect subject and start learning from expert tutors in your area of interest.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-[180px] bg-white/5 animate-pulse rounded-2xl border border-white/10" />
            ))}
          </div>
        ) : categories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {categories.map((cat: any, index: number) => {
              const slug = cat.slug?.toLowerCase() || ""
              const IconComponent = categoryIcons[slug] || BookOpen
              const colorClass = categoryColors[index % categoryColors.length]
              const iconColor = iconColors[index % iconColors.length]

              return (
                <Link href={`/categories/${cat.slug}`} key={cat.id} className="no-underline group">
                  <div className={`relative p-6 rounded-2xl bg-gradient-to-br ${colorClass} border backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-xl cursor-pointer`}>
                    <div className={`w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${iconColor}`}>
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-white/90">{cat.name}</h3>
                    <p className="text-sm text-gray-400 mb-3">
                      {cat._count?.tutorSubjects || 0} Tutors Available
                    </p>
                    <div className="flex items-center text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                      Explore <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-3xl">
            <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Categories Yet</h3>
            <p className="text-gray-400">Categories will appear here once available.</p>
          </div>
        )}
      </div>
    </section>
  )
}
