import type { ReactNode } from "react"

export function DataTable({
  columns,
  rows,
}: {
  columns: { key: string; header: string; render?: (value: any, row: any) => ReactNode }[]
  rows: any[]
}) {
  return (
    <div className="rounded-2xl border">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 text-left font-medium text-muted-foreground">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-t">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    {col.render
                      ? col.render(row[col.key as keyof typeof row], row)
                      : String(row[col.key as keyof typeof row] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
