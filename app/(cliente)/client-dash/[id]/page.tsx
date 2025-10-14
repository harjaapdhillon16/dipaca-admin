"use client"

import { use, useMemo, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Clock, User2, Car, Trash2, Plus, Percent, Minus } from "lucide-react"
import { serviciosAPI, servicioItemsAPI } from "@/lib/api"

type LineItem = {
  id: string
  nombre: string
  precio: number
}

type Producto = {
  id: string
  nombre: string
  precio: number
}

function formatUSD(n: number) {
  return `$${n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-background/50 px-4 py-3">
      <div className="text-primary">{icon}</div>
      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="font-semibold text-foreground">{value}</span>
      </div>
    </div>
  )
}

export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id: servicioId } = use(params)
  const { toast } = useToast()
  const router = useRouter()

  // Service data
  const [servicio, setServicio] = useState<any>(null)
  const [items, setItems] = useState<LineItem[]>([])
  const [catalogo, setCatalogo] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)

  // Discounts
  const AVAILABLE_POINTS = 1500
  const [pointsApplied, setPointsApplied] = useState(0)
  const [discountApplied, setDiscountApplied] = useState(0)

  // Modal states
  const [isAddOpen, setAddOpen] = useState(false)
  const [isDiscountOpen, setDiscountOpen] = useState(false)
  const [isCheckoutOpen, setCheckoutOpen] = useState(false)

  useEffect(() => {
    fetchData()
  }, [servicioId])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [servicioData, itemsData, catalogoData] = await Promise.all([
        serviciosAPI.getById(servicioId),
        servicioItemsAPI.getItems(servicioId),
        servicioItemsAPI.getCatalogo()
      ])

      setServicio(servicioData)
      setItems(itemsData)
      setCatalogo(catalogoData)
      setPointsApplied(servicioData.puntos_usados || 0)
      setDiscountApplied(servicioData.descuento || 0)
    } catch (error: any) {
      console.error('Error fetching data:', error)
      toast({
        title: "Error",
        description: error.message || "Error al cargar datos",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const subtotal = useMemo(() => items.reduce((sum, it) => sum + it.precio, 0), [items])
  const total = Math.max(0, subtotal - discountApplied)

  async function removeItem(id: string) {
    try {
      await servicioItemsAPI.removeItem(id)
      setItems((prev) => prev.filter((i) => i.id !== id))
      toast({
        title: "Producto eliminado",
        description: "El producto se eliminó correctamente",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Error al eliminar producto",
        variant: "destructive",
      })
    }
  }

  // --- Add Product Modal ---
  const [candidate, setCandidate] = useState<string | undefined>(undefined)
  const selectedOption = useMemo(() => catalogo.find((c) => c.id === candidate), [candidate, catalogo])

  async function commitAddProduct() {
    if (!selectedOption) return

    try {
      const newItem = await servicioItemsAPI.addItem(servicioId, {
        nombre: selectedOption.nombre,
        precio: selectedOption.precio
      })

      setItems((prev) => [...prev, newItem])
      setCandidate(undefined)
      setAddOpen(false)

      toast({
        title: "Producto agregado",
        description: `${selectedOption.nombre} agregado correctamente`,
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Error al agregar producto",
        variant: "destructive",
      })
    }
  }

  // --- Discount Modal ---
  const [tempPoints, setTempPoints] = useState(pointsApplied)

  function pointsToDollars(pts: number, maxSubtotal: number) {
    const dollars = Math.floor(pts / 10)
    return Math.min(dollars, maxSubtotal)
  }

  function clampPoints(pts: number, maxSubtotal: number) {
    const maxPtsFromSubtotal = maxSubtotal * 10
    return Math.max(0, Math.min(pts, Math.min(AVAILABLE_POINTS, maxPtsFromSubtotal)))
  }

  async function applyDiscount() {
    const clamped = clampPoints(tempPoints, subtotal)
    const dollars = pointsToDollars(clamped, subtotal)

    try {
      await servicioItemsAPI.applyDiscount(servicioId, {
        puntos_usados: clamped,
        descuento: dollars
      })

      setPointsApplied(clamped)
      setDiscountApplied(dollars)
      setDiscountOpen(false)

      toast({
        title: "Descuento aplicado",
        description: `Descuento de ${formatUSD(dollars)} aplicado`,
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Error al aplicar descuento",
        variant: "destructive",
      })
    }
  }

  // --- Checkout Modal ---
  const [paymentMethod, setPaymentMethod] = useState<string | undefined>()
  const [tip, setTip] = useState<number>(0)

  async function confirmPayment() {
    if (!paymentMethod) return

    try {
      await servicioItemsAPI.processPayment(servicioId, {
        metodo_pago: paymentMethod,
        propina: tip
      })

      const grandTotal = Math.max(0, total + tip)
      toast({
        title: "Pago confirmado",
        description: `Método: ${paymentMethod} • Propina: ${formatUSD(tip)} • Total: ${formatUSD(grandTotal)}`,
      })

      setCheckoutOpen(false)
      setTimeout(() => router.push('/client-dash'), 1500)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Error al procesar pago",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Cargando servicio...</p>
        </div>
      </div>
    )
  }

  if (!servicio) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-destructive mb-4">Servicio no encontrado</p>
          <Button onClick={() => router.push('/client-dash')}>Volver</Button>
        </div>
      </div>
    )
  }

  const plate = servicio.placa || 'N/A'
  const entryTime = servicio.hora_entrada ? new Date(`2000-01-01T${servicio.hora_entrada}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'N/A'
  const clientName = `${servicio.cliente_nombre} ${servicio.cliente_apellido}`
  const brand = servicio.marca
  const model = servicio.modelo
  const dateLabel = new Date(servicio.fecha).toLocaleDateString(undefined, {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  })

  return (
    <main className="mx-auto w-full max-w-5xl space-y-6">
      {/* Top breadcrumb and title */}
      <div className="flex flex-col gap-1">
        <div className="text-sm text-muted-foreground">Servicios / {plate}</div>
        <h1 className="text-balance text-3xl font-bold leading-tight text-primary md:text-4xl">
          {dateLabel}–{plate}
        </h1>
      </div>

      {/* Info row */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <InfoCard icon={<Clock className="h-5 w-5" />} label="Hora entrada" value={entryTime} />
        <InfoCard icon={<User2 className="h-5 w-5" />} label="Cliente" value={clientName} />
        <InfoCard icon={<Car className="h-5 w-5" />} label="Marca" value={brand} />
        <InfoCard icon={<Car className="h-5 w-5" />} label="Modelo" value={model} />
      </div>

      {/* Servicios header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Servicios</h2>
        <Separator className="mt-2" />
      </div>

      {/* Items list */}
      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No hay servicios agregados
          </div>
        ) : (
          items.map((it) => (
            <div key={it.id} className="flex items-center justify-between rounded-lg bg-background px-1 py-1">
              <div className="text-foreground">{it.nombre}</div>
              <div className="flex items-center gap-3">
                <div className="font-medium text-foreground">{formatUSD(it.precio)}</div>
                <button
                  aria-label={`Eliminar ${it.nombre}`}
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => removeItem(it.id)}
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-4 pt-2">
        <Dialog open={isAddOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 rounded-full hover:bg-slate-50 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition-colors">
              <div className="bg-slate-700 rounded-full p-1 text-white">
                <Plus className="h-4 w-4" />
              </div>  
              Agregar Producto
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>SERVICIOS O PRODUCTOS</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-medium text-foreground">Seleccionar</div>
                <Select value={candidate} onValueChange={setCandidate}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona un servicio o producto" />
                  </SelectTrigger>
                  <SelectContent>
                    {catalogo.map((opt) => (
                      <SelectItem key={opt.id} value={opt.id}>
                        {opt.nombre} — {formatUSD(opt.precio)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedOption && (
                <div className="flex items-center justify-between rounded-md border px-3 py-2">
                  <div className="text-foreground">{selectedOption.nombre}</div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{formatUSD(selectedOption.precio)}</span>
                    <button
                      aria-label="Quitar selección"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => setCandidate(undefined)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="mt-2">
              <DialogClose asChild>
                <Button variant="ghost">Cancelar</Button>
              </DialogClose>
              <Button onClick={commitAddProduct} disabled={!selectedOption} className="min-w-28">
                Agregar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog
          open={isDiscountOpen}
          onOpenChange={(o) => {
            setDiscountOpen(o)
            if (o) setTempPoints(pointsApplied)
          }}
        >
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
              <div className="bg-slate-700 rounded-full p-1 text-white">
                <Percent className="h-4 w-4" />
              </div>
              Agregar Descuento
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>DESCUENTO</DialogTitle>
            </DialogHeader>

            <div className="space-y-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground/90">Disponibles:</span>
                <span className="font-semibold text-foreground">{AVAILABLE_POINTS} ptos</span>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-foreground/90">Usar:</div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setTempPoints((p) => clampPoints(p - 10, subtotal))}
                    aria-label="Disminuir puntos"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={tempPoints}
                    onChange={(e) => {
                      const val = Number(e.target.value.replace(/\D/g, "") || 0)
                      setTempPoints(clampPoints(val, subtotal))
                    }}
                    className="w-16 text-center"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setTempPoints((p) => clampPoints(p + 10, subtotal))}
                    aria-label="Aumentar puntos"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground/90">Descuento</span>
                <span className="font-medium text-foreground">{formatUSD(pointsToDollars(tempPoints, subtotal))}</span>
              </div>
            </div>

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="ghost">Cancelar</Button>
              </DialogClose>
              <Button
                onClick={applyDiscount}
                disabled={subtotal === 0 || tempPoints === pointsApplied}
                className="min-w-28"
              >
                Aplicar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Totals */}
      <div className="space-y-2 pt-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>SubTotal</span>
          <span>{formatUSD(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Descuento</span>
          <span>-{formatUSD(discountApplied)}</span>
        </div>
        <Separator className="my-2" />
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold">Total</span>
          <span className="text-xl font-bold">{formatUSD(total)}</span>
        </div>
      </div>

      {/* Checkout */}
      <Dialog open={isCheckoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogTrigger asChild>
          <button
            disabled={total <= 0}
            className="mx-auto mt-2 w-full flex items-center justify-center max-w-md rounded-full bg-slate-700 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-600 disabled:opacity-50"
          >
            Confirmar pago
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>METODO DE PAGO</DialogTitle>
          </DialogHeader>

          <div className="space-y-5">
            <div className="space-y-2">
              <div className="text-sm text-foreground/90">Seleccionar método</div>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un método" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EFECTIVO">Efectivo</SelectItem>
                  <SelectItem value="TARJETA">Tarjeta</SelectItem>
                  <SelectItem value="TRANSFERENCIA">Transferencia</SelectItem>
                  <SelectItem value="PAGO_MOVIL">Pago Móvil</SelectItem>
                  <SelectItem value="ZELLE">Zelle</SelectItem>
                  <SelectItem value="BINANCE">Binance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-foreground/90">Propina</div>
              <Input
                inputMode="numeric"
                pattern="[0-9]*"
                value={tip}
                onChange={(e) => {
                  const n = Number(e.target.value.replace(/\D/g, "") || 0)
                  setTip(n)
                }}
                className="w-24"
              />
            </div>

            <div className="flex items-center justify-between rounded-md bg-muted/40 px-3 py-2 text-sm">
              <span>Total con propina</span>
              <span className="font-semibold">{formatUSD(Math.max(0, total + tip))}</span>
            </div>
          </div>

          <DialogFooter className="mt-2">
            <DialogClose asChild>
              <Button variant="ghost">Cancelar</Button>
            </DialogClose>
            <Button onClick={confirmPayment} disabled={!paymentMethod} className="min-w-32">
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}