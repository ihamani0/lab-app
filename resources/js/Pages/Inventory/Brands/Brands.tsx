import AppLayout from "@/Layouts/AppLayout"
import { BreadcrumbItem, type Category as CategoryType, FalshProps , type Brands as BrandsType} from "@/Types"
import { type PaginationLink} from "@/Types";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


import Pagination from "@/components/pagination";
import { Separator } from "@/components/ui/separator";

import SearchInput from "@/components/search-inpute";
import { useDebouncedSearch } from "@/hooks/use-debouncedSearch";
import CreateBrand from "./create-brand";
import DataBrand from "./data-brand";




type Props = {
    categories :  CategoryType[] ;
    brands : { data: BrandsType[]; links: PaginationLink[] } ;
}


const breadcrumbs : BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
    title: 'Brand Managment',
    href: '/brands',
    }
];



function Categories({brands , categories} : Props) {

    const { flash }  =  usePage<FalshProps>().props ;

    const { searchTerm , handleSearchChange } = useDebouncedSearch({
        route : '/brands',
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
                        <CardTitle>Brands Management</CardTitle>
                        <CardDescription className="mt-2 text-sm xl:text-base">
                            Here you can add, remove, update all Brands .
                        </CardDescription>
                        <Separator className="mt-2" />
                        <CardAction>
                            <CreateBrand categories={categories} />
                        </CardAction>
                    </CardHeader>

                    <CardContent>
                        {/* Search inpute */}
                        <SearchInput
                            handleChange={(e) => handleSearchChange(e.target.value)}
                            searchTerm={searchTerm}
                        />

                        
                        {/* Table */}
                        <DataBrand
                            brands={brands.data}
                            categories={categories}
                        />


                    </CardContent>
                    <CardFooter className="flex justify-end">
                            <Pagination  links={brands.links}/>
                    </CardFooter>
                    </Card>

           </AppLayout>
  )
}
export default Categories
