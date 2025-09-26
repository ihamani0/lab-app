


import { Brands, Category } from "@/Types"
import { Button } from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import { router } from "@inertiajs/react";
import { Trash } from "lucide-react";
import EditBrand from "./edit-brand";


type Props = {
    brands : Brands[];
    categories : Category[];
}


function DataBrand({brands , categories} : Props) {
  return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>category</TableHead>
                <TableHead>description</TableHead>
                <TableHead>created at</TableHead>
                <TableHead>updated at</TableHead>
                <TableHead className="text-right">
                    Actions
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {brands.map((brand) => (
                <TableRow key={brand.id}>
                    <TableCell>{brand.id}</TableCell>
                    <TableCell>{brand.name || "N|A"}</TableCell>
                    <TableCell>{brand.category.name || "N|A"}</TableCell>
                    <TableCell>{brand.description || "N|A"}</TableCell>
                    <TableCell>{brand.create || "N|A"}</TableCell>
                    <TableCell>{brand.update|| "N|A"}</TableCell>

                    <TableCell className="text-right space-x-2">

                        <EditBrand  brand={brand} categories={categories}/>

                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                                if (confirm("Are you sure?")) {
                                    router.delete(
                                        `/brands/${brand.id}`
                                    );
                                }
                            }}
                        >
                            <Trash />
                        </Button>
                    </TableCell>


                </TableRow>
            ))}
        </TableBody>
    </Table>
  )
}
export default DataBrand;
