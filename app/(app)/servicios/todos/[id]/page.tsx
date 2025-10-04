import { Calendar, Clock } from "lucide-react"
import TodoList from "../../../../../components/todos/todo-list"

type Props = { params: { id: string } }

export default function ServicioDetallePage({ params }: Props) {
  const id = params.id

  return (
    <div className="space-y-8">
      <div>
        <div className="text-sm text-gray-500">Servicios / Todas / {id}</div>
        <h1 className="text-3xl md:text-4xl font-bold text-teal-800">20/05/2025–AWS23FC</h1>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-teal-700" />
            <div className="text-xs text-gray-500">Fecha</div>
          </div>
          <div className="text-lg font-semibold">20/05/25</div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-teal-700" />
            <div className="text-xs text-gray-500">Hora entrada</div>
          </div>
          <div className="text-lg font-semibold">3:00 PM</div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-teal-700" />
            <div className="text-xs text-gray-500">Hora salida</div>
          </div>
          <div className="text-lg font-semibold">3:30 PM</div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-teal-800">VEHICULO</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { icon: Calendar, label: "Placa", value: "AWS23FC" },
            { icon: Calendar, label: "Marca", value: "Ford" },
            { icon: Calendar, label: "Modelo", value: "Fusion" },
            { icon: Calendar, label: "Tipo", value: "Sedan" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white rounded-xl border p-4">
              <div className="flex items-center gap-3 mb-2">
                <Icon className="w-5 h-5 text-teal-700" />
                <div className="text-xs text-gray-500">{label}</div>
              </div>
              <div className="text-lg font-semibold">{value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-teal-800">CLIENTE</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { icon: Calendar, label: "CI", value: "3332123" },
            { icon: Calendar, label: "Nombre", value: "Marco Cobo" },
            { icon: Calendar, label: "Telefono", value: "0412333212" },
            { icon: Calendar, label: "Correo", value: "marco@gmail.com" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white rounded-xl border p-4">
              <div className="flex items-center gap-3 mb-2">
                <Icon className="w-5 h-5 text-teal-700" />
                <div className="text-xs text-gray-500">{label}</div>
              </div>
              <div className="text-lg font-semibold break-all">{value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-teal-800">SERVICIO</h2>
        <div className="bg-white rounded-xl border p-6">
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="font-semibold text-teal-800 min-w-fit">METODO DE PAGO:</span>
              <span className="font-medium">EFECTIVO</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-teal-800 min-w-fit">MONTO:</span>
              <span className="font-medium">120$</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-teal-800 min-w-fit">SERVICIO:</span>
              <span className="font-medium">FULL</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-teal-800 min-w-fit">TRABAJADORES:</span>
              <span className="font-medium">MARCO COBO</span>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-teal-800">To‑Do</h2>
        <TodoList
          initial={[
            { id: "t1", text: "Confirmar pago", done: false },
            { id: "t2", text: "Verificar limpieza interior", done: true },
          ]}
        />
      </section>
    </div>
  )
}