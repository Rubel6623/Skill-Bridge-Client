"use client"

import { useState, useEffect } from "react"
import { getBookings } from "../../../../services/booking"
import { format } from "date-fns"
import { BookOpen, Calendar, Star, Clock, TrendingUp, GraduationCap, Loader2, Activity } from "lucide-react"
import { createReview } from "../../../../services/review"
import { toast } from "sonner"
import { Button } from "../../../../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";

export default function StudentDashboard() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [reviewLoading, setReviewLoading] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("");
  const [mounted, setMounted] = useState(false);

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

  useEffect(() => {
    fetchBookings()
  }, [])  

  useEffect(() => {
    setMounted(true);
  }, []);

  const confirmedBookings = bookings.filter((b: any) => b.status === "CONFIRMED")
  const completedBookings = bookings.filter((b: any) => b.status === "COMPLETED")
  
  const uniqueHubs = Array.from(new Set(bookings.map(b => b.tutorSubjectId))).map(id => {
    return bookings.find(b => b.tutorSubjectId === id);
  }).filter(Boolean);

  const handleReviewSubmit = async () => {
    if (!selectedBooking) return
    
    setReviewLoading(true)
    try {
      const res = await createReview({
        studentId: selectedBooking.studentId,
        tutorProfileId: selectedBooking.tutorProfileId,
        bookingId: selectedBooking.id,
        rating,
        comment
      })

      if (res.success) {
        toast.success("Feedback integrated successfully!")
        fetchBookings()
        setSelectedBooking(null)
        setComment("")
        setRating(5)
      } else {
        toast.error(res.message || "Submission failed")
      }
    } catch (error) {
      toast.error("Connection failure")
    } finally {
      setReviewLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
        <p className="font-black text-white/40 tracking-[0.3em] uppercase text-[10px]">Accessing Student Core...</p>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-12 bg-transparent text-white animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 text-orange-500 mb-3 font-black uppercase tracking-[0.4em] text-[10px]">
            <GraduationCap className="w-4 h-4" /> Personal Learning Hub
          </div>
          <h1 className="text-6xl font-black tracking-tighter leading-none">
            Student <span className="text-orange-500">Node</span>
          </h1>
          <p className="text-white/50 text-lg mt-3 font-medium">Your path to mastery starts here.</p>
        </div>
        <div className="flex items-center gap-3 px-6 py-4 bg-white/5 border border-white/10 rounded-[1.5rem] backdrop-blur-xl shadow-2xl">
           <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-pulse" />
           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
             System Sync: {mounted ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "..."}
           </span>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Sessions", value: bookings.length, icon: Calendar, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
          { label: "Active Mastery", value: confirmedBookings.length, icon: Clock, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
          { label: "Completed", value: completedBookings.length, icon: GraduationCap, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
          { label: "Expertise Hubs", value: uniqueHubs.length, icon: BookOpen, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
        ].map((stat, i) => (
          <div key={i} className={`p-8 rounded-[2.5rem] border backdrop-blur-xl ${stat.bg} transition-all hover:scale-[1.03] group relative overflow-hidden shadow-2xl`}>
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <stat.icon size={100} />
            </div>
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${stat.color} shadow-inner`}>
                <stat.icon size={24} />
              </div>
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Global Status</span>
            </div>
            <p className="text-5xl font-black text-white mb-1 tracking-tighter relative z-10">{stat.value}</p>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 relative z-10">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 space-y-10">
          {/* Active Schedule */}
          <div className="bg-white/[0.02] border border-white/10 rounded-[3rem] p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-[0.02] group-hover:scale-110 transition-transform">
               <TrendingUp size={200} />
            </div>
            
            <div className="flex items-center justify-between mb-10">
               <h2 className="text-2xl font-black flex items-center gap-4 tracking-tighter uppercase">
                 <Calendar className="text-orange-500" /> Execution Schedule
               </h2>
               <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Upcoming</span>
               </div>
            </div>

            {confirmedBookings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {confirmedBookings.slice(0, 4).map((booking: any) => (
                  <div key={booking.id} className="p-6 rounded-[2rem] bg-white/5 border border-white/5 flex items-center justify-between hover:bg-white/10 transition-all group/item shadow-xl">
                     <div className="flex items-center gap-5">
                       <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20 group-hover/item:scale-110 transition-transform">
                          {booking.tutorSubject?.category?.name?.[0] || 'S'}
                       </div>
                       <div>
                          <h4 className="font-black text-white tracking-tight uppercase leading-none mb-1 text-base">{booking.tutorSubject?.category?.name}</h4>
                          <p className="text-[10px] text-white/40 font-black tracking-widest uppercase">Mentor: {booking.tutorProfile?.user?.name}</p>
                       </div>
                     </div>
                     <div className="text-right">
                        <p className="text-white font-black text-sm">{format(new Date(booking.startTime), "MMM dd • HH:mm")}</p>
                        <p className="text-[9px] text-orange-500 font-bold uppercase tracking-widest">Active Slot</p>
                     </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 opacity-20 border-2 border-dashed border-white/5 rounded-[2.5rem]">
                 <Calendar size={48} className="mx-auto mb-4" />
                 <p className="font-black text-[10px] uppercase tracking-[0.4em]">No Active Execution Logs</p>
              </div>
            )}
          </div>

          {/* Feedback Section */}
          <div className="bg-white/[0.02] border border-white/10 rounded-[3rem] p-10 backdrop-blur-xl shadow-2xl">
             <h2 className="text-2xl font-black mb-10 flex items-center gap-4 tracking-tighter uppercase">
               <Star className="text-purple-500" /> Experience Verification
             </h2>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {uniqueHubs.map((hub: any) => {
                 const subjectBookings = bookings.filter(b => b.tutorSubjectId === hub.tutorSubjectId);
                 const reviewableBooking = subjectBookings.find(b => (b.status === "COMPLETED" || b.status === "CONFIRMED") && !b.review);

                 return (
                   <div key={hub.tutorSubjectId} className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 relative group hover:border-purple-500/50 transition-all shadow-xl">
                     <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl bg-white/5">
                           <img src={hub.tutorProfile?.user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${hub.tutorProfile?.user?.name}`} className="w-full h-full object-cover" />
                        </div>
                        <div>
                           <h3 className="font-black text-white tracking-tight text-lg uppercase leading-none mb-1">{hub.tutorSubject?.category?.name}</h3>
                           <p className="text-[10px] text-purple-400 font-black tracking-widest uppercase">{hub.tutorProfile?.user?.name}</p>
                        </div>
                     </div>
                     
                     {reviewableBooking ? (
                       <div className="w-full">
                         {selectedBooking?.id !== reviewableBooking.id ? (
                           <Button
                             onClick={() => { setSelectedBooking(reviewableBooking); setRating(5); setComment(""); }}
                             className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black h-14 rounded-2xl uppercase tracking-[0.2em] text-[10px] shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform"
                           >
                             Log Performance Review
                           </Button>
                         ) : (
                           <div className="pt-6 border-t border-white/5 space-y-5">
                              <div className="flex justify-between items-center">
                                 <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Rating Output</p>
                                 <div className="flex gap-1.5">
                                   {[1, 2, 3, 4, 5].map((star) => (
                                     <button key={star} onClick={() => setRating(star)} className={`transition-all duration-300 ${rating >= star ? 'text-purple-500 scale-125 shadow-purple-500/50' : 'text-white/10 hover:text-purple-300'}`}>
                                       <Star size={20} className="fill-current" strokeWidth={0} />
                                     </button>
                                   ))}
                                 </div>
                              </div>
                              <textarea
                                 value={comment}
                                 onChange={(e) => setComment(e.target.value)}
                                 className="w-full h-28 bg-white/5 border border-white/10 rounded-[1.5rem] p-5 outline-none focus:ring-2 focus:ring-purple-500/30 font-medium text-sm resize-none text-white placeholder:text-white/20 transition-all"
                                 placeholder="Record your findings for the platform..."
                              />
                              <div className="flex gap-3">
                                <Button 
                                  onClick={handleReviewSubmit}
                                  disabled={reviewLoading || !comment.trim()}
                                  className="flex-1 bg-purple-600 hover:bg-purple-700 font-black h-12 rounded-xl uppercase tracking-widest text-[10px] text-white"
                                >
                                  {reviewLoading ? <Loader2 className="animate-spin" size={16} /> : "Submit Log"}
                                </Button>
                                <Button 
                                  onClick={() => setSelectedBooking(null)}
                                  variant="ghost" 
                                  className="text-white/40 hover:text-white hover:bg-white/5 h-12 rounded-xl uppercase text-[10px] font-black tracking-widest"
                                >
                                  Abort
                                </Button>
                              </div>
                           </div>
                         )}
                       </div>
                     ) : (
                       <div className="h-14 flex items-center justify-center border border-dashed border-white/10 rounded-2xl opacity-30">
                          <span className="text-[9px] font-black uppercase tracking-widest">Feedback Fully Syncronized</span>
                       </div>
                     )}
                   </div>
                 )
               })}
             </div>
          </div>
        </div>

        {/* Operational Log */}
        <div className="space-y-10">
           <div className="bg-white/[0.02] border border-white/10 rounded-[3rem] p-10 backdrop-blur-xl shadow-2xl">
              <h2 className="text-2xl font-black mb-10 flex items-center gap-4 tracking-tighter uppercase">
                 <Activity className="text-emerald-500" /> System Audit
              </h2>
              
              <div className="space-y-8 relative">
                <div className="absolute left-[1.35rem] top-2 bottom-2 w-px bg-white/5" />
                {bookings.map((booking: any, idx: number) => (
                  <div key={booking.id || idx} className="flex gap-6 relative group/log">
                    <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black text-white/20 shrink-0 group-hover/log:border-emerald-500/50 group-hover/log:text-emerald-500 transition-all">
                       {(idx + 1).toString().padStart(2, '0')}
                    </div>
                    <div className="pt-1 min-w-0">
                       <p className="font-black text-white text-sm uppercase tracking-tight truncate leading-tight mb-1">
                         {booking.status}: {booking.tutorSubject?.category?.name}
                       </p>
                       <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">
                          {format(new Date(booking.startTime), "MMM dd • HH:mm")}
                       </p>
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}