"use client"

import Image from "next/image"
import { useAuth } from "../../hooks/useAuth"
import { ChevronDown, LogOut, User, Settings } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export default function Topbar() {
  const { user, logout } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showDropdown])

  const getRoleName = (rol: string) => {
    switch (rol) {
      case 'admin':
        return 'Administrador'
      case 'cliente':
        return 'Cliente'
      case 'trabajador':
        return 'Trabajador'
      default:
        return rol
    }
  }

  const getInitials = (nombre: string) => {
    const names = nombre.split(' ')
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase()
    }
    return nombre.substring(0, 2).toUpperCase()
  }

  if (!user) {
    return (
      <header className="h-16 w-full border-b bg-background flex items-center justify-end pr-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse" />
          <div className="text-right">
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-1" />
            <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="h-16 w-full border-b bg-background flex items-center justify-end pr-6">
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-3 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors"
        >
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1a5490] to-[#5ba3d0] flex items-center justify-center text-white font-semibold text-sm">
            {getInitials(user.nombre)}
          </div>
          
          {/* User Info */}
          <div className="text-right">
            <div className="text-sm font-medium">{user.nombre}</div>
            <div className="text-xs text-muted-foreground">{getRoleName(user.rol)}</div>
          </div>
          
          {/* Dropdown Icon */}
          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border py-2 z-50">
            <div className="px-4 py-3 border-b">
              <div className="text-sm font-medium">{user.nombre}</div>
              <div className="text-xs text-gray-500">{user.email}</div>
            </div>
            
            <div className="py-1">
              <button
                onClick={() => {
                  setShowDropdown(false)
                  // Navigate to profile or settings
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
              >
                <User className="w-4 h-4" />
                Mi Perfil
              </button>
              
              <button
                onClick={() => {
                  setShowDropdown(false)
                  // Navigate to settings
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
              >
                <Settings className="w-4 h-4" />
                Configuración
              </button>
            </div>

            <div className="border-t pt-1">
              <button
                onClick={() => {
                  setShowDropdown(false)
                  logout()
                }}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}