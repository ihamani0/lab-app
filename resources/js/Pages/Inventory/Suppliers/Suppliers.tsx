import AppLayout from "@/Layouts/AppLayout"
import { BreadcrumbItem, FalshProps, type Suppiler as SuppilerType } from "@/Types"
import { type PaginationLink} from "@/Types";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


import Pagination from "@/components/pagination";
import { Separator } from "@/components/ui/separator";

import SearchInput from "@/components/search-inpute";
import { useDebouncedSearch } from "@/hooks/use-debouncedSearch";
import CreateSuppliers from "./create-supplier";
import DataSupplier from "./data-supplier";



type Props = {
    suppliers :  { data: SuppilerType[]; links: PaginationLink[] }
}


const breadcrumbs : BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
    title: 'Supplier Managment',
    href: '/suppliers',
    }
];



function Suppliers({suppliers} : Props) {

    const { flash }  =  usePage<FalshProps>().props ;

    const { searchTerm , handleSearchChange } = useDebouncedSearch({
        route : '/suppliers',
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
                        <CardTitle>Supplier Management</CardTitle>
                        <CardDescription className="mt-2 text-sm xl:text-base">
                            Here you can add, remove, update all Suppliers .
                        </CardDescription>
                        <Separator className="mt-2" />
                        <CardAction>
                            {/* <CreateCategory />  */}
                            <CreateSuppliers />
                        </CardAction>
                    </CardHeader>

                    <CardContent>
                        {/* Search inpute */}
                        <SearchInput
                            handleChange={(e) => handleSearchChange(e.target.value)}
                            searchTerm={searchTerm}
                            defaultValue=""
                        />
                        {/* Table */}
                        <DataSupplier Suppilers={suppliers.data} />
                    </CardContent>
                    <CardFooter className="flex justify-end">
                            <Pagination  links={suppliers.links}/>
                    </CardFooter>
                    </Card>

           </AppLayout>
  )
}
export default Suppliers;
