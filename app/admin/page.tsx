"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/common/stat-card"
import { Calendar, DollarSign } from "lucide-react"
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
} from "recharts"
import { ranking } from "@/lib/data"

const lineData = [
  { name: "SEP", value: 32000 },
  { name: "OCT", value: 34000 },
  { name: "NOV", value: 37000 },
  { name: "DEC", value: 35000 },
  { name: "JAN", value: 39000 },
  { name: "FEB", value: 37500 },
]

const pagos = [
  { name: "Efectivo", value: 1200 },
  { name: "Pago Movil", value: 650 },
  { name: "Tarjeta", value: 690 },
]

const serviciosChart = [
  { name: "Full", value: 1650 },
  { name: "Lavado exterior", value: 568.3 },
  { name: "Aspirado", value: 321.95 },
]

const COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)"]

export default function AdminHome() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-primary text-balance">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Date"
          value={<span>Esta semana</span>}
          icon={<Calendar className="text-primary" size={18} />}
        />
        <StatCard
          title="Ingresos"
          value={<span>$10202.4</span>}
          icon={<DollarSign className="text-primary" size={18} />}
        />
        <StatCard
          title="Propinas"
          value={<span>$352.39</span>}
          icon={<DollarSign className="text-primary" size={18} />}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-primary">Ingresos totales</CardTitle>
          </CardHeader>
          <CardContent className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="var(--color-chart-1)" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-primary">Ranking (Este Mes)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {ranking.map((r, i) => (
              <div key={r.nombre} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-secondary text-xs">
                    {i + 1}
                  </span>
                  <span>{r.nombre}</span>
                </div>
                <span className="text-muted-foreground">{r.servicios}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-primary">Ingresos por Servicios</CardTitle>
          </CardHeader>
          <CardContent className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviciosChart}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={4}
                >
                  {serviciosChart.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-primary">Ingresos por métodos de pago</CardTitle>
          </CardHeader>
          <CardContent className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pagos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
