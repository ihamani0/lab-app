import { Button } from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import { router } from "@inertiajs/react";
import { AlertCircle } from "lucide-react";

import { Stock as StockType } from "@/Types";
import EditStock from "./edit-stock";
import { getBadgeVariantForPurchase } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";


type Props = {
    Stocks : StockType[];
}

export default function DataStock({Stocks} : Props) {
  return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Sku</TableHead>
                <TableHead>Ref</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Raison</TableHead>
                <TableHead>Last Move</TableHead>
                <TableHead>Date Last Move</TableHead>
                <TableHead className="text-right">
                    Actions
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {Stocks.map((stock) => (
                <TableRow key={stock.id}>
                    <TableCell>{stock.sku}</TableCell>
                    <TableCell>{stock.ref || '-'}</TableCell>
                    <TableCell>{stock.name }</TableCell>
                    <TableCell className="flex gap-1 items-center">
                        {stock.quantity}
                        {stock.quantity <= stock.min_stock ? (<AlertCircle color="red" />): ''}
                    </TableCell>
                    <TableCell>{stock.stock_movements.raison }</TableCell>
                    {/* Make Function for ghet variant her  */}
                    <TableCell>
                        <Badge variant={getBadgeVariantForPurchase(stock.stock_movements.last_move || "")}>
                            {stock.stock_movements.last_move}
                        </Badge>
                    </TableCell>
                    <TableCell>{stock.stock_movements.last_move_date|| '-'}</TableCell>

                    <TableCell className="text-right space-x-2">

                        <EditStock stock={stock} />

                    </TableCell>


                </TableRow>
            ))}
        </TableBody>
    </Table>
  )
}
