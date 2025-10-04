"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Wrench, Users, BadgeDollarSign, LogOut, Settings, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const nav = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/servicios", label: "Servicios", icon: Wrench },
  { href: "/clientes", label: "Clientes", icon: Users },
  { href: "/trabajadores", label: "Trabajadores", icon: BadgeDollarSign },
]

export function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="h-full w-[260px] shrink-0 bg-slate-800 text-white flex flex-col">
      <div className="px-4 py-5 flex items-center gap-2 rounded-r-2xl">
        <div className="h-9 w-9 rounded bg-white/10 flex items-center justify-center">🚗</div>
        <div className="font-semibold text-lg">Dipaca</div>
      </div>
      <nav className="px-2 py-2 space-y-1">
        {nav.map((item) => {
          const Icon = item.icon
          const active = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm",
                active ? "bg-white/15" : "hover:bg-white/10",
              )}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="mt-auto px-2 py-4 space-y-1 text-sm/6 text-white/80">
        <div className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-white/10">
          <HelpCircle size={18} /> Suport
        </div>
        <div className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-white/10">
          <Settings size={18} /> Settings
        </div>
        <Link href="/login" className="flex items-center gap-3 rounded-md px-3 py-2 text-red-300 hover:bg-white/10">
          <LogOut size={18} /> Cerrar Sesion
        </Link>
      </div>
    </aside>
  )
}
