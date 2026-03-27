"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { createBooking } from "../../../services/booking";
import { toast } from "sonner";
import { Calendar as CalendarIcon, Clock, CheckCircle2 } from "lucide-react";



export const ServiceBookingModal = ({ service }: { service: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleBooking = async () => {
    if (!date || !time) {
      toast.error("Please select both date and time");
      return;
    }

    setLoading(true);
    
    const startTimeStr = `${date}T${time}:00`;
    const startObj = new Date(startTimeStr);
    const endObj = new Date(startObj.getTime() + 60 * 60 * 1000); 
    
    try {
      const res = await createBooking({
        tutorSubjectId: service.id,
        tutorProfileId: service.tutorProfileId,
        startTime: startObj.toISOString(),
        endTime: endObj.toISOString(),
        totalPrice: service.tutorProfile?.pricePerHour || 0,
        status: "PENDING"
      });

      if (res.success) {
        toast.success("Booking created successfully!");
        setIsOpen(false);
      } else {
        toast.error(res.message || "Failed to create booking");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-white font-semibold flex items-center gap-2 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]">
          <CalendarIcon className="w-5 h-5" /> Book Session
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border-white/10 bg-[#0f1117] text-white p-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -z-10 pointer-events-none" />
        
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Book a Session</DialogTitle>
          <DialogDescription className="text-gray-400 mt-1.5">
            Schedule a 60-minute session with <span className="text-white font-medium">{service?.tutorProfile?.user?.name || "your tutor"}</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 space-y-6">
          <div className="bg-white/[0.03] p-5 rounded-2xl border border-white/5 flex justify-between items-center backdrop-blur-md">
             <div>
               <p className="text-sm text-gray-400 font-medium mb-1">Total Price</p>
               <p className="text-3xl font-bold text-primary tracking-tight">${service?.tutorProfile?.pricePerHour || 0}</p>
             </div>
             <div className="text-right">
               <p className="text-sm text-gray-400 font-medium mb-1">Duration</p>
               <p className="text-xl font-semibold flex items-center justify-end gap-1.5 text-white/90">
                 <Clock className="w-5 h-5 text-primary"/> 60 Min
               </p>
             </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Select Date</label>
              <Input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="bg-white/5 border-white/10 text-white hover:border-white/20 focus-visible:ring-primary focus-visible:border-primary h-12 px-4 rounded-xl transition-all"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Select Time</label>
              <Input 
                type="time" 
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-white/5 border-white/10 text-white hover:border-white/20 focus-visible:ring-primary focus-visible:border-primary h-12 px-4 rounded-xl transition-all [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-4 mt-2">
            <div className="flex items-start gap-2.5 text-xs text-green-400/90 bg-green-400/10 p-3 rounded-xl border border-green-400/20">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <p className="leading-relaxed font-medium">Free cancellation up to 24 hours before the session starts.</p>
            </div>
            <Button 
              onClick={handleBooking} 
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-bold h-12 text-lg rounded-xl shadow-[0_0_20px_rgba(var(--primary),0.3)] disabled:opacity-70 disabled:cursor-not-allowed transition-all"
            >
              {loading ? "Processing..." : "Confirm Booking"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
