import Link from "next/link"
import { Calendar, Car, ChevronDown, Check, X } from "lucide-react"

const activeServices = [
  {
    placa: "AGK345P",
    modelo: "FORD-FUSION",
    cliente: "MARCO COBO",
    servicios: "FULL - $20",
    status: "LAVADO",
    statusColor: "bg-blue-500",
    cancelado: false,
    id: "1",
  },
  {
    placa: "JJK340E",
    modelo: "FORD-FUSION",
    cliente: "MARCELA PAYARES",
    servicios: "FULL - $20",
    status: "ASPIRADO",
    statusColor: "bg-amber-600",
    cancelado: true,
    id: "2",
  },
  {
    placa: "3INMD2Q",
    modelo: "FORD-FIESTA",
    cliente: "LUIS PEREZ",
    servicios: "FULL - $20",
    status: "SECADO",
    statusColor: "bg-blue-500",
    cancelado: false,
    id: "3",
  },
  {
    placa: "BYT3535",
    modelo: "FORD-EXPLORER",
    cliente: "JOSE DIAZ",
    servicios: "FULL - $20",
    status: "FINALIZADO",
    statusColor: "bg-green-500",
    cancelado: true,
    id: "4",
  },
]

const completedServices = [
  {
    fecha: "20/05/2025",
    placa: "AGK345P",
    modelo: "FORD-FUSION",
    cliente: "MARCO COBO",
    servicios: "FULL",
    monto: "$20",
    id: "1",
  },
  {
    fecha: "20/05/2025",
    placa: "JJK340E",
    modelo: "FORD-FUSION",
    cliente: "MARCELA PAYARES",
    servicios: "FULL",
    monto: "$20",
    id: "2",
  },
  {
    fecha: "20/05/2025",
    placa: "3INMD2Q",
    modelo: "FORD-FIESTA",
    cliente: "LUIS PEREZ",
    servicios: "FULL",
    monto: "$20",
    id: "3",
  },
  {
    fecha: "19/05/2025",
    placa: "BYT3535",
    modelo: "FORD-EXPLORER",
    cliente: "JOSE DIAZ",
    servicios: "FULL",
    monto: "$20",
    id: "4",
  },
]

export default function ServiciosPage() {
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
            <div className="text-lg font-semibold flex items-center gap-2">
              Today
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
          <Calendar className="w-6 h-6 text-[#1a5490]" />
        </div>
        <div className="bg-white rounded-xl border p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500 mb-1">Entradas</div>
            <div className="text-2xl font-bold">20</div>
          </div>
          <Car className="w-6 h-6 text-[#1a5490]" />
        </div>
      </section>

      <section className="bg-white rounded-2xl border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-[#1a5490]">Servicios Activos</h2>
        </div>
        <div className="overflow-x-auto">
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
                  <td className="p-3 font-medium">{service.placa}</td>
                  <td className="p-3">{service.modelo}</td>
                  <td className="p-3">{service.cliente}</td>
                  <td className="p-3">{service.servicios}</td>
                  <td className="p-3">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-white text-xs font-medium ${service.statusColor}`}>
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
                  <td className="p-3">{service.fecha}</td>
                  <td className="p-3 font-medium">{service.placa}</td>
                  <td className="p-3">{service.modelo}</td>
                  <td className="p-3">{service.cliente}</td>
                  <td className="p-3">{service.servicios}</td>
                  <td className="p-3 font-semibold">{service.monto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}