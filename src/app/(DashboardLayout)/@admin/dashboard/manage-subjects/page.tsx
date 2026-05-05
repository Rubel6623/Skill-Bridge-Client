"use client"

import { useState, useEffect } from "react"
import { getAllTutorSubjects } from "../../../../../services/tutor"
import { BookOpen, Search, Filter, MoreVertical, Trash2, Edit2, Loader2, Tag, User } from "lucide-react"
import { Button } from "../../../../../components/ui/button"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../../components/ui/dropdown-menu"

export default function AdminManageSubjectsPage() {
  const [subjects, setSubjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  const fetchSubjects = async () => {
    try {
      const result = await getAllTutorSubjects(searchTerm)
      if (result?.success) {
        setSubjects(result.data || [])
      }
    } catch (error) {
      toast.error("Failed to fetch tutor subjects")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubjects()
  }, [searchTerm])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
        <p className="font-black text-white/40 tracking-[0.3em] uppercase text-[10px]">Scanning Knowledge Graph...</p>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-12 bg-transparent text-white animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 text-orange-500 mb-3 font-black uppercase tracking-[0.4em] text-[10px]">
            <BookOpen className="w-4 h-4" /> Academic Inventory Control
          </div>
          <h1 className="text-6xl font-black tracking-tighter leading-none">
            Expert <span className="text-orange-500">Nodes</span>
          </h1>
          <p className="text-white/50 text-lg mt-3 font-medium">Moderate all educational modules offered on the platform.</p>
        </div>
        
        <div className="relative group">
          <Search className="w-4 h-4 absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-orange-500 transition-colors" />
          <input
            type="text"
            placeholder="Scan Subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-14 pr-8 py-5 bg-white/5 border border-white/10 rounded-[1.5rem] focus:ring-2 focus:ring-orange-500/30 outline-none w-80 shadow-2xl font-black text-xs transition-all placeholder:text-white/20 uppercase tracking-widest"
          />
        </div>
      </div>

      {subjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.map((subject: any) => (
            <div key={subject.id} className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl shadow-2xl hover:border-orange-500/30 transition-all group relative overflow-hidden flex flex-col h-full">
              <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:scale-110 transition-transform">
                 <BookOpen size={150} />
              </div>
              
              <div className="flex items-start justify-between mb-8 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20 group-hover:scale-110 transition-transform">
                  <BookOpen size={24} />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl hover:bg-white/10 transition-all">
                      <MoreVertical size={18} className="text-white/20 group-hover:text-white" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 rounded-[1.5rem] p-2 border border-white/10 bg-[#0d0d1a] backdrop-blur-2xl">
                    <DropdownMenuItem className="rounded-xl px-4 py-3 flex items-center gap-3 cursor-pointer text-blue-400 hover:bg-blue-500/10 font-black text-[10px] uppercase tracking-widest transition-all">
                      <Edit2 size={14} /> Modify Node
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-xl px-4 py-3 flex items-center gap-3 cursor-pointer text-red-500 hover:bg-red-500/10 font-black text-[10px] uppercase tracking-widest transition-all mt-1">
                      <Trash2 size={14} /> Purge Node
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-6 flex-1 relative z-10 flex flex-col">
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-white tracking-tighter uppercase leading-none mb-3 group-hover:text-orange-500 transition-colors">
                    {subject.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] font-black text-orange-500/60 uppercase tracking-[0.2em] bg-orange-500/5 w-fit px-4 py-1.5 rounded-full border border-orange-500/10">
                    <Tag size={12} />
                    {subject.category?.name}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 overflow-hidden shadow-lg flex items-center justify-center relative">
                       {subject.tutorProfile?.user?.avatar ? (
                         <img src={subject.tutorProfile?.user?.avatar} alt="Avatar" className="w-full h-full object-cover" />
                       ) : (
                         <User size={16} className="text-white/20" />
                       )}
                    </div>
                    <div className="grid">
                       <span className="text-[10px] font-black text-white/80 uppercase tracking-tight truncate max-w-[100px]">
                         {subject.tutorProfile?.user?.name}
                       </span>
                       <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">
                         Tutor Host
                       </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] text-white/20 uppercase font-black tracking-[0.2em] mb-1">Utilization</p>
                    <p className="font-black text-white text-lg leading-none tracking-tight">
                      {subject.bookings?.length || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-white/[0.02] border-2 border-dashed border-white/10 rounded-[3rem] flex flex-col items-center gap-8 shadow-2xl">
           <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/5">
              <BookOpen size={40} className="text-white/10" />
           </div>
           <div>
             <h3 className="text-3xl font-black text-white tracking-tight uppercase">Knowledge Gap</h3>
             <p className="text-white/40 mt-3 font-medium max-w-sm mx-auto italic">No subjects matching the current identification criteria were found in the registry.</p>
           </div>
           <Button 
            onClick={() => setSearchTerm("")}
            className="rounded-[1.5rem] bg-orange-500 hover:bg-orange-600 font-black px-12 h-14 uppercase tracking-widest text-[10px] shadow-lg shadow-orange-500/20"
           >
             Reset Core Scanning
           </Button>
        </div>
      )}
    </div>
  )
}
