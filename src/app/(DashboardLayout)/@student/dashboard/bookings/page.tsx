"use client"

import { useState, useEffect } from "react"
import { getBookings } from "@/services/booking"
import { Calendar, Clock, Star, MessageSquare, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { createReview } from "@/services/review"
import { toast } from "sonner"

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

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-2">My Bookings</h1>
        <p className="text-zinc-500 dark:text-zinc-400">View and manage all your tutor sessions.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      ) : bookings.length > 0 ? (
        <div className="grid gap-6">
          {bookings.map((booking: any) => (
            <div key={booking.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6 md:items-center justify-between transition-all hover:shadow-md">
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
                {booking.status === "COMPLETED" && !booking.review && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        onClick={() => setSelectedBooking(booking)}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-5 rounded-xl transition-all"
                      >
                        <Star className="w-4 h-4 mr-2" />
                        Give Review
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Write a Review</DialogTitle>
                      </DialogHeader>
                      <div className="py-6 space-y-6">
                        <div className="space-y-4 text-center">
                          <label className="text-sm font-medium text-zinc-500">How was your session?</label>
                          <div className="flex justify-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                onClick={() => setRating(star)}
                                className={`transition-all ${rating >= star ? 'text-yellow-400 scale-110' : 'text-zinc-300'}`}
                              >
                                <Star className="w-8 h-8 fill-current" />
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Your Feedback</label>
                          <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full h-32 px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all resize-none"
                            placeholder="Tell us about your experience..."
                          />
                        </div>
                        <Button
                          onClick={handleReviewSubmit}
                          disabled={reviewLoading || !comment.trim()}
                          className="w-full bg-orange-500 hover:bg-orange-600 py-6 text-lg font-bold rounded-xl"
                        >
                          {reviewLoading ? <Loader2 className="animate-spin mr-2" /> : "Submit Review"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
                {booking.review && (
                  <div className="flex items-center gap-2 text-emerald-500 bg-emerald-500/10 px-4 py-2 rounded-xl font-bold border border-emerald-500/20">
                    <Star className="w-4 h-4 fill-emerald-500" />
                    Reviewed
                  </div>
                )}
                <Button variant="outline" className="py-5 font-bold rounded-xl border-zinc-200 dark:border-zinc-800">
                  View Receipt
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
          <Calendar className="w-16 h-16 text-zinc-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">No bookings found</h3>
          <p className="text-zinc-500 mt-2 max-w-xs mx-auto">You haven't booked any subjects yet. Explore our tutors and start learning!</p>
          <Button className="mt-6 bg-orange-500 hover:bg-orange-600 px-8 py-6 rounded-xl font-bold">
            Explore Tutors
          </Button>
        </div>
      )}
    </div>
  )
}
