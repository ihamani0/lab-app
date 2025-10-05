import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import { FORMAT_DATE } from "@/constants";
import { getBadgeVariantForPurchase } from "@/lib/utils";
import {  Product, Purchase as PurchaseType, Suppiler } from "@/Types";
import { Link, router } from "@inertiajs/react";
import { format } from "date-fns";
import { FileDown, Pen, Trash, Truck } from "lucide-react";
import ViewPurchase from "./view-purchase";
import PurchaseEdit from "./Edit";


type Props = {
    purchases : PurchaseType[],
    materials: Product[];
    suppliers : Suppiler[];
}


export default function DataPurchase({purchases , materials , suppliers} : Props) {
  return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Supplier </TableHead>
                <TableHead>Date Purchase</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Subtotal</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Net</TableHead>
                <TableHead>Paid</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">
                    Actions
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {purchases.map((purchase) => (
                <TableRow key={purchase.id}>
                    <TableCell>{purchase.invoice_number}</TableCell>

                    <TableCell>{purchase.supplier.name || "N/A"}</TableCell>
                    <TableCell>{format(purchase.purchase_date , FORMAT_DATE)|| "N|A"}</TableCell>
                    <TableCell>
                        <Badge variant="outline" className="shadow">
                        {purchase.status}
                        </Badge>
                    </TableCell>
                    <TableCell>{purchase.subtotal_amount} {purchase.currency}</TableCell>
                    <TableCell>{purchase.discount_amount || "0"} {purchase.currency}</TableCell>
                    <TableCell>{purchase.net_amount || '0'} {purchase.currency} </TableCell>
                    <TableCell>{purchase.paid_amount || "0"} {purchase.currency}</TableCell>
                    <TableCell>
                            <Badge variant={getBadgeVariantForPurchase(purchase.payment_status) }>
                                {purchase.payment_status}
                            </Badge>
                    </TableCell>

                    <TableCell className="text-right space-x-2">


                        <Button
                            variant="outline"
                            size="sm"
                            asChild
                        >
                            <Link href={`/purchases/${purchase.id}/edit`}>
                                <Pen   />
                            </Link>
                        </Button >

                        <ViewPurchase purchase={purchase}/>

                        {/* <Edi  Product={purchase} categories={purchase}/> */}



                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                                if (confirm("Are you sure?")) {
                                    router.delete(
                                        `/purchases/${purchase.id}`
                                    );
                                }
                            }}
                        >
                            <Trash   />
                        </Button >

                        {purchase.invoice_url && (
                            <Button size='icon'className="bg-gray-800 hover:bg-gray-500 cursor-pointer " asChild>
                            <a href={`/purchases/${purchase.id}/invoice/download`}>
                            <FileDown />
                            </a>
                        </Button>
                        )}


                    </TableCell>


                </TableRow>
            ))}
        </TableBody>
    </Table>
  )
}
