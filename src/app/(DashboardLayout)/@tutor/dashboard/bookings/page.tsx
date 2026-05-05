import { getBookings } from "../../../../../services/booking";
import UpdateBookingStatusForm from "../../../../../components/modules/tutor/bookings/UpdateBookingStatus";
import { format } from "date-fns";
import { Calendar } from "lucide-react";

export default async function TutorBookingsPage() {
  const res = await getBookings();
  const bookings = res?.data || [];

  return (
    <div className="p-8 space-y-12 bg-transparent text-white animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 text-orange-500 mb-3 font-black uppercase tracking-[0.4em] text-[10px]">
            <Calendar className="w-4 h-4" /> Operational Fulfillment
          </div>
          <h1 className="text-6xl font-black tracking-tighter leading-none">
            Active <span className="text-orange-500">Bookings</span>
          </h1>
          <p className="text-white/50 text-lg mt-3 font-medium">Manage and verify your mentorship sessions.</p>
        </div>
        <div className="flex items-center gap-3 px-6 py-4 bg-white/5 border border-white/10 rounded-[1.5rem] backdrop-blur-xl shadow-2xl">
           <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-pulse" />
           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
             Live Queue Active
           </span>
        </div>
      </div>
      
      {bookings.length === 0 ? (
        <div className="text-center py-32 bg-white/[0.02] border-2 border-dashed border-white/10 rounded-[3rem] opacity-20">
          <Calendar size={60} className="mx-auto mb-6" />
          <p className="font-black text-xs uppercase tracking-[0.5em]">No Pending Transactions Found</p>
        </div>
      ) : (
        <div className="grid gap-8">
          {bookings.map((booking: any) => (
            <div key={booking.id} className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row gap-10 md:items-center justify-between hover:border-white/20 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:scale-110 transition-transform">
                 <Calendar size={120} />
              </div>
              
              <div className="flex-1 space-y-6 relative z-10">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="w-16 h-16 rounded-[1.25rem] bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20 text-2xl font-black">
                     {booking.student?.name?.[0] || 'S'}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white tracking-tighter uppercase leading-none mb-2">
                      {booking.student?.name || "Unknown Identity"}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border ${
                        booking.status === 'PENDING' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                        booking.status === 'CONFIRMED' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                        booking.status === 'REJECTED' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                        'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                      }`}>
                        {booking.status}
                      </span>
                      <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Student Node</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                     <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">Subject Expertise</p>
                     <p className="font-black text-white uppercase tracking-tight">{booking.tutorSubject?.title || "Standardized Session"}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                     <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">Temporal Window</p>
                     <p className="font-black text-white uppercase tracking-tight">{format(new Date(booking.startTime), "MMM dd • HH:mm")}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                     <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">Economic Value</p>
                     <p className="font-black text-orange-500 uppercase tracking-tight text-lg">${booking.totalPrice}</p>
                  </div>
                </div>
              </div>

              <div className="min-w-[240px] relative z-10 pt-6 md:pt-0 border-t md:border-t-0 md:border-l border-white/5 md:pl-10">
                 <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-4">Command Action</p>
                 <UpdateBookingStatusForm bookingId={booking.id} currentStatus={booking.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
