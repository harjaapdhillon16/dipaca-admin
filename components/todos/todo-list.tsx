"use client"

import { useState } from "react"

export type Todo = { id: string; text: string; done: boolean }

export default function TodoList({ initial }: { initial?: Todo[] }) {
  const [items, setItems] = useState<Todo[]>(initial ?? [])
  const [text, setText] = useState("")

  function add() {
    if (!text.trim()) return
    setItems((prev) => [{ id: `${Date.now()}`, text, done: false }, ...prev])
    setText("")
  }
  function toggle(id: string) {
    setItems((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }
  function remove(id: string) {
    setItems((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Agregar tarea..."
          className="flex-1 rounded-md border px-3 h-10"
        />
        <button onClick={add} className="rounded-md bg-[var(--brand-700)] text-white px-4 h-10">
          Añadir
        </button>
      </div>
      <ul className="space-y-2">
        {items.map((t) => (
          <li key={t.id} className="flex items-center gap-3 rounded-md border p-2">
            <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
            <span className={t.done ? "line-through text-muted-foreground" : ""}>{t.text}</span>
            <button onClick={() => remove(t.id)} className="ml-auto text-red-600 hover:underline text-sm">
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
