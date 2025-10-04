import { Search, Filter, Edit2, Trash2 } from "lucide-react"
import Link from "next/link"

const rows = [
  {
    ci: "27456223",
    nombre: "MARCO",
    apellido: "COBO",
    telefono: "04123452904",
    correo: "marcocobo@gmail.com",
    id: "1",
  },
  {
    ci: "30998763",
    nombre: "JOSE",
    apellido: "NIEVES",
    telefono: "04245679872",
    correo: "Josenieves25@gmail.com",
    id: "2",
  },
  { 
    ci: "23445012", 
    nombre: "FELIX", 
    apellido: "DIAZ", 
    telefono: "04162342342", 
    correo: "FelixDiez@gmail.com", 
    id: "3" 
  },
  {
    ci: "8907632",
    nombre: "LEONARDO",
    apellido: "SANTANA",
    telefono: "04261112230",
    correo: "Leosantana@gmail.com",
    id: "4",
  },
]

export default function ClientesPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-sm text-gray-500">Clientes</div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1a5490]">Clientes</h1>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border p-4">
          <div className="text-xs text-gray-500 mb-1">Personas</div>
          <div className="text-2xl font-bold">125</div>
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
              {rows.map((r) => (
                <tr key={r.id} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="p-3">{r.ci}</td>
                  <td className="p-3">{r.nombre}</td>
                  <td className="p-3">{r.apellido}</td>
                  <td className="p-3">{r.telefono}</td>
                  <td className="p-3">{r.correo}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                          <Link href={`/clientes/${r.id}`}>
      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
        <Edit2 className="w-4 h-4 text-gray-600" />
      </button>
    </Link>
                      <button className="p-1 hover:bg-red-50 rounded transition-colors">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}