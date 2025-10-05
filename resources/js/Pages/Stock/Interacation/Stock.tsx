
import AppLayout from "@/Layouts/AppLayout";
import { BreadcrumbItem, FalshProps, PaginationLink, Stock as StockType } from "@/Types";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import Pagination from "@/components/pagination";

import DataStock from "./data-stock";

type Props = {
    Stocks : { data: StockType[]; links: PaginationLink[]}
}


const breadcrumbs : BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
    title: 'Stock Managment',
    href: '/stock',
    }
];

export default function Stock({Stocks} : Props) {
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
                        <CardTitle>Category Management</CardTitle>
                        <CardDescription className="mt-2 text-sm xl:text-base">
                            Here you can add, remove, update all Category .
                        </CardDescription>
                        <Separator className="mt-2" />
                        <CardAction>

                        </CardAction>
                    </CardHeader>

                    <CardContent>
                         <DataStock Stocks={Stocks.data}/>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                            <Pagination  links={Stocks.links}/>
                    </CardFooter>
                    </Card>
    </AppLayout>

  )
}
