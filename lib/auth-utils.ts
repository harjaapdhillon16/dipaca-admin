// Authentication utility functions

export interface User {
  id: string
  email: string
  nombre: string
  rol: 'admin' | 'cliente'
  cliente_id?: number
}

/**
 * Get current user from localStorage
 */
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null
  
  const userStr = localStorage.getItem('user')
  if (!userStr) return null
  
  try {
    return JSON.parse(userStr)
  } catch (error) {
    console.error('Error parsing user:', error)
    return null
  }
}

/**
 * Get auth token from localStorage
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('token')
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getAuthToken() && !!getCurrentUser()
}

/**
 * Check if user is admin
 */
export function isAdmin(): boolean {
  const user = getCurrentUser()
  return user?.rol === 'admin'
}

/**
 * Check if user is cliente
 */
export function isCliente(): boolean {
  const user = getCurrentUser()
  return user?.rol === 'cliente'
}

/**
 * Clear authentication data
 */
export function clearAuth(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

/**
 * Set authentication data
 */
export function setAuth(token: string, user: User): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))
}

/**
 * Get redirect path based on user role
 */
export function getRedirectPath(rol: 'admin' | 'cliente'): string {
  return rol === 'admin' ? '/home' : '/client-dash'
}

/**
 * Check if user can access a route
 */
export function canAccessRoute(pathname: string, user: User | null): boolean {
  if (!user) return false
  
  // Public routes
  const publicRoutes = ['/login', '/registro']
  if (publicRoutes.includes(pathname)) return true
  
  // Admin routes
  const adminRoutes = ['/home', '/clientes', '/servicios', '/trabajadores', '/vehiculos']
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route))
  
  // Cliente routes
  const clienteRoutes = ['/client-dash']
  const isClienteRoute = clienteRoutes.some(route => pathname.startsWith(route))
  
  if (user.rol === 'admin') {
    return !isClienteRoute
  } else if (user.rol === 'cliente') {
    return isClienteRoute
  }
  
  return false
}