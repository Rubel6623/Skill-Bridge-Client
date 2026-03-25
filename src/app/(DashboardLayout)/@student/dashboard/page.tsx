"use client"

import { useState, useEffect } from "react"
import { getBookings } from "@/services/booking"
import { format } from "date-fns"
import { BookOpen, Calendar, Star, Clock, TrendingUp, GraduationCap, Loader2 } from "lucide-react"
import { createReview } from "@/services/review"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function StudentDashboard() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [reviewLoading, setReviewLoading] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")

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

  const confirmedBookings = bookings.filter((b: any) => b.status === "CONFIRMED")
  const completedBookings = bookings.filter((b: any) => b.status === "COMPLETED")
  
  // Group by subject to show unique hubs
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
        toast.success("Perspective broadcasted to platform!")
        fetchBookings()
        setSelectedBooking(null)
        setComment("")
        setRating(5)
      } else {
        toast.error(res.message || "Broadcast failed")
      }
    } catch (error) {
      toast.error("Interlink failure - try again")
    } finally {
      setReviewLoading(false)
    }
  }

  return (
    <div className="p-6 space-y-12 bg-black/20 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tighter mb-2">Student Interface</h1>
          <p className="text-muted-foreground font-bold uppercase text-[10px] tracking-[0.3em]">Operational Status: Active Hub Junction</p>
        </div>
        <div className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-3xl shadow-2xl">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
           <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">System Synced: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Stats Hub */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Core Sessions", value: bookings.length, icon: Calendar, color: "text-blue-500", bg: "bg-blue-500/5" },
          { label: "Active Mastery", value: confirmedBookings.length, icon: Clock, color: "text-orange-500", bg: "bg-orange-500/5" },
          { label: "Hulls Completed", value: completedBookings.length, icon: GraduationCap, color: "text-emerald-500", bg: "bg-emerald-500/5" },
          { label: "Hub Enamel", value: uniqueHubs.length, icon: BookOpen, color: "text-purple-500", bg: "bg-purple-500/5" },
        ].map((stat, i) => (
          <div key={i} className={`p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl ${stat.bg} shadow-2xl hover:scale-105 transition-all duration-500`}>
            <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 ${stat.color} shadow-inner`}>
              <stat.icon size={28} />
            </div>
            <p className="text-5xl font-black text-white mb-2 tracking-tighter">{stat.value}</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Left Column: Upcoming + Hubs */}
        <div className="xl:col-span-2 space-y-12">
           <div className="bg-white/[0.02] border border-white/10 rounded-[3rem] p-10 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-110 transition-transform">
                <TrendingUp size={150} />
             </div>
             
             <h2 className="text-2xl font-black mb-10 flex items-center gap-4 tracking-tighter uppercase">
               <span className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-500 flex items-center justify-center border border-orange-500/10 italic font-black">!</span>
               Active Execution Schedule
             </h2>

             {loading ? (
               <div className="space-y-4">
                 {[1, 2].map((i) => <div key={i} className="h-24 bg-white/5 animate-pulse rounded-3xl" />)}
               </div>
             ) : confirmedBookings.length > 0 ? (
               <div className="space-y-4">
                 {confirmedBookings.slice(0, 3).map((booking: any) => (
                   <div key={booking.id} className="p-6 rounded-[2rem] bg-zinc-900/40 border border-white/5 flex items-center justify-between hover:bg-zinc-900 transition-colors shadow-inner">
                      <div className="flex items-center gap-6">
                        <div className="w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                        <div>
                           <h4 className="font-black text-white text-lg tracking-tight uppercase">{booking.tutorSubject?.category?.name}</h4>
                           <p className="text-xs text-zinc-500 font-bold tracking-widest uppercase">Expert mentor: {booking.tutorProfile?.user?.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                         <p className="text-white font-black">{format(new Date(booking.startTime), "MMM dd • HH:mm")}</p>
                         <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Confirmed Slot</p>
                      </div>
                   </div>
                 ))}
               </div>
             ) : (
               <div className="text-center py-20 grayscale opacity-20">
                  <Calendar size={60} className="mx-auto mb-6" />
                  <p className="font-black text-xs uppercase tracking-[0.5em]">No Pending Execution</p>
               </div>
             )}
           </div>

           {/* Expertise Hubs (Category/Subject centric reviews) */}
           <div className="bg-white/[0.02] border border-white/10 rounded-[3rem] p-10 backdrop-blur-3xl shadow-2xl">
              <h2 className="text-2xl font-black mb-10 flex items-center gap-4 tracking-tighter uppercase font-serif">
                <BookOpen className="text-purple-500" /> My Expertise Hubs
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {uniqueHubs.map((hub: any) => {
                  const subjectBookings = bookings.filter(b => b.tutorSubjectId === hub.tutorSubjectId);
                  const canReview = subjectBookings.some(b => (b.status === "COMPLETED" || b.status === "CONFIRMED") && !b.review);
                  const reviewableBooking = subjectBookings.find(b => (b.status === "COMPLETED" || b.status === "CONFIRMED") && !b.review);

                  return (
                    <div key={hub.tutorSubjectId} className="p-8 rounded-[2.5rem] bg-zinc-900/60 border border-white/5 relative group hover:border-purple-500 transition-all shadow-2xl">
                      <div className="flex items-center gap-5 mb-8">
                         <div className="w-50 h-15 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl">
                            <img src={hub.tutorProfile?.user?.avatar || "https://github.com/shadcn.png"} className="w-full h-full object-cover rounded-2xl" />
                         </div>
                         <div>
                            <h3 className="font-black text-white tracking-tight text-xl uppercase leading-none">{hub.tutorSubject?.title || hub.tutorSubject?.category?.name}</h3>
                            <p className="text-[10px] text-purple-500 font-black tracking-widest uppercase mt-2">{hub.tutorProfile?.user?.name}</p>
                         </div>
                      </div>
                      
                      {reviewableBooking ? (
                        <Dialog open={selectedBooking?.id === reviewableBooking.id} onOpenChange={(open) => !open && setSelectedBooking(null)}>
                           <DialogTrigger asChild>
                              <Button 
                                onClick={() => setSelectedBooking(reviewableBooking)}
                                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-black h-16 rounded-2xl uppercase tracking-widest text-[10px] shadow-2xl shadow-purple-500/20 group-hover:scale-105 transition-transform"
                              >
                                Review Expertise Hub
                              </Button>
                           </DialogTrigger>
                           <DialogContent className="sm:max-w-[425px] rounded-[3rem] border-none shadow-2xl overflow-hidden p-0 dark:bg-zinc-950">
                             <div className="bg-purple-500 h-2 w-full" />
                             <div className="p-8 space-y-8">
                               <DialogHeader>
                                 <DialogTitle className="text-3xl font-black tracking-tighter uppercase text-center">Mentor Evaluation</DialogTitle>
                               </DialogHeader>
                               
                               <div className="text-center space-y-4">
                                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Subject Mastership</p>
                                  <div className="flex justify-center gap-3">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <button key={star} onClick={() => setRating(star)} className={`transition-all duration-500 ${rating >= star ? 'text-purple-500 scale-125' : 'text-zinc-800'}`}>
                                        <Star size={32} className="fill-current" strokeWidth={0} />
                                      </button>
                                    ))}
                                  </div>
                               </div>

                               <textarea 
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                  className="w-full h-40 bg-zinc-100 dark:bg-zinc-900 border-none rounded-[2rem] p-6 outline-none focus:ring-4 focus:ring-purple-500/20 font-bold text-sm resize-none"
                                  placeholder="Document your perspective on this mentorship phase..."
                               />

                               <Button 
                                 onClick={handleReviewSubmit}
                                 disabled={reviewLoading || !comment.trim()}
                                 className="w-full bg-purple-500 hover:bg-purple-600 font-black h-16 rounded-[2rem] uppercase tracking-widest text-[10px] text-white shadow-2xl shadow-purple-500/30"
                               >
                                 {reviewLoading ? <Loader2 className="animate-spin" /> : "Authorize Broadcast"}
                               </Button>
                             </div>
                           </DialogContent>
                        </Dialog>
                      ) : (
                        <div className="h-16 flex items-center justify-center border-2 border-dashed border-white/5 rounded-2xl opacity-40">
                           <span className="text-[10px] font-black uppercase tracking-widest">Feedback Fully Integrated</span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
           </div>
        </div>

        {/* Right Column: Mini Logs */}
        <div className="space-y-10">
           <div className="bg-white/[0.02] border border-white/10 rounded-[3rem] p-10 backdrop-blur-3xl shadow-2xl h-full">
              <h2 className="text-2xl font-black mb-10 flex items-center gap-4 tracking-tighter uppercase">
                 <TrendingUp className="text-emerald-500" /> Operational Log
              </h2>
              
              <div className="space-y-6">
                {bookings.map((booking: any, idx: number) => (
                  <div key={booking.id || idx} className="flex gap-4 relative">
                    {idx !== bookings.length - 1 && <div className="absolute left-6 top-10 bottom-[-24px] w-[1px] bg-white/5" />}
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-black text-zinc-500 shrink-0">
                       {idx + 1}
                    </div>
                    <div className="pt-1">
                       <p className="font-black text-white text-sm uppercase tracking-tight">{booking.status}: {booking.tutorSubject?.category?.name}</p>
                       <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mt-1">
                          {format(new Date(booking.startTime), "PPp")}
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