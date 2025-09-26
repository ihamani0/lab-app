


import { Category } from "@/Types"
import { Button } from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import { router } from "@inertiajs/react";
import { Trash } from "lucide-react";
import EditCategory from "./edit-category";


type Props = {
    categories : Category[]
}

function DataBrand({categories} : Props) {
  return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>description</TableHead>
                <TableHead>created at</TableHead>
                <TableHead>updated at</TableHead>
                <TableHead className="text-right">
                    Actions
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {categories.map((category) => (
                <TableRow key={category.id}>
                    <TableCell>{category.id}</TableCell>
                    <TableCell>{category.name || "N|A"}</TableCell>
                    <TableCell>{category.description || "N|A"}</TableCell>
                    <TableCell>{category.create || "N|A"}</TableCell>
                    <TableCell>{category.update || "N|A"}</TableCell>

                    <TableCell className="text-right space-x-2">

                        <EditCategory  category={category}/>

                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                                if (confirm("Are you sure?")) {
                                    router.delete(
                                        `/categories/${category.id}`
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
