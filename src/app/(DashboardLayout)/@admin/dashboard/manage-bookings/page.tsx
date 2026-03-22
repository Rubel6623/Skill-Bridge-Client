"use client"

import { useState, useEffect } from "react"
import { getAllBookings, updateBookingStatus } from "@/services/booking"
import { Calendar, Clock, User, CheckCircle2, XCircle, Loader2, Filter, Search, MoreVertical } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function AdminManageBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("ALL")

  const fetchAllBookings = async () => {
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
  }

  useEffect(() => {
    fetchAllBookings()
  }, [])

  const handleStatusUpdate = async (bookingId: string, newStatus: string) => {
    setUpdatingId(bookingId)
    try {
      const res = await updateBookingStatus(bookingId, newStatus)
      if (res.success) {
        toast.success(`Booking status updated to ${newStatus}`)
        fetchAllBookings()
      } else {
        toast.error(res.message || "Update failed")
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
    } finally {
      setUpdatingId(null)
    }
  }

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.student?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.tutorProfile?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.tutorSubject?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "ALL" || booking.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-2">Manage Bookings</h1>
          <p className="text-zinc-500">Overview and control of all platform sessions.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none w-64 shadow-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 shadow-sm transition-all"
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
          <p className="font-bold text-zinc-500 animate-pulse">Loading platform bookings...</p>
        </div>
      ) : filteredBookings.length > 0 ? (
        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                  <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Student</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Tutor & Subject</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Schedule</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Price</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest text-center">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {filteredBookings.map((booking: any) => (
                  <tr key={booking.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center font-bold text-orange-600 border border-orange-200">
                          {booking.student?.name?.[0]}
                        </div>
                        <div>
                          <p className="font-bold text-zinc-900 dark:text-zinc-100">{booking.student?.name}</p>
                          <p className="text-xs text-zinc-500">{booking.student?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-zinc-900 dark:text-zinc-100">{booking.tutorSubject?.title || "Session"}</p>
                      <p className="text-xs text-zinc-500">By {booking.tutorProfile?.user?.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Calendar className="w-4 h-4 text-zinc-400" />
                          {format(new Date(booking.startTime), "PP")}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                          <Clock className="w-4 h-4 text-zinc-400" />
                          {format(new Date(booking.startTime), "p")} - {format(new Date(booking.endTime), "p")}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-black text-orange-500 text-lg">${booking.totalPrice}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border-2 ${
                        booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                        booking.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                        booking.status === 'COMPLETED' ? 'bg-emerald-100 text-green-800 border-emerald-200' :
                        'bg-red-100 text-red-800 border-red-200'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {updatingId === booking.id ? (
                        <Loader2 className="animate-spin w-5 h-5 ml-auto text-orange-500" />
                      ) : (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl hover:bg-zinc-100 transition-all">
                              <MoreVertical className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-2">
                            <DropdownMenuItem 
                              onClick={() => handleStatusUpdate(booking.id, "CONFIRMED")}
                              className="rounded-xl px-4 py-3 flex items-center gap-2 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 font-bold"
                            >
                              <CheckCircle2 className="w-4 h-4" /> Confirm
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleStatusUpdate(booking.id, "COMPLETED")}
                              className="rounded-xl px-4 py-3 flex items-center gap-2 cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-emerald-600 font-bold"
                            >
                              <CheckCircle2 className="w-4 h-4" /> Complete
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleStatusUpdate(booking.id, "CANCELLED")}
                              className="rounded-xl px-4 py-3 flex items-center gap-2 cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 font-bold"
                            >
                              <XCircle className="w-4 h-4" /> Cancel
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
        </div>
      ) : (
        <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
           <Filter className="w-16 h-16 text-zinc-300 mx-auto mb-4" />
           <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">No matching bookings</h3>
           <p className="text-zinc-500 mt-2">Try adjusting your filters or search term.</p>
        </div>
      )}
    </div>
  )
}
