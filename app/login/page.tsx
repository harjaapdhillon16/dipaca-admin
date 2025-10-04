"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Checkbox } from "../../components/ui/checkbox"
import { Card, CardContent } from "../../components/ui/card"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("demo@email.com")
  const [password, setPassword] = useState("demo@email.com")
  const router = useRouter()

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Fake auth flow: route admin to /home
    router.push("/home")
  }

  return (
    <main className="min-h-svh grid md:grid-cols-2">
      {/* Left - form */}
      <section className="flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <div className="h-6 w-28 rounded bg-secondary" aria-hidden />
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-primary text-balance mb-8">Iniciar Sesion</h1>

          <Card className="shadow-none border-0">
            <CardContent className="p-0">
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="demo@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="demo@email.com"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm text-muted-foreground">
                      Remember Me
                    </Label>
                  </div>
                  <Link href="#" className="text-sm text-primary hover:underline">
                    Forgot Password?
                  </Link>
                </div>

                <Button type="submit" className="w-full h-12 rounded-full">
                  Iniciar Sesion
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Right - teal welcome panel */}
      <section className="hidden md:flex items-center justify-center bg-[var(--sidebar)] text-[var(--sidebar-foreground)]">
        <div className="max-w-sm text-center">
          <p className="text-5xl font-semibold mb-2">Hola!</p>
          <p className="text-base text-[color:var(--sidebar-foreground)]/80">Ingresa tus datos, para comenzar</p>
        </div>
      </section>
    </main>
  )
}
