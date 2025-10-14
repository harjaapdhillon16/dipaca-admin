"use client"

import Link from "next/link"
import { Calendar, Car, ChevronDown, Check, X } from "lucide-react"
import { useState, useEffect } from "react"
import { serviciosAPI } from "../../../lib/api"

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

export default function ServiciosPage() {
  const [activeServices, setActiveServices] = useState<Servicio[]>([])
  const [completedServices, setCompletedServices] = useState<Servicio[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [totalEntradas, setTotalEntradas] = useState(0)

  useEffect(() => {
    fetchServicios()
  }, [selectedDate])

  const fetchServicios = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Format date to YYYY-MM-DD
      const dateStr = selectedDate.toISOString().split('T')[0]
      
      // Fetch all services for the selected date
      const allData = await serviciosAPI.getAll({ fecha: dateStr })
      
      // Split into active and completed
      const active = allData.filter((s: Servicio) => 
        s.status !== 'FINALIZADO' && s.status !== 'CANCELADO'
      )
      const completed = allData.filter((s: Servicio) => 
        s.status === 'FINALIZADO'
      )
      
      setActiveServices(active)
      setCompletedServices(completed.slice(0, 10)) // Show last 10
      setTotalEntradas(allData.length)
    } catch (error: any) {
      console.error("Error fetching servicios:", error)
      setError(error.message || "Error al cargar servicios")
    } finally {
      setLoading(false)
    }
  }

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

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'LAVADO':
      case 'SECADO':
        return 'bg-blue-500'
      case 'ASPIRADO':
        return 'bg-amber-600'
      case 'FINALIZADO':
        return 'bg-green-500'
      case 'PENDIENTE':
        return 'bg-yellow-500'
      case 'EN_PROCESO':
        return 'bg-blue-600'
      default:
        return 'bg-gray-500'
    }
  }

  const quickDateOptions = [
    { label: "Today", date: new Date() },
    { 
      label: "Yesterday", 
      date: new Date(new Date().setDate(new Date().getDate() - 1)) 
    },
    { 
      label: "Last 7 days", 
      date: new Date(new Date().setDate(new Date().getDate() - 7)) 
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <div className="text-sm text-gray-500">Servicios</div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1a5490]">Servicios</h1>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500 mb-1">Date</div>
            <div className="relative">
              <button
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="text-lg font-semibold flex items-center gap-2 hover:text-[#1a5490] transition-colors"
              >
                {formatDate(selectedDate)}
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showDatePicker && (
                <div className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg p-4 z-10 min-w-[250px]">
                  <div className="space-y-2 mb-3">
                    {quickDateOptions.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleDateChange(option.date)}
                        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                      >
                        {option.label}
                      </button>
                    ))}
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
          <Calendar className="w-6 h-6 text-[#1a5490]" />
        </div>
        <div className="bg-white rounded-xl border p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500 mb-1">Entradas</div>
            <div className="text-2xl font-bold">{totalEntradas}</div>
          </div>
          <Car className="w-6 h-6 text-[#1a5490]" />
        </div>
      </section>

      <section className="bg-white rounded-2xl border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-[#1a5490]">Servicios Activos</h2>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Cargando...</div>
          ) : error ? (
            <div className="p-8 text-center text-red-500">
              {error}
              <button 
                onClick={fetchServicios}
                className="ml-4 text-blue-500 hover:underline"
              >
                Reintentar
              </button>
            </div>
          ) : activeServices.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No hay servicios activos
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Placa</th>
                  <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Marca-Modelo</th>
                  <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Cliente</th>
                  <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Servicios</th>
                  <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Cancelado</th>
                </tr>
              </thead>
              <tbody>
                {activeServices.map((service) => (
                  <tr key={service.id} className="border-b last:border-b-0 hover:bg-gray-50">
                    <td className="p-3 font-medium">{service.placa || 'N/A'}</td>
                    <td className="p-3">{service.marca} {service.modelo}</td>
                    <td className="p-3">{service.cliente_nombre} {service.cliente_apellido}</td>
                    <td className="p-3">{service.tipo_servicio} - ${service.monto}</td>
                    <td className="p-3">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-white text-xs font-medium ${getStatusColor(service.status)}`}>
                        {service.status}
                        <ChevronDown className="w-3 h-3" />
                      </span>
                    </td>
                    <td className="p-3">
                      {service.cancelado ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500 text-white text-xs font-medium">
                          SI
                          <Check className="w-3 h-3" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-500 text-white text-xs font-medium">
                          NO
                          <X className="w-3 h-3" />
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <section className="bg-white rounded-2xl border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-[#1a5490]">Servicios Realizados</h2>
        </div>
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h3 className="font-semibold">Últimos Servicios</h3>
          <Link href="/servicios/todos" className="text-[#1a5490] text-sm font-medium hover:underline flex items-center gap-1">
            Todas
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Cargando...</div>
          ) : completedServices.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No hay servicios completados
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Fecha</th>
                  <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Placa</th>
                  <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Marca-Modelo</th>
                  <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Cliente</th>
                  <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Servicios</th>
                  <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Monto</th>
                </tr>
              </thead>
              <tbody>
                {completedServices.map((service) => (
                  <tr key={service.id} className="border-b last:border-b-0 hover:bg-gray-50">
                    <td className="p-3">
                      {new Date(service.fecha).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="p-3 font-medium">{service.placa || 'N/A'}</td>
                    <td className="p-3">{service.marca} {service.modelo}</td>
                    <td className="p-3">{service.cliente_nombre} {service.cliente_apellido}</td>
                    <td className="p-3">{service.tipo_servicio}</td>
                    <td className="p-3 font-semibold">${service.monto}</td>
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