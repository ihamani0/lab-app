import AppLayout from "@/Layouts/AppLayout"
import { BreadcrumbItem, FalshProps, FiltersQuery, type Service as ServiceType } from "@/Types"
import { type PaginationLink} from "@/Types";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


import Pagination from "@/components/pagination";
import { Separator } from "@/components/ui/separator";

import SearchInput from "@/components/search-inpute";
import { useDebouncedSearch } from "@/hooks/use-debouncedSearch";
import CreateService from "./create-service";
import DataService from "./data-service";


type Props = {
    services :  { data: ServiceType[]; links: PaginationLink[] }
    filters : FiltersQuery
}


const breadcrumbs : BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
    title: 'Services Managment',
    href: '/prosthesis-service',
    }
];



function Service({services , filters} : Props) {

    const { flash }  =  usePage<FalshProps>().props ;

    const { searchTerm , handleSearchChange } = useDebouncedSearch({
        route : '/prosthesis-service',
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
                <Card className="m-4 space-y-4">
                    <CardHeader>
                        <CardTitle>Service Prosthesis Management</CardTitle>
                        <CardDescription className="mt-2 text-sm xl:text-base">
                            Here you can add, remove, update all Doctors that work with the lab.
                        </CardDescription>

                        <CardAction>
                            {/* <CreateDoctor/>  */}
                            <CreateService/>
                        </CardAction>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {/* Search inpute */}
                        <SearchInput
                            handleChange={(e) => handleSearchChange(e.target.value)}
                            searchTerm={searchTerm}
                            defaultValue={filters.search || ""}
                            placeholder="Search by Name ..."
                        />

                        {/* Table */}
                        <DataService services={services.data} />
                    </CardContent>
                    <CardFooter className="flex justify-end">
                            <Pagination  links={services.links}/>
                    </CardFooter>
                    </Card>

           </AppLayout>
  )
}


export default  Service ;
