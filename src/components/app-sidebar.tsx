"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Home
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"


const STUDENT_navMain = [
  {
    title: "Student Dashboard",
    url: "/dashboard",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "My Dashboard",
        url: "/dashboard",
      },
      {
        title: "My Bookings",
        url: "/dashboard/bookings",
      },
      {
        title: "My Profile",
        url: "/dashboard/profile",
      },
    ],
  },
]

const ADMIN_navMain = [
  {
    title: "Admin Dashboard😎",
    url: "/dashboard",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "Overview",
        url: "/dashboard",
      },
      {
        title: "Manage Bookings",
        url: "/dashboard/manage-bookings",
      },
      {
        title: "Tutor Subjects",
        url: "/dashboard/manage-subjects",
      },
      {
        title: "Settings",
        url: "#",
      },
    ],
  },
]

const TUTOR_navMain = [
  {
    title: "Tutor Dashboard",
    url: "/dashboard",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "Dashboard Home",
        url: "/dashboard",
      },
      {
        title: "My Profile",
        url: "/dashboard/profile",
      },
      {
        title: "Bookings",
        url: "/dashboard/bookings",
      },
      {
        title: "Availability",
        url: "/dashboard/availability",
      },
    ],
  },
  {
    title: "Home",
    url: "/",
    icon: Home,
    items: [
      {
        title: "Landing Page",
        url: "/"
      }
    ]
  }
]

  interface AppSidebarProps extends React.ComponentProps<typeof Sidebar>{
    userRole: "ADMIN" | "STUDENT" | "TUTOR"
  }


export function AppSidebar({userRole, ...props }: AppSidebarProps) {

  let navItems = null;

  if(userRole === "ADMIN"){
    navItems = ADMIN_navMain;
  }else if(userRole === "STUDENT"){
    navItems = STUDENT_navMain;
  }else if(userRole === "TUTOR"){
    navItems = TUTOR_navMain;
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems!} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
