import type { ReactNode } from "react"
import AppSidebar from "@/components/layout/sidebar"
import Topbar from "@/components/layout/topbar"
import { Sidebar as UISidebar, SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <UISidebar collapsible="icon" className="bg-sidebar text-sidebar-foreground">
        <AppSidebar />
      </UISidebar>

      <SidebarInset>
        <Topbar />
        <main className="p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
