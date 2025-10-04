"use client"

import { Calendar, DollarSign, TrendingUp, ChevronDown } from "lucide-react"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"

const lineData = [
  { name: "SEP", value: 32000 },
  { name: "OCT", value: 34000 },
  { name: "NOV", value: 37000 },
  { name: "DEC", value: 35000 },
  { name: "JAN", value: 39000 },
  { name: "FEB", value: 37500 },
]

const pagos = [
  { name: "Efectivo $", value: 850 },
  { name: "Efectivo Bs", value: 620 },
  { name: "Pago Movil", value: 450 },
  { name: "Tarjeta Credito", value: 520 },
  { name: "Tarjeta Debito", value: 380 },
  { name: "Zelle", value: 680 },
  { name: "Binance", value: 740 },
]

const serviciosChart = [
  { name: "Full", value: 1650, color: "#0f4c81" },
  { name: "Lavado exterior", value: 568.3, color: "#5ba3d0" },
  { name: "Aspirado", value: 321.95, color: "#a8d5f2" },
]

const ranking = [
  { nombre: "Marco Cobo", servicios: 12 },
  { nombre: "Antonio Lehmua", servicios: 10 },
  { nombre: "Marcela Payares", servicios: 8 },
  { nombre: "Andres Arispe", servicios: 6 },
  { nombre: "Pedro Perez", servicios: 6 },
  { nombre: "Jose Rodriguez", servicios: 4 },
  { nombre: "Luis Diaz", servicios: 2 },
  { nombre: "Lionel Maldini", servicios: 1 },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-sm text-gray-500">Dashboard</div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1a5490]">Dashboard</h1>
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
                This week
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#e8f2fb] rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#1a5490]" />
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Ingresos</div>
              <div className="text-lg font-bold">$1020.4</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#e8f2fb] rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-[#1a5490]" />
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Propinas</div>
              <div className="text-lg font-bold">$352.39</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl border overflow-hidden">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <div>
              <button className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <Calendar className="w-4 h-4" />
                This month
              </button>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold">$37.5K</h2>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#1a5490] text-white text-xs font-medium">
                  <TrendingUp className="w-3 h-3" />
                  +2.9%
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Ingresos totales</p>
            </div>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={lineData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1a5490" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1a5490" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#1a5490" 
                  strokeWidth={3}
                  fill="url(#colorValue)"
                  dot={{ fill: '#1a5490', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border overflow-hidden">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold">Ranking</h2>
            <button className="flex items-center gap-2 text-sm text-[#1a5490]">
              Este Mes
              <Calendar className="w-4 h-4" />
            </button>
          </div>
          <div className="px-6 py-4">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-3 pb-2 border-b">
              <span>#</span>
              <span>Nombre</span>
              <span>N° Servicios</span>
            </div>
            <div className="space-y-3">
              {ranking.map((r, i) => (
                <div key={r.nombre} className="flex items-center justify-between text-sm">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-[#e8f2fb] text-xs font-medium text-[#1a5490]">
                    {i + 1}
                  </span>
                  <span className="flex-1 mx-3 text-left">{r.nombre}</span>
                  <span className="font-semibold">{r.servicios}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border overflow-hidden">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold">Ingresos por Servicios</h2>
            <button className="text-sm text-[#1a5490]">Mes ˅</button>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold">$2540.45</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={serviciosChart}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  paddingAngle={2}
                >
                  {serviciosChart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-6 mt-4">
              {serviciosChart.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <div className="text-xs">
                    <div className="font-medium">${item.value}</div>
                    <div className="text-gray-500">{item.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border overflow-hidden">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold">Ingresos por métodos de pago</h2>
            <button className="text-sm text-[#1a5490]">Mes ˅</button>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold">$2540.45</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={pagos} margin={{ top: 5, right: 5, left: -20, bottom: 5 }} barSize={24}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 10 }}
                  angle={0}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                />
                <Tooltip />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {pagos.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#1a5490" : "#22c55e"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  )
}