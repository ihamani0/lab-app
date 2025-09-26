


import {  Category, Product, Suppiler } from "@/Types"
import { Button } from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import { router } from "@inertiajs/react";
import { QrCode, Trash } from "lucide-react";
// import EditMaterials from "./edit-material";
import MaterialThumbnail from "@/components/material-thumbnail";
import EditSuppliers from "./edit-supplier";
import DetailsSupplier from "./details-supplier";



type Props = {
    Suppilers : Suppiler[];

}


function DataSupplier({Suppilers } : Props) {
  return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>id</TableHead>
                <TableHead>Logo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Email</TableHead>
                {/* <TableHead>Description</TableHead>
                <TableHead>Facebook</TableHead>
                <TableHead>Instagram</TableHead>
                <TableHead>WhatsApp</TableHead>
                <TableHead>website</TableHead>
                <TableHead>updated at</TableHead>
                <TableHead>updated at</TableHead>*/}
                <TableHead className="text-right">
                    Actions
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {Suppilers.map((Suppiler) => (
                <TableRow key={Suppiler.id}>
                    <TableCell>{Suppiler.id}</TableCell>
                    <TableCell>
                        <MaterialThumbnail
                        fullImageUrl={Suppiler.logoUrl || null} />
                    </TableCell>
                    <TableCell>{Suppiler.name}</TableCell>
                    <TableCell>{Suppiler.phone || "N|A"}</TableCell>
                    <TableCell>{Suppiler.email || "N|A"}</TableCell>


                    <TableCell className="text-right space-x-2">


                        <DetailsSupplier supplier={Suppiler} />

                         <EditSuppliers Suppiler={Suppiler} />


                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                                if (confirm("Are you sure?")) {
                                    router.delete(
                                        `/suppliers/${Suppiler.id}`
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
export default DataSupplier;
