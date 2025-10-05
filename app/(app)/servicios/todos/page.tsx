import Link from "next/link"
import { Calendar, Car, ChevronDown, Search, Filter } from "lucide-react"

const services = [
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
        <div className="text-sm text-gray-500">Servicios / Todas</div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1a5490]">Servicios</h1>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/servicios/todos">
          <div className="bg-white rounded-xl border p-4 flex items-center justify-between cursor-pointer hover:border-teal-300 transition-colors">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#1a5490]" />
              <div>
                <div className="text-xs text-gray-500 mb-1">Date</div>
                <div className="text-base font-semibold flex items-center gap-2">
                  Today
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </Link>
        <div className="bg-white rounded-xl border p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Car className="w-5 h-5 text-[#1a5490]" />
            <div>
              <div className="text-xs text-gray-500 mb-1">Entradas</div>
              <div className="text-2xl font-bold">20</div>
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
              {services.map((service) => (
                <tr key={service.id} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="p-4">{service.fecha}</td>
                  <td className="p-4">
                    <Link 
                      href={`/servicios/todos/${service.id}`}
                      className="font-medium text-[#1a5490] hover:underline"
                    >
                      {service.placa}
                    </Link>
                  </td>
                  <td className="p-4">{service.modelo}</td>
                  <td className="p-4">{service.cliente}</td>
                  <td className="p-4">{service.servicios}</td>
                  <td className="p-4 font-semibold">{service.monto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}