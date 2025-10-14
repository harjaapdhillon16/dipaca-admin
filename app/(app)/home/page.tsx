"use client"

import { Calendar, DollarSign, TrendingUp, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"
import { dashboardAPI } from "../../../lib/api"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    total_ingresos: 0,
    propinas: 0,
    total_servicios: 0,
    period: 'week'
  })
  const [monthlyIncome, setMonthlyIncome] = useState<any[]>([])
  const [ranking, setRanking] = useState<any[]>([])
  const [incomeByService, setIncomeByService] = useState<any[]>([])
  const [incomeByPayment, setIncomeByPayment] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('week')
  const [selectedServicePeriod, setSelectedServicePeriod] = useState('month')
  const [selectedPaymentPeriod, setSelectedPaymentPeriod] = useState('month')
  const [selectedRankingPeriod, setSelectedRankingPeriod] = useState('month')

  useEffect(() => {
    fetchDashboardData()
  }, [selectedPeriod])

  useEffect(() => {
    fetchIncomeByService()
  }, [selectedServicePeriod])

  useEffect(() => {
    fetchIncomeByPayment()
  }, [selectedPaymentPeriod])

  useEffect(() => {
    fetchRanking()
  }, [selectedRankingPeriod])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [statsData, monthlyData] = await Promise.all([
        dashboardAPI.getStats(selectedPeriod),
        dashboardAPI.getMonthlyIncome()
      ])
      
      setStats(statsData)
      setMonthlyIncome(monthlyData)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchRanking = async () => {
    try {
      const data = await dashboardAPI.getWorkerRanking(selectedRankingPeriod, 8)
      setRanking(data)
    } catch (error) {
      console.error("Error fetching ranking:", error)
    }
  }

  const fetchIncomeByService = async () => {
    try {
      const data = await dashboardAPI.getIncomeByService(selectedServicePeriod)
      setIncomeByService(data)
    } catch (error) {
      console.error("Error fetching income by service:", error)
    }
  }

  const fetchIncomeByPayment = async () => {
    try {
      const data = await dashboardAPI.getIncomeByPayment(selectedPaymentPeriod)
      setIncomeByPayment(data)
    } catch (error) {
      console.error("Error fetching income by payment:", error)
    }
  }

  const totalServiceIncome = incomeByService.reduce((sum, item) => sum + item.value, 0)
  const totalPaymentIncome = incomeByPayment.reduce((sum, item) => sum + item.value, 0)

  const currentMonthIncome = monthlyIncome.length > 0 
    ? monthlyIncome[monthlyIncome.length - 1]?.value || 0 
    : 0

  const previousMonthIncome = monthlyIncome.length > 1 
    ? monthlyIncome[monthlyIncome.length - 2]?.value || 0 
    : 0

  const percentageChange = previousMonthIncome > 0
    ? (((currentMonthIncome - previousMonthIncome) / previousMonthIncome) * 100).toFixed(1)
    : 0

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a5490] mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

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
              <div className="relative">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="text-lg font-semibold appearance-none pr-6 bg-transparent cursor-pointer focus:outline-none"
                >
                  <option value="week">This week</option>
                  <option value="month">This month</option>
                  <option value="year">This year</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
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
              <div className="text-lg font-bold">${stats.total_ingresos}</div>
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
              <div className="text-lg font-bold">${stats.propinas}</div>
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
                <h2 className="text-2xl font-bold">
                  ${currentMonthIncome.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}K
                </h2>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md ${
                  parseFloat(percentageChange as string) >= 0 ? 'bg-[#1a5490]' : 'bg-red-500'
                } text-white text-xs font-medium`}>
                  <TrendingUp className="w-3 h-3" />
                  {percentageChange > 0 ? '+' : ''}{percentageChange}%
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Ingresos totales</p>
            </div>
          </div>
          <div className="p-6">
            {monthlyIncome.length > 0 ? (
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={monthlyIncome} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
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
            ) : (
              <div className="h-[240px] flex items-center justify-center text-gray-400">
                No hay datos de ingresos mensuales
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border overflow-hidden">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold">Ranking</h2>
            <div className="relative">
              <select
                value={selectedRankingPeriod}
                onChange={(e) => setSelectedRankingPeriod(e.target.value)}
                className="flex items-center gap-2 text-sm text-[#1a5490] appearance-none pr-6 cursor-pointer focus:outline-none"
              >
                <option value="week">Esta Semana</option>
                <option value="month">Este Mes</option>
                <option value="year">Este Año</option>
              </select>
              <Calendar className="w-4 h-4 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#1a5490]" />
            </div>
          </div>
          <div className="px-6 py-4">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-3 pb-2 border-b">
              <span>#</span>
              <span>Nombre</span>
              <span>N° Servicios</span>
            </div>
            {ranking.length > 0 ? (
              <div className="space-y-3">
                {ranking.map((r, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-[#e8f2fb] text-xs font-medium text-[#1a5490]">
                      {i + 1}
                    </span>
                    <span className="flex-1 mx-3 text-left">{r.nombre}</span>
                    <span className="font-semibold">{r.servicios}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">
                No hay datos de ranking
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border overflow-hidden">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold">Ingresos por Servicios</h2>
            <div className="relative">
              <select
                value={selectedServicePeriod}
                onChange={(e) => setSelectedServicePeriod(e.target.value)}
                className="text-sm text-[#1a5490] appearance-none pr-4 cursor-pointer focus:outline-none"
              >
                <option value="week">Semana</option>
                <option value="month">Mes</option>
                <option value="year">Año</option>
              </select>
              <span className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">˅</span>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold">
                  ${totalServiceIncome.toFixed(2)}
                </div>
              </div>
            </div>
            {incomeByService.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={incomeByService}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      paddingAngle={2}
                    >
                      {incomeByService.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
                  {incomeByService.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <div className="text-xs">
                        <div className="font-medium">${item.value.toFixed(2)}</div>
                        <div className="text-gray-500">{item.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="h-[200px] flex items-center justify-center text-gray-400">
                No hay datos de servicios
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border overflow-hidden">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold">Ingresos por métodos de pago</h2>
            <div className="relative">
              <select
                value={selectedPaymentPeriod}
                onChange={(e) => setSelectedPaymentPeriod(e.target.value)}
                className="text-sm text-[#1a5490] appearance-none pr-4 cursor-pointer focus:outline-none"
              >
                <option value="week">Semana</option>
                <option value="month">Mes</option>
                <option value="year">Año</option>
              </select>
              <span className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">˅</span>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold">
                  ${totalPaymentIncome.toFixed(2)}
                </div>
              </div>
            </div>
            {incomeByPayment.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={incomeByPayment} margin={{ top: 5, right: 5, left: -20, bottom: 5 }} barSize={24}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 10 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                  />
                  <Tooltip />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {incomeByPayment.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#1a5490" : "#22c55e"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[200px] flex items-center justify-center text-gray-400">
                No hay datos de métodos de pago
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}