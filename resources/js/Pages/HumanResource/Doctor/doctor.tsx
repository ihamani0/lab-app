import AppLayout from "@/Layouts/AppLayout"
import { BreadcrumbItem, type Doctor as DoctorType, FalshProps, FiltersQuery } from "@/Types"
import { type PaginationLink} from "@/Types";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import CreateDoctor from "./create-doctor";
import DataDoctor from "./data-doctor";
import Pagination from "@/components/pagination";
import { Separator } from "@/components/ui/separator";

import SearchInput from "@/components/search-inpute";
import { useDebouncedSearch } from "@/hooks/use-debouncedSearch";
import PerPage from "@/components/per-page";


type DoctorProps = {
    doctors :  { data: DoctorType[]; links: PaginationLink[] }
    filters : FiltersQuery
}


const breadcrumbs : BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
    title: 'Doctors Managment',
    href: '/doctors',
    }
];



function Doctor({doctors , filters} : DoctorProps) {

    const { flash }  =  usePage<FalshProps>().props ;

    const { searchTerm , handleSearchChange } = useDebouncedSearch({
        route : '/doctors',
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
                        <CardTitle>Doctors Management</CardTitle>
                        <CardDescription className="mt-2 text-sm xl:text-base">
                            Here you can add, remove, update all Doctors that work with the lab.
                        </CardDescription>
                        <Separator className="mt-2" />
                        <CardAction>
                            <CreateDoctor/>
                        </CardAction>
                    </CardHeader>

                    <CardContent>
                        {/* Search inpute */}
                        <SearchInput
                            handleChange={(e) => handleSearchChange(e.target.value)}
                            searchTerm={searchTerm}
                        />
                        {/* Table */}
                        <DataDoctor doctors={doctors.data} />
                    </CardContent>
                    <CardFooter className="flex justify-end">
                            <PerPage
                                url="/doctors"
                                defaultPerPage={filters.per_page ?? "15"}
                            />
                            <Pagination  links={doctors.links}/>
                    </CardFooter>
                    </Card>

           </AppLayout>
  )
}
export default Doctor
