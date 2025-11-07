import { Doctor } from "@/Types"
import { Button } from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import { router } from "@inertiajs/react";
import { Trash } from "lucide-react";
import EditDoctor from "./edit-doctor";


type Props = {
    doctors : Doctor[]
}

function DataDoctor({doctors} : Props) {
  return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Cabine</TableHead>
                <TableHead>Address</TableHead>
                <TableHead className="text-right">
                    Actions
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {doctors.map((doctor) => (
                <TableRow key={doctor.id}>
                    <TableCell>{doctor.id}</TableCell>
                    <TableCell>{doctor.name || "N|A"}</TableCell>
                    <TableCell>{doctor.phone || "N|A"}</TableCell>
                    <TableCell>{doctor.email || "N|A"}</TableCell>
                    <TableCell>{doctor.cabine || "N|A"}</TableCell>
                    <TableCell>{doctor.address || "N|A"}</TableCell>
                    <TableCell className="text-right space-x-2">

                        <EditDoctor  doctor={doctor}/>

                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                                if (confirm("Are you sure?")) {
                                    router.delete(
                                        `/doctors/${doctor.id}`
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
export default DataDoctor
