


import {  Category, Product } from "@/Types"
import { Button } from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import { router } from "@inertiajs/react";
import { QrCode, Trash } from "lucide-react";
import EditMaterials from "./edit-material";
import MaterialThumbnail from "@/components/material-thumbnail";



type Props = {
    Products : Product[];
    categories : Category[];
}


function DataMaterials({Products , categories} : Props) {
  return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>sku</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>category</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock quantity</TableHead>
                <TableHead>unit</TableHead>
                <TableHead>created at</TableHead>
                <TableHead>updated at</TableHead>
                <TableHead className="text-right">
                    Actions
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {Products.map((Product) => (
                <TableRow key={Product.id}
                className={`${Product.stock_quantity <= 0 ? "bg-red-100 dark:bg-red-600" : ""}`}>
                    <TableCell>{Product.sku}</TableCell>
                    <TableCell>
                        <MaterialThumbnail
                        fullImageUrl={Product.imageUrl || null} />
                    </TableCell>
                    <TableCell>{Product.name || "N|A"}</TableCell>
                    <TableCell>{Product.category.name || "N|A"}</TableCell>
                    <TableCell>{Product.brand.name || "N|A"}</TableCell>
                    <TableCell>{Product.description || "N|A"}</TableCell>
                    <TableCell>{Product.price || "N|A"} DZD</TableCell>
                    <TableCell>{Product.stock_quantity }</TableCell>
                    <TableCell>{Product.unit || "N|A"}</TableCell>
                    <TableCell>{Product.created_at || "N|A"}</TableCell>
                    <TableCell>{Product.updated_at|| "N|A"}</TableCell>

                    <TableCell className="text-right space-x-2">

                        <EditMaterials  Product={Product} categories={categories}/>

                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                                if (confirm("Are you sure?")) {
                                    router.delete(
                                        `/materials/${Product.id}`
                                    );
                                }
                            }}
                        >
                            <Trash   />
                        </Button>
                            <Button className="cursor-pointer" variant="secondary" size="sm">
                            <a href={`/materials/${Product.id}/download-qr-pdf`}>

                            <QrCode />
                            </a>
                        </Button>
                    </TableCell>


                </TableRow>
            ))}
        </TableBody>
    </Table>
  )
}
export default DataMaterials;
