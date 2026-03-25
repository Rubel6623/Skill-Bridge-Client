"use client"

import { useState, useEffect, useCallback } from "react"
import { getAllUsers, updateUserStatus, deleteUser } from "@/services/user"
import { Users, Search, Filter, MoreVertical, Ban, ShieldCheck, Trash2, Loader2, Mail, User as UserIcon, Calendar, ArrowUpRight } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

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
    if (!confirm("CRITICAL ACTION: This will permanently delete this user account. All associated data will be lost. Proceed?")) return
    
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

  return (
    <div className="p-8 space-y-10 max-w-[1600px] mx-auto">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-orange-500 mb-2 font-black uppercase tracking-[0.2em] text-[10px]">
            <Users className="w-4 h-4" /> User Directory Control
          </div>
          <h1 className="text-4xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">Platform <span className="text-orange-500">Citizens</span></h1>
          <p className="text-zinc-500 mt-2 font-medium italic">Oversee the growth and conduct of students and experts alike.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative group">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-orange-500 transition-colors" />
            <input
              type="text"
              placeholder="Search Name or Identity..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-4 bg-white dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800 rounded-[1.5rem] focus:ring-0 focus:border-orange-500/50 outline-none w-80 shadow-sm font-bold text-sm transition-all"
            />
          </div>
          
          <div className="flex gap-2 bg-zinc-100 dark:bg-zinc-900 p-1.5 rounded-[1.5rem] border-2 border-zinc-100 dark:border-zinc-800">
             <select 
               value={roleFilter} 
               onChange={(e) => setRoleFilter(e.target.value)}
               className="bg-transparent text-[10px] font-black uppercase tracking-widest px-4 py-2 outline-none cursor-pointer"
             >
               <option value="ALL">All Roles</option>
               <option value="STUDENT">Students</option>
               <option value="TUTOR">Tutors</option>
               <option value="ADMIN">Admins</option>
             </select>
             <div className="w-[2px] bg-zinc-200 dark:bg-zinc-800 my-1" />
             <select 
               value={statusFilter} 
               onChange={(e) => setStatusFilter(e.target.value)}
               className="bg-transparent text-[10px] font-black uppercase tracking-widest px-4 py-2 outline-none cursor-pointer"
             >
               <option value="ALL">All Status</option>
               <option value="ACTIVE">Active</option>
               <option value="BANNED">Banned</option>
             </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 gap-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-[3rem] shadow-2xl">
           <div className="relative">
             <Loader2 className="w-16 h-16 animate-spin text-orange-500" />
             <div className="absolute inset-0 blur-3xl bg-orange-500/20 rounded-full" />
           </div>
           <p className="font-black text-xl text-zinc-900 dark:text-zinc-100 tracking-tight">Accessing User Database</p>
        </div>
      ) : filteredUsers.length > 0 ? (
        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-[3rem] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800/50">
                  <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.25em]">Identity</th>
                  <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.25em]">Classification</th>
                  <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.25em]">Registry Date</th>
                  <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.25em]">Access Status</th>
                  <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.25em] text-right">Directives</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="group hover:bg-orange-50/20 dark:hover:bg-orange-400/5 transition-all">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                           "w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white text-lg shadow-lg",
                           user.role === 'ADMIN' ? 'bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900' : 
                           user.role === 'TUTOR' ? 'bg-orange-500' : 'bg-blue-500'
                        )}>
                          {user.name?.[0]}
                        </div>
                        <div>
                          <p className="font-black text-zinc-900 dark:text-zinc-50">{user.name}</p>
                          <div className="flex items-center gap-1.5 text-zinc-400 font-bold text-xs mt-0.5">
                            <Mail className="w-3 h-3" />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border-2",
                          user.role === 'ADMIN' ? 'border-zinc-900 text-zinc-900 bg-zinc-50' :
                          user.role === 'TUTOR' ? 'border-orange-500 text-orange-600 bg-orange-50' :
                          'border-blue-500 text-blue-600 bg-blue-50'
                       )}>
                          {user.role}
                       </span>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-2 text-zinc-500 font-bold text-sm">
                          <Calendar className="w-4 h-4 text-zinc-300" />
                          {format(new Date(user.createdAt), "PPP")}
                       </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-2">
                          <div className={cn(
                             "w-2 h-2 rounded-full",
                             user.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'
                          )} />
                          <span className={cn(
                             "text-[10px] font-black uppercase tracking-widest",
                             user.status === 'ACTIVE' ? 'text-emerald-600' : 'text-rose-600'
                          )}>
                             User {user.status}
                          </span>
                       </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      {updatingId === user.id ? (
                        <Loader2 className="animate-spin w-6 h-6 ml-auto text-orange-500" />
                      ) : (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-10 w-10 p-0 rounded-2xl hover:bg-orange-100/50">
                              <MoreVertical size={18} className="text-zinc-400 group-hover:text-orange-500" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56 rounded-[1.5rem] p-2 border-2 border-zinc-100 dark:border-zinc-800 shadow-2xl dark:bg-zinc-950">
                            <DropdownMenuItem 
                              onClick={() => handleStatusUpdate(user.id, user.status)}
                              className={cn(
                                "rounded-xl px-4 py-3 flex items-center gap-3 cursor-pointer font-black text-[10px] uppercase tracking-widest",
                                user.status === "ACTIVE" ? "text-rose-600 hover:bg-rose-50" : "text-emerald-600 hover:bg-emerald-50"
                              )}
                            >
                              {user.status === "ACTIVE" ? <Ban size={16} /> : <ShieldCheck size={16} />}
                              {user.status === "ACTIVE" ? "Revoke Access" : "Restore Access"}
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteUser(user.id)}
                              className="rounded-xl px-4 py-3 flex items-center gap-3 cursor-pointer text-zinc-400 hover:text-red-600 hover:bg-red-50 font-black text-[10px] uppercase tracking-widest mt-1 border-t border-zinc-50 pt-3"
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
          <div className="bg-zinc-50 dark:bg-zinc-900/50 px-8 py-6 flex items-center justify-between">
             <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                Showing <span className="text-orange-500">{filteredUsers.length}</span> Active Citizens
             </div>
             <div className="flex items-center gap-2 text-zinc-300 text-[10px] font-black uppercase tracking-widest italic">
                Platform Pulse Synchronized
             </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-32 bg-zinc-50/50 dark:bg-zinc-900/40 rounded-[3rem] border-4 border-dotted border-zinc-200 dark:border-zinc-800 flex flex-col items-center gap-6">
           <Filter className="w-20 h-20 text-zinc-200" />
           <div>
             <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight uppercase">Database Zero</h3>
             <p className="text-zinc-500 mt-2 font-bold max-w-sm mx-auto italic">No users matching the current identification criteria were found in the registry.</p>
           </div>
           <Button 
            variant="outline"
            onClick={() => { setSearchTerm(""); setRoleFilter("ALL"); setStatusFilter("ALL"); }}
            className="rounded-[1.5rem] border-2 font-black px-8 py-6 uppercase tracking-widest text-xs hover:bg-zinc-900 hover:text-white"
           >
             Reset Core Scanning
           </Button>
        </div>
      )}
    </div>
  )
}
