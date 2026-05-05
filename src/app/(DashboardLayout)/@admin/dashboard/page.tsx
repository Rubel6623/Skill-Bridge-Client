"use client"

import { useState, useEffect } from "react"
import { getAllBookings } from "../../../../services/booking"
import { getAllUsers } from "../../../../services/user"
import { 
  Users, 
  BookOpen, 
  Calendar, 
  Star, 
  Clock, 
  TrendingUp, 
  ArrowUpRight, 
  Loader2, 
  Activity,
  Layers,
  ShieldCheck,
  Zap,
  Globe,
  Database
} from "lucide-react"
import { format, subMonths } from "date-fns"
import Link from "next/link"
import { Button } from "../../../../components/ui/button"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar,
  AreaChart,
  Area
} from 'recharts'

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStatsAndBookings = async () => {
      try {
        const [bookingRes, userRes] = await Promise.all([
          getAllBookings(),
          getAllUsers()
        ])
        
        if (bookingRes.success) setBookings(bookingRes.data || [])
        if (userRes.success) setUsers(userRes.data || [])
      } catch (error) {
        console.error("Failed to fetch dashboard data", error)
      } finally {
        setLoading(false)
      }
    }
    fetchStatsAndBookings();
  }, [])

  // Process data for charts
  const getBookingTrendData = () => {
    const last6Months = Array.from({ length: 6 }).map((_, i) => {
      const date = subMonths(new Date(), i)
      return {
        month: format(date, 'MMM'),
        count: 0,
        fullDate: date
      }
    }).reverse()

    bookings.forEach(booking => {
      const bookingDate = new Date(booking.createdAt)
      const monthLabel = format(bookingDate, 'MMM')
      const monthData = last6Months.find(m => m.month === monthLabel)
      if (monthData) monthData.count++
    })

    return last6Months
  }

  const getUserDistributionData = () => {
    const roles = {
      ADMIN: users.filter(u => u.role === 'ADMIN').length,
      TUTOR: users.filter(u => u.role === 'TUTOR').length,
      STUDENT: users.filter(u => u.role === 'STUDENT').length,
    }
    return [
      { name: 'Admins', value: roles.ADMIN, color: '#f97316' },
      { name: 'Tutors', value: roles.TUTOR, color: '#10b981' },
      { name: 'Students', value: roles.STUDENT, color: '#3b82f6' },
    ]
  }

  const getStatusData = () => {
    const statusCounts = {
      PENDING: bookings.filter(b => b.status === 'PENDING').length,
      CONFIRMED: bookings.filter(b => b.status === 'CONFIRMED').length,
      COMPLETED: bookings.filter(b => b.status === 'COMPLETED').length,
      CANCELLED: bookings.filter(b => b.status === 'CANCELLED').length,
    }
    return [
      { status: 'Pending', count: statusCounts.PENDING, color: '#eab308' },
      { status: 'Confirmed', count: statusCounts.CONFIRMED, color: '#3b82f6' },
      { status: 'Completed', count: statusCounts.COMPLETED, color: '#10b981' },
      { status: 'Cancelled', count: statusCounts.CANCELLED, color: '#ef4444' },
    ]
  }

  const stats = [
    { 
      label: "Total Users", 
      value: loading ? "..." : users.length.toString(), 
      icon: Users, 
      change: "+12%", 
      color: "text-blue-400", 
      bg: "bg-blue-500/10 border-blue-500/20" 
    },
    { 
      label: "Active Tutors", 
      value: loading ? "..." : users.filter(u => u.role === 'TUTOR').length.toString(), 
      icon: BookOpen, 
      change: "+8%", 
      color: "text-emerald-400", 
      bg: "bg-emerald-500/10 border-emerald-500/20" 
    },
    { 
      label: "Total Bookings", 
      value: loading ? "..." : bookings.length.toString(), 
      icon: Calendar, 
      change: "+24%", 
      color: "text-orange-400", 
      bg: "bg-orange-500/10 border-orange-500/20" 
    },
    { 
      label: "Revenue Growth", 
      value: "94%", 
      icon: Zap, 
      change: "+5.4%", 
      color: "text-yellow-400", 
      bg: "bg-yellow-500/10 border-yellow-500/20" 
    },
  ]

  const recentBookings = bookings.slice(0, 6)

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
        <p className="font-black text-muted-foreground animate-pulse tracking-[0.3em] uppercase text-xs">Initializing Mission Control...</p>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-10 max-w-[1600px] mx-auto bg-[#030303] min-h-screen text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 text-orange-500 mb-2 font-black uppercase tracking-[0.4em] text-[10px]">
            <Activity className="w-4 h-4" /> System Oversight
          </div>
          <h1 className="text-6xl font-black tracking-tighter">
            Admin <span className="text-orange-500">Node</span>
          </h1>
          <p className="text-muted-foreground text-lg mt-2 font-medium">Synchronized with global learning metrics.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/dashboard/post-blog">
            <Button className="rounded-2xl bg-orange-500 hover:bg-orange-600 font-black px-8 py-6 shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all">
              Post New Blog
            </Button>
          </Link>
          <Link href="/dashboard/manage-bookings">
            <Button variant="outline" className="rounded-2xl gap-2 font-bold px-8 py-6 border-white/10 hover:bg-white/5 transition-all">
              Live Monitoring <ArrowUpRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className={`p-8 rounded-[2.5rem] border backdrop-blur-xl ${stat.bg} transition-all hover:scale-[1.02] hover:shadow-2xl group relative overflow-hidden`}>
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <stat.icon size={120} />
            </div>
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${stat.color} shadow-inner`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-black text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 uppercase tracking-widest">
                <TrendingUp className="w-3 h-3" /> {stat.change}
              </span>
            </div>
            <p className="text-5xl font-black mb-1 tracking-tighter relative z-10">{stat.value}</p>
            <p className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] relative z-10">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Analytics Section */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Booking Trend Chart */}
          <div className="rounded-[3rem] border border-white/5 bg-white/[0.02] p-10 shadow-2xl">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h3 className="text-2xl font-black mb-1">Booking Velocity</h3>
                  <p className="text-sm text-muted-foreground font-medium italic">Monthly distribution of student-tutor sessions.</p>
               </div>
               <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Live Data</span>
               </div>
            </div>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={getBookingTrendData()}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    dataKey="month" 
                    stroke="rgba(255,255,255,0.3)" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    dy={15}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.3)" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    dx={-15}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0d0d1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#f97316" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorCount)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* User Distribution Pie Chart */}
            <div className="rounded-[3rem] border border-white/5 bg-white/[0.02] p-10 shadow-2xl">
               <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-400" /> User Demographics
               </h3>
               <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getUserDistributionData()}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={10}
                        dataKey="value"
                      >
                        {getUserDistributionData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0d0d1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
               </div>
               <div className="flex justify-center gap-6 mt-4">
                  {getUserDistributionData().map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                       <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{item.name}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* Booking Status Bar Chart */}
            <div className="rounded-[3rem] border border-white/5 bg-white/[0.02] p-10 shadow-2xl">
               <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" /> Operational Status
               </h3>
               <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getStatusData()}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="status" stroke="rgba(255,255,255,0.3)" fontSize={10} axisLine={false} tickLine={false} />
                      <Tooltip 
                         cursor={{fill: 'rgba(255,255,255,0.05)'}}
                         contentStyle={{ backgroundColor: '#0d0d1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
                      />
                      <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                        {getStatusData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>
          </div>
        </div>

        {/* Sidebar Sections */}
        <div className="space-y-8">
          
          {/* Recent Activity */}
          <div className="rounded-[3rem] border border-white/5 bg-white/[0.02] p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-8 px-2">
               <h3 className="text-xl font-black flex items-center gap-3">
                  <Layers className="w-5 h-5 text-orange-500" /> Activity Log
               </h3>
               <Link href="/dashboard/manage-bookings" className="text-[10px] font-black text-orange-500 uppercase tracking-widest hover:underline">
                  View Full Audit
               </Link>
            </div>
            
            <div className="space-y-4">
              {recentBookings.map((booking, idx) => (
                <div key={booking.id || idx} className="p-4 rounded-3xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all group">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center font-black text-orange-500 border border-orange-500/20 group-hover:scale-110 transition-transform">
                         {booking.student?.name?.[0] || 'S'}
                      </div>
                      <div className="flex-1 min-w-0">
                         <p className="text-sm font-black truncate">{booking.student?.name || 'Anonymous'}</p>
                         <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{format(new Date(booking.startTime), "MMM d, h:mm a")}</p>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        booking.status === 'COMPLETED' ? 'bg-emerald-500' :
                        booking.status === 'PENDING' ? 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]' :
                        booking.status === 'CONFIRMED' ? 'bg-blue-500' : 'bg-red-500'
                      }`} />
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions / Links */}
          <div className="rounded-[3rem] border border-white/5 bg-gradient-to-br from-orange-500/10 to-transparent p-10 shadow-2xl">
             <h3 className="text-xl font-black mb-6">Internal Systems</h3>
             <div className="grid grid-cols-1 gap-3">
                {[
                  { label: "User Management", href: "/dashboard/manage-users", icon: Users },
                  { label: "Category Taxonomy", href: "/dashboard/manage-categories", icon: Layers },
                  { label: "Tutor Subjects", href: "/dashboard/manage-subjects", icon: BookOpen },
                  { label: "Blog Editorial", href: "/dashboard/manage-blogs", icon: Activity },
                ].map((action, i) => (
                  <Link key={i} href={action.href}>
                    <button className="w-full p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-between group">
                       <div className="flex items-center gap-3">
                          <action.icon className="w-4 h-4 text-orange-500" />
                          <span className="text-xs font-black uppercase tracking-widest">{action.label}</span>
                       </div>
                       <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
                    </button>
                  </Link>
                ))}
             </div>
          </div>
        </div>

      </div>
    </div>
  )
}