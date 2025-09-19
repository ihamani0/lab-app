import { SidebarProvider } from "@/components/ui/sidebar";



function AppRoot({children , open = true} : { children: React.ReactNode , open: boolean }) {
  return (
    <SidebarProvider defaultOpen={open}>
        {children}
    </SidebarProvider>
  )
}
export default AppRoot;
