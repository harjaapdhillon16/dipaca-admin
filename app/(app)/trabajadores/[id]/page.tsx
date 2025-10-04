import { Edit2, Trash2, Calendar, ClipboardList, BadgeCheck, ChevronDown } from "lucide-react"

type Props = { params: { id: string } }

export default function TrabajadorDetallePage({ params }: Props) {
  const id = params.id
  return (
    <div className="space-y-6">
      <div>
        <div className="text-sm text-gray-500">Trabajadores / {id}</div>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a5490]">JOSE NIEVES</h1>
          <button className="p-2 hover:bg-gray-100 rounded transition-colors">
            <Edit2 className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-red-50 rounded transition-colors">
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
              <div className="text-2xl font-bold">15</div>
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
              <div className="text-lg font-semibold">Cajero</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}