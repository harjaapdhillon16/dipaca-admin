"use client"

import type { ReactNode } from "react"
import AppSidebar from "./sidebar"
import Topbar from "./topbar"
import { Sidebar as UISidebar, SidebarProvider, SidebarInset } from "../ui/sidebar"

export default function Shell({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-dvh w-full">
        <div className="md:flex">
          <UISidebar 
            collapsible="icon"
            className="z-50 [&_[data-slot=sidebar-inner]]:rounded-r-2xl [&_[data-slot=sidebar-inner]]:mr-2"
            style={{
              '--sidebar-width-icon': '5rem'
            } as React.CSSProperties}
          >
            <AppSidebar />
          </UISidebar>
          <SidebarInset className="flex-1 pl-4">
            <Topbar />
            <main className="container mx-auto p-6">{children}</main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}