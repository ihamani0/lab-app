import { StockMovement } from "@/Types"
import { Button } from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import { router } from "@inertiajs/react";
import { AlertCircle } from "lucide-react";



import { getBadgeVariantForPurchase } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";




type Props = {
    Stocks : StockMovement[]
}

export default function DataStockMovement({Stocks} : Props) {
  return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Ref</TableHead>
                <TableHead>Sku</TableHead>
                <TableHead>Materila</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Raison</TableHead>
                <TableHead>Movement Date</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {Stocks.map((stock) => (
                <TableRow key={stock.id}>
                    <TableCell>{stock.material.ref || '-'}</TableCell>
                    <TableCell>{stock.material.sku}</TableCell>
                    <TableCell>{stock.material.name}</TableCell>
                    <TableCell>{stock.quantity || '-'}</TableCell>
                    <TableCell>
                        <Badge variant={getBadgeVariantForPurchase(stock.type || "")}>
                            {stock.type}
                        </Badge>
                    </TableCell>
                    <TableCell>{stock.raison}</TableCell>

                    <TableCell>{format(stock.movement_date || new Date() , "MMM d , yyyy") }</TableCell>
                    {/* Make Function for ghet variant her  */}

                </TableRow>
            ))}
        </TableBody>
    </Table>
  )
}
