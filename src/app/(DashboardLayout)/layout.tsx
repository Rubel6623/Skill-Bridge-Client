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
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Application Data
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">

          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" >
            {user?.role === "ADMIN" && admin}
            {user?.role === "STUDENT" && student}
            {user?.role === "TUTOR" && tutor}
          
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
