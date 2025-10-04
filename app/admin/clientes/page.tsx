"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { clientes } from "@/lib/data"
import { Users } from "lucide-react"

export default function ClientesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-primary">Clientes</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Personas</div>
              <Users size={18} className="text-primary" />
            </div>
            <div className="mt-2 text-xl font-semibold">125</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-primary">Clientes</CardTitle>
            <Button variant="outline" size="sm">
              Filtros
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-3">
            <Input placeholder="Search here..." className="max-w-sm" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-muted-foreground">
                <tr className="border-b">
                  <th className="py-3 text-left">CEDULA</th>
                  <th className="py-3 text-left">NOMBRE</th>
                  <th className="py-3 text-left">APELLIDO</th>
                  <th className="py-3 text-left">TELEFONO</th>
                  <th className="py-3 text-left">CORREO</th>
                  <th className="py-3 text-left">ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((c) => (
                  <tr key={c.ci} className="border-b last:border-0">
                    <td className="py-3">{c.ci}</td>
                    <td className="py-3">{c.nombre}</td>
                    <td className="py-3">{c.apellido}</td>
                    <td className="py-3">{c.telefono}</td>
                    <td className="py-3">{c.correo}</td>
                    <td className="py-3">
                      <div className="flex gap-2 text-primary">
                        <Link href={`/admin/clientes/${c.ci}`} className="hover:underline">
                          Ver
                        </Link>
                        <button className="hover:underline" type="button">
                          ✏️
                        </button>
                        <button className="hover:underline" type="button">
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
