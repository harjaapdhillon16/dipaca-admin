"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { servicios } from "@/lib/data"

const statusColor: Record<string, string> = {
  LAVADO: "bg-blue-600 text-white",
  ASPIRADO: "bg-amber-700 text-white",
  SECADO: "bg-sky-600 text-white",
  FINALIZADO: "bg-green-600 text-white",
}

const cancColor: Record<string, string> = {
  SI: "bg-green-600 text-white",
  NO: "bg-red-600 text-white",
}

export default function ServiciosActivos() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-primary">Servicios</h1>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-primary">Servicios Activos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-muted-foreground">
                <tr className="border-b">
                  <th className="py-3 text-left">PLACA</th>
                  <th className="py-3 text-left">MARCA-MODELO</th>
                  <th className="py-3 text-left">CLIENTE</th>
                  <th className="py-3 text-left">SERVICIOS</th>
                  <th className="py-3 text-left">STATUS</th>
                  <th className="py-3 text-left">CANCELADO</th>
                </tr>
              </thead>
              <tbody>
                {servicios.map((s) => (
                  <tr key={s.id} className="border-b last:border-0">
                    <td className="py-3">{s.placa}</td>
                    <td className="py-3">{`${s.marca}-${s.modelo}`}</td>
                    <td className="py-3">{s.cliente}</td>
                    <td className="py-3">{`${s.tipo} - ${s.monto}`}</td>
                    <td className="py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusColor[s.status || "LAVADO"]}`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${cancColor[s.cancelado || "NO"]}`}
                      >
                        {s.cancelado}
                      </span>
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
