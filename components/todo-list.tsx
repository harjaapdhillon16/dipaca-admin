"use client"

import { useState, useEffect } from "react"
import { Check, Plus, Trash2, X } from "lucide-react"
import { todosAPI } from "../lib/api"

interface Todo {
  id: string | number
  text: string
  done: boolean
}

interface TodoListProps {
  servicioId: string
}

export default function TodoList({ servicioId }: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodoText, setNewTodoText] = useState("")
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    fetchTodos()
  }, [servicioId])

  const fetchTodos = async () => {
    try {
      setLoading(true)
      const data = await todosAPI.getByServicio(servicioId)
      setTodos(data)
    } catch (error) {
      console.error("Error fetching todos:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggle = async (id: string | number) => {
    try {
      await todosAPI.toggle(String(id))
      setTodos(todos.map(t => 
        t.id === id ? { ...t, done: !t.done } : t
      ))
    } catch (error) {
      console.error("Error toggling todo:", error)
      alert("Error al actualizar la tarea")
    }
  }

  const handleAdd = async () => {
    if (!newTodoText.trim()) return

    try {
      setAdding(true)
      const newTodo = await todosAPI.create(servicioId, { 
        text: newTodoText,
        done: false 
      })
      setTodos([...todos, newTodo])
      setNewTodoText("")
    } catch (error) {
      console.error("Error adding todo:", error)
      alert("Error al agregar la tarea")
    } finally {
      setAdding(false)
    }
  }

  const handleDelete = async (id: string | number) => {
    if (!confirm("¿Está seguro de eliminar esta tarea?")) return

    try {
      await todosAPI.delete(String(id))
      setTodos(todos.filter(t => t.id !== id))
    } catch (error) {
      console.error("Error deleting todo:", error)
      alert("Error al eliminar la tarea")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd()
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl border p-6">
        <div className="text-center text-gray-500">Cargando tareas...</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border p-6 space-y-4">
      {/* Todo Items */}
      <div className="space-y-2">
        {todos.length === 0 && !adding && (
          <div className="text-center text-gray-400 py-4">
            No hay tareas. Agrega una nueva tarea.
          </div>
        )}
        
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 group"
          >
            <button
              onClick={() => handleToggle(todo.id)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                todo.done
                  ? "bg-teal-600 border-teal-600"
                  : "border-gray-300 hover:border-teal-600"
              }`}
            >
              {todo.done && <Check className="w-3 h-3 text-white" />}
            </button>
            <span
              className={`flex-1 text-sm ${
                todo.done
                  ? "text-gray-400 line-through"
                  : "text-gray-700"
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => handleDelete(todo.id)}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded transition-all"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
        ))}
      </div>

      {/* Add New Todo */}
      <div className="flex items-center gap-2 pt-2 border-t">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Agregar nueva tarea..."
          disabled={adding}
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent disabled:opacity-50"
        />
        <button
          onClick={handleAdd}
          disabled={adding || !newTodoText.trim()}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          {adding ? "Agregando..." : "Agregar"}
        </button>
      </div>
    </div>
  )
}