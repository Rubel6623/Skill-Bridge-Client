import { getBookings } from "@/services/booking";
import UpdateBookingStatusForm from "@/components/modules/tutor/bookings/UpdateBookingStatus";
import { format } from "date-fns";

export default async function TutorBookingsPage() {
  const res = await getBookings();
  const bookings = res?.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">My Bookings</h1>
      
      {bookings.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-8 text-center text-zinc-500">
          No bookings found.
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking: any) => (
            <div key={booking.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6 md:items-center justify-between">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">
                    Student: {booking.student?.name || "Unknown"}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                    booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                    booking.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                    'bg-zinc-100 text-zinc-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
                
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Subject: {booking.tutorSubject?.title || "Various"}
                </p>
                <div className="flex gap-4 text-sm text-zinc-600 dark:text-zinc-300">
                  <p>Start: {format(new Date(booking.startTime), "PPp")}</p>
                  <p>End: {format(new Date(booking.endTime), "PPp")}</p>
                </div>
                <p className="text-orange-500 font-semibold mt-2">${booking.totalPrice} Total</p>
              </div>

              <div className="min-w-[200px]">
                 <UpdateBookingStatusForm bookingId={booking.id} currentStatus={booking.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
