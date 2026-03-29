"use client"

import { useState, useEffect } from "react"
import { getBookings } from "../../../../../services/booking"
import { Calendar, Clock, Star, MessageSquare, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { Button } from "../../../../../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../components/ui/dialog"
import { createReview } from "../../../../../services/review"
import { toast } from "sonner";
import Link from "next/link"

export default function StudentBookingsPage() {
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
        toast.success("Review submitted successfully!")
        fetchBookings()
        setSelectedBooking(null)
        setComment("")
        setRating(5)
      } else {
        toast.error(res.message || "Failed to submit review")
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setReviewLoading(false)
    }
  }

  const [filter, setFilter] = useState("ALL")

  const filteredBookings = bookings.filter((b: any) => {
    if (filter === "ALL") return true
    if (filter === "UPCOMING") return b.status === "PENDING" || b.status === "CONFIRMED"
    if (filter === "PAST") return b.status === "COMPLETED" || b.status === "CANCELLED"
    return true
  })

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-700 dark:text-zinc-100 mb-2 tracking-tighter">My Bookings</h1>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium">View and manage all your tutor sessions.</p>
        </div>
        <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-[1.25rem] border border-zinc-200 dark:border-zinc-800">
           {["ALL", "UPCOMING", "PAST"].map((f) => (
             <button
               key={f}
               onClick={() => setFilter(f)}
               className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                 filter === f 
                   ? "bg-white dark:bg-zinc-700 text-orange-500 shadow-xl" 
                   : "text-zinc-500 hover:text-zinc-400"
               }`}
             >
               {f}
             </button>
           ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
        </div>
      ) : filteredBookings.length > 0 ? (
        <div className="grid gap-6">
          {filteredBookings.map((booking: any) => (
            <div key={booking.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col gap-6 transition-all hover:shadow-md">
              <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${
                      booking.status === 'CONFIRMED' ? 'bg-blue-500/10 text-blue-500' :
                      booking.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-500' :
                      booking.status === 'CANCELLED' ? 'bg-red-500/10 text-red-500' :
                      'bg-yellow-500/10 text-yellow-500'
                    }`}>
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">
                        {booking.tutorSubject?.title || booking.tutorSubject?.category?.name || "Subject Session"}
                      </h3>
                      <p className="text-sm text-zinc-500">with {booking.tutorProfile?.user?.name}</p>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                      booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      booking.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                      booking.status === 'COMPLETED' ? 'bg-emerald-100 text-green-800 dark:bg-emerald-900/30 dark:text-emerald-400' :
                      'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-zinc-600 dark:text-zinc-300">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-zinc-400" />
                      <span>{format(new Date(booking.startTime), "PPPp")}</span>
                    </div>
                  </div>
                  
                  <p className="text-orange-500 font-bold text-xl">${booking.totalPrice}</p>
                </div>

                <div className="flex flex-col gap-2 min-w-[150px]">
                  {booking.status === "COMPLETED" && !booking.review && selectedBooking?.id !== booking.id && (
                    <Button 
                      onClick={() => setSelectedBooking(booking)}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold h-12 rounded-xl transition-all w-full"
                    >
                      <Star className="w-4 h-4 mr-2" />
                      Leave Review
                    </Button>
                  )}

                {booking.review && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2 text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20 px-4 py-5 rounded-xl font-bold border border-emerald-500/20 transition-all">
                        <Star className="w-4 h-4 fill-emerald-500" />
                        See Review
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-0 overflow-hidden shadow-2xl">
                      <div className="bg-emerald-500 h-2 w-full" />
                      <div className="p-8 space-y-8">
                        <DialogHeader>
                          <DialogTitle className="text-3xl font-black tracking-tighter uppercase text-center">Your Perspective</DialogTitle>
                        </DialogHeader>
                        
                        <div className="text-center space-y-4">
                           <div className="flex justify-center gap-2">
                             {[1, 2, 3, 4, 5].map((s) => (
                               <Star key={s} size={28} className={s <= booking.review.rating ? "fill-emerald-500 text-emerald-500" : "text-zinc-200 dark:text-zinc-800"} />
                             ))}
                           </div>
                           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Subject Mastership: {booking.review.rating}/5</p>
                        </div>

                        <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-[2rem] border border-zinc-100 dark:border-zinc-800">
                           <p className="text-sm font-bold text-zinc-600 dark:text-zinc-300 italic leading-relaxed">
                              "{booking.review.comment}"
                           </p>
                        </div>

                        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900 text-center">
                           <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Recorded on {format(new Date(booking.review.createdAt), "PPP")}</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      onClick={() => setSelectedBooking(booking)}
                      variant="outline" 
                      className="py-5 font-bold rounded-xl border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all text-xs uppercase tracking-widest"
                    >
                      View Receipt
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 rounded-[3rem] p-0 overflow-hidden shadow-2xl font-mono">
                    <DialogHeader className="sr-only">
                      <DialogTitle>Operation Receipt</DialogTitle>
                    </DialogHeader>
                    <div className="bg-orange-500 h-2 w-full" />
                    <div className="p-10 space-y-8">
                      <div className="text-center space-y-2">
                        <h2 className="text-3xl font-black tracking-tighter uppercase">SkillBridge</h2>
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Official Operational Receipt</p>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-dashed border-zinc-200 dark:border-zinc-800">
                        <div className="flex justify-between text-xs">
                          <span className="text-zinc-400 uppercase font-bold">Transaction ID</span>
                          <span className="font-bold text-zinc-900 dark:text-zinc-100">#{booking.id.slice(-8).toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-zinc-400 uppercase font-bold">Date</span>
                          <span className="font-bold text-zinc-900 dark:text-zinc-100">{format(new Date(), "PP")}</span>
                        </div>
                      </div>

                      <div className="space-y-6 pt-6 border-t border-zinc-100 dark:border-zinc-900">
                        <div className="space-y-1">
                           <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Mastery Domain</p>
                           <p className="text-lg font-black text-zinc-900 dark:text-zinc-100 uppercase">{booking.tutorSubject?.title}</p>
                        </div>
                        <div className="space-y-1">
                           <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Mentorship Agent</p>
                           <p className="text-lg font-black text-zinc-900 dark:text-zinc-100 uppercase">{booking.tutorProfile?.user?.name}</p>
                        </div>
                      </div>

                      <div className="space-y-4 pt-6 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-2xl">
                        <div className="flex justify-between text-sm">
                           <span className="text-zinc-500">Base Unit Rate</span>
                           <span className="font-bold">${booking.tutorProfile?.pricePerHour}/hr</span>
                        </div>
                        <div className="flex justify-between text-sm">
                           <span className="text-zinc-500">Operation Duration</span>
                           <span className="font-bold">{Math.round((new Date(booking.endTime).getTime() - new Date(booking.startTime).getTime()) / (1000 * 60 * 60))} Hours</span>
                        </div>
                        <div className="flex justify-between text-xl pt-4 border-t border-white/5 font-black">
                           <span className="text-foreground uppercase tracking-tighter">Total Clearance</span>
                           <span className="text-orange-500">${booking.totalPrice}</span>
                        </div>
                      </div>


                      <div className="text-center pt-4 opacity-50">
                        <p className="text-[8px] font-black uppercase tracking-[0.5em] text-zinc-500 italic">Signature Validated by SkillBridge Core</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Inline review section separated cleanly from buttons flex */}
            {booking.status === "COMPLETED" && !booking.review && selectedBooking?.id === booking.id && (
              <div className="pt-6 mt-2 border-t border-dashed border-zinc-200 dark:border-zinc-800">
                <div className="flex flex-col md:flex-row items-start md:items-start gap-6">
                  <div className="shrink-0 space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">Mastery Output</p>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          className={`transition-all ${
                            rating >= star ? 'text-orange-500 scale-110' : 'text-zinc-300 dark:text-zinc-700'
                          } hover:text-orange-400`}
                        >
                          <Star className="w-8 h-8 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-1 w-full gap-4 flex-col sm:flex-row">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share your perspective on this mentorship session..."
                      className="flex-1 px-4 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none h-20"
                    />
                    <div className="flex flex-col gap-2 shrink-0">
                      <Button
                        onClick={handleReviewSubmit}
                        disabled={reviewLoading || !comment.trim()}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold h-12 w-full sm:w-32 rounded-xl"
                      >
                        {reviewLoading ? <Loader2 className="animate-spin w-4 h-4" /> : "Post Broadcast"}
                      </Button>
                      <Button
                        onClick={() => setSelectedBooking(null)}
                        variant="ghost"
                        className="text-zinc-500 h-8"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
          <Calendar className="w-16 h-16 text-zinc-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">No bookings found</h3>
          <p className="text-zinc-500 mt-2 max-w-xs mx-auto">You haven't booked any subjects yet. Explore our tutors and start learning!</p>
          <Link href={`/tutors`}>
          <Button className="mt-6 bg-orange-500 hover:bg-orange-600 px-8 py-6 rounded-xl font-bold">
            Explore Tutors
          </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
