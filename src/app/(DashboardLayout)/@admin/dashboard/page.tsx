"use client"

import { useState, useEffect } from "react"
import { getBookings } from "@/services/booking"
import { Users, BookOpen, Calendar, Star, Clock, TrendingUp, ArrowUpRight } from "lucide-react"

const statCards = [
  { label: "Total Users", value: "1,240", icon: Users, change: "+12%", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  { label: "Active Tutors", value: "320", icon: BookOpen, change: "+8%", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  { label: "Total Bookings", value: "5,680", icon: Calendar, change: "+24%", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
  { label: "Avg Rating", value: "4.8", icon: Star, change: "+0.2", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
]

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of platform activity and key metrics.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((stat, i) => (
          <div key={i} className={`p-5 rounded-2xl border backdrop-blur-sm ${stat.bg} transition-all hover:scale-[1.02]`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-0.5 bg-emerald-500/10 px-2 py-1 rounded-full">
                <TrendingUp className="w-3 h-3" /> {stat.change}
              </span>
            </div>
            <p className="text-3xl font-extrabold text-foreground mb-1">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6">
        <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
          <Clock className="w-5 h-5 text-muted-foreground" />
          Recent Activity
        </h2>
        <div className="space-y-4">
          {[
            { msg: "New tutor registration: Michael Chen", time: "2 min ago", color: "bg-blue-500" },
            { msg: "Booking confirmed: Sarah → Emily (Math)", time: "15 min ago", color: "bg-emerald-500" },
            { msg: "New review posted: 5-star for Physics tutor", time: "1 hour ago", color: "bg-yellow-500" },
            { msg: "New student registration: Alex Johnson", time: "2 hours ago", color: "bg-purple-500" },
            { msg: "Booking cancelled: John → David (Design)", time: "3 hours ago", color: "bg-red-500" },
          ].map((activity, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/30 transition-colors">
              <div className={`w-2.5 h-2.5 rounded-full ${activity.color} shrink-0`} />
              <p className="text-sm text-foreground flex-1">{activity.msg}</p>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}