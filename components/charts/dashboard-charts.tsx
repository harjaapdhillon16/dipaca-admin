"use client"

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from "recharts"

const lineData = [
  { name: "SEP", value: 28 },
  { name: "OCT", value: 42 },
  { name: "NOV", value: 36 },
  { name: "DIC", value: 50 },
  { name: "ENE", value: 45 },
  { name: "FEB", value: 48 },
]

const barData = [
  { name: "Efectivo", a: 8, b: 20 },
  { name: "Pago Movil", a: 15, b: 10 },
  { name: "Tarjeta", a: 7, b: 12 },
  { name: "Zelle", a: 12, b: 5 },
  { name: "Binance", a: 10, b: 15 },
]

export function RevenueLine() {
  return (
    <div className="h-60">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={lineData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#0e4a67" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function PaymentsBar() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={barData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="a" fill="#0e4a67" radius={[6, 6, 0, 0]} />
          <Bar dataKey="b" fill="#22b8cf" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
