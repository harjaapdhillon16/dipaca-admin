"use client"

import type React from "react"

import { notFound, useParams } from "next/navigation"
import { servicios } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, Car, User2, Mail, Phone } from "lucide-react"
import TodoList from "@/components/servicios/todo-list"

export default function ServicioDetail() {
  const params = useParams()
  const id = Array.isArray(params?.id) ? params?.id[0] : (params?.id as string)
  const s = servicios.find((x) => x.id === id)
  if (!s) notFound()

  return (
    <div className="space-y-6">
      <div>
        <div className="text-sm text-muted-foreground">Servicios / Todos / {s?.id}</div>
        <h1 className="mt-1 text-3xl font-semibold text-primary">{`${s?.fecha}—${s?.placa}`}</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Fecha</span>
              <Calendar size={18} className="text-primary" />
            </div>
            <div className="mt-2 text-xl font-semibold">{s?.fecha}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Hora entrada</span>
              <Clock size={18} className="text-primary" />
            </div>
            <div className="mt-2 text-xl font-semibold">3:00 PM</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Hora salida</span>
              <Clock size={18} className="text-primary" />
            </div>
            <div className="mt-2 text-xl font-semibold">3:30 PM</div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold text-primary">VEHICULO</h2>
      <div className="grid gap-4 md:grid-cols-4">
        <InfoCard label="Placa" value={s!.placa} icon={<Car className="text-primary" size={18} />} />
        <InfoCard label="Marca" value={s!.marca} icon={<Car className="text-primary" size={18} />} />
        <InfoCard label="Modelo" value={s!.modelo} icon={<Car className="text-primary" size={18} />} />
        <InfoCard label="Tipo" value="Sedan" icon={<Car className="text-primary" size={18} />} />
      </div>

      <h2 className="text-xl font-semibold text-primary">CLIENTE</h2>
      <div className="grid gap-4 md:grid-cols-4">
        <InfoCard label="CI" value="3332123" icon={<User2 className="text-primary" size={18} />} />
        <InfoCard label="Nombre" value="Marco Cobo" icon={<User2 className="text-primary" size={18} />} />
        <InfoCard label="Telefono" value="04123332123" icon={<Phone className="text-primary" size={18} />} />
        <InfoCard label="Correo" value="marco@gmail.com" icon={<Mail className="text-primary" size={18} />} />
      </div>

      <h2 className="text-xl font-semibold text-primary">SERVICIO</h2>
      <Card>
        <CardContent className="p-4 space-y-2 text-sm">
          <p>METODO DE PAGO: EFECTIVO</p>
          <p>MONTO: 120$</p>
          <p>SERVICIO: FULL</p>
          <p>TRABAJADORES: MARCO COBO</p>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-primary">To‑do del Servicio</h2>
        <TodoList storageKey={`servicio:${s!.id}:todos`} />
      </div>
    </div>
  )
}

function InfoCard({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">{label}</div>
          {icon}
        </div>
        <div className="mt-2 text-xl font-semibold">{value}</div>
      </CardContent>
    </Card>
  )
}
