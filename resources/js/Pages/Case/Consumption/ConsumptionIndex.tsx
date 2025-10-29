
import AppLayout from "@/Layouts/AppLayout"
import { BreadcrumbItem , type Consumption as ConsumptionType, FalshProps, FiltersQuery} from "@/Types"
import { type PaginationLink} from "@/Types";
import { router, usePage } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


import Pagination from "@/components/pagination";
import { Separator } from "@/components/ui/separator";
import { ArrowLeftRight, FileSpreadsheet } from "lucide-react";

import ExportData from "@/components/export-data";
import DataConsumption from "./data-consumption";
import FilterConsumption from "./filter-consumptio";
import ExportConsumption from "./export-consumption";






type Props = {
    consumptions :  { data: ConsumptionType[]; links:  PaginationLink[]  } ,
    filters : FiltersQuery,

}


const breadcrumbs : BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
    title: 'Consumption Tracker',
    href: '/prosthesis-consumption',
    }
];



function Consumption({consumptions , filters} : Props) {

    console.log(consumptions);
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

    // useEffect(()=>{
    //     router.reload({ only: ['invoices'] })
    // } , [])


  return (
           <AppLayout  breadcrumbs={breadcrumbs}>
                <Card className="m-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-x-2"> <ArrowLeftRight /> Consumption Tracker</CardTitle>
                        <CardDescription className="mt-2 text-sm xl:text-base">
                            Here you can View all Consumption of the Products .
                        </CardDescription>
                        <Separator className="mt-2" />
                        <CardAction>


                        </CardAction>
                    </CardHeader>

                    <CardContent>
                        {/* Search inpute */}

                        <FilterConsumption
                            filters={filters}
                        />



                        {/* Table */}
                        <DataConsumption  consumption={consumptions.data}/>
                    </CardContent>

                        <CardFooter className="flex flex-col ">
                                <div className="self-end">
                                    <Pagination  links={consumptions.links}/>
                                </div>

                                {/* Export */}
                                <div className="self-start">
                                    <ExportConsumption  filter={filters}/>
                                </div>
                        </CardFooter>
                    </Card>

           </AppLayout>
  )
}
export default Consumption;
