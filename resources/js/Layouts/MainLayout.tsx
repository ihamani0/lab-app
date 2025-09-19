
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import {Toaster} from "@/components/ui/sonner";
import AppLayout from "./AppLayout";

type Props ={
    children: React.ReactNode
}

export default function MainLayout({children} : Props) {

    return (
        // <SidebarProvider >
        // <AppSidebar />

        // <main className="mx-auto flex h-screen w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl px-3">
        //     <SidebarTrigger />
        //     {children}
        // </main>
        //     <Toaster position='bottom-center' richColors />

        // </SidebarProvider>
          <>  {children} </>

    )

}

