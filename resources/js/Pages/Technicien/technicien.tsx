import AppLayout from "@/Layouts/AppLayout"
import { BreadcrumbItem, type User as TechnicienType, FalshProps } from "@/Types"
import { type PaginationLink} from "@/Types";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


import Pagination from "@/components/pagination";
import { Separator } from "@/components/ui/separator";
import CreateTechnicien from "./create-technicien";
import DataTechnicien from "./data-technicien";
import { useDebouncedSearch } from "@/hooks/use-debouncedSearch";
import SearchInput from "@/components/search-inpute";


type TechnicienProps = {
    techniciens :  { data: TechnicienType[]; links: PaginationLink[] }
}


const breadcrumbs : BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
    title: 'Technicien Managment',
    href: '/technicien',
    }
];

function Technicien({techniciens} : TechnicienProps) {

    const { flash }  =  usePage<FalshProps>().props ;

    const {searchTerm,handleSearchChange} = useDebouncedSearch({
        route : "/techniciens"
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
                        <CardTitle>Technicien Management</CardTitle>
                        <CardDescription className="mt-2 text-sm xl:text-base">
                            Here you can add, remove, update all Techniciens that work with the lab.
                        </CardDescription>
                        <Separator className="mt-2" />
                        <CardAction>
                            {/* <CreateDoctor/> */}
                            <CreateTechnicien />
                        </CardAction>
                    </CardHeader>

                    <CardContent>
                        {/* Search */}
                        <SearchInput
                            searchTerm={searchTerm}
                            handleChange={(e) => handleSearchChange(e.target.value)}
                        />
                        {/* Table */}
                        <DataTechnicien techniciens={techniciens.data}/>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                            <Pagination  links={techniciens.links}/>
                    </CardFooter>
                    </Card>

           </AppLayout>
  )
}
export default Technicien;
