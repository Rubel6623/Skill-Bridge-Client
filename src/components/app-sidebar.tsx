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

import { NavMain } from "../components/nav-main"
import { NavUser } from "../components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./ui/sidebar"
import { useEffect, useState } from "react";
import { getUser } from "@/services/auth";



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
      {
        title: "Home",
        icon: Home,
        url: "/",
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
        title: "My Profile",
        url: "/dashboard/profile",
      },
      {
        title: "Manage Bookings",
        url: "/dashboard/manage-bookings",
      },
      {
        title: "Manage Users",
        url: "/dashboard/manage-users",
      },
      {
        title: "Tutor Subjects",
        url: "/dashboard/manage-subjects",
      },
      {
        title: "Manage Blogs",
        url: "/dashboard/manage-blogs",
      },
      {
        title: "Post Blog",
        url: "/dashboard/post-blog",
      },
      {
        title: "Blog Categories",
        url: "/dashboard/manage-blog-categories",
      },
      {
        title: "Home",
        url: "/",
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
      {
        title: "My Reviews",
        url: "/dashboard/reviews",
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

  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData);
    };
    fetchUser();
  }, []);

  if (!mounted) {
    return <div className="w-[var(--sidebar-width)] bg-sidebar" />; 
  }

  let navItems = null;

  if(userRole === "ADMIN"){
    navItems = ADMIN_navMain;
  }else if(userRole === "STUDENT"){
    navItems = STUDENT_navMain;
  }else if(userRole === "TUTOR"){
    navItems = TUTOR_navMain;
  }

  return (
    <Sidebar collapsible="icon" {...props} className="border-r border-white/5 bg-[#0a0a14]">
      <SidebarHeader className="h-20 flex items-center justify-center border-b border-white/5 bg-[#0d0d1a]/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:bg-transparent focus:bg-transparent">
              <div className="flex items-center gap-3">
                <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-purple-600 text-white shadow-lg shadow-orange-500/20">
                  <GalleryVerticalEnd className="size-6" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-black text-xl tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                    SkillBridge
                  </span>
                  <span className="truncate text-[10px] font-bold uppercase tracking-widest text-orange-500/80">
                    Premium Learning
                  </span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="py-4">
        <NavMain items={navItems!} />
      </SidebarContent>
      <SidebarFooter className="border-t border-white/5 p-4">
        {user && (
          <NavUser 
            user={{
              name: user.name,
              email: user.email,
              avatar: user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`
            }} 
          />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
