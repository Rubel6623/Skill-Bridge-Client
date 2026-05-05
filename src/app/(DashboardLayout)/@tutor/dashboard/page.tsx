"use client"

import { useState, useEffect } from "react"
import { getOwnSubjects } from "../../../../services/subject";
import { getBookings } from "../../../../services/booking";
import { getMyReviews } from "../../../../services/review";
import { BookOpen, Calendar, Star, DollarSign, Clock, Users, TrendingUp, Loader2 } from "lucide-react"
import { format } from "date-fns"

export default function TutorDashboard() {
  const [subjects, setSubjects] = useState<any[]>([])
  const [bookings, setBookings] = useState<any[]>([])
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [subjectsRes, bookingsRes, reviewsRes] = await Promise.all([
          getOwnSubjects(),
          getBookings(),
          getMyReviews()
        ])
        
        if (subjectsRes?.success) setSubjects(subjectsRes.data || [])
        if (bookingsRes?.success) setBookings(bookingsRes.data || [])
        if (reviewsRes?.success) setReviews(reviewsRes.data || [])
      } catch (error) {
        console.error("Dashboard error:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchDashboardData()
    setMounted(true);
  }, [])

  const confirmedBookings = bookings.filter(b => b.status === 'CONFIRMED')
  const totalEarnings = bookings
    .filter(b => b.status === 'COMPLETED')
    .reduce((sum, b) => sum + (b.totalPrice || 0), 0)
    
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0"

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
        <p className="font-black text-white/40 tracking-[0.3em] uppercase text-[10px]">Initializing Mentor Node...</p>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-12 bg-transparent text-gray-900 dark:text-white animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 text-orange-500 mb-3 font-black uppercase tracking-[0.4em] text-[10px]">
            <Users className="w-4 h-4" /> Mentor Command Center
          </div>
          <h1 className="text-6xl font-black tracking-tighter leading-none">
            Tutor <span className="text-orange-500">Node</span>
          </h1>
          <p className="text-white/50 text-lg mt-3 font-medium">Empower the next generation of experts.</p>
        </div>
        <div className="flex items-center gap-3 px-6 py-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[1.5rem] backdrop-blur-xl shadow-lg dark:shadow-2xl">
           <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-pulse" />
           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-white/60">
             Hub Status: ONLINE
           </span>
        </div>
      </div>

      {/* Stats Hub */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {[
          { label: "My Courses", value: subjects.length, icon: BookOpen, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
          { label: "Total Bookings", value: bookings.length, icon: Calendar, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
          { label: "Active Sessions", value: confirmedBookings.length, icon: Clock, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
          { label: "Avg Rating", value: averageRating, icon: Star, color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
          { label: "Total Earnings", value: `$${totalEarnings}`, icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
        ].map((stat, i) => (
          <div key={i} className={`p-6 rounded-[2rem] border backdrop-blur-xl ${stat.bg} transition-all hover:scale-[1.05] group shadow-lg dark:shadow-2xl`}>
            <div className={`w-12 h-12 rounded-xl bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center mb-6 shadow-xl transition-all ${stat.color} group-hover:scale-110`}>
              <stat.icon size={24} />
            </div>
            <p className="text-4xl font-black text-gray-900 dark:text-white mb-1 tracking-tighter leading-none">{stat.value}</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-white/40">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Course Catalog */}
        <div className="rounded-[3rem] border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.02] backdrop-blur-xl p-10 shadow-lg dark:shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-[0.02] group-hover:scale-110 transition-transform">
             <BookOpen size={200} />
          </div>
          <h2 className="text-2xl font-black mb-10 flex items-center gap-4 tracking-tighter uppercase">
            <BookOpen className="text-blue-500" /> Published Expertise
          </h2>

          {subjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {subjects.map((subject: any) => (
                <div key={subject.id} className="flex items-center gap-5 p-5 rounded-[1.5rem] bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 hover:border-blue-500/50 hover:bg-gray-100 dark:hover:bg-white/10 transition-all group/item shadow-sm dark:shadow-xl">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 font-black border border-blue-500/20 group-hover/item:scale-110 transition-transform">
                    {subject.title?.[0] || 'S'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-black text-gray-900 dark:text-white truncate leading-none mb-1">{subject.title}</p>
                    <p className="text-[10px] font-black text-gray-500 dark:text-white/40 uppercase tracking-widest">{subject.category?.name}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border-2 border-dashed border-gray-200 dark:border-white/5 rounded-[2.5rem] opacity-40 dark:opacity-20">
               <BookOpen size={48} className="mx-auto mb-4" />
               <p className="font-black text-[10px] uppercase tracking-[0.4em]">No Expertise Published</p>
            </div>
          )}
        </div>

        {/* Booking History */}
        <div className="rounded-[3rem] border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.02] backdrop-blur-xl p-10 shadow-lg dark:shadow-2xl group">
          <h2 className="text-2xl font-black mb-10 flex items-center gap-4 tracking-tighter uppercase">
             <Calendar className="text-orange-500" /> Recent Interactions
          </h2>

          {bookings.length > 0 ? (
             <div className="space-y-4">
                 {bookings.slice(0, 4).map((booking: any) => (
                  <div key={booking.id} className="flex flex-col p-6 rounded-[2rem] bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 hover:border-orange-500/50 hover:bg-gray-100 dark:hover:bg-white/10 transition-all shadow-sm dark:shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                       <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border ${
                         booking.status === 'CONFIRMED' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                         booking.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-200/20' :
                         'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-white/40 border-gray-200 dark:border-white/10'
                       }`}>
                         {booking.status}
                       </span>
                       <span className="text-2xl font-black text-orange-500 tracking-tighter leading-none">${booking.totalPrice}</span>
                    </div>
                    <div>
                       <p className="text-lg font-black text-gray-900 dark:text-white mb-1 uppercase tracking-tight leading-none">
                         Student: <span className="text-orange-500">{booking.student?.name}</span>
                       </p>
                       <p className="text-[10px] text-gray-500 dark:text-white/40 font-black tracking-widest uppercase">
                         Session: {format(new Date(booking.startTime), "MMM dd • HH:mm")}
                       </p>
                    </div>
                  </div>
                ))}
             </div>
          ) : (
             <div className="text-center py-24 border-2 border-dashed border-gray-200 dark:border-white/5 rounded-[2.5rem] opacity-40 dark:opacity-20">
                <Calendar size={48} className="mx-auto mb-4" />
                <p className="font-black text-[10px] uppercase tracking-[0.4em]">No Recent Bookings</p>
             </div>
          )}
        </div>
      </div>
    </div>
  )
}