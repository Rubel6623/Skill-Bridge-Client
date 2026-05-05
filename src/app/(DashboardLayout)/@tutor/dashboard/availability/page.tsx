"use client"

import { useState, useEffect } from "react"
import { updateAvailability, getMyAvailability } from "../../../../../services/availability"
import { Calendar, Clock, Plus, Trash2, CheckCircle2, Loader2, Save } from "lucide-react"
import { Button } from "../../../../../components/ui/button";
import { toast } from "sonner";

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
        toast.success("Schedule integrated successfully!")
      } else {
        toast.error(res.message || "Something went wrong")
      }
    } catch (error) {
       toast.error("Failed to update schedule")
    } finally {
      setLoading(false)
    }
  }

  if (isFetching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
        <p className="font-black text-white/40 tracking-[0.3em] uppercase text-[10px]">Syncing Schedule Node...</p>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-12 bg-transparent text-gray-900 dark:text-white animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 text-orange-500 mb-3 font-black uppercase tracking-[0.4em] text-[10px]">
            <Clock className="w-4 h-4" /> Temporal Hub Management
          </div>
          <h1 className="text-6xl font-black tracking-tighter leading-none">
            Time <span className="text-orange-500">Nodes</span>
          </h1>
          <p className="text-gray-500 dark:text-white/50 text-lg mt-3 font-medium">Define your weekly operational windows.</p>
        </div>
        <div className="flex items-center gap-4">
           <Button 
             onClick={addSlot}
             className="bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white font-black h-14 px-8 rounded-2xl border border-gray-200 dark:border-white/5 transition-all flex items-center gap-3 shadow-lg dark:shadow-none"
           >
             <Plus className="size-4" /> ADD SLOT
           </Button>
           <Button 
             onClick={handleSave}
             disabled={loading}
             className="bg-orange-500 hover:bg-orange-600 text-white font-black h-14 px-10 rounded-2xl shadow-lg shadow-orange-500/20 transition-all flex items-center gap-3"
           >
             {loading ? <Loader2 className="animate-spin" /> : <Save className="size-4" />}
             SAVE SCHEDULE
           </Button>
        </div>
      </div>

      {slots.length > 0 ? (
        <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-[3rem] p-10 backdrop-blur-xl shadow-lg dark:shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-[0.02] group-hover:scale-110 transition-transform">
               <Calendar size={200} />
            </div>

            <div className="space-y-6 relative z-10">
              <div className="grid grid-cols-12 gap-6 text-[10px] font-black text-gray-400 dark:text-white/30 uppercase tracking-[0.3em] px-6">
                 <div className="col-span-4">Weekly Cycle</div>
                 <div className="col-span-3 text-center">Inception</div>
                 <div className="col-span-3 text-center">Termination</div>
                 <div className="col-span-2 text-right">Delete</div>
              </div>

              <div className="space-y-4">
                {slots.map((slot, index) => (
                  <div key={index} className="grid grid-cols-12 gap-6 items-center p-6 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-[2rem] hover:bg-gray-100 dark:hover:bg-white/10 transition-all group/item shadow-sm dark:shadow-xl">
                    <div className="col-span-4">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center border border-orange-500/20 group-hover/item:scale-110 transition-transform">
                          <Calendar size={20} />
                        </div>
                        <select
                          value={slot.dayOfWeek}
                          onChange={(e) => updateSlot(index, "dayOfWeek", e.target.value)}
                          className="w-full bg-white dark:bg-[#0d0d1a] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm font-black outline-none focus:ring-2 focus:ring-orange-500/50 appearance-none cursor-pointer"
                        >
                          {DAYS.map(day => (
                            <option key={day} value={day}>{day}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-span-3">
                       <input
                         type="time"
                         value={slot.startTime}
                         onChange={(e) => updateSlot(index, "startTime", e.target.value)}
                         className="w-full bg-white dark:bg-[#0d0d1a] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm font-black outline-none focus:ring-2 focus:ring-orange-500/50 appearance-none text-center"
                       />
                    </div>
                    <div className="col-span-3">
                       <input
                         type="time"
                         value={slot.endTime}
                         onChange={(e) => updateSlot(index, "endTime", e.target.value)}
                         className="w-full bg-white dark:bg-[#0d0d1a] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm font-black outline-none focus:ring-2 focus:ring-orange-500/50 appearance-none text-center"
                       />
                    </div>
                    <div className="col-span-2 text-right">
                      <button
                        onClick={() => removeSlot(index)}
                        className="p-3 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-10 pt-8 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 text-[10px] font-black text-gray-400 dark:text-white/40 uppercase tracking-widest">
                  Active Nodes: {slots.length}
                </div>
              </div>
              <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 font-black text-[10px] uppercase tracking-widest bg-emerald-500/10 px-6 py-3 rounded-2xl border border-emerald-500/20">
                <CheckCircle2 size={16} /> Changes require manual synchronization to deploy.
              </div>
            </div>
          </div>
      ) : (
        <div className="text-center py-32 bg-white/[0.02] border-2 border-dashed border-white/10 rounded-[3rem] group hover:border-orange-500/30 transition-all cursor-pointer shadow-2xl" onClick={addSlot}>
          <div className="w-24 h-24 bg-white/5 border border-white/5 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:border-orange-500/20 transition-all">
            <Clock size={40} className="text-white/20 group-hover:text-orange-500 transition-colors" />
          </div>
          <h3 className="text-3xl font-black text-white tracking-tight">No Temporal Nodes Active</h3>
          <p className="text-white/40 mt-3 max-w-xs mx-auto font-medium">Initialize your schedule hub to begin session acceptance.</p>
          <Button className="mt-8 bg-orange-500 hover:bg-orange-600 font-black px-10 h-14 rounded-2xl">
             INITIALIZE HUB
          </Button>
        </div>
      )}
    </div>
  )
}
