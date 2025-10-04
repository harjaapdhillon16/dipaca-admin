import type { ReactNode } from "react"

export function StatCard({ icon, title, value }: { icon?: ReactNode; title: string; value: string }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-center gap-3 text-muted-foreground">
        {icon}
        <span className="text-sm">{title}</span>
      </div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
    </div>
  )
}
