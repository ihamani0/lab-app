
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
            <AppContent>
                <AppSidebarHeader breadcrumbs={breadcrumbs} />

                {children}

                <Toaster position='bottom-center' richColors />

            </AppContent>
        </AppRoot>
        // <div className="min-h-screen bg-background flex">

        //     {/* Sidebar */}
        //     {/* <AppSideBar isOpen={sidebarOpen} /> */}

        //     {/* Main Content Area */}
        //         <div className="flex flex-1 flex-col">
        //             {/* Header / Top Bar */}
        //             {/* <Header /> */}

        //             {/* Actual Page Content */}
        //             <main className="flex-1 p-6 overflow-auto">{children}</main>
        //         </div>

        // </div>
    )

}
