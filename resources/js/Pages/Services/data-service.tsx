
import {  Service } from "@/Types"
import { Button } from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import { router } from "@inertiajs/react";
import { Trash } from "lucide-react";
import EditService from "./edit-service";
 


type Props = {
    services: Service[];
}

export default function DataService({services}: Props) {
  return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">
                    Actions
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {services.map((service) => (
                <TableRow key={service.service_number}>
                    <TableCell>{service.service_number}</TableCell>
                    <TableCell>{service.name}</TableCell>
                    <TableCell>{service.description || "-"}</TableCell>
                    <TableCell>{service.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right space-x-2">
                       <EditService service={service} />
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                                if (confirm("Are you sure?")) {
                                    router.delete(`/services/${service.id}`);
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
 