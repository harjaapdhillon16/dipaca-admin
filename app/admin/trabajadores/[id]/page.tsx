import { notFound } from "next/navigation"
import { trabajadores } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, ClipboardList, ShieldCheck } from "lucide-react"

export default function TrabajadorDetail({ params }: { params: { id: string } }) {
  const t = trabajadores.find((x) => x.ci === params.id)
  if (!t) notFound()
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">Trabajadores / {t.ci}</div>
      <h1 className="text-3xl font-semibold text-primary">{`${t.nombre} ${t.apellido}`}</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Date</div>
              <Calendar className="text-primary" size={18} />
            </div>
            <div className="mt-2 text-xl font-semibold">Today</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Servicios realizados</div>
              <ClipboardList className="text-primary" size={18} />
            </div>
            <div className="mt-2 text-xl font-semibold">{t.servicios}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Cargo</div>
              <ShieldCheck className="text-primary" size={18} />
            </div>
            <div className="mt-2 text-xl font-semibold">{t.cargo}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
