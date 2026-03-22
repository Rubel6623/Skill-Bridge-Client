"use client"

import { useState, useEffect } from "react"
import { getBookings } from "@/services/booking"
import { BookOpen, Calendar, Star, Clock, TrendingUp, GraduationCap } from "lucide-react"

export default function StudentDashboard() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const result = await getBookings()
        if (result?.success) {
          setBookings(result.data || [])
        }
      } catch (error) {
        console.error("Failed to fetch bookings", error)
      } finally {
        setLoading(false)
      }
    }
    fetchBookings()
  }, [])

  const confirmedBookings = bookings.filter((b: any) => b.status === "CONFIRMED")
  const completedBookings = bookings.filter((b: any) => b.status === "COMPLETED")

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-foreground mb-2">Student Dashboard</h1>
        <p className="text-muted-foreground">Track your learning progress and upcoming sessions.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Total Bookings", value: bookings.length, icon: Calendar, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
          { label: "Upcoming Sessions", value: confirmedBookings.length, icon: Clock, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
          { label: "Completed", value: completedBookings.length, icon: GraduationCap, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
          { label: "Subjects Enrolled", value: new Set(bookings.map((b: any) => b.tutorSubjectId)).size, icon: BookOpen, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
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

      {/* Upcoming Bookings */}
      <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6">
        <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          Your Bookings
        </h2>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-muted/30 animate-pulse rounded-xl" />
            ))}
          </div>
        ) : bookings.length > 0 ? (
          <div className="space-y-3">
            {bookings.slice(0, 5).map((booking: any, i: number) => (
              <div key={booking.id || i} className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/30 transition-colors border border-border/30">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full shrink-0 ${
                    booking.status === "CONFIRMED" ? "bg-blue-500" :
                    booking.status === "COMPLETED" ? "bg-emerald-500" :
                    booking.status === "CANCELLED" ? "bg-red-500" : "bg-yellow-500"
                  }`} />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {booking.tutorSubject?.category?.name || "Session"} with {booking.tutorProfile?.user?.name || "Tutor"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(booking.startTime).toLocaleDateString()} at {new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                    booking.status === "CONFIRMED" ? "bg-blue-500/10 text-blue-400" :
                    booking.status === "COMPLETED" ? "bg-emerald-500/10 text-emerald-400" :
                    booking.status === "CANCELLED" ? "bg-red-500/10 text-red-400" : "bg-yellow-500/10 text-yellow-400"
                  }`}>
                    {booking.status}
                  </span>
                  <span className="text-sm font-bold text-foreground">${booking.totalPrice}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No bookings yet. Start exploring tutors!</p>
          </div>
        )}
      </div>
    </div>
  )
}