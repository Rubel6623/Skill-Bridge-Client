"use client"

import { useState, useEffect } from "react"
import { getOwnSubjects } from "@/services/subject"
import { BookOpen, Calendar, Star, DollarSign, Clock, Users, TrendingUp } from "lucide-react"

export default function TutorDashboard() {
  const [subjects, setSubjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const result = await getOwnSubjects()
        if (result?.success) {
          setSubjects(result.data || [])
        }
      } catch (error) {
        console.error("Failed to fetch subjects", error)
      } finally {
        setLoading(false)
      }
    }
    fetchSubjects()
  }, [])

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-foreground mb-2">Tutor Dashboard</h1>
        <p className="text-muted-foreground">Manage your subjects, bookings, and track your performance.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "My Subjects", value: subjects.length, icon: BookOpen, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
          { label: "Total Bookings", value: "—", icon: Calendar, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
          { label: "Avg Rating", value: "4.8", icon: Star, color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
          { label: "Total Earnings", value: "$—", icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
        ].map((stat, i) => (
          <div key={i} className={`p-5 rounded-2xl border backdrop-blur-sm ${stat.bg} transition-all hover:scale-[1.02]`}>
            <div className={`w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <p className="text-3xl font-extrabold text-foreground mb-1">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* My Subjects */}
      <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6">
        <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-muted-foreground" />
          My Subjects
        </h2>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-muted/30 animate-pulse rounded-xl" />
            ))}
          </div>
        ) : subjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjects.map((subject: any, i: number) => (
              <div key={subject.id || i} className="flex items-center gap-4 p-4 rounded-xl border border-border/30 hover:bg-muted/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {subject.title || subject.category?.name || "Subject"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {subject.category?.name || "General"} • {subject.bookings?.length || 0} bookings
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">You haven&apos;t added any subjects yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}