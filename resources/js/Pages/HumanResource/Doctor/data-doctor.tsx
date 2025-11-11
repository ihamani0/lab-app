import { Doctor } from "@/Types"
import { Button } from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import { router } from "@inertiajs/react";
import { Trash } from "lucide-react";
import EditDoctor from "./edit-doctor";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";


type Props = {
    doctors : Doctor[]
}

function DataDoctor({doctors} : Props) {
  return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Active/Pause</TableHead>
                <TableHead className="text-right">
                    Actions
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {doctors.map((doctor , i) => (
                <TableRow key={doctor.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{doctor.name || "-"}</TableCell>
                    <TableCell>{doctor.user.email || "-"}</TableCell>

                    <TableCell>

                        {doctor.user.is_active ? (
                            <Badge variant={doctor.user.is_active ? "secondary" : "destructive"}
                            className="bg-green-500 text-white dark:bg-green-600"
                        >
                        {doctor.user.is_active ?"Active" :"Inactive"}
                        </Badge>
                        ) : (                        <Badge variant={doctor.user.is_active ? "secondary" : "destructive"}
                            className="bg-red-300 text-white dark:bg-red-400"
                        >
                        {doctor.user.is_active ?"Active" :"Inactive"}
                        </Badge>)}
                    </TableCell>

                    <TableCell>
                        <Switch
                            checked={!!doctor.user.is_active}
                            onCheckedChange={() => {
                                    router.put(
                                        `/doctors/${doctor.id}/toggle-active`,
                                        {
                                            preserveState: true,
                                        }
                                    );
                                }}
                            />
                    </TableCell>


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
