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
                    <TableHead>Materials Sku</TableHead>
                    <TableHead>Materials Name</TableHead>
                    <TableHead>In Stock</TableHead>
                    <TableHead>Quantity Used</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead>Total Cost</TableHead>
                    <TableHead>Avg Unit Cost</TableHead>
                    <TableHead className="text-right">
                        Actions
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {consumption.map((item , index) => (
                <TableRow key={item.material_id}>
                    <TableCell>{index + 1 }</TableCell>
                    <TableCell>
                        <Badge variant="outline" className="shadow text-sm" >
                            {item.material_sku}
                        </Badge>
                    </TableCell>
                    <TableCell>

                        {item.material_name}

                    </TableCell>
                    <TableHead>{item.in_stock}</TableHead>
                    <TableCell>{item.total_quantity}</TableCell>
                    <TableCell>{parseFloat(item.unit_price).toFixed(2)}</TableCell>
                    <TableCell>{item.total_cost}</TableCell>
                    <TableCell>
                        <Badge variant={"outline"}>
                            {parseFloat(item.avg_unit_cost).toFixed(2)}
                        </Badge>
                    </TableCell>
                    <TableCell>
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
        // +"material_id": 12
        // +"material_name": "Halee Owen"
        // +"total_quantity": 1
        // +"total_cost": "977.00"
        // +"avg_unit_cost": "977.0000000000000000"
