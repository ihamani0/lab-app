import { User } from "@/Types"
import { Button } from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import { router } from "@inertiajs/react";
import { Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import EditAccounting from "./edit-accounting";
import { route } from "ziggy-js";





type Props = {
    accountings : User[]
}

function DataAccounting({accountings} : Props) {


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
            {accountings.map((accounting) => (
                <TableRow key={accounting.id}>
                    <TableCell>{accounting.id}</TableCell>
                    <TableCell>{accounting.name || "-"}</TableCell>
                    <TableCell>{accounting.email || "-"}</TableCell>
                    <TableCell>

                        {accounting.is_active ? (
                            <Badge variant={accounting.is_active ? "secondary" : "destructive"}
                            className="bg-green-500 text-white dark:bg-green-600"
                        >
                        {accounting.is_active ?"Active" :"Inactive"}
                        </Badge>
                        ) : (                        <Badge variant={accounting.is_active ? "secondary" : "destructive"}
                            className="bg-red-300 text-white dark:bg-red-400"
                        >
                        {accounting.is_active ?"Active" :"Inactive"}
                        </Badge>)}
                    </TableCell>


                    <TableCell>
                        <Switch
                            checked={!!accounting.is_active}
                            onCheckedChange={() => {
                                    router.put(
                                        route('accounting.toggleActive' , { id: accounting.id }),
                                        {
                                            preserveState: true,
                                        }
                                    );
                                }}
                            />
                    </TableCell>

                    <TableCell className="text-right space-x-2">

                        <EditAccounting  accounting={accounting}/>

                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                                if (confirm("Are you sure?")) {
                                    router.delete(
                                        route('accounting.destroy' , { id: accounting.id }),
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
export default DataAccounting;
