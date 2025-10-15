"use client"

import type React from "react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "../ui/sidebar"
import { Home, Wrench, Users, BadgeCheck, HelpCircle, Settings, LogOut } from "lucide-react"

type NavItem = {
  href: string
  label: string
  icon: React.ComponentType<{ size?: number }>
  aliases?: string[]
}

const nav: NavItem[] = [
  { href: "/home", label: "Home", icon: Home, aliases: ["/admin"] },
  { href: "/servicios", label: "Servicios", icon: Wrench, aliases: ["/admin/servicios"] },
  { href: "/clientes", label: "Clientes", icon: Users, aliases: ["/admin/clientes"] },
  { href: "/trabajadores", label: "Trabajadores", icon: BadgeCheck, aliases: ["/admin/trabajadores"] },
  { href: "/client-dash", label: "Servicios ", icon: Wrench, aliases: ["/client-dash/"] },
]

export default function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"
  const isClientDash = pathname.startsWith("/client-dash")

  // Filter nav items based on route
const visibleNav = isClientDash 
  ? nav.filter(item => item.label === "Servicios ")
  : nav.filter(item => item.label !== "Servicios ")

  const handleLogout = async () => {
    try {
      // Call logout API endpoint to clear HTTP-only cookies
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })

      // Clear any client-side tokens
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      sessionStorage.clear()

      // Redirect to login page
      router.push('/login')
      router.refresh() // Refresh to clear any cached data
    } catch (error) {
      console.error('Logout failed:', error)
      // Still redirect to login even if API call fails
      router.push('/login')
    }
  }

  return (
    <>
      <SidebarHeader className="px-3 py-4">
        <div className={`flex items-center gap-2 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="h-8 w-8 flex-shrink-0 rounded bg-sidebar-accent" aria-hidden />
          <span 
            className="font-semibold transition-opacity duration-200 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:overflow-hidden"
          >
            Dipaca
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase tracking-wide text-[11px] group-data-[collapsible=icon]:text-center group-data-[collapsible=icon]:px-0">
            Menu
          </SidebarGroupLabel>
          <SidebarMenu>
            {visibleNav.map(({ href, label, icon: Icon, aliases }) => {
              const matches = (p: string) => pathname === p || pathname.startsWith(p + "/")
              // Force active state for Servicios when on client-dash routes
              const active = isClientDash && label === "Servicios"
                ? true
                : (matches(href) || (aliases?.some(matches) ?? false))
              
              return (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton
                    asChild
                    isActive={active}
                    tooltip={label}
                    aria-current={active ? "page" : undefined}
                    className="group-data-[collapsible=icon]:!justify-center group-data-[collapsible=icon]:!px-0 group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:w-10"
                  >
                    <Link href={href} className="gap-3 w-full">
                      <Icon size={18} className="flex-shrink-0" />
                      <span className="group-data-[collapsible=icon]:hidden">{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="pb-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              tooltip="Suport"
              className="group-data-[collapsible=icon]:!justify-center group-data-[collapsible=icon]:!px-0 group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:w-10"
            >
              <Link href="#" className="gap-3 w-full">
                <HelpCircle size={18} className="flex-shrink-0" />
                <span className="group-data-[collapsible=icon]:hidden">Suport</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              tooltip="Settings"
              className="group-data-[collapsible=icon]:!justify-center group-data-[collapsible=icon]:!px-0 group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:w-10"
            >
              <Link href="#" className="gap-3 w-full">
                <Settings size={18} className="flex-shrink-0" />
                <span className="group-data-[collapsible=icon]:hidden">Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={handleLogout}
              tooltip="Cerrar Sesion" 
              className="text-red-400 hover:text-red-500 group-data-[collapsible=icon]:!justify-center group-data-[collapsible=icon]:!px-0 group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:w-10"
            >
              <div className="flex items-center gap-3 w-full">
                <LogOut size={18} className="flex-shrink-0" />
                <span className="group-data-[collapsible=icon]:hidden">Cerrar Sesion</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  )
}