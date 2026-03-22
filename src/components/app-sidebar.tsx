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
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "My Dashboard",
          url: "/dashboard",
        },
        {
          title: "My Profile",
          url: "/dashboard/profile",
        },
        {
          title: "Settings",
          url: "#",
        },

      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    }
  ]

const ADMIN_navMain = [
    {
      title: "Admin Dashboard😎",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    }
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
      ],
    },
    {
      title: "Home",
      url: "/",
      icon: Home,
      items: [
        {
      title: "Home",
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
