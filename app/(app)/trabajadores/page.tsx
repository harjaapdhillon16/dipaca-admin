"use client"

import Link from "next/link"
import { Search, Filter, Edit2, Trash2, Plus } from "lucide-react"
import { useState, useEffect } from "react"
import { trabajadoresAPI } from "../../../lib/api"

interface Trabajador {
  id: string
  ci: string
  nombre: string
  apellido: string
  telefono: string
  correo: string
  cargo: string
  servicios_realizados: number
}

export default function TrabajadoresPage() {
  const [trabajadores, setTrabajadores] = useState<Trabajador[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [totalTrabajadores, setTotalTrabajadores] = useState(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTrabajadores()
    fetchStats()
  }, [])

  const fetchTrabajadores = async (searchTerm?: string) => {
    try {
      setLoading(true)
      setError(null)
      const data = await trabajadoresAPI.getAll(searchTerm)
      setTrabajadores(data)
    } catch (error: any) {
      console.error("Error fetching trabajadores:", error)
      setError(error.message || "Error al cargar trabajadores")
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const data = await trabajadoresAPI.getStats()
      setTotalTrabajadores(data.total)
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
  }

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== undefined) {
        fetchTrabajadores(search)
      }
    }, 500)
    
    return () => clearTimeout(timer)
  }, [search])

  const handleDelete = async (id: string) => {
    if (!confirm("¿Está seguro de eliminar este trabajador?")) return

    try {
      await trabajadoresAPI.delete(id)
      fetchTrabajadores(search)
      fetchStats()
    } catch (error: any) {
      console.error("Error deleting trabajador:", error)
      alert(error.message || "Error al eliminar trabajador")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">Trabajadores</div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a5490]">Trabajadores</h1>
        </div>
        <Link href="/trabajadores/nuevo">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1a5490] text-white rounded-lg hover:bg-[#144070] transition-colors">
            <Plus className="w-4 h-4" />
            Nuevo Trabajador
          </button>
        </Link>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border p-4">
          <div className="text-xs text-gray-500 mb-1">Total Trabajadores</div>
          <div className="text-2xl font-bold">{totalTrabajadores}</div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="text-xs text-gray-500 mb-1">Activos</div>
          <div className="text-2xl font-bold">{trabajadores.length}</div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="text-xs text-gray-500 mb-1">Servicios Realizados</div>
          <div className="text-2xl font-bold">
            {trabajadores.reduce((sum, t) => sum + (t.servicios_realizados || 0), 0)}
          </div>
        </div>
      </section>

      <section className="bg-white rounded-2xl border overflow-hidden">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Lista de Trabajadores</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text"
                placeholder="Buscar trabajador..." 
                value={search}
                onChange={handleSearch}
                className="h-9 w-64 pl-10 pr-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              />
            </div>
            <button className="flex items-center gap-2 text-sm text-[#1a5490] hover:opacity-80">
              Filtros
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Cargando...</div>
          ) : error ? (
            <div className="p-8 text-center text-red-500">
              {error}
              <button 
                onClick={() => fetchTrabajadores(search)}
                className="ml-4 text-blue-500 hover:underline"
              >
                Reintentar
              </button>
            </div>
          ) : trabajadores.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No se encontraron trabajadores
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Cédula</th>
                  <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Nombre</th>
                  <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Apellido</th>
                  <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Cargo</th>
                  <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Teléfono</th>
                  <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Correo</th>
                  <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Servicios</th>
                  <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {trabajadores.map((trabajador) => (
                  <tr key={trabajador.id} className="border-b last:border-b-0 hover:bg-gray-50">
                    <td className="p-3 font-medium">{trabajador.ci}</td>
                    <td className="p-3">{trabajador.nombre}</td>
                    <td className="p-3">{trabajador.apellido}</td>
                    <td className="p-3">
                      <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {trabajador.cargo}
                      </span>
                    </td>
                    <td className="p-3">{trabajador.telefono}</td>
                    <td className="p-3 text-gray-600">{trabajador.correo}</td>
                    <td className="p-3">
                      <span className="text-gray-600">{trabajador.servicios_realizados || 0}</span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Link href={`/trabajadores/${trabajador.id}`}>
                          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                            <Edit2 className="w-4 h-4 text-gray-600" />
                          </button>
                        </Link>
                        <button 
                          onClick={() => handleDelete(trabajador.id)}
                          className="p-1 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  )
}