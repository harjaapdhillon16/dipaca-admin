"use client"

import { Edit2, Trash2, Calendar, ClipboardList, BadgeCheck, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { trabajadoresAPI } from "../../../../lib/api"

type Props = { params: { id: string } }

interface Trabajador {
  id: string
  ci: string
  nombre: string
  apellido: string
  telefono: string
  correo: string
  cargo: string
  servicios_realizados: number
  created_at: string
}

export default function TrabajadorDetallePage({ params }: Props) {
  const router = useRouter()
  const id = params.id
  
  const [trabajador, setTrabajador] = useState<Trabajador | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTrabajador()
  }, [id])

  const fetchTrabajador = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await trabajadoresAPI.getById(id)
      setTrabajador(data)
    } catch (err: any) {
      console.error("Error fetching trabajador:", err)
      setError(err.message || "Error al cargar trabajador")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!trabajador) return
    
    if (!confirm(`¿Está seguro de eliminar a ${trabajador.nombre} ${trabajador.apellido}?`)) {
      return
    }

    try {
      await trabajadoresAPI.delete(id)
      router.push("/trabajadores")
    } catch (err: any) {
      alert(err.message || "Error al eliminar trabajador")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a5490] mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando trabajador...</p>
        </div>
      </div>
    )
  }

  if (error || !trabajador) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || "Trabajador no encontrado"}</p>
          <Link href="/trabajadores">
            <button className="text-[#1a5490] hover:underline">
              Volver a trabajadores
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="text-sm text-gray-500">Trabajadores / {trabajador.ci}</div>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a5490]">
            {trabajador.nombre.toUpperCase()} {trabajador.apellido.toUpperCase()}
          </h1>
          <button className="p-2 hover:bg-gray-100 rounded transition-colors">
            <Edit2 className="w-5 h-5 text-gray-600" />
          </button>
          <button 
            onClick={handleDelete}
            className="p-2 hover:bg-red-50 rounded transition-colors"
          >
            <Trash2 className="w-5 h-5 text-red-500" />
          </button>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#e8f2fb] rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#1a5490]" />
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Date</div>
              <div className="text-lg font-semibold flex items-center gap-2">
                Today
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#e8f2fb] rounded-lg flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-[#1a5490]" />
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Servicios realizados</div>
              <div className="text-2xl font-bold">{trabajador.servicios_realizados || 0}</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#e8f2fb] rounded-lg flex items-center justify-center">
              <BadgeCheck className="w-5 h-5 text-[#1a5490]" />
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Cargo</div>
              <div className="text-lg font-semibold">{trabajador.cargo}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}