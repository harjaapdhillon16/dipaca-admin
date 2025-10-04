import type { ReactNode } from "react"
import Shell from "../../components/layout/shell"

export default function AppLayout({ children }: { children: ReactNode }) {
  return <Shell>{children}</Shell>
}
