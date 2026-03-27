"use client"

import { useState, useEffect } from "react"
import { getOwnSubjects } from "../../../../services/subject";
import { getBookings } from "../../../../services/booking";
import { BookOpen, Calendar, Star, DollarSign, Clock, Users, TrendingUp, Loader2 } from "lucide-react"
import { format } from "date-fns"

export default function TutorDashboard() {
  const [subjects, setSubjects] = useState<any[]>([])
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [subjectsRes, bookingsRes] = await Promise.all([
          getOwnSubjects(),
          getBookings()
        ])
        
        if (subjectsRes?.success) setSubjects(subjectsRes.data || [])
        if (bookingsRes?.success) setBookings(bookingsRes.data || [])
      } catch (error) {
        console.error("Dashboard error:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchDashboardData()
  }, [])

  const confirmedBookings = bookings.filter(b => b.status === 'CONFIRMED')
  const totalEarnings = bookings
    .filter(b => b.status === 'COMPLETED')
    .reduce((sum, b) => sum + (b.totalPrice || 0), 0)

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground mb-2 tracking-tight">Tutor Dashboard</h1>
          <p className="text-muted-foreground font-medium">Manage your subjects, sessions, and growth.</p>
        </div>
        <div className="px-5 py-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center gap-2 border border-zinc-200 dark:border-zinc-700">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
           <span className="text-xs font-black tracking-widest text-zinc-500 uppercase">Platform Active</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Courses", value: subjects.length, icon: BookOpen, color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/20" },
          { label: "Bookings", value: bookings.length, icon: Calendar, color: "text-orange-500", bg: "bg-orange-500/10 border-orange-500/20" },
          { label: "Active", value: confirmedBookings.length, icon: Clock, color: "text-purple-500", bg: "bg-purple-500/10 border-purple-500/20" },
          { label: "Earnings", value: `$${totalEarnings}`, icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/20" },
        ].map((stat, i) => (
          <div key={i} className={`p-6 rounded-3xl border-2 backdrop-blur-xl ${stat.bg} transition-all hover:scale-[1.03] group`}>
            <div className={`w-14 h-14 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-transparent group-hover:border-inherit flex items-center justify-center mb-6 shadow-xl transition-all ${stat.color}`}>
              <stat.icon className="w-7 h-7" />
            </div>
            <p className="text-4xl font-black text-foreground mb-1 tracking-tighter">{stat.value}</p>
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* My Subjects Section */}
        <div className="rounded-3xl border-2 border-border/50 bg-card/50 backdrop-blur-sm p-8 shadow-2xl overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
             <BookOpen className="w-32 h-32" />
          </div>
          <h2 className="text-2xl font-black mb-8 flex items-center gap-3 tracking-tight">
            <BookOpen className="w-6 h-6 text-blue-500" />
            Courses Offered
          </h2>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => <div key={i} className="h-20 bg-muted/30 animate-pulse rounded-2xl" />)}
            </div>
          ) : subjects.length > 0 ? (
            <div className="space-y-4">
              {subjects.map((subject: any) => (
                <div key={subject.id} className="group/item flex items-center gap-5 p-5 rounded-2xl bg-white/50 dark:bg-zinc-900/50 border border-border/50 hover:border-blue-500/50 hover:bg-white dark:hover:bg-zinc-900 transition-all shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold shrink-0">
                    {subject.title?.[0] || 'S'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-black text-foreground truncate leading-none mb-1">{subject.title}</p>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{subject.category?.name}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/10 rounded-3xl border-2 border-dashed border-border/50">
               <p className="text-muted-foreground font-bold">No courses published yet.</p>
            </div>
          )}
        </div>

        {/* Recent Purchases Section */}
        <div className="rounded-3xl border-2 border-border/50 bg-card/50 backdrop-blur-sm p-8 shadow-2xl group">
          <h2 className="text-2xl font-black mb-8 flex items-center gap-3 tracking-tight">
             <Calendar className="w-6 h-6 text-orange-500" />
             Recent Bookings
          </h2>

          {loading ? (
             <div className="space-y-4">
               {[1, 2, 3].map((i) => <div key={i} className="h-24 bg-muted/30 animate-pulse rounded-2xl" />)}
             </div>
          ) : bookings.length > 0 ? (
             <div className="space-y-4">
                {bookings.slice(0, 4).map((booking: any) => (
                  <div key={booking.id} className="flex flex-col p-5 rounded-2xl bg-white/50 dark:bg-zinc-900/50 border border-border/50 hover:border-orange-500/50 hover:bg-white dark:hover:bg-zinc-900 transition-all shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                       <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border-2 ${
                         booking.status === 'CONFIRMED' ? 'bg-blue-100/50 text-blue-700 border-blue-200/50' :
                         booking.status === 'COMPLETED' ? 'bg-emerald-100/50 text-emerald-700 border-emerald-200/50' :
                         'bg-zinc-100 text-zinc-600 border-zinc-200'
                       }`}>
                         {booking.status}
                       </span>
                       <span className="text-lg font-black text-orange-500 tracking-tighter">${booking.totalPrice}</span>
                    </div>
                    <div>
                       <p className="text-base font-bold text-foreground">Bought by <span className="text-orange-500">{booking.student?.name}</span></p>
                       <p className="text-xs text-muted-foreground font-medium">Session: {format(new Date(booking.startTime), "MMM d, h:mm a")}</p>
                    </div>
                  </div>
                ))}
             </div>
          ) : (
             <div className="text-center py-20 bg-muted/10 rounded-3xl border-2 border-dashed border-border/50">
                <p className="text-muted-foreground font-bold">No sessions booked yet.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  )
}