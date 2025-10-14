"use client"

import { Search, Filter, Edit2, Trash2, Plus } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { clientesAPI } from "../../../lib/api"

interface Cliente {
  id: string
  ci: string
  nombre: string
  apellido: string
  telefono: string
  correo: string
}

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [totalClientes, setTotalClientes] = useState(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchClientes()
    fetchStats()
  }, [])

  const fetchClientes = async (searchTerm?: string) => {
    try {
      setLoading(true)
      setError(null)
      const data = await clientesAPI.getAll(searchTerm)
      setClientes(data)
    } catch (error: any) {
      console.error("Error fetching clientes:", error)
      setError(error.message || "Error al cargar clientes")
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const data = await clientesAPI.getStats()
      setTotalClientes(data.total)
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
        fetchClientes(search)
      }
    }, 500)
    
    return () => clearTimeout(timer)
  }, [search])

  const handleDelete = async (id: string, nombre: string, apellido: string) => {
    if (!confirm(`¿Está seguro de eliminar a ${nombre} ${apellido}?`)) return

    try {
      await clientesAPI.delete(id)
      fetchClientes(search)
      fetchStats()
    } catch (error: any) {
      console.error("Error deleting cliente:", error)
      alert(error.message || "Error al eliminar cliente")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="text-sm text-gray-500">Clientes</div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1a5490]">Clientes</h1>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border p-4">
          <div className="text-xs text-gray-500 mb-1">Personas</div>
          <div className="text-2xl font-bold">{totalClientes}</div>
        </div>
      </section>

      <section className="bg-white rounded-2xl border overflow-hidden">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Clientes</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text"
                placeholder="Search here..." 
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
                onClick={() => fetchClientes(search)}
                className="ml-4 text-blue-500 hover:underline"
              >
                Reintentar
              </button>
            </div>
          ) : clientes.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No se encontraron clientes
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">CEDULA</th>
                  <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">NOMBRE</th>
                  <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">APELLIDO</th>
                  <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">TELEFONO</th>
                  <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">CORREO</th>
                  <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((cliente) => (
                  <tr key={cliente.id} className="border-b last:border-b-0 hover:bg-gray-50">
                    <td className="p-3">{cliente.ci}</td>
                    <td className="p-3">{cliente.nombre}</td>
                    <td className="p-3">{cliente.apellido}</td>
                    <td className="p-3">{cliente.telefono}</td>
                    <td className="p-3">{cliente.correo}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Link href={`/clientes/${cliente.id}`}>
                          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                            <Edit2 className="w-4 h-4 text-gray-600" />
                          </button>
                        </Link>
                        <button 
                          onClick={() => handleDelete(cliente.id, cliente.nombre, cliente.apellido)}
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