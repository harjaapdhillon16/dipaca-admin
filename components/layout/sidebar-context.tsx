"use client"

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"

type SidebarContextValue = {
  collapsed: boolean
  toggle: () => void
  setCollapsed: (v: boolean) => void
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState<boolean>(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sidebar:collapsed")
      if (stored) setCollapsed(stored === "1")
    } catch {}
  }, [])

  const toggle = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev
      try {
        localStorage.setItem("sidebar:collapsed", next ? "1" : "0")
      } catch {}
      return next
    })
  }, [])

  const value: SidebarContextValue = { collapsed, toggle, setCollapsed }
  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
  const ctx = useContext(SidebarContext)
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider")
  return ctx
}
