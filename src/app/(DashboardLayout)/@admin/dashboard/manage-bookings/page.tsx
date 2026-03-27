"use client"

import { useState, useEffect, useCallback } from "react"
import { Calendar, Clock, User, CheckCircle2, XCircle, Loader2, Filter, Search, MoreVertical, DollarSign, Fingerprint, Star, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { Button } from "../../../../../components/ui/button"
import { toast } from "sonner"
import { deleteBooking, getAllBookings, updateBookingStatus } from "../../../../../services/booking"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../../components/ui/dropdown-menu";
import { cn } from "../../../../../lib/utils";

export default function AdminManageBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("ALL")

  const fetchAllBookings = useCallback(async () => {
    try {
      const result = await getAllBookings()
      if (result?.success) {
        setBookings(result.data || [])
      }
    } catch (error) {
      toast.error("Failed to fetch all bookings")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAllBookings()
  }, [fetchAllBookings])

  const handleStatusUpdate = async (bookingId: string, newStatus: string) => {
    setUpdatingId(bookingId)
    try {
      const res = await updateBookingStatus(bookingId, newStatus)
      if (res.success) {
        toast.success(`Status shifted to ${newStatus}`)
        fetchAllBookings()
      } else {
        toast.error(res.message || "Operation failed")
      }
    } catch (error) {
      toast.error("An unexpected system error occurred")
    } finally {
      setUpdatingId(null)
    }
  }

  const handleDeleteBooking = async (bookingId: string) => {
    if (!confirm("Are you sure you want to permanently delete this booking? This action cannot be undone.")) {
      return
    }
    
    setUpdatingId(bookingId)
    try {
      const res = await deleteBooking(bookingId)
      if (res.success) {
        toast.success("Booking purged from database")
        fetchAllBookings()
      } else {
        toast.error(res.message || "Deletion failed")
      }
    } catch (error) {
      toast.error("An unexpected error occurred during deletion")
    } finally {
      setUpdatingId(null)
    }
  }

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.student?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.student?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.tutorProfile?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.tutorSubject?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "ALL" || booking.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-8 space-y-10 max-w-[1600px] mx-auto">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-orange-500 mb-2">
            <Fingerprint className="w-5 h-5" />
            <span className="text-sm font-black uppercase tracking-[0.2em]">Operations Command</span>
          </div>
          <h1 className="text-4xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">Manage <span className="text-orange-500">Bookings</span></h1>
          <p className="text-zinc-500 mt-1 font-medium italic">Control and audit all sessions across the Skill-Bridge platform.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative group">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-orange-500 transition-colors" />
            <input
              type="text"
              placeholder="Search ID, Student, Tutor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-3.5 bg-white dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800 rounded-2xl focus:ring-0 focus:border-orange-500/50 outline-none w-80 shadow-sm font-bold text-sm transition-all"
            />
          </div>
          
          <div className="flex items-center bg-zinc-100 dark:bg-zinc-900 p-1.5 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 shadow-sm">
            {['ALL', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                  statusFilter === status 
                    ? "bg-white dark:bg-zinc-800 text-orange-500 shadow-md" 
                    : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                )}
              >
                {status === 'ALL' ? 'Everything' : status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-[3rem] shadow-2xl">
          <div className="relative">
            <Loader2 className="w-16 h-16 animate-spin text-orange-500" />
            <div className="absolute inset-0 blur-2xl bg-orange-500/20 rounded-full" />
          </div>
          <div className="text-center group">
            <p className="font-black text-2xl text-zinc-900 dark:text-zinc-100 tracking-tight">Accessing Platform Logs</p>
            <p className="text-zinc-500 font-bold animate-pulse uppercase tracking-[0.2em] text-xs mt-2">Initializing Secure Connection...</p>
          </div>
        </div>
      ) : filteredBookings.length > 0 ? (
        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800/50">
                  <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.25em]">Session Data</th>
                  <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.25em]">Tutor & Expertise</th>
                  <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.25em]">Schedule</th>
                  <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.25em]">Financials</th>
                  <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.25em] text-center">Status</th>
                  <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.25em] text-right">Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50 text-sm font-medium">
                {filteredBookings.map((booking: any) => (
                  <tr key={booking.id} className="group hover:bg-orange-50/30 dark:hover:bg-orange-400/5 transition-all duration-300">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
                          {booking.student?.name?.[0]}
                        </div>
                        <div>
                          <p className="font-black text-zinc-900 dark:text-zinc-50 text-base">{booking.student?.name}</p>
                          <p className="text-zinc-400 font-bold flex items-center gap-1.5 mt-0.5">
                            <span className="text-[10px] bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-500">ID: {booking.id.split('-')[0]}</span>
                            {booking.student?.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <p className="font-black text-zinc-900 dark:text-zinc-50">{booking.tutorSubject?.title || "Educational Session"}</p>
                        <div className="flex items-center gap-2">
                           <div className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[10px] flex items-center justify-center font-bold">
                             {booking.tutorProfile?.user?.name?.[0]}
                           </div>
                           <p className="text-xs text-zinc-500 font-bold tracking-tight">By {booking.tutorProfile?.user?.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-black">
                          <Calendar className="w-4 h-4 text-orange-500" />
                          {format(new Date(booking.startTime), "PPP")}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-black tracking-widest uppercase bg-zinc-100 dark:bg-zinc-900 w-fit px-3 py-1 rounded-full">
                          <Clock className="w-3 h-3 text-zinc-400" />
                          {format(new Date(booking.startTime), "p")} – {format(new Date(booking.endTime), "p")}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-black text-orange-500 text-2xl tracking-tighter flex items-center">
                          <DollarSign className="w-4 h-4 -mr-1" />
                          {booking.totalPrice}
                        </span>
                        {booking.review && (
                           <div className="flex items-center gap-1 text-yellow-500 mt-1">
                             <Star className="w-3 h-3 fill-current" />
                             <span className="text-[10px] font-black">{booking.review.rating}.0</span>
                           </div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className={cn(
                        "inline-flex items-center px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border-2 shadow-sm transition-all",
                        booking.status === 'PENDING' ? 'bg-amber-50 text-amber-600 border-amber-200 shadow-amber-200/50' :
                        booking.status === 'CONFIRMED' ? 'bg-blue-50 text-blue-600 border-blue-200 shadow-blue-200/50' :
                        booking.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 shadow-emerald-200/50' :
                        'bg-rose-50 text-rose-600 border-rose-200 shadow-rose-200/50'
                      )}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      {updatingId === booking.id ? (
                        <div className="flex justify-end pr-3">
                           <Loader2 className="animate-spin w-6 h-6 text-orange-500" />
                        </div>
                      ) : (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-12 w-12 p-0 rounded-2xl hover:bg-orange-100 dark:hover:bg-orange-900/20 transition-all border-2 border-transparent hover:border-orange-200">
                              <MoreVertical className="h-6 w-6 text-zinc-400 group-hover:text-orange-500 transition-colors" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800 rounded-3xl shadow-2xl p-3">
                            <DropdownMenuItem 
                              onClick={() => handleStatusUpdate(booking.id, "CONFIRMED")}
                              className="rounded-xl px-4 py-3.5 flex items-center gap-3 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 font-black uppercase text-[10px] tracking-widest"
                            >
                              <CheckCircle2 className="w-4 h-4" /> Confirm Session
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleStatusUpdate(booking.id, "COMPLETED")}
                              className="rounded-xl px-4 py-3.5 flex items-center gap-3 cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-emerald-600 font-black uppercase text-[10px] tracking-widest"
                            >
                              <CheckCircle2 className="w-4 h-4" /> Finalize Result
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleStatusUpdate(booking.id, "CANCELLED")}
                              className="rounded-xl px-4 py-3.5 flex items-center gap-3 cursor-pointer hover:bg-rose-50 dark:hover:bg-rose-900/20 text-rose-600 font-black uppercase text-[10px] tracking-widest"
                            >
                              <XCircle className="w-4 h-4" /> Void Booking
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteBooking(booking.id)}
                              className="rounded-xl px-4 py-3.5 flex items-center gap-3 cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 font-black uppercase text-[10px] tracking-widest border-t border-zinc-100 dark:border-zinc-800 mt-2 pt-4"
                            >
                              <Trash2 className="w-4 h-4" /> Delete Permanently
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-900/50 px-8 py-6 border-t border-zinc-100 dark:border-zinc-800/50 flex items-center justify-between text-zinc-500 font-bold text-xs uppercase tracking-widest">
             <div>Showing <span className="text-orange-500">{filteredBookings.length}</span> individual records</div>
             <div className="flex gap-2 text-zinc-400">
               <span className="text-zinc-900 dark:text-zinc-100">Live Audit</span> • <span>Syncing with Mainframe</span>
             </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-32 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-[3rem] border-4 border-dotted border-zinc-200 dark:border-zinc-800 flex flex-col items-center gap-6">
           <div className="bg-white dark:bg-zinc-900 p-8 rounded-full shadow-inner border-2 border-zinc-100 dark:border-zinc-800">
             <Filter className="w-20 h-20 text-zinc-200" />
           </div>
           <div>
             <h3 className="text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">System Empty</h3>
             <p className="text-zinc-500 mt-2 font-bold max-w-sm mx-auto">No records match the current security protocols or filter parameters.</p>
           </div>
           <Button 
            variant="outline" 
            onClick={() => { setSearchTerm(""); setStatusFilter("ALL"); }}
            className="rounded-2xl font-black px-8 py-6 uppercase tracking-widest text-xs border-2 hover:bg-zinc-900 hover:text-white transition-all"
           >
             Reset Core Filters
           </Button>
        </div>
      )}
    </div>
  )
}
