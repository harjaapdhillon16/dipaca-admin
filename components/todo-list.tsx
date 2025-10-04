"use client"
import { useState } from "react"
import { Check, Plus, Trash } from "lucide-react"

export function TodoList({ initial }: { initial?: string[] }) {
  const [items, setItems] = useState(
    (initial || ["Revisar vehículo", "Confirmar pago", "Entregar ticket"]).map((t, i) => ({
      id: i + 1,
      text: t,
      done: i === 0,
    })),
  )
  const [text, setText] = useState("")
  return (
    <div className="rounded-2xl border p-4">
      <div className="mb-3 font-semibold">To‑Do</div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-3">
            <button
              aria-label="Completar"
              onClick={() => setItems((prev) => prev.map((p) => (p.id === item.id ? { ...p, done: !p.done } : p)))}
              className={
                "h-5 w-5 rounded border flex items-center justify-center " +
                (item.done ? "bg-emerald-500 text-white" : "bg-background")
              }
            >
              {item.done && <Check size={14} />}
            </button>
            <span className={item.done ? "text-muted-foreground line-through" : ""}>{item.text}</span>
            <button
              aria-label="Eliminar"
              onClick={() => setItems((prev) => prev.filter((p) => p.id !== item.id))}
              className="ml-auto text-red-600 hover:underline"
            >
              <Trash size={16} />
            </button>
          </li>
        ))}
      </ul>
      <form
        className="mt-3 flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          if (!text.trim()) return
          setItems((prev) => [...prev, { id: Date.now(), text, done: false }])
          setText("")
        }}
      >
        <input
          className="flex-1 rounded-md border px-3 py-2 text-sm"
          placeholder="Nueva tarea..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="inline-flex items-center gap-2 rounded-md bg-slate-800 text-white px-3 py-2 text-sm">
          <Plus size={16} /> Agregar
        </button>
      </form>
    </div>
  )
}
