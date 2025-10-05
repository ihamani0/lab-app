import AppLayout from "@/Layouts/AppLayout"
import { BreadcrumbItem, type Purchase as PurchaseType, FalshProps, FiltersQuery, Suppiler, Product } from "@/Types"
import { type PaginationLink} from "@/Types";
import { Link, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


import Pagination from "@/components/pagination";
import { Separator } from "@/components/ui/separator";

import SearchInput from "@/components/search-inpute";
import { useDebouncedSearch } from "@/hooks/use-debouncedSearch";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DataPurchase from "./data-purchase";
import FilterPurchase from "./filter-purchase";




type Props = {
    purchases :  { data: PurchaseType[]; links: PaginationLink[] }
    filters : FiltersQuery;
    suppliers : Suppiler[];
    materials : Product[]
}


const breadcrumbs : BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
    title: 'Purchase Managment',
    href: '/purchases',
    }
];



function Categories({purchases , filters , suppliers , materials} : Props) {

    const { flash }  =  usePage<FalshProps>().props ;

    const { searchTerm , handleSearchChange } = useDebouncedSearch({
        route : '/purchases',
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
                        <CardTitle>Category Management</CardTitle>
                        <CardDescription className="mt-2 text-sm xl:text-base">
                            Here you can add, remove, update all Category .
                        </CardDescription>
                        <Separator className="mt-2" />
                        <CardAction>
                            <Button asChild>
                                <Link href='/purchases/create'>
                                    Create New Purchase <Plus />
                                </Link>
                            </Button>
                        </CardAction>
                    </CardHeader>

                    <CardContent>
                        {/* Search inpute */}
                        <FilterPurchase
                        filters={filters}
                        suppliers={suppliers}

                        />
                        {/* Table */}
                        <DataPurchase purchases={purchases.data} suppliers={suppliers} materials={materials} />
                    </CardContent>
                    <CardFooter className="flex justify-end">
                            <Pagination  links={purchases.links}/>
                    </CardFooter>
                    </Card>

           </AppLayout>
  )
}
export default Categories
