"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { servicios } from "@/lib/data"
import { Calendar, Car } from "lucide-react"

export default function ServiciosPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-[#1a5490]">Servicios</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Date</div>
              <Calendar size={18} className="text-primary" />
            </div>
            <div className="mt-2 text-xl font-semibold">Today</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Entradas</div>
              <Car size={18} className="text-primary" />
            </div>
            <div className="mt-2 text-xl font-semibold">20</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-primary">Servicios</CardTitle>
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
                  <th className="py-3 text-left">FECHA</th>
                  <th className="py-3 text-left">PLACA</th>
                  <th className="py-3 text-left">MARCA-MODELO</th>
                  <th className="py-3 text-left">CLIENTE</th>
                  <th className="py-3 text-left">SERVICIOS</th>
                  <th className="py-3 text-left">MONTO</th>
                </tr>
              </thead>
              <tbody>
                {servicios.map((s) => (
                  <tr key={s.id} className="border-b last:border-0">
                    <td className="py-3">{s.fecha}</td>
                    <td className="py-3">{s.placa}</td>
                    <td className="py-3">{`${s.marca}-${s.modelo}`}</td>
                    <td className="py-3">{s.cliente}</td>
                    <td className="py-3">{s.tipo}</td>
                    <td className="py-3">
                      <Link href={`/admin/servicios/${s.id}`} className="text-primary hover:underline">
                        {s.monto}
                      </Link>
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
