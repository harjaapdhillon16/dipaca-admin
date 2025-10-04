import { Card, CardContent } from "@/components/ui/card"
import type { ReactNode } from "react"

export function StatCard({
  title,
  value,
  icon,
}: {
  title: string
  value: ReactNode
  icon?: ReactNode
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">{title}</div>
          {icon}
        </div>
        <div className="mt-2 text-2xl font-semibold">{value}</div>
      </CardContent>
    </Card>
  )
}
