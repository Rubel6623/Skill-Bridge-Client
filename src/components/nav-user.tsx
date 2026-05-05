"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
  User,
  Settings,
  LayoutDashboard
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar"
import { useRouter } from "next/navigation"
import { UserLogOut } from "@/services/auth"
import { toast } from "sonner"
import Link from "next/link"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()
  const router = useRouter();

  const handleLogout = async () => {
    await UserLogOut();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-white/10 data-[state=open]:text-gray-900 dark:data-[state=open]:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors rounded-xl p-2"
            >
              <Avatar className="h-9 w-9 rounded-xl border border-gray-200 dark:border-white/10 shadow-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-xl bg-orange-500 text-white font-bold">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight ml-2">
                <span className="truncate font-bold text-gray-900 dark:text-white">{user.name}</span>
                <span className="truncate text-[10px] text-gray-500 dark:text-white/50 font-medium">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-gray-400 dark:text-white/30" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-64 rounded-2xl bg-white dark:bg-[#0d0d1a] border-gray-200 dark:border-white/10 text-gray-900 dark:text-white p-2 shadow-2xl backdrop-blur-xl"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={12}
          >
            <DropdownMenuLabel className="p-2 font-normal">
              <div className="flex items-center gap-3 px-1 py-2 text-left">
                <Avatar className="h-10 w-10 rounded-xl border border-gray-200 dark:border-white/10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-xl bg-orange-500 text-white">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-black text-base text-gray-900 dark:text-white">{user.name}</span>
                  <span className="truncate text-xs text-gray-500 dark:text-white/50">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-200 dark:bg-white/5" />
            <DropdownMenuGroup className="space-y-1">
              <DropdownMenuItem className="rounded-xl focus:bg-orange-500/10 focus:text-orange-500 cursor-pointer p-2.5 transition-colors">
                <Sparkles className="size-4 mr-2" />
                Premium Features
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-gray-200 dark:bg-white/5" />
            <DropdownMenuGroup className="space-y-1">
              <Link href="/dashboard/profile">
                <DropdownMenuItem className="rounded-xl focus:bg-orange-500/10 focus:text-orange-500 cursor-pointer p-2.5 transition-colors">
                  <User className="size-4 mr-2" />
                  My Profile
                </DropdownMenuItem>
              </Link>
              <Link href="/dashboard">
                <DropdownMenuItem className="rounded-xl focus:bg-orange-500/10 focus:text-orange-500 cursor-pointer p-2.5 transition-colors">
                  <LayoutDashboard className="size-4 mr-2" />
                  Dashboard
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="rounded-xl focus:bg-orange-500/10 focus:text-orange-500 cursor-pointer p-2.5 transition-colors">
                <Settings className="size-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl focus:bg-orange-500/10 focus:text-orange-500 cursor-pointer p-2.5 transition-colors">
                <Bell className="size-4 mr-2" />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-gray-200 dark:bg-white/5" />
            <DropdownMenuItem 
              onClick={handleLogout}
              className="rounded-xl focus:bg-red-500/10 focus:text-red-500 cursor-pointer p-2.5 transition-colors text-red-400 font-bold"
            >
              <LogOut className="size-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
