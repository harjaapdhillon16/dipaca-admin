import Image from "next/image"

export function Topbar() {
  return (
    <header className="h-16 w-full border-b bg-background flex items-center justify-end pr-6">
      <div className="flex items-center gap-3">
        <Image src="/user-avatar-circle.jpg" alt="Avatar" width={36} height={36} className="rounded-full" />
        <div className="text-right">
          <div className="text-sm font-medium">Maria Jose</div>
          <div className="text-xs text-muted-foreground">Administrador</div>
        </div>
      </div>
    </header>
  )
}
