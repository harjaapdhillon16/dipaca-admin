// import { Edit2, Trash2, ClipboardList, BarChart3 } from "lucide-react"

// type Props = { params: { id: string } }

// export default function ClienteDetallePage({ params }: Props) {
//   const id = params.id
//   return (
//     <div className="space-y-6">
//       <div>
//         <div className="text-sm text-gray-500">Clientes / {id}</div>
//         <div className="flex items-center gap-3">
//           <h1 className="text-3xl md:text-4xl font-bold text-[#1a5490]">MARCO COBO</h1>
//           <button className="p-2 hover:bg-gray-100 rounded transition-colors">
//             <Edit2 className="w-5 h-5 text-gray-600" />
//           </button>
//           <button className="p-2 hover:bg-red-50 rounded transition-colors">
//             <Trash2 className="w-5 h-5 text-red-500" />
//           </button>
//         </div>
//       </div>

//       <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="bg-white rounded-xl border p-4 flex items-center justify-between">
//           <div>
//             <div className="text-xs text-gray-500 mb-1">Servicios solicitados</div>
//             <div className="text-2xl font-bold">6</div>
//           </div>
//           <div className="w-10 h-10 bg-[#e8f2fb] rounded-lg flex items-center justify-center">
//             <ClipboardList className="w-5 h-5 text-[#1a5490]" />
//           </div>
//         </div>
//         <div className="bg-white rounded-xl border p-4 flex items-center justify-between">
//           <div>
//             <div className="text-xs text-gray-500 mb-1">Puntos de fidelidad</div>
//             <div className="text-2xl font-bold">250</div>
//           </div>
//           <div className="w-10 h-10 bg-[#e8f2fb] rounded-lg flex items-center justify-center">
//             <BarChart3 className="w-5 h-5 text-[#1a5490]" />
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }

// dipaca-admin/app/(app)/clientes/[id]/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Edit2, Trash2, ClipboardList, BarChart3, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { clientesAPI, serviciosAPI, vehiculosAPI } from "../../../../lib/api"

type Props = { params: { id: string } }

interface Cliente {
  id: string
  ci: string
  nombre: string
  apellido: string
  telefono: string
  correo: string
  puntos_fidelidad: number
  servicios_solicitados: number
}

interface Servicio {
  id: string
  fecha: string
  placa: string
  tipo_servicio: string
  monto: string
  status: string
}

interface Vehiculo {
  id: string
  placa: string
  marca: string
  modelo: string
  tipo: string
}

export default function ClienteDetallePage({ params }: Props) {
  const [cliente, setCliente] = useState<Cliente | null>(null)
  const [servicios, setServicios] = useState<Servicio[]>([])
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([])
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [editData, setEditData] = useState({
    telefono: "",
    correo: ""
  })
  const router = useRouter()
  const id = params.id

  useEffect(() => {
    fetchData()
  }, [id])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Fetch cliente info
      const clienteData = await clientesAPI.getById(id)
      setCliente(clienteData)
      setEditData({
        telefono: clienteData.telefono || "",
        correo: clienteData.correo || ""
      })

      // Fetch cliente's services
      const serviciosData = await serviciosAPI.getAll(undefined, undefined, undefined)
      const clienteServicios = serviciosData.filter((s: any) => s.cliente_id == id)
      setServicios(clienteServicios.slice(0, 10))

      // Fetch cliente's vehicles
      const vehiculosData = await vehiculosAPI.getAll(undefined, id)
      setVehiculos(vehiculosData)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("¿Está seguro de eliminar este cliente? Esto eliminará también sus vehículos y servicios.")) return

    try {
      await clientesAPI.delete(id)
      router.push('/clientes')
    } catch (error) {
      console.error("Error deleting cliente:", error)
      alert("Error al eliminar cliente")
    }
  }

  const handleUpdate = async () => {
    try {
      await clientesAPI.update(id, {
        ci: cliente!.ci,
        nombre: cliente!.nombre,
        apellido: cliente!.apellido,
        telefono: editData.telefono,
        correo: editData.correo
      })
      setEditMode(false)
      fetchData()
      alert("Cliente actualizado correctamente")
    } catch (error) {
      console.error("Error updating cliente:", error)
      alert("Error al actualizar cliente")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-500">Cargando...</div>
      </div>
    )
  }

  if (!cliente) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-lg text-red-500">Cliente no encontrado</div>
        <Link href="/clientes" className="text-primary hover:underline">
          Volver a clientes
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <Link href="/clientes" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-2">
          <ArrowLeft className="w-4 h-4" />
          Volver a clientes
        </Link>
        <div className="text-sm text-gray-500">Clientes / {id}</div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-bold text-[#1a5490]">
              {cliente.nombre} {cliente.apellido}
            </h1>
            <button 
              onClick={() => setEditMode(!editMode)}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
            >
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
      </div>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500 mb-1">Servicios solicitados</div>
            <div className="text-2xl font-bold">{servicios.length}</div>
          </div>
          <div className="w-10 h-10 bg-[#e8f2fb] rounded-lg flex items-center justify-center">
            <ClipboardList className="w-5 h-5 text-[#1a5490]" />
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500 mb-1">Puntos de fidelidad</div>
            <div className="text-2xl font-bold">{cliente.puntos_fidelidad || 0}</div>
          </div>
          <div className="w-10 h-10 bg-[#e8f2fb] rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-[#1a5490]" />
          </div>
        </div>
      </section>

      {/* Client Info */}
      <section className="bg-white rounded-2xl border p-6">
        <h2 className="text-lg font-semibold text-[#1a5490] mb-4">Información Personal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-gray-500 mb-1">Cédula</div>
            <div className="text-sm font-medium">{cliente.ci}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Nombre Completo</div>
            <div className="text-sm font-medium">{cliente.nombre} {cliente.apellido}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Teléfono</div>
            {editMode ? (
              <input
                type="text"
                value={editData.telefono}
                onChange={(e) => setEditData({ ...editData, telefono: e.target.value })}
                className="text-sm font-medium border rounded px-2 py-1 w-full"
              />
            ) : (
              <div className="text-sm font-medium">{cliente.telefono || 'No registrado'}</div>
            )}
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Correo</div>
            {editMode ? (
              <input
                type="email"
                value={editData.correo}
                onChange={(e) => setEditData({ ...editData, correo: e.target.value })}
                className="text-sm font-medium border rounded px-2 py-1 w-full"
              />
            ) : (
              <div className="text-sm font-medium">{cliente.correo || 'No registrado'}</div>
            )}
          </div>
        </div>
        {editMode && (
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-[#1a5490] text-white rounded-lg hover:bg-[#1a5490]/90"
            >
              Guardar Cambios
            </button>
            <button
              onClick={() => {
                setEditMode(false)
                setEditData({
                  telefono: cliente.telefono || "",
                  correo: cliente.correo || ""
                })
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Cancelar
            </button>
          </div>
        )}
      </section>

      {/* Vehicles */}
      <section className="bg-white rounded-2xl border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-[#1a5490]">Vehículos Registrados</h2>
        </div>
        <div className="overflow-x-auto">
          {vehiculos.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No tiene vehículos registrados
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Placa</th>
                  <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Marca</th>
                  <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Modelo</th>
                  <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Tipo</th>
                </tr>
              </thead>
              <tbody>
                {vehiculos.map((vehiculo) => (
                  <tr key={vehiculo.id} className="border-b last:border-b-0 hover:bg-gray-50">
                    <td className="p-3 font-medium">{vehiculo.placa}</td>
                    <td className="p-3">{vehiculo.marca}</td>
                    <td className="p-3">{vehiculo.modelo}</td>
                    <td className="p-3">{vehiculo.tipo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* Recent Services */}
      <section className="bg-white rounded-2xl border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-[#1a5490]">Servicios Recientes</h2>
        </div>
        <div className="overflow-x-auto">
          {servicios.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No tiene servicios registrados
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Fecha</th>
                  <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Placa</th>
                  <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Servicio</th>
                  <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Monto</th>
                  <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {servicios.map((servicio) => (
                  <tr key={servicio.id} className="border-b last:border-b-0 hover:bg-gray-50">
                    <td className="p-3">{new Date(servicio.fecha).toLocaleDateString()}</td>
                    <td className="p-3 font-medium">{servicio.placa}</td>
                    <td className="p-3">{servicio.tipo_servicio}</td>
                    <td className="p-3 font-semibold">${servicio.monto}</td>
                    <td className="p-3">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        servicio.status === 'FINALIZADO' 
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {servicio.status}
                      </span>
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