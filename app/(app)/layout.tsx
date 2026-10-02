import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from '@/features/sidebar/app-sidebar'
import { listGames } from "@/lib/games/queries"

export default async function AppLayout({ children }: LayoutProps<"/">) {
  const game = await listGames();
  return (
    <SidebarProvider>
      <AppSidebar games={game}/>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}