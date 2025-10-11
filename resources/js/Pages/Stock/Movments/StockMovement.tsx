
import AppLayout from "@/Layouts/AppLayout";
import { BreadcrumbItem, FalshProps, FiltersQuery, PaginationLink, StockMovement as StockMovementType  } from "@/Types";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import Pagination from "@/components/pagination";
import FilterStockMovement from "./filter-stock-movement";
import DataStockMovement from "./data-stock-movement";

// import DataStock from "./data-stock";

type Props = {
    stock_movement : { data: StockMovementType[]; links: PaginationLink[]};
    filters : FiltersQuery;
}


const breadcrumbs : BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
    title: 'Stock Managment',
    href: '/movement-stock',
    }
];

export default function StockMovement({stock_movement , filters} : Props) {
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
                        <CardTitle>Stock Movement Log</CardTitle>
                        <CardDescription className="mt-2 text-sm xl:text-base">
                            Here you can see the movement of the stock .
                        </CardDescription>
                        <Separator className="mt-2" />
                        <CardAction>

                        </CardAction>
                    </CardHeader>

                    <CardContent>
                        {/* Filter */}
                        <FilterStockMovement filters={filters} />
                         <DataStockMovement Stocks={stock_movement.data}/>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                            <Pagination  links={stock_movement.links}/>
                    </CardFooter>
                    </Card>
    </AppLayout>

  )
}
