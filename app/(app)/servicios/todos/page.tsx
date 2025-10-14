"use client"

import Link from "next/link"
import { Calendar, Car, ChevronDown, Search, Filter } from "lucide-react"
import { useState, useEffect } from "react"
import { serviciosAPI } from "../../../../lib/api"

interface Servicio {
  id: string
  fecha: string
  placa: string
  marca: string
  modelo: string
  tipo: string
  cliente_nombre: string
  cliente_apellido: string
  tipo_servicio: string
  status: string
  monto: number
  cancelado: boolean
}

export default function ServiciosTodosPage() {
  const [servicios, setServicios] = useState<Servicio[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [totalEntradas, setTotalEntradas] = useState(0)

  useEffect(() => {
    fetchServicios()
  }, [selectedDate])

  const fetchServicios = async (searchTerm?: string) => {
    try {
      setLoading(true)
      setError(null)
      
      const dateStr = selectedDate.toISOString().split('T')[0]
      const data = await serviciosAPI.getAll({ 
        fecha: dateStr,
        search: searchTerm,
        status: 'FINALIZADO' // Only show completed services
      })
      
      setServicios(data)
      setTotalEntradas(data.length)
    } catch (error: any) {
      console.error("Error fetching servicios:", error)
      setError(error.message || "Error al cargar servicios")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
  }

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchServicios(search)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [search])

  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
    setShowDatePicker(false)
  }

  const formatDate = (date: Date) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    
    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString('es-ES', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="text-sm text-gray-500">Servicios / Todas</div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1a5490]">Servicios</h1>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border p-4 flex items-center justify-between cursor-pointer hover:border-teal-300 transition-colors">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-[#1a5490]" />
            <div>
              <div className="text-xs text-gray-500 mb-1">Date</div>
              <div className="relative">
                <button
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className="text-base font-semibold flex items-center gap-2 hover:text-[#1a5490] transition-colors"
                >
                  {formatDate(selectedDate)}
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                
                {showDatePicker && (
                  <div className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg p-4 z-10 min-w-[250px]">
                    <div className="space-y-2 mb-3">
                      <button
                        onClick={() => handleDateChange(new Date())}
                        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                      >
                        Today
                      </button>
                      <button
                        onClick={() => {
                          const yesterday = new Date()
                          yesterday.setDate(yesterday.getDate() - 1)
                          handleDateChange(yesterday)
                        }}
                        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                      >
                        Yesterday
                      </button>
                    </div>
                    <div className="border-t pt-3">
                      <label className="block text-xs text-gray-500 mb-2">Seleccionar fecha:</label>
                      <input
                        type="date"
                        value={selectedDate.toISOString().split('T')[0]}
                        onChange={(e) => handleDateChange(new Date(e.target.value))}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#1a5490] text-sm"
                      />
                    </div>
                    <button
                      onClick={() => setShowDatePicker(false)}
                      className="mt-3 w-full px-3 py-2 bg-[#1a5490] text-white rounded text-sm hover:bg-[#144070]"
                    >
                      Cerrar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Car className="w-5 h-5 text-[#1a5490]" />
            <div>
              <div className="text-xs text-gray-500 mb-1">Entradas</div>
              <div className="text-2xl font-bold">{totalEntradas}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-2xl border overflow-hidden">
        <div className="px-6 py-4 border-b flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-[#1a5490]">Servicios</h2>
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search here..."
                value={search}
                onChange={handleSearch}
                className="w-full h-9 pl-10 pr-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-teal-500"
              />
            </div>
            <button className="flex items-center gap-2 px-4 h-9 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50">
              Filtros
              <ChevronDown className="w-4 h-4" />
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
                onClick={() => fetchServicios(search)}
                className="ml-4 text-blue-500 hover:underline"
              >
                Reintentar
              </button>
            </div>
          ) : servicios.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No se encontraron servicios
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Fecha</th>
                  <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Placa</th>
                  <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Marca-Modelo</th>
                  <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Cliente</th>
                  <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Servicios</th>
                  <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Monto</th>
                </tr>
              </thead>
              <tbody>
                {servicios.map((service) => (
                  <tr key={service.id} className="border-b last:border-b-0 hover:bg-gray-50">
                    <td className="p-4">
                      {new Date(service.fecha).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="p-4">
                      <Link 
                        href={`/servicios/todos/${service.id}`}
                        className="font-medium text-[#1a5490] hover:underline"
                      >
                        {service.placa || 'N/A'}
                      </Link>
                    </td>
                    <td className="p-4">{service.marca} {service.modelo}</td>
                    <td className="p-4">{service.cliente_nombre} {service.cliente_apellido}</td>
                    <td className="p-4">{service.tipo_servicio}</td>
                    <td className="p-4 font-semibold">${service.monto}</td>
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