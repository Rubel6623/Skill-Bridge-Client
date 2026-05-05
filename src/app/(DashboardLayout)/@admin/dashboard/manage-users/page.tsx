"use client"

import { useState, useEffect, useCallback } from "react"
import { getAllUsers, updateUserStatus, deleteUser } from "../../../../../services/user"
import { Users, Search, Filter, MoreVertical, Ban, ShieldCheck, Trash2, Loader2, Mail, User as UserIcon, Calendar, ArrowUpRight } from "lucide-react"
import { format } from "date-fns"
import { Button } from "../../../../../components/ui/button"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../../components/ui/dropdown-menu"
import { cn } from "../../../../../lib/utils"

export default function AdminManageUsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("ALL")
  const [statusFilter, setStatusFilter] = useState<string>("ALL")

  const fetchUsers = useCallback(async () => {
    try {
      const result = await getAllUsers()
      if (result?.success) {
        setUsers(result.data || [])
      }
    } catch (error) {
      toast.error("Failed to fetch users")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleStatusUpdate = async (userId: string, currentStatus: string) => {
    const nextStatus = currentStatus === "ACTIVE" ? "BANNED" : "ACTIVE"
    const actionLabel = currentStatus === "ACTIVE" ? "Ban" : "Unban"
    
    if (!confirm(`Are you sure you want to ${actionLabel} this user?`)) return
    
    setUpdatingId(userId)
    try {
      const res = await updateUserStatus(userId, nextStatus)
      if (res.success) {
        toast.success(`User access ${nextStatus.toLowerCase()} successfully`)
        fetchUsers()
      } else {
        toast.error(res.message || "Operation failed")
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
    } finally {
      setUpdatingId(null)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("CRITICAL ACTION: This will permanently delete this user account. Proceed?")) return
    
    setUpdatingId(userId)
    try {
      const res = await deleteUser(userId)
      if (res.success) {
        toast.success("User account purged")
        fetchUsers()
      } else {
        toast.error(res.message || "Purge failed")
      }
    } catch (error) {
      toast.error("System error during purge")
    } finally {
      setUpdatingId(null)
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesRole = roleFilter === "ALL" || user.role === roleFilter
    const matchesStatus = statusFilter === "ALL" || user.status === statusFilter
    
    return matchesSearch && matchesRole && matchesStatus
  })

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
        <p className="font-black text-gray-400 dark:text-white/40 tracking-[0.3em] uppercase text-[10px]">Accessing User Core...</p>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-12 bg-transparent text-gray-900 dark:text-white animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 text-orange-500 mb-3 font-black uppercase tracking-[0.4em] text-[10px]">
            <Users className="w-4 h-4" /> Global Citizen Registry
          </div>
          <h1 className="text-6xl font-black tracking-tighter leading-none">
            User <span className="text-orange-500">Node</span>
          </h1>
          <p className="text-gray-500 dark:text-white/50 text-lg mt-3 font-medium">Oversee the growth and conduct of your experts.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative group">
            <Search className="w-4 h-4 absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/30 group-focus-within:text-orange-500 transition-colors" />
            <input
              type="text"
              placeholder="Filter Citizens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-14 pr-8 py-5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[1.5rem] focus:ring-2 focus:ring-orange-500/30 outline-none w-80 shadow-lg dark:shadow-2xl font-black text-xs transition-all placeholder:text-gray-400 dark:placeholder:text-white/20 uppercase tracking-widest text-gray-900 dark:text-white"
            />
          </div>
          
          <div className="flex gap-2 bg-white dark:bg-white/5 p-2 rounded-[1.5rem] border border-gray-200 dark:border-white/10 backdrop-blur-xl">
             <select 
               value={roleFilter} 
               onChange={(e) => setRoleFilter(e.target.value)}
               className="bg-transparent text-[10px] font-black uppercase tracking-[0.2em] px-5 py-3 outline-none cursor-pointer text-gray-500 dark:text-white/60 focus:text-gray-900 dark:focus:text-white transition-colors appearance-none border-r border-gray-200 dark:border-white/5"
             >
               <option value="ALL">All Roles</option>
               <option value="STUDENT">Students</option>
               <option value="TUTOR">Tutors</option>
               <option value="ADMIN">Admins</option>
             </select>
             <select 
               value={statusFilter} 
               onChange={(e) => setStatusFilter(e.target.value)}
               className="bg-transparent text-[10px] font-black uppercase tracking-[0.2em] px-5 py-3 outline-none cursor-pointer text-gray-500 dark:text-white/60 focus:text-gray-900 dark:focus:text-white transition-colors appearance-none"
             >
               <option value="ALL">All Status</option>
               <option value="ACTIVE">Active</option>
               <option value="BANNED">Banned</option>
             </select>
          </div>
        </div>
      </div>

      {filteredUsers.length > 0 ? (
        <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-[3rem] overflow-hidden shadow-lg dark:shadow-2xl backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/5">
                  <th className="px-10 py-8 text-[10px] font-black text-gray-400 dark:text-white/30 uppercase tracking-[0.4em]">Identity</th>
                  <th className="px-10 py-8 text-[10px] font-black text-gray-400 dark:text-white/30 uppercase tracking-[0.4em]">Classification</th>
                  <th className="px-10 py-8 text-[10px] font-black text-gray-400 dark:text-white/30 uppercase tracking-[0.4em]">Registry</th>
                  <th className="px-10 py-8 text-[10px] font-black text-gray-400 dark:text-white/30 uppercase tracking-[0.4em]">Status</th>
                  <th className="px-10 py-8 text-[10px] font-black text-gray-400 dark:text-white/30 uppercase tracking-[0.4em] text-right">Directives</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-white/5">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="group hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-all">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-6">
                        <div className={cn(
                           "w-14 h-14 rounded-[1.5rem] flex items-center justify-center font-black text-white text-xl shadow-2xl relative overflow-hidden",
                           user.role === 'ADMIN' ? 'bg-zinc-800 border border-zinc-700' : 
                           user.role === 'TUTOR' ? 'bg-orange-500 shadow-orange-500/20' : 'bg-blue-600 shadow-blue-600/20'
                        )}>
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                          <span className="relative z-10">{user.name?.[0]}</span>
                        </div>
                        <div>
                          <p className="font-black text-gray-900 dark:text-white text-lg tracking-tight uppercase leading-none mb-2">{user.name}</p>
                          <div className="flex items-center gap-2 text-gray-400 dark:text-white/30 font-black text-[10px] uppercase tracking-widest">
                            <Mail className="w-3 h-3" />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                       <span className={cn(
                          "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border",
                          user.role === 'ADMIN' ? 'border-zinc-700 text-zinc-400 bg-zinc-800/50' :
                          user.role === 'TUTOR' ? 'border-orange-500/30 text-orange-400 bg-orange-500/10' :
                          'border-blue-500/30 text-blue-400 bg-blue-500/10'
                       )}>
                          {user.role}
                       </span>
                    </td>
                    <td className="px-10 py-8">
                       <div className="flex items-center gap-3 text-gray-400 dark:text-white/40 font-black text-[10px] uppercase tracking-widest">
                          <Calendar size={14} className="text-gray-300 dark:text-white/20" />
                          {format(new Date(user.createdAt), "MMM dd • yyyy")}
                       </div>
                    </td>
                    <td className="px-10 py-8">
                       <div className="flex items-center gap-3">
                          <div className={cn(
                             "w-2 h-2 rounded-full",
                             user.status === 'ACTIVE' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)] animate-pulse'
                          )} />
                          <span className={cn(
                             "text-[9px] font-black uppercase tracking-widest",
                             user.status === 'ACTIVE' ? 'text-emerald-400' : 'text-rose-400'
                          )}>
                             {user.status}
                          </span>
                       </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                      {updatingId === user.id ? (
                        <Loader2 className="animate-spin w-6 h-6 ml-auto text-orange-500" />
                      ) : (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-12 w-12 p-0 rounded-2xl hover:bg-gray-100 dark:hover:bg-white/10 transition-all">
                              <MoreVertical size={20} className="text-gray-300 dark:text-white/20 group-hover:text-orange-500" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-64 rounded-[2rem] p-3 border border-white/10 shadow-2xl bg-[#0d0d1a] backdrop-blur-2xl">
                            <DropdownMenuItem 
                              onClick={() => handleStatusUpdate(user.id, user.status)}
                              className={cn(
                                "rounded-xl px-5 py-4 flex items-center gap-4 cursor-pointer font-black text-[10px] uppercase tracking-widest transition-all",
                                user.status === "ACTIVE" ? "text-rose-400 hover:bg-rose-500/10" : "text-emerald-400 hover:bg-emerald-500/10"
                              )}
                            >
                              {user.status === "ACTIVE" ? <Ban size={16} /> : <ShieldCheck size={16} />}
                              {user.status === "ACTIVE" ? "Revoke Access" : "Restore Access"}
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteUser(user.id)}
                              className="rounded-xl px-5 py-4 flex items-center gap-4 cursor-pointer text-white/30 hover:text-red-500 hover:bg-red-500/10 font-black text-[10px] uppercase tracking-widest mt-2 border-t border-white/5 pt-4"
                            >
                              <Trash2 size={16} /> Delete Account
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
          <div className="bg-gray-50 dark:bg-white/5 px-10 py-8 flex items-center justify-between">
             <div className="text-[10px] font-black text-gray-400 dark:text-white/30 uppercase tracking-[0.3em]">
                Registry Volume: <span className="text-orange-500">{filteredUsers.length}</span> Active Nodes
             </div>
             <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 px-5 py-2.5 rounded-xl border border-emerald-500/20">
                <ArrowUpRight size={14} /> Synchronized with Core
             </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-32 bg-gray-50 dark:bg-white/[0.02] border-2 border-dashed border-gray-200 dark:border-white/10 rounded-[3rem] flex flex-col items-center gap-8 shadow-lg dark:shadow-2xl">
           <div className="w-24 h-24 bg-white dark:bg-white/5 rounded-full flex items-center justify-center border border-gray-100 dark:border-white/5">
              <Filter className="w-10 h-10 text-gray-200 dark:text-white/10" />
           </div>
           <div>
             <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight uppercase">Registry Zero</h3>
             <p className="text-gray-400 dark:text-white/40 mt-3 font-medium max-w-sm mx-auto italic">No identification matches found within the global database.</p>
           </div>
           <Button 
            onClick={() => { setSearchTerm(""); setRoleFilter("ALL"); setStatusFilter("ALL"); }}
            className="rounded-[1.5rem] bg-orange-500 hover:bg-orange-600 font-black px-12 h-14 uppercase tracking-widest text-[10px] shadow-lg shadow-orange-500/20"
           >
             Reset Pulse Scan
           </Button>
        </div>
      )}
    </div>
  )
}
