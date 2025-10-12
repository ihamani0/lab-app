
import AppLayout from "@/Layouts/AppLayout"
import { BreadcrumbItem, type Case as CaseType  , FalshProps, FiltersQuery, InvoiceCase} from "@/Types"
import { type PaginationLink} from "@/Types";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


import Pagination from "@/components/pagination";
import { Separator } from "@/components/ui/separator";
import { FileSpreadsheet } from "lucide-react";
import DataInvoice from "./data-invoice";






type Props = {
    invoices :  { data: InvoiceCase[]; links: PaginationLink[] } ,
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



function Invoice({invoices} : Props) {

    const { flash }  =  usePage<FalshProps>().props ;

        // For sonner Toast mesage Flash
    useEffect(()=>{
        if(flash.success){
            toast.success(flash.success)
        }

        if(flash.error){
            toast.error(flash.error)
        }
    } , [flash])


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



                        {/* Table */}
                        <DataInvoice  invoices={invoices.data}/>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                            {/* <Pagination  links={cases.links}/> */}
                    </CardFooter>
                    </Card>

           </AppLayout>
  )
}
export default Invoice;


