"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Checkbox } from "../../components/ui/checkbox"
import { CardContent } from "../../components/ui/card"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { authAPI } from "../../lib/api"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Call the login API
      const response = await authAPI.login(email, password)
      
      // Store token and user info
      localStorage.setItem("token", response.token)
      localStorage.setItem("user", JSON.stringify(response.user))
      
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true")
      }
      
      // Redirect based on user role
      if (response.user.rol === 'admin') {
        router.push("/home")
      } else if (response.user.rol === 'cliente') {
        router.push("/client-dash/")
      } else {
        router.push("/home")
      }
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.message || "Error al iniciar sesión. Verifica tus credenciales.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-svh grid md:grid-cols-2">
      {/* Left - form */}
      <section className="flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <h1 className="text-3xl md:text-4xl font-semibold text-primary text-balance mb-8">
            Iniciar Sesión
          </h1>

          <CardContent className="p-0">
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-muted-foreground">
                  Email
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    ✉
                  </span>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@dipaca.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="pl-10 border-0 border-b border-border rounded-full bg-transparent"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm text-muted-foreground">
                  Contraseña
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="border-0 border-b border-border rounded-full bg-transparent pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁"}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                    Recuérdame
                  </Label>
                </div>
                <Link href="#" className="text-sm text-primary hover:underline">
                  Olvidaste tu contraseña?
                </Link>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={loading}
                className="w-64 mx-auto block h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground mt-8 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Iniciando sesión...
                  </span>
                ) : (
                  "Iniciar Sesión"
                )}
              </button>

              {/* Register Link */}
              {/* <p className="text-center text-sm text-muted-foreground mt-4">
                ¿No tienes una cuenta?{" "}
                <Link href="/register" className="text-primary hover:underline font-medium">
                  Regístrate aquí
                </Link>
              </p> */}
            </form>
          </CardContent>
        </div>
      </section>

      {/* Right - teal welcome panel with background pattern */}
      <section 
        className="hidden md:flex items-center justify-center bg-[var(--sidebar)] text-[var(--sidebar-foreground)]"
        style={{
          backgroundImage: 'url(/background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-sm text-center">
          <p className="text-5xl font-semibold mb-2">Hola!</p>
          <p className="text-base text-[color:var(--sidebar-foreground)]/80">
            Ingresa tus datos para comenzar
          </p>
        </div>
      </section>
    </main>
  )
}