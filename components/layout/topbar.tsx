import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { SidebarTrigger } from "../ui/sidebar"

export default function Topbar() {
  return (
    <header className="sticky top-0 z-0 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="flex items-center justify-between gap-4 px-6 py-3">
        {/* left: sidebar trigger */}
        <div className="flex items-center">
          <SidebarTrigger className="hover:bg-sidebar-accent/30 rounded-md" />
        </div>

        {/* right: user block */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-medium leading-none">Maria Jose</div>
            <div className="text-xs text-muted-foreground mt-1">Administrador</div>
          </div>
          <Avatar className="h-9 w-9 border-2 border-sidebar-border">
            <AvatarImage alt="Maria Jose" src="/diverse-avatars.png" />
            <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground font-semibold">
              MJ
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}