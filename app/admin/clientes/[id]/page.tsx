import { notFound } from "next/navigation"
import { clientes } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, BarChart2 } from "lucide-react"

export default function ClienteDetail({ params }: { params: { id: string } }) {
  const c = clientes.find((x) => x.ci === params.id)
  if (!c) notFound()
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">Clientes / {c.ci}</div>
      <h1 className="text-3xl font-semibold text-primary">{`${c.nombre} ${c.apellido}`}</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Servicios solicitados</div>
              <Calendar className="text-primary" size={18} />
            </div>
            <div className="mt-2 text-xl font-semibold">6</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Puntos de fidelidad</div>
              <BarChart2 className="text-primary" size={18} />
            </div>
            <div className="mt-2 text-xl font-semibold">250</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
