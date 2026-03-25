"use client"

import { useState, useEffect } from "react"
import { updateAvailability, getMyAvailability } from "@/services/availability"
import { Calendar, Clock, Plus, Trash2, CheckCircle2, Loader2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const DAYS = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]

export default function TutorAvailabilityPage() {
  const [slots, setSlots] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    const fetchExistingSlots = async () => {
      try {
        const res = await getMyAvailability()
        if (res.success && res.data) {
          // Format times for HTML input if needed, but our backend stores them as "HH:mm" usually
          setSlots(res.data)
        }
      } catch (error) {
        console.error("Fetch availability error:", error)
      } finally {
        setIsFetching(false)
      }
    }
    fetchExistingSlots()
  }, [])

  const addSlot = () => {
    setSlots([...slots, { dayOfWeek: "MONDAY", startTime: "09:00", endTime: "10:00" }])
  }

  const updateSlot = (index: number, field: string, value: string) => {
    const updated = [...slots]
    updated[index][field] = value
    setSlots(updated)
  }

  const removeSlot = (index: number) => {
    const updated = slots.filter((_, i) => i !== index)
    setSlots(updated)
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const res = await updateAvailability(slots)
      if (res.success) {
        toast.success("Availability schedule saved successfully!")
      } else {
        toast.error(res.message || "Something went wrong")
      }
    } catch (error) {
       toast.error("Failed to update schedule")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-2">My Availability</h1>
          <p className="text-zinc-500">Set your weekly tutoring schedule for students to book sessions.</p>
        </div>
        {!isFetching && (
          <div className="flex items-center gap-3">
             <Button 
               onClick={addSlot}
               variant="outline"
               className="border-zinc-200 dark:border-zinc-800 rounded-xl font-bold py-5"
             >
               <Plus className="w-4 h-4 mr-2" /> Add Time Slot
             </Button>
             <Button 
               onClick={handleSave}
               disabled={loading}
               className="bg-orange-500 hover:bg-orange-600 px-8 py-5 rounded-xl font-bold transition-all shadow-lg hover:shadow-orange-500/20"
             >
               {loading ? <Loader2 className="animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
               Save Schedule
             </Button>
          </div>
        )}
      </div>

      {isFetching ? (
        <div className="flex flex-col items-center justify-center py-40 gap-6">
           <Loader2 className="w-16 h-16 animate-spin text-orange-500" />
           <p className="font-black text-xl text-zinc-400 tracking-widest uppercase">Syncing Schedule...</p>
        </div>
      ) : slots.length > 0 ? (
        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-12 gap-4 text-xs font-black text-zinc-400 uppercase tracking-widest px-4">
                 <div className="col-span-4">Day of Week</div>
                 <div className="col-span-3 text-center">Start Time</div>
                 <div className="col-span-3 text-center">End Time</div>
                 <div className="col-span-2 text-right">Remove</div>
              </div>

              {slots.map((slot, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 items-center p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl transition-all group">
                  <div className="col-span-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-500/10 text-orange-500 rounded-lg group-hover:scale-110 transition-transform">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <select
                        value={slot.dayOfWeek}
                        onChange={(e) => updateSlot(index, "dayOfWeek", e.target.value)}
                        className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
                      >
                        {DAYS.map(day => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="flex items-center gap-3 justify-center">
                       <input
                         type="time"
                         value={slot.startTime}
                         onChange={(e) => updateSlot(index, "startTime", e.target.value)}
                        className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
                       />
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="flex items-center gap-3 justify-center">
                       <input
                         type="time"
                         value={slot.endTime}
                         onChange={(e) => updateSlot(index, "endTime", e.target.value)}
                        className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
                       />
                    </div>
                  </div>
                  <div className="col-span-2 text-right">
                    <button
                      onClick={() => removeSlot(index)}
                      className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 p-6 flex items-center justify-between">
              <p className="text-sm text-zinc-500 font-bold">Total Slots: {slots.length}</p>
              <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" /> Changes are not live until you save.
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-24 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 group hover:border-orange-500/30 transition-all cursor-pointer" onClick={addSlot}>
            <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Clock className="w-10 h-10 text-zinc-400 group-hover:text-orange-500 transition-colors" />
            </div>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">No schedule set</h3>
            <p className="text-zinc-500 mt-2 max-w-xs mx-auto">Click here or on "Add Time Slot" to start defining your availability.</p>
          </div>
        )}
    </div>
  )
}
