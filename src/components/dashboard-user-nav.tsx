"use client"

import {
  LogOut,
  Settings,
  User,
  LayoutDashboard,
  Sparkles,
  ChevronDown
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
import { useRouter } from "next/navigation"
import { UserLogOut } from "@/services/auth"
import { toast } from "sonner"
import Link from "next/link"

export function DashboardUserNav({
  user,
}: {
  user: {
    name: string
    email: string
    avatar?: string
  }
}) {
  const router = useRouter();

  const handleLogout = async () => {
    await UserLogOut();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 p-1.5 pr-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/10 hover:border-gray-200 dark:hover:border-white/10 transition-all group outline-none">
          <Avatar className="h-9 w-9 rounded-xl border border-gray-200 dark:border-white/10 shadow-lg">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-xl bg-gradient-to-br from-orange-500 to-purple-600 text-white font-bold">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <ChevronDown className="size-4 text-gray-400 dark:text-white/30 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64 rounded-3xl bg-white/95 dark:bg-[#0d0d1a]/95 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white p-3 shadow-2xl backdrop-blur-2xl"
        align="end"
        sideOffset={15}
      >
        <DropdownMenuLabel className="p-3 font-normal">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 rounded-2xl border-2 border-gray-200 dark:border-white/10 shadow-xl">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="rounded-2xl bg-gradient-to-br from-orange-500 to-purple-600 text-white text-xl">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left leading-tight">
              <span className="truncate font-black text-lg text-gray-900 dark:text-white">{user.name}</span>
              <span className="truncate text-xs text-gray-500 dark:text-white/40 font-medium">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-200 dark:bg-white/5 my-2" />
        <DropdownMenuGroup className="space-y-1">
          <DropdownMenuItem className="rounded-2xl focus:bg-orange-500/10 focus:text-orange-500 cursor-pointer p-3 transition-colors">
            <Sparkles className="size-4 mr-3 text-orange-400" />
            <span className="font-semibold">Upgrade to Pro</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-gray-200 dark:bg-white/5 my-2" />
        <DropdownMenuGroup className="space-y-1">
          <Link href="/dashboard/profile" className="w-full">
            <DropdownMenuItem className="rounded-2xl focus:bg-gray-100 dark:focus:bg-white/10 focus:text-gray-900 dark:focus:text-white cursor-pointer p-3 transition-colors">
              <User className="size-4 mr-3 text-purple-500 dark:text-purple-400" />
              <span>My Profile</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard" className="w-full">
            <DropdownMenuItem className="rounded-2xl focus:bg-gray-100 dark:focus:bg-white/10 focus:text-gray-900 dark:focus:text-white cursor-pointer p-3 transition-colors">
              <LayoutDashboard className="size-4 mr-3 text-blue-500 dark:text-blue-400" />
              <span>Dashboard</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="rounded-2xl focus:bg-gray-100 dark:focus:bg-white/10 focus:text-gray-900 dark:focus:text-white cursor-pointer p-3 transition-colors">
            <Settings className="size-4 mr-3 text-emerald-500 dark:text-emerald-400" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-gray-200 dark:bg-white/5 my-2" />
        <DropdownMenuItem 
          onClick={handleLogout}
          className="rounded-2xl focus:bg-red-500/10 focus:text-red-500 cursor-pointer p-3 transition-colors text-red-400 font-bold"
        >
          <LogOut className="size-4 mr-3" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
