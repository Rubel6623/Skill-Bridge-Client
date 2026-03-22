"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import { getMe } from "@/services/auth";
import { createBooking } from "@/services/booking";
import { Loader2, Calendar, Clock, CreditCard, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { format, addHours } from "date-fns";

export default function BookingPage() {
  const { id: tutorId } = useParams();
  const searchParams = useSearchParams();
  const subjectId = searchParams.get("subjectId");
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tutor, setTutor] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  const [bookingData, setBookingData] = useState({
    startTime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    duration: 1, // hours
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [tutorRes, userRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tutors/${tutorId}`).then(r => r.json()),
          getMe()
        ]);

        if (tutorRes.success) setTutor(tutorRes.data);
        if (userRes.success) setUser(userRes.data);
      } catch (error) {
        toast.error("Failed to load details");
      }
      setIsLoading(false);
    };
    fetchData();
  }, [tutorId, subjectId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <Loader2 className="animate-spin text-orange-500" size={48} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Please login to book a session</h2>
        <Link href="/login" className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-full font-bold transition">
          Go to Login
        </Link>
      </div>
    );
  }

  const subject = tutor?.subjects?.find((s: any) => s.id === subjectId) || tutor?.subjects?.[0];

  const handleBooking = async () => {
    setIsSubmitting(true);
    const start = new Date(bookingData.startTime);
    const end = addHours(start, bookingData.duration);

    const payload = {
      studentId: user.id,
      tutorProfileId: tutor.id,
      tutorSubjectId: subject.id,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      totalPrice: tutor.pricePerHour * bookingData.duration,
    };

    try {
      const res = await createBooking(payload);
      if (res.success) {
        toast.success("Successfully enrolled in course!");
        router.push("/dashboard/bookings");
      } else {
        toast.error(res.message || "Enrollment failed");
      }
    } catch (error) {
      toast.error("An error occurred during booking");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href={`/tutors/${tutorId}`} className="p-2 hover:bg-white/5 rounded-full transition">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold">Checkout: {subject?.title || "Course Enrollment"}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Calendar className="text-orange-500" size={18} /> Select Time
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Start Time</label>
                  <input
                    type="datetime-local"
                    value={bookingData.startTime}
                    onChange={(e) => setBookingData({ ...bookingData, startTime: e.target.value })}
                    className="w-full bg-zinc-800 border-white/10 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Duration (Hours)</label>
                  <select
                    value={bookingData.duration}
                    onChange={(e) => setBookingData({ ...bookingData, duration: Number(e.target.value) })}
                    className="w-full bg-zinc-800 border-white/10 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
                  >
                    {[1, 2, 3, 4, 5].map(h => <option key={h} value={h}>{h} Hour{h > 1 ? 's' : ''}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <CreditCard className="text-orange-500" size={18} /> Payment Summary
              </h3>
              <div className="space-y-3 font-light">
                <div className="flex justify-between text-zinc-400">
                  <span>Hourly Rate</span>
                  <span>${tutor?.pricePerHour}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Duration</span>
                  <span>{bookingData.duration} hrs</span>
                </div>
                <div className="pt-3 border-t border-white/10 flex justify-between text-white font-bold text-xl">
                  <span>Total Due</span>
                  <span className="text-orange-500">${tutor?.pricePerHour * bookingData.duration}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tutor Info */}
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start gap-4">
               <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                  <img src={tutor?.user?.avatar || "https://github.com/shadcn.png"} alt="" className="w-full h-full object-cover" />
               </div>
               <div>
                  <h4 className="font-bold text-lg">{tutor?.user?.name}</h4>
                  <p className="text-sm text-zinc-400">Professional {subject?.category?.name} Tutor</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-orange-400 font-bold">
                    <Clock size={12} /> Fast Response
                  </div>
               </div>
            </div>

            <button
              onClick={handleBooking}
              disabled={isSubmitting}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold py-5 rounded-2xl transition-all shadow-[0_0_30px_rgba(249,115,22,0.4)] disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : "Confirm Enrollment & Pay"}
            </button>
            <p className="text-center text-xs text-zinc-500 px-4">
              By clicking confirm, you agree to SkillBridge Terms of Service and the Tutor's personal policy.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
