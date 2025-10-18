
import AppLayout from "@/Layouts/AppLayout"
import { BreadcrumbItem , type Doctor as DoctorType, FalshProps, FiltersQuery, InvoiceCase} from "@/Types"
import { type PaginationLink} from "@/Types";
import { router, usePage } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


import Pagination from "@/components/pagination";
import { Separator } from "@/components/ui/separator";
import { FileSpreadsheet } from "lucide-react";
import DataInvoice from "./data-invoice";
import FilterInvoice from "./filter-invoice";
import ExportData from "@/components/export-data";






type Props = {
    invoices :  { data: InvoiceCase[]; links: PaginationLink[] } ,
    filters : FiltersQuery,
    doctors : DoctorType[]
}


const breadcrumbs : BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
    title: 'Invoice Managment',
    href: '/prosthesis-invoice',
    }
];



function Invoice({invoices , filters , doctors} : Props) {

    const { flash }  =  usePage<FalshProps>().props ;
    



    const params = useMemo(() => {
        return new URLSearchParams({
                doctor_id: filters.doctor_id || "",
                status: filters.status || "",
                amount_min: filters.amount_min || "",
                amount_max: filters.amount_max || "",
                date_from: filters.date_from || "",
                date_to: filters.date_to || "",
            });
    }, [filters]);

        // For sonner Toast mesage Flash
    useEffect(()=>{
        if(flash.success){
            toast.success(flash.success)
        }

        if(flash.error){
            toast.error(flash.error)
        }
    } , [flash])

    useEffect(()=>{
        router.reload({ only: ['invoices'] })
    } , [])


  return (
           <AppLayout  breadcrumbs={breadcrumbs}>
                <Card className="m-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-x-2"> <FileSpreadsheet /> Invoice Management</CardTitle>
                        <CardDescription className="mt-2 text-sm xl:text-base">
                            Here you can add, remove, update all Invoices that work with the lab.
                        </CardDescription>
                        <Separator className="mt-2" />
                        <CardAction>
                            {/* <CreateDoctor/> */}

                        </CardAction>
                    </CardHeader>

                    <CardContent>
                        {/* Search inpute */}

                        <FilterInvoice
                            doctors={doctors}
                            filters={filters}
                        />



                        {/* Table */}
                        <DataInvoice  invoices={invoices.data}/>
                    </CardContent>

                        <CardFooter className="flex flex-col ">
                                <div className="self-end">
                                    <Pagination  links={invoices.links}/>
                                </div>

                                {/* Export */}
                                <div className="self-start">
                                    <ExportData  url="/prosthesis-invoice/export"  params={params.toString()}/>
                                </div>
                        </CardFooter>
                    </Card>

           </AppLayout>
  )
}
export default Invoice;
