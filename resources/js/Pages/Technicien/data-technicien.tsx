import { User } from "@/Types"
import { Button } from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import { router } from "@inertiajs/react";
import { Trash } from "lucide-react";
import EditTechnicien from "./edit-technicien";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";




type Props = {
    techniciens : User[]
}

function DataTechnicien({techniciens} : Props) {


  return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>ID</TableHead>
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
            {techniciens.map((technicien) => (
                <TableRow key={technicien.id}>
                    <TableCell>{technicien.id}</TableCell>
                    <TableCell>{technicien.name || "N|A"}</TableCell>
                    <TableCell>{technicien.email || "N|A"}</TableCell>
                    <TableCell>
                        
                        {technicien.is_active ? (
                            <Badge variant={technicien.is_active ? "secondary" : "destructive"}
                            className="bg-green-500 text-white dark:bg-green-600"
                        >
                        {technicien.is_active ?"Active" :"Inactive"}
                        </Badge>
                        ) : (                        <Badge variant={technicien.is_active ? "secondary" : "destructive"}
                            className="bg-red-300 text-white dark:bg-red-400"
                        >
                        {technicien.is_active ?"Active" :"Inactive"}
                        </Badge>)}
                    </TableCell>


                    <TableCell>
                        <Switch
                            checked={!!technicien.is_active}
                            onCheckedChange={() => {
                                    router.put(
                                        `/techniciens/${technicien.id}/toggle-active`,
                                        {
                                            preserveState: true,
                                        }
                                    );
                                }}
                            />
                    </TableCell>

                    <TableCell className="text-right space-x-2">

                        <EditTechnicien  technicien={technicien}/>

                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                                if (confirm("Are you sure?")) {
                                    router.delete(
                                        `/techniciens/${technicien.id}`
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
export default DataTechnicien;
