import { AppSidebar } from "../../components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import { Separator } from "../../components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../../components/ui/sidebar";
import { getUser } from "../../services/auth";
import {
  AudioWaveform,
  Bell,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"
import Link from "next/link";
import { DashboardUserNav } from "../../components/dashboard-user-nav";
import { ThemeToggle } from "../../components/shared/ThemeToggle";

interface LayoutProps {
  children: React.ReactNode; // ✅ REQUIRED by Next.js
  admin: React.ReactNode;
  student: React.ReactNode;
  tutor: React.ReactNode;
}

export default async function DashboardLayout({children, admin, student, tutor }: LayoutProps) {
  
  const user = await getUser();

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Unauthorized Access. Please <Link href='/login'>Login
        </Link></p>        
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar userRole={user.role as "ADMIN" | "STUDENT" | "TUTOR"}/>
      <SidebarInset>
        <header className="flex h-20 shrink-0 items-center justify-between gap-2 px-6 border-b border-gray-200 dark:border-white/5 bg-white/80 dark:bg-[#0a0a14]/40 backdrop-blur-md sticky top-0 z-10 shadow-sm dark:shadow-none">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10" />
            <Separator
              orientation="vertical"
              className="h-6 bg-gray-200 dark:bg-white/10"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard" className="text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block text-gray-300 dark:text-white/20" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-gray-900 dark:text-white font-bold">
                    {user.role.charAt(0) + user.role.slice(1).toLowerCase()} Overview
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-sm font-bold text-gray-900 dark:text-white">Welcome back, {user.name.split(' ')[0]}!</span>
              <span className="text-[10px] uppercase tracking-widest text-orange-500 font-black">
                {user.role} Account
              </span>
            </div>
            
            <Separator orientation="vertical" className="h-8 bg-gray-200 dark:bg-white/10 hidden lg:block" />

            <div className="flex items-center gap-4">
               <ThemeToggle />
               <button className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 text-gray-500 dark:text-white/60 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white transition-all relative shadow-sm dark:shadow-none">
                <Bell size={20} />
                <span className="absolute top-2 right-2 size-2 bg-orange-500 rounded-full border-2 border-white dark:border-[#0a0a14]" />
              </button>

              <DashboardUserNav user={{
                name: user.name,
                email: user.email,
                avatar: (user as any).avatar
              }} />
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 lg:p-8 bg-slate-50 dark:bg-[#0a0a14]">
          <div className="min-h-[calc(100vh-120px)] flex-1 rounded-[2.5rem] bg-white dark:bg-gradient-to-br dark:from-[#0d0d1a] dark:to-[#0a0a14] border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-2xl relative overflow-hidden" >
            {/* Subtle Inner Glow */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-orange-500/10 blur-[100px]" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[100px]" />
            </div>
            
            <div className="relative z-10 h-full">
              {user?.role === "ADMIN" && admin}
              {user?.role === "STUDENT" && student}
              {user?.role === "TUTOR" && tutor}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
