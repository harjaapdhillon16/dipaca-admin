"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

type Todo = { id: string; text: string; done: boolean }

export default function TodoList({ storageKey }: { storageKey: string }) {
  const [todos, setTodos] = useState<Todo[]>([])
  const [text, setText] = useState("")

  useEffect(() => {
    const raw = localStorage.getItem(storageKey)
    if (raw) setTodos(JSON.parse(raw))
  }, [storageKey])

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(todos))
  }, [storageKey, todos])

  function addTodo() {
    if (!text.trim()) return
    setTodos((t) => [...t, { id: Math.random().toString(36).slice(2), text, done: false }])
    setText("")
  }
  function toggle(id: string) {
    setTodos((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)))
  }
  function remove(id: string) {
    setTodos((t) => t.filter((x) => x.id !== id))
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input placeholder="Agregar tarea..." value={text} onChange={(e) => setText(e.target.value)} />
        <Button type="button" onClick={addTodo}>
          Añadir
        </Button>
      </div>
      <ul className="space-y-2">
        {todos.map((t) => (
          <li key={t.id} className="flex items-center justify-between rounded-md border p-2">
            <div className="flex items-center gap-2">
              <Checkbox checked={t.done} onCheckedChange={() => toggle(t.id)} />
              <span className={t.done ? "line-through text-muted-foreground" : ""}>{t.text}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => remove(t.id)}>
              Eliminar
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
