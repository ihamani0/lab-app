import { type Case as CaseType } from "@/Types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import { FORMAT_DATE } from "@/constants";
import { getBadgeVariantForCases, getBadgeVariantForPurchase } from "@/lib/utils";
import {  Product, Purchase as PurchaseType, Suppiler } from "@/Types";
import { Link, router } from "@inertiajs/react";
import { format } from "date-fns";
import { FileDown, Pen, Trash, Truck } from "lucide-react";
import ViewCase from "./view-case";
import ReuseToolTipe from "@/components/reuse-tooltipe";
import axios from "axios";
import { useState } from "react";
type Props = {
    cases : CaseType[];

}

export default function DataCase({cases}:Props) {

    const [loading, setLoading] = useState(false);

    const handleGenerateAndDownload = async (caseId :string) => {
        if (loading) return;               // prevents double clicks client-side

        setLoading(true);
        try {
            router.post(`/prosthesis-case/${caseId}/generate-invoice`);
        } catch (e) {
            console.error(e);
        // handle error UI
        } finally {
            setLoading(false);
        }
    };
  return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Case Number #</TableHead>
                    <TableHead>Recived Date </TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Descrption</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">
                        Actions
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {cases.map(item => (
                <TableRow key={item.id}>
                    <TableCell>{item.case_number}</TableCell>
                    <TableCell>{format(item.received_date || "", FORMAT_DATE) || "N/A"}</TableCell>
                    <TableCell>{item.patient?.name || "N/A"}</TableCell>
                    <TableCell>{item.doctor?.name || "N/A"}</TableCell>
                    <TableCell>{item.description || "N/A"}</TableCell>
                    <TableCell>
                        <Badge variant={getBadgeVariantForCases(item.status)} >
                        {item.status || "N/A"}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">

                        {item.status === "completed" || item.status === "delivered" && (
                            <ReuseToolTipe title="generate Inv-Pdf">
                                <Button
                                    disabled={loading}
                                    variant="amber"
                                    size="icon"
                                    className="cursor-pointer"
                                    onClick={()=>handleGenerateAndDownload(item.id.toString())}
                                    >
                                    {loading ? "..." :<FileDown />}
                                </Button>
                            </ReuseToolTipe>

                        ) }

                        <ViewCase prosthesis_case={item} />

                        <Button
                            variant="outline"
                            size="sm"
                            asChild
                        >
                            <Link href={`/prosthesis-case/${item.id}/edit`}>
                                <Pen   />
                            </Link>
                        </Button >

                        {/*<ViewPurchase purchase={purchase}/> */}
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                                if (confirm("Are you sure?")) {
                                    router.delete(
                                        `/prosthesis-case/${item.id}`
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
