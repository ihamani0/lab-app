import { type Consumption as ConsumptionType} from "@/Types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import { FORMAT_DATE } from "@/constants";

import { Link, router } from "@inertiajs/react";
import { format } from "date-fns";
import { FileDown, Pen, PenBox, Trash } from "lucide-react";
import ReuseToolTipe from "@/components/reuse-tooltipe";
import { useState } from "react";
type Props = {
    consumption : ConsumptionType[];

}



export default function DataConsumption({consumption}:Props) {




  return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Materials Name</TableHead>
                    <TableHead>In Stock</TableHead>
                    <TableHead>Quantity Used</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead>Total Cost</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead className="text-right">
                        Actions
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {consumption.map(item => (
                <TableRow key={item.id}>
                    <TableCell>
                        {item.materials.name} -
                            <Badge variant="outline" className="shadow text-sm" >
                            {item.materials.sku}
                            </Badge>
                    </TableCell>
                    <TableCell>{item.materials.stock_quantity}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.materials.price}</TableCell>
                    <TableCell>{item.total_cost}</TableCell>
                    <TableCell>{format(item.stock_movement.last_move_date || "", FORMAT_DATE) || "N/A"}

                    </TableCell>


                    <TableCell className="text-right space-x-2">

                        {/* <ViewCase prosthesis_case={item} /> */}

                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
  )
}
