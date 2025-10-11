
import { usePage } from "@inertiajs/react";
import * as React from "react";
import AppRoot from "../components/app-root";
import AppContent from "@/components/app-content";
import AppSidebarHeader from "@/components/app-sidebar-header";
import { BreadcrumbItem } from "@/Types";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "sonner";



export default function AppLayout({children , breadcrumbs = []} : { children: React.ReactNode , breadcrumbs : BreadcrumbItem[] }){

    //// Get shared props sent from Laravel backend
    const { props} = usePage();
    const { sidebarOpen=true } = props;// Default to open



    return (
        <AppRoot open={true}>
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />

                {children}

                <Toaster position='bottom-center' richColors />

            </AppContent>
        </AppRoot>
    )

}
