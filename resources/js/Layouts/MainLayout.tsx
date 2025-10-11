
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import {Toaster} from "@/components/ui/sonner";
import AppLayout from "./AppLayout";
import { ThemeProvider } from "next-themes";

type Props ={
    children: React.ReactNode
}

export default function MainLayout({children} : Props) {

    return (

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="bg-background text-foreground min-h-screen ">
             {children}
            </div>
        </ThemeProvider>

    )

}

