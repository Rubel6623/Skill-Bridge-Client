"use client"

import { useState, useEffect } from "react"
import { getAllTutorSubjects } from "../../../services/service"
import { ServiceCard } from "../../../components/modules/services/ServiceCard"
import { Search, Filter, Sparkles, BookOpen } from "lucide-react"
import { Button } from "../../../components/ui/button"

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const result = await getAllTutorSubjects();
        if (result?.success) {
          setServices(result.data || [])
        }
      } catch (error) {
        console.error("Failed to fetch services", error)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  const filteredServices = services.filter((s: any) => {
    const title = s.title?.toLowerCase() || ""
    const tutor = s.tutorProfile?.user?.name?.toLowerCase() || ""
    const category = s.category?.name?.toLowerCase() || ""
    const q = searchTerm.toLowerCase()
    return title.includes(q) || tutor.includes(q) || category.includes(q)
  })

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white pt-24 pb-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="mb-16 space-y-6 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest shadow-2xl mx-auto">
            <Sparkles className="w-4 h-4" />
            <span>Premium Learning Hub</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4">
            Elite <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Courses</span>
          </h1>
          <p className="text-xl text-zinc-400 font-medium leading-relaxed">
            Discover specialized tutoring sessions led by industry experts and academic masters. Your journey to excellence starts here.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto pt-6">
            <div className="flex-1 flex items-center bg-white/5 border border-white/10 rounded-2xl px-5 py-2 hover:border-primary/50 transition-all group">
              <Search className="w-5 h-5 text-zinc-500 group-hover:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search subjects, tutors or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none flex-1 px-4 py-3 text-sm font-medium placeholder:text-zinc-600"
              />
            </div>
            <Button className="h-full bg-white text-black hover:bg-primary hover:text-white font-black rounded-2xl px-10 py-5 transition-all shadow-xl text-xs uppercase tracking-widest">
              Explore
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-[400px] bg-white/5 animate-pulse rounded-[2.5rem] border border-white/10" />
            ))}
          </div>
        ) : filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white/[0.02] border border-white/10 rounded-[4rem] backdrop-blur-xl">
             <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10">
                <BookOpen className="w-10 h-10 text-zinc-600" />
             </div>
             <h3 className="text-3xl font-black text-white mb-4 tracking-tight">No courses found</h3>
             <p className="text-zinc-500 max-w-md mx-auto font-medium text-lg px-6">
               Try adjusting your search terms or filters to find the perfect mentor.
             </p>
             <div className="pt-10">
                <Button onClick={() => setSearchTerm("")} className="bg-white text-black hover:bg-primary hover:text-white rounded-2xl px-10 py-5 transition-all font-black text-xs uppercase tracking-widest shadow-2xl">
                   Clear Filters
                </Button>
             </div>
          </div>
        )}
      </div>
    </main>
  )
}
