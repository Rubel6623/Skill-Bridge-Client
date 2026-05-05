"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "./ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-4 px-4">
        Mission Protocol
      </SidebarGroupLabel>
      <SidebarMenu className="gap-2">
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton 
                  tooltip={item.title}
                  className="h-12 px-4 rounded-xl hover:bg-white/5 hover:text-white transition-all group data-[state=open]:bg-white/5"
                >
                  {item.icon && <item.icon className="size-5 text-white/30 group-hover:text-orange-500 transition-colors" />}
                  <span className="font-black text-xs uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                    {item.title}
                  </span>
                  <ChevronRight className="ml-auto size-4 text-white/20 transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub className="ml-4 border-l border-white/5 mt-2 space-y-1">
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild className="h-10 px-4 rounded-lg hover:bg-white/5 transition-all group/sub">
                        <a href={subItem.url} className="flex items-center gap-3 w-full">
                          <div className="size-1.5 rounded-full bg-white/10 group-hover/sub:bg-orange-500 transition-colors" />
                          <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white/40 group-hover/sub:text-white transition-colors">
                            {subItem.title}
                          </span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
