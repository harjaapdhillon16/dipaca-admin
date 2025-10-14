"use client"

import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"

interface User {
  id: string
  email: string
  nombre: string
  rol: 'admin' | 'cliente'
  cliente_id?: number
}

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    authCheck(pathname)
  }, [pathname])

  function authCheck(url: string) {
    const token = localStorage.getItem('token')
    const userStr = localStorage.getItem('user')
    
    if (!token || !userStr) {
      // Not logged in
      setAuthorized(false)
      setLoading(false)
      if (url !== '/login' && url !== '/registro') {
        router.push('/login')
      }
      return
    }

    try {
      const user: User = JSON.parse(userStr)
      
      // Check role-based access
      if (user.rol === 'admin') {
        // Admin cannot access client routes
        if (url.startsWith('/client-dash')) {
          router.push('/home')
          return
        }
        setAuthorized(true)
      } else if (user.rol === 'cliente') {
        // Cliente can only access client-dash routes
        if (!url.startsWith('/client-dash') && url !== '/login' && url !== '/registro') {
          router.push('/client-dash')
          return
        }
        setAuthorized(true)
      } else {
        // Unknown role
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        router.push('/login')
        return
      }
    } catch (error) {
      console.error('Error parsing user:', error)
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.push('/login')
      return
    }

    setLoading(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-500">Cargando...</div>
      </div>
    )
  }

  return authorized ? <>{children}</> : null
}

// Hook to get current user
export function useUser(): User | null {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      try {
        setUser(JSON.parse(userStr))
      } catch (error) {
        console.error('Error parsing user:', error)
      }
    }
  }, [])

  return user
}