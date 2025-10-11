import AppLayout from "@/Layouts/AppLayout"
import { BreadcrumbItem, type Case as CaseType  , Doctor, FalshProps, FiltersQuery, Patient, User } from "@/Types"
import { type PaginationLink} from "@/Types";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


import Pagination from "@/components/pagination";
import { Separator } from "@/components/ui/separator";

import SearchInput from "@/components/search-inpute";
import { useDebouncedSearch } from "@/hooks/use-debouncedSearch";
import CreateCase from "./create-case";
import DataCase from "./data-case";
import FilterCase from "./filter-case";


type Props = {
    cases :  { data: CaseType[]; links: PaginationLink[] } ,
    doctors : Doctor[];
    technicians : User[];
    patients : Patient[];
    filters : FiltersQuery
}


const breadcrumbs : BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
    title: 'Cases Managment',
    href: '/cases',
    }
];



function Case({cases , doctors , technicians , patients , filters} : Props) {

    const { flash }  =  usePage<FalshProps>().props ;

    const { searchTerm , handleSearchChange } = useDebouncedSearch({
        route : '/prosthesis-case',
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
                        <CardTitle>Case Management</CardTitle>
                        <CardDescription className="mt-2 text-sm xl:text-base">
                            Here you can add, remove, update all Cases that work with the lab.
                        </CardDescription>
                        <Separator className="mt-2" />
                        <CardAction>
                            {/* <CreateDoctor/> */}
                            <CreateCase
                                doctors={doctors}
                                technicians={technicians}
                                patients={patients}
                            />
                        </CardAction>
                    </CardHeader>

                    <CardContent>
                        {/* Search inpute */}

                        <FilterCase
                            doctors={doctors}
                            technicians={technicians}
                            filters={filters}
                        />

                        {/* Table */}
                        <DataCase cases={cases.data} />
                    </CardContent>
                    <CardFooter className="flex justify-end">
                            <Pagination  links={cases.links}/>
                    </CardFooter>
                    </Card>

           </AppLayout>
  )
}
export default Case;
