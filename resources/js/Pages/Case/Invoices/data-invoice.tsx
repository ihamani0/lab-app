

import { InvoiceCase} from "@/Types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import { FORMAT_DATE } from "@/constants";
import { getBadgeVariantForCases, getBadgeVariantForPurchase } from "@/lib/utils";
import { Link, router } from "@inertiajs/react";
import { format } from "date-fns";
import { FileDown, Pen, PenBox, Trash } from "lucide-react";
import ReuseToolTipe from "@/components/reuse-tooltipe";
import { useState } from "react";
type Props = {
    invoices : InvoiceCase[];

}

export default function DataInvoice({invoices}:Props) {

    const [loading, setLoading] = useState(false);


  return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Case Number #</TableHead>
                    <TableHead>Recived Date </TableHead>
                    <TableHead>Case Number</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Descrption</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">
                        Actions
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map(item => (
                <TableRow key={item.id}>
                    <TableCell>
                        <Badge variant="outline" className="shadow text-sm" >
                        {item.invoice_number}
                        </Badge>
                    </TableCell>
                    <TableCell>{format(item.invoice_date || "", FORMAT_DATE) || "N/A"}</TableCell>
                    <TableCell>
                        <Link href={`/prosthesis-case/${item.case.id}/edit`}>
                            <Badge variant="outline" className="" >
                            {item.case.case_number}
                            </Badge>
                        </Link>
                    </TableCell>
                    <TableCell>{item.net_amount}</TableCell>
                    <TableCell>{item.status || "N/A"}</TableCell>
                    <TableCell>
                        <Badge variant={item.payment_status ==='unpaid' ? 'destructive' : 'success'} className="shadow text-sm" >

                        {item.payment_status || "N/A"}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">



                        {/* <ViewCase prosthesis_case={item} /> */}

                        <Button
                            variant="outline"
                            size="sm"
                            asChild
                        >
                            <Link href={`/prosthesis-invoice/${item.id}/edit`}>
                                <PenBox   />
                            </Link>
                        </Button >

                        {/*<ViewPurchase purchase={purchase}/> */}
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                                if (confirm("Are you sure?")) {
                                    router.delete(
                                        `/prosthesis-invoice/${item.id}`
                                    );
                                }
                            }}
                            >
                            <Trash   />
                        </Button >



                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
  )
}
