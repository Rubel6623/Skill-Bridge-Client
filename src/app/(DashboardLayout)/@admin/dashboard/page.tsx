"use client"

import { useState, useEffect } from "react"
import { getAllBookings } from "../../../../services/booking"
import { getAllUsers } from "../../../../services/user"
import { Users, BookOpen, Calendar, Star, Clock, TrendingUp, ArrowUpRight, Loader2, CheckCircle2, XCircle, MoreVertical } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"
import { Button } from "../../../../components/ui/button"

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStatsAndBookings = async () => {
      try {
        const [bookingRes, userRes] = await Promise.all([
          getAllBookings(),
          getAllUsers()
        ])
        
        if (bookingRes.success) setBookings(bookingRes.data || [])
        if (userRes.success) setUsers(userRes.data || [])
      } catch (error) {
        console.error("Failed to fetch dashboard data", error)
      } finally {
        setLoading(false)
      }
    }
    fetchStatsAndBookings()
  }, [])

  const stats = [
    { 
      label: "Total Users", 
      value: loading ? "..." : users.length.toString(), 
      icon: Users, 
      change: "+12%", 
      color: "text-blue-400", 
      bg: "bg-blue-500/10 border-blue-500/20" 
    },
    { 
      label: "Active Tutors", 
      value: loading ? "..." : users.filter(u => u.role === 'TUTOR').length.toString(), 
      icon: BookOpen, 
      change: "+8%", 
      color: "text-emerald-400", 
      bg: "bg-emerald-500/10 border-emerald-500/20" 
    },
    { 
      label: "Total Bookings", 
      value: loading ? "..." : bookings.length.toString(), 
      icon: Calendar, 
      change: "+24%", 
      color: "text-orange-400", 
      bg: "bg-orange-500/10 border-orange-500/20" 
    },
    { 
      label: "Avg Rating", 
      value: "4.8", 
      icon: Star, 
      change: "+0.2", 
      color: "text-yellow-400", 
      bg: "bg-yellow-500/10 border-yellow-500/20" 
    },
  ]

  const recentBookings = bookings.slice(0, 5)

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-foreground mb-2 flex items-center gap-3">
            Admin <span className="text-orange-500">Dashboard</span>
          </h1>
          <p className="text-muted-foreground text-lg">Platform-wide overview and mission control.</p>
        </div>
        <Link href="/dashboard/manage-bookings">
          <Button variant="outline" className="rounded-2xl gap-2 font-bold shadow-sm border-orange-500/20 hover:bg-orange-500/10 transition-all">
            Manage All Bookings <ArrowUpRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className={`p-6 rounded-3xl border backdrop-blur-md ${stat.bg} transition-all hover:scale-[1.02] shadow-sm`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-black text-emerald-400 flex items-center gap-0.5 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 uppercase tracking-wider">
                <TrendingUp className="w-3 h-3" /> {stat.change}
              </span>
            </div>
            <p className="text-4xl font-black text-foreground mb-1 tracking-tight">{stat.value}</p>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Activity / Bookings */}
        <div className="xl:col-span-2 rounded-[2.5rem] border border-border/50 bg-card/50 backdrop-blur-xl p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black flex items-center gap-3">
              <div className="bg-orange-500/20 p-2 rounded-xl">
                <Calendar className="w-6 h-6 text-orange-500" />
              </div>
              Recent Bookings
            </h2>
            <Link href="/dashboard/manage-bookings" className="text-sm font-bold text-orange-500 hover:underline">
              View All
            </Link>
          </div>

          {loading ? (
             <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
                <p className="font-bold text-muted-foreground animate-pulse">Synchronizing records...</p>
             </div>
          ) : recentBookings.length > 0 ? (
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center gap-4 p-4 rounded-3xl bg-muted/30 border border-border/40 hover:bg-muted/50 transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950 flex items-center justify-center font-black text-orange-600 border border-orange-200 dark:border-orange-800">
                    {booking.student?.name?.[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-foreground truncate">{booking.tutorSubject?.title || 'Session'}</p>
                    <p className="text-sm text-muted-foreground truncate font-medium">
                      Student: <span className="text-foreground">{booking.student?.name}</span> • Tutor: <span className="text-foreground">{booking.tutorProfile?.user?.name}</span>
                    </p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="font-bold text-foreground">{format(new Date(booking.startTime), "MMM d")}</p>
                    <p className="text-xs text-muted-foreground">{format(new Date(booking.startTime), "p")}</p>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter border-2 ${
                    booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                    booking.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                    booking.status === 'COMPLETED' ? 'bg-emerald-100 text-green-800 border-emerald-200' :
                    'bg-red-100 text-red-800 border-red-200'
                  }`}>
                    {booking.status}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/20 rounded-[2rem] border-2 border-dashed border-border/50">
               <Calendar className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
               <p className="text-xl font-bold text-muted-foreground">No bookings found</p>
            </div>
          )}
        </div>

        {/* System Health / Status */}
        <div className="space-y-6">
           <div className="rounded-[2.5rem] border border-border/50 bg-gradient-to-br from-orange-500/10 to-transparent backdrop-blur-xl p-8 shadow-xl">
              <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-500" /> Platform Pulse
              </h3>
              <div className="space-y-6">
                 {[
                   { label: "Server Status", status: "Operational", color: "text-emerald-500" },
                   { label: "Database", status: "Healthy", color: "text-emerald-500" },
                   { label: "Payments", status: "Active", color: "text-emerald-500" },
                   { label: "API Sync", status: "Real-time", color: "text-blue-500" },
                 ].map((item, i) => (
                   <div key={i} className="flex justify-between items-center pb-4 border-b border-border/50 last:border-0 last:pb-0">
                      <span className="font-bold text-muted-foreground">{item.label}</span>
                      <span className={`font-black uppercase tracking-widest text-xs ${item.color}`}>{item.status}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="rounded-[2.5rem] border border-border/50 bg-card p-8 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-orange-500/20 transition-all" />
              <h3 className="text-lg font-black mb-2">Quick Action</h3>
              <p className="text-sm text-muted-foreground mb-6">Need to update tutor rosters or site categories?</p>
              <div className="grid grid-cols-2 gap-3">
                 <Link href="/dashboard/manage-subjects">
                    <Button className="w-full rounded-2xl bg-zinc-900 border-zinc-700 hover:bg-black font-bold text-xs py-5">Tutors</Button>
                 </Link>
                 <Link href="/dashboard/manage-categories">
                    <Button className="w-full rounded-2xl bg-zinc-900 border-zinc-700 hover:bg-black font-bold text-xs py-5">Categories</Button>
                 </Link>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}