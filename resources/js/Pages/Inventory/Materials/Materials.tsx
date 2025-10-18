import AppLayout from "@/Layouts/AppLayout"
import { BreadcrumbItem, type Category as CategoryType, FalshProps, Product } from "@/Types"
import { type PaginationLink , FiltersQuery} from "@/Types";
import {  usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Pagination from "@/components/pagination";
import { Separator } from "@/components/ui/separator";
import { useDebouncedSearch } from "@/hooks/use-debouncedSearch";
import CreateMaterial from "./create-material";
import DataMaterials from "./data-material";

import FilterMaterial from "./filter-material";
import ExportData from "@/components/export-data";



type Props = {
    materials : { data : Product[] , links: PaginationLink[] }
    categories :   CategoryType[] ,
    filters : FiltersQuery
}



const breadcrumbs : BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
    title: 'Prdoucts Managment',
    href: '/materials',
    }
];



function Materials({materials , categories , filters} : Props) {


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
                        <CardTitle>Prdoucts Management</CardTitle>
                        <CardDescription className="mt-2 text-sm xl:text-base">
                            Here you can add, remove, update all Category .
                        </CardDescription>
                        <Separator className="mt-2" />
                        <CardAction>

                            <CreateMaterial   categories={categories}  />
                        </CardAction>
                    </CardHeader>

                    <CardContent>
                        {/* Search inpute */}


                        <FilterMaterial  categories={categories} filters={filters}/>

                        <ExportData url="/materials" />

                        {/* Table */}

                        <DataMaterials Products={materials.data} categories={categories} />


                    </CardContent>
                    <CardFooter className="flex justify-end">
                            <Pagination  links={materials.links}/>
                    </CardFooter>
                    </Card>

           </AppLayout>
  )
}
export default Materials
