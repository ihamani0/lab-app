import AppLayout from "@/Layouts/AppLayout"
import { BreadcrumbItem, FalshProps, FiltersQuery, type User as UserType } from "@/Types"
import { type PaginationLink} from "@/Types";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


import Pagination from "@/components/pagination";
import { Separator } from "@/components/ui/separator";

import SearchInput from "@/components/search-inpute";
import { useDebouncedSearch } from "@/hooks/use-debouncedSearch";
import PerPage from "@/components/per-page";
import CreateAccounting from "./create-accounting";
import DataAccounting from "./data-accounting";
import { route } from "ziggy-js";



type DoctorProps = {
    accountings :  { data: UserType[]; links: PaginationLink[] }
    filters : FiltersQuery
}


const breadcrumbs : BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
    title: 'Accounting Managment',
    href: '/',
    }
];



function Doctor({accountings , filters} : DoctorProps) {

    const { flash }  =  usePage<FalshProps>().props ;

    const { searchTerm , handleSearchChange } = useDebouncedSearch({
        route : route('accounting.index'),
    })

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
                        <CardTitle>Accounting Management</CardTitle>
                        <CardDescription className="mt-2 text-sm xl:text-base">
                            Here you can add, remove, update all Accounting that work with the lab.
                        </CardDescription>
                        <Separator className="mt-2" />
                        <CardAction>
                            <CreateAccounting />
                        </CardAction>
                    </CardHeader>

                    <CardContent>
                        {/* Search inpute */}
                        <SearchInput
                            handleChange={(e) => handleSearchChange(e.target.value)}
                            searchTerm={searchTerm}
                        />
                        {/* Table */}
                        <DataAccounting accountings={accountings.data} />
                    </CardContent>
                    <CardFooter className="flex justify-end">
                            <PerPage
                                url={route('accounting.index')}
                                defaultPerPage={filters.per_page ?? "15"}
                            />
                            <Pagination  links={accountings.links}/>
                    </CardFooter>
                    </Card>

           </AppLayout>
  )
}
export default Doctor
