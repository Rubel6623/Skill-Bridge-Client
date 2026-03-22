"use client"

import { useState, useEffect } from "react"
import { getAllTutorSubjects } from "@/services/tutor"
import { BookOpen, Search, Filter, MoreVertical, Trash2, Edit2, Loader2, Tag, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-2">Platform Subjects</h1>
          <p className="text-zinc-500">Manage all subjects offered by tutors on the platform.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search subjects or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none w-80 shadow-sm"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
           <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
           <p className="font-bold text-zinc-500 animate-pulse">Scanning platform inventory...</p>
        </div>
      ) : subjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject: any) => (
            <div key={subject.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all group border-b-4 border-b-orange-500/0 hover:border-b-orange-500">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20">
                  <BookOpen className="w-6 h-6" />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="h-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40 rounded-xl p-1">
                    <DropdownMenuItem className="flex items-center gap-2 p-2 cursor-pointer text-blue-600 font-medium">
                      <Edit2 className="w-4 h-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 p-2 cursor-pointer text-red-600 font-medium">
                      <Trash2 className="w-4 h-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1 leading-tight">{subject.title}</h3>
                  <div className="flex items-center gap-1.5 text-xs font-black text-orange-500 uppercase tracking-widest">
                    <Tag className="w-3 h-3" />
                    {subject.category?.name}
                  </div>
                </div>

                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden border border-white dark:border-zinc-900 shadow-sm flex items-center justify-center font-bold text-xs">
                       {subject.tutorProfile?.user?.avatar ? (
                         <img src={subject.tutorProfile?.user?.avatar} alt="Avatar" className="w-full h-full object-cover" />
                       ) : (
                         <User className="w-4 h-4 text-zinc-400" />
                       )}
                    </div>
                    <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300 truncate max-w-[120px]">
                      {subject.tutorProfile?.user?.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-zinc-400 uppercase font-bold">Total Enrolled</p>
                    <p className="font-black text-zinc-900 dark:text-zinc-100 leading-none">
                      {subject.bookings?.length || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
           <BookOpen className="w-16 h-16 text-zinc-300 mx-auto mb-4" />
           <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">No subjects found</h3>
           <p className="text-zinc-500 mt-2">Try a different search term.</p>
        </div>
      )}
    </div>
  )
}
