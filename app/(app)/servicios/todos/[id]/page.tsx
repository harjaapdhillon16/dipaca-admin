"use client"

import { use, useState, useEffect } from "react"
import { Calendar, Clock, Car, User, CreditCard, Mail, Phone, Hash } from "lucide-react"
import { serviciosAPI } from "../../../../../lib/api"
import Link from "next/link"
import TodoList from "../../../../../components/todos/todo-list"

type Props = { params: Promise<{ id: string }> }

interface ServicioDetalle {
  id: string
  fecha: string
  hora_entrada?: string
  hora_salida?: string
  placa: string
  marca: string
  modelo: string
  tipo: string
  cliente_nombre: string
  cliente_apellido: string
  cliente_ci: string
  cliente_telefono?: string
  cliente_correo?: string
  tipo_servicio: string
  descripcion?: string
  monto: number
  metodo_pago?: string
  trabajador_nombre?: string
  trabajador_apellido?: string
  status: string
}

export default function ServicioDetallePage({ params }: Props) {
  const { id } = use(params)
  const [servicio, setServicio] = useState<ServicioDetalle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchServicio()
  }, [id])

  const fetchServicio = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await serviciosAPI.getById(id)
      setServicio(data)
    } catch (err: any) {
      console.error("Error fetching servicio:", err)
      setError(err.message || "Error al cargar servicio")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a5490] mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando servicio...</p>
        </div>
      </div>
    )
  }

  if (error || !servicio) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || "Servicio no encontrado"}</p>
          <Link href="/servicios/todos">
            <button className="text-[#1a5490] hover:underline">
              Volver a servicios
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const formatTime = (timeString?: string) => {
    if (!timeString) return 'N/A'
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="text-sm text-gray-500">
          <Link href="/servicios/todos" className="hover:underline">Servicios</Link>
          {" / "}
          <Link href="/servicios/todos" className="hover:underline">Todas</Link>
          {" / "} {servicio.placa || id}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-teal-800">
          {formatDate(servicio.fecha)}–{servicio.placa || 'N/A'}
        </h1>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-teal-700" />
            <div className="text-xs text-gray-500">Fecha</div>
          </div>
          <div className="text-lg font-semibold">
            {new Date(servicio.fecha).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit'
            })}
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-teal-700" />
            <div className="text-xs text-gray-500">Hora entrada</div>
          </div>
          <div className="text-lg font-semibold">{formatTime(servicio.hora_entrada)}</div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-teal-700" />
            <div className="text-xs text-gray-500">Hora salida</div>
          </div>
          <div className="text-lg font-semibold">{formatTime(servicio.hora_salida)}</div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-teal-800">VEHICULO</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border p-4">
            <div className="flex items-center gap-3 mb-2">
              <Hash className="w-5 h-5 text-teal-700" />
              <div className="text-xs text-gray-500">Placa</div>
            </div>
            <div className="text-lg font-semibold">{servicio.placa || 'N/A'}</div>
          </div>
          <div className="bg-white rounded-xl border p-4">
            <div className="flex items-center gap-3 mb-2">
              <Car className="w-5 h-5 text-teal-700" />
              <div className="text-xs text-gray-500">Marca</div>
            </div>
            <div className="text-lg font-semibold">{servicio.marca}</div>
          </div>
          <div className="bg-white rounded-xl border p-4">
            <div className="flex items-center gap-3 mb-2">
              <Car className="w-5 h-5 text-teal-700" />
              <div className="text-xs text-gray-500">Modelo</div>
            </div>
            <div className="text-lg font-semibold">{servicio.modelo}</div>
          </div>
          <div className="bg-white rounded-xl border p-4">
            <div className="flex items-center gap-3 mb-2">
              <Car className="w-5 h-5 text-teal-700" />
              <div className="text-xs text-gray-500">Tipo</div>
            </div>
            <div className="text-lg font-semibold">{servicio.tipo}</div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-teal-800">CLIENTE</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border p-4">
            <div className="flex items-center gap-3 mb-2">
              <CreditCard className="w-5 h-5 text-teal-700" />
              <div className="text-xs text-gray-500">CI</div>
            </div>
            <div className="text-lg font-semibold">{servicio.cliente_ci}</div>
          </div>
          <div className="bg-white rounded-xl border p-4">
            <div className="flex items-center gap-3 mb-2">
              <User className="w-5 h-5 text-teal-700" />
              <div className="text-xs text-gray-500">Nombre</div>
            </div>
            <div className="text-lg font-semibold">{servicio.cliente_nombre} {servicio.cliente_apellido}</div>
          </div>
          <div className="bg-white rounded-xl border p-4">
            <div className="flex items-center gap-3 mb-2">
              <Phone className="w-5 h-5 text-teal-700" />
              <div className="text-xs text-gray-500">Telefono</div>
            </div>
            <div className="text-lg font-semibold">{servicio.cliente_telefono || 'N/A'}</div>
          </div>
          <div className="bg-white rounded-xl border p-4">
            <div className="flex items-center gap-3 mb-2">
              <Mail className="w-5 h-5 text-teal-700" />
              <div className="text-xs text-gray-500">Correo</div>
            </div>
            <div className="text-lg font-semibold break-all">{servicio.cliente_correo || 'N/A'}</div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-teal-800">SERVICIO</h2>
        <div className="bg-white rounded-xl border p-6">
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="font-semibold text-teal-800 min-w-fit">METODO DE PAGO:</span>
              <span className="font-medium">{servicio.metodo_pago || 'EFECTIVO'}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-teal-800 min-w-fit">MONTO:</span>
              <span className="font-medium">${servicio.monto}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-teal-800 min-w-fit">SERVICIO:</span>
              <span className="font-medium">{servicio.tipo_servicio}</span>
            </div>
            {servicio.descripcion && (
              <div className="flex items-start gap-2">
                <span className="font-semibold text-teal-800 min-w-fit">DESCRIPCIÓN:</span>
                <span className="font-medium">{servicio.descripcion}</span>
              </div>
            )}
            <div className="flex items-start gap-2">
              <span className="font-semibold text-teal-800 min-w-fit">TRABAJADORES:</span>
              <span className="font-medium">
                {servicio.trabajador_nombre && servicio.trabajador_apellido 
                  ? `${servicio.trabajador_nombre} ${servicio.trabajador_apellido}`
                  : 'N/A'}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-teal-800 min-w-fit">ESTADO:</span>
              <span className="font-medium">{servicio.status}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-teal-800">To‑Do</h2>
        <TodoList servicioId={id} />
      </section>
    </div>
  )
}